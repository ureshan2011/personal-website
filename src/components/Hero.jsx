import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowDown, MapPin } from 'lucide-react'
import MagneticButton from './MagneticButton.jsx'
import { useScrollTo } from '../lenis.jsx'

const ease = [0.16, 1, 0.3, 1]

function MaskedLine({ children, delay, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={reduce ? false : { y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const scrollTo = useScrollTo()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '28%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section id="top" ref={ref} className="relative flex min-h-svh items-center overflow-hidden">
      {/* Slow-parallax background: teal glow + fine grid */}
      <motion.div aria-hidden className="absolute inset-0" style={{ y: bgY }}>
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            background:
              'radial-gradient(48rem 32rem at 72% 18%, var(--glow), transparent 70%), radial-gradient(36rem 28rem at 12% 85%, var(--glow), transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 75%)',
          }}
        />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto w-full max-w-wrap px-5 pb-24 pt-36 sm:px-8"
      >
        <MaskedLine delay={0.1}>
          <span className="section-label inline-flex items-center gap-2">
            <MapPin size={13} aria-hidden />
            HIT Lab NZ · University of Canterbury · Ōtautahi Christchurch
          </span>
        </MaskedLine>

        <h1 className="mt-6 font-display text-display-xl font-medium text-ink">
          <MaskedLine delay={0.25}>Dr. Yasas Sri</MaskedLine>
          <MaskedLine delay={0.38}>
            Wickramasinghe<span className="text-accent">.</span>
          </MaskedLine>
        </h1>

        <MaskedLine delay={0.55} className="mt-7 max-w-xl">
          <p className="text-body-lg">
            XR researcher who builds real things — studying cybersickness and presence at{' '}
            <span className="text-ink">HIT Lab NZ</span>, teaching{' '}
            <span className="text-ink">45,000+ students</span>, and shipping AR games with{' '}
            <span className="text-ink">Navitaz VR Labs</span>.
          </p>
        </MaskedLine>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href="#research"
            onClick={(e) => { e.preventDefault(); scrollTo('research') }}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-[#0a0a0b] transition-shadow hover:shadow-[0_0_32px_-6px_var(--glow)]"
          >
            View Research
            <ArrowDown size={15} aria-hidden />
          </MagneticButton>
          <MagneticButton
            href="#teaching"
            onClick={(e) => { e.preventDefault(); scrollTo('teaching') }}
            className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-accent/50"
          >
            Courses
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  )
}
