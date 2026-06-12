import { createContext, useContext, useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'

const LenisContext = createContext(null)

export function LenisProvider({ children }) {
  const lenisRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    lenisRef.current = lenis

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reduceMotion])

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
}

/** Smooth-scroll to an element id, falling back to native scroll. */
export function useScrollTo() {
  const lenisRef = useContext(LenisContext)
  return (id) => {
    const el = document.getElementById(id)
    if (!el) return
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(el, { offset: -72 })
    } else {
      el.scrollIntoView({ block: 'start' })
    }
  }
}
