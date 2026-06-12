import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data.js'
import { Reveal, RevealGroup, RevealItem } from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-wrap px-5 py-section sm:px-8">
      <Reveal>
        <span className="section-label">03 — Projects</span>
        <h2 className="mt-4 max-w-2xl font-display text-display-lg font-medium text-ink">
          Research is better when it ships.
        </h2>
      </Reveal>

      <RevealGroup stagger={0.12} className="mt-14 grid gap-5 lg:grid-cols-3">
        {projects.map((project) => (
          <RevealItem key={project.name} className="h-full">
            <TiltCard className="card group h-full">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="flex h-full flex-col p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-display-md font-medium text-ink">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-accent-ink">
                      {project.role} · {project.period}
                    </p>
                  </div>
                  <span className="rounded-full border border-line p-2 text-faint transition-colors group-hover:border-accent/50 group-hover:text-accent">
                    <ArrowUpRight size={15} aria-hidden />
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed">{project.blurb}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-faint">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </TiltCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}
