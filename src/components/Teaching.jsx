import { GraduationCap, ExternalLink, Star } from 'lucide-react'
import { teaching, links } from '../data.js'
import { Reveal, RevealGroup, RevealItem } from './Reveal.jsx'

export default function Teaching() {
  return (
    <section id="teaching" className="border-y border-line bg-raised/40">
      <div className="mx-auto max-w-wrap px-5 py-section sm:px-8">
        <Reveal>
          <span className="section-label">02 — Teaching & Courses</span>
          <h2 className="mt-4 max-w-2xl font-display text-display-lg font-medium text-ink">
            Nearly 200,000 people have learned something from a course I built.
          </h2>
        </Reveal>

        <RevealGroup stagger={0.12} className="mt-14 grid gap-5 lg:grid-cols-2">
          {teaching.roles.map((role) => (
            <RevealItem key={role.title} className="h-full">
              <div className="card flex h-full flex-col p-7">
                <GraduationCap size={20} className="text-accent" aria-hidden />
                <h3 className="mt-4 font-display text-display-md font-medium text-ink">
                  {role.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent-ink">{role.org}</p>
                <p className="mt-4 text-sm leading-relaxed">{role.blurb}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-5">
          <div className="card flex flex-col gap-6 p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-accent">
                <Star size={15} aria-hidden />
                <span className="text-label font-medium uppercase">The MOOC story</span>
              </div>
              <h3 className="mt-3 font-display text-display-md font-medium text-ink">
                {teaching.mooc.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed">{teaching.mooc.blurb}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a
                href={links.mooc}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#0a0a0b]"
              >
                open.uom.lk
                <ExternalLink size={14} aria-hidden />
              </a>
              <a
                href={links.udemy}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent/50"
              >
                Courses on Udemy
                <ExternalLink size={14} aria-hidden />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
