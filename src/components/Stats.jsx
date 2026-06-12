import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { stats } from '../data.js'
import { RevealGroup, RevealItem } from './Reveal.jsx'

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setN(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, reduce])

  return (
    <span ref={ref} className="font-display text-display-lg font-medium tabular-nums text-ink">
      {n.toLocaleString('en-NZ')}
      <span className="text-accent">{suffix}</span>
    </span>
  )
}

export default function Stats() {
  return (
    <section aria-label="Key numbers" className="border-y border-line bg-raised/40">
      <RevealGroup
        stagger={0.12}
        className="mx-auto grid max-w-wrap grid-cols-2 gap-x-6 gap-y-10 px-5 py-14 sm:px-8 lg:grid-cols-4"
      >
        {stats.map(({ value, suffix, label }) => (
          <RevealItem key={label} className="flex flex-col gap-1.5">
            <Counter value={value} suffix={suffix} />
            <span className="text-sm text-faint">{label}</span>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}
