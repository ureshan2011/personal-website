import { Mail, GraduationCap, Linkedin, Instagram, Github } from 'lucide-react'
import { links } from '../data.js'
import { Reveal } from './Reveal.jsx'
import MagneticButton from './MagneticButton.jsx'

const socials = [
  { label: 'Google Scholar', href: links.scholar, Icon: GraduationCap },
  { label: 'LinkedIn', href: links.linkedin, Icon: Linkedin },
  { label: 'Instagram', href: links.instagram, Icon: Instagram },
  { label: 'GitHub', href: links.github, Icon: Github },
]

export default function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(44rem 26rem at 50% 110%, var(--glow), transparent 70%)',
        }}
      />
      <div className="relative mx-auto max-w-wrap px-5 py-section sm:px-8">
        <Reveal>
          <span className="section-label">05 — Contact</span>
          <h2 className="mt-4 max-w-3xl font-display text-display-lg font-medium text-ink">
            Collaborating on XR research, or building something immersive?{' '}
            <span className="italic text-accent-ink">Let's talk.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton
            href={`mailto:${links.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-[#0a0a0b] transition-shadow hover:shadow-[0_0_32px_-6px_var(--glow)]"
          >
            <Mail size={15} aria-hidden />
            {links.email}
          </MagneticButton>
          <div className="flex gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="rounded-full border border-line p-3 text-body transition-colors hover:border-accent/50 hover:text-accent"
              >
                <Icon size={17} aria-hidden />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-20 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-faint">
              © {new Date().getFullYear()} Yasas Sri Wickramasinghe · HIT Lab NZ, University of
              Canterbury
            </p>
            <p className="font-display text-lg italic text-accent-ink">Ngā mihi 🌿</p>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
