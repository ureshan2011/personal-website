import { useState } from 'react'
import { Copy, Check, ExternalLink, FlaskConical } from 'lucide-react'
import { researchThemes, earlierWork, links } from '../data.js'
import { Reveal, RevealGroup, RevealItem } from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'

function BibtexButton({ bibtex, title }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy BibTeX:', bibtex)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy BibTeX for ${title}`}
      className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-body transition-colors hover:border-accent/50 hover:text-accent"
    >
      {copied ? <Check size={12} aria-hidden /> : <Copy size={12} aria-hidden />}
      {copied ? 'Copied' : 'BibTeX'}
    </button>
  )
}

function PublicationCard({ pub }) {
  return (
    <TiltCard className="card flex h-full flex-col p-6">
      <div className="flex items-center gap-2">
        <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-ink">
          {pub.venue}
        </span>
        <span className="text-xs text-faint">{pub.year}</span>
      </div>
      <h4 className="mt-4 font-display text-lg font-medium leading-snug text-ink">{pub.title}</h4>
      <p className="mt-2 text-sm text-faint">{pub.authors}</p>
      <p className="mt-1 text-sm italic text-faint">{pub.outlet}</p>
      <div className="mt-auto flex items-center gap-2 pt-5">
        <BibtexButton bibtex={pub.bibtex} title={pub.title} />
        <a
          href={pub.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-body transition-colors hover:border-accent/50 hover:text-accent"
        >
          <ExternalLink size={12} aria-hidden />
          Paper
        </a>
      </div>
    </TiltCard>
  )
}

export default function Research() {
  return (
    <section id="research" className="mx-auto max-w-wrap px-5 py-section sm:px-8">
      <Reveal>
        <span className="section-label">01 — Research</span>
        <h2 className="mt-4 max-w-2xl font-display text-display-lg font-medium text-ink">
          Making immersive experiences comfortable, social, and real.
        </h2>
      </Reveal>

      <div className="mt-16 flex flex-col gap-20">
        {researchThemes.map((theme) => (
          <div key={theme.id}>
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-display-md font-medium text-ink">{theme.title}</h3>
                {theme.current && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-ink">
                    <FlaskConical size={12} aria-hidden />
                    Currently working on
                  </span>
                )}
              </div>
              <p className="mt-3 max-w-2xl text-body-lg">{theme.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {theme.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-faint">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>

            {theme.publications.length > 0 && (
              <RevealGroup stagger={0.08} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {theme.publications.map((pub) => (
                  <RevealItem key={pub.title} className="h-full">
                    <PublicationCard pub={pub} />
                  </RevealItem>
                ))}
              </RevealGroup>
            )}
          </div>
        ))}
      </div>

      <Reveal className="mt-20">
        <h3 className="section-label">Earlier work · 2015 — 2019</h3>
        <ul className="mt-5 divide-y divide-line border-y border-line">
          {earlierWork.map((pub) => (
            <li key={pub.title}>
              <a
                href={pub.url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="text-sm text-body transition-colors group-hover:text-accent">
                  {pub.title}
                </span>
                <span className="shrink-0 text-xs text-faint">{pub.outlet}</span>
              </a>
            </li>
          ))}
        </ul>
        <a
          href={links.scholar}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
        >
          Full list on Google Scholar
          <ExternalLink size={13} aria-hidden />
        </a>
      </Reveal>
    </section>
  )
}
