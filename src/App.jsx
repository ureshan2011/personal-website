import { useEffect, useState } from 'react'
import { LenisProvider } from './lenis.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import Marquee from './components/Marquee.jsx'
import Research from './components/Research.jsx'
import Teaching from './components/Teaching.jsx'
import Projects from './components/Projects.jsx'
import Photography from './components/Photography.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* private browsing */
    }
  }, [theme])

  return (
    <LenisProvider>
      <div className="grain">
        <Nav theme={theme} onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />
        <main>
          <Hero />
          <Stats />
          <Marquee />
          <Research />
          <Teaching />
          <Projects />
          <Photography />
        </main>
        <Contact />
      </div>
    </LenisProvider>
  )
}
