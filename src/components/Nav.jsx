import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useScrollTo } from '../lenis.jsx'

const sections = [
  { id: 'research', label: 'Research' },
  { id: 'teaching', label: 'Teaching' },
  { id: 'projects', label: 'Projects' },
  { id: 'photography', label: 'Photography' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav({ theme, onToggleTheme }) {
  const [active, setActive] = useState(null)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const scrollTo = useScrollTo()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-35% 0px -60% 0px' }
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const go = (id) => {
    setOpen(false)
    scrollTo(id)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Scroll-progress bar */}
      <motion.div
        aria-hidden
        className="h-0.5 origin-left bg-accent"
        style={{ scaleX: reduce ? scrollYProgress : progress }}
      />
      <nav
        aria-label="Primary"
        className="border-b border-line bg-base/75 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-[68px] max-w-wrap items-center justify-between px-5 sm:px-8">
          <a
            href="#top"
            onClick={(e) => { e.preventDefault(); go('top') }}
            className="font-display text-lg font-medium tracking-tight text-ink"
          >
            yasassri<span className="text-accent">.</span>me
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {sections.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); go(id) }}
                aria-current={active === id ? 'true' : undefined}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active === id ? 'text-ink' : 'text-body hover:text-ink'
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-line bg-raised"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="rounded-full border border-line p-2.5 text-body transition-colors hover:text-accent"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="rounded-full border border-line p-2.5 text-body md:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-line md:hidden"
            >
              <div className="flex flex-col px-5 py-3">
                {sections.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={(e) => { e.preventDefault(); go(id) }}
                    className={`rounded-lg px-3 py-3 text-sm ${
                      active === id ? 'text-accent' : 'text-body'
                    }`}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
