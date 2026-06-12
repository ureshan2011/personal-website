import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Camera, MapPin } from 'lucide-react'
import { photos } from '../data.js'
import { Reveal } from './Reveal.jsx'

function ParallaxPhoto({ photo, tall }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-7%', '7%'])

  return (
    <figure
      ref={ref}
      className={`card group relative overflow-hidden !rounded-2xl p-0 ${
        tall ? 'aspect-[3/4] sm:aspect-auto sm:h-full' : 'aspect-[4/3]'
      }`}
    >
      <motion.img
        src={photo.src}
        alt={`Landscape photograph — ${photo.location}`}
        loading="lazy"
        style={{ y, scale: 1.16 }}
        className="h-full w-full object-cover transition-[filter] duration-500 group-hover:brightness-110"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-14">
        <span className="flex items-center gap-1.5 text-sm font-medium text-white">
          <MapPin size={13} className="text-accent" aria-hidden />
          {photo.location}
        </span>
        <span className="mt-0.5 block text-xs text-white/65">{photo.note}</span>
      </figcaption>
    </figure>
  )
}

export default function Photography() {
  return (
    <section id="photography" className="border-y border-line bg-raised/40">
      <div className="mx-auto max-w-wrap px-5 py-section sm:px-8">
        <Reveal>
          <span className="section-label inline-flex items-center gap-2">
            <Camera size={13} aria-hidden />
            04 — Off the clock
          </span>
          <h2 className="mt-4 max-w-2xl font-display text-display-lg font-medium text-ink">
            When I'm not in the lab, I'm above the bushline.
          </h2>
          <p className="mt-4 max-w-xl text-body-lg">
            Landscape photography from hikes around Te Waipounamu — the same fascination with
            place and perception that drives the research.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {photos.map((photo, i) => (
            <Reveal
              key={photo.src}
              delay={i * 0.06}
              className={i % 2 === 0 ? 'sm:row-span-2' : undefined}
            >
              <ParallaxPhoto photo={photo} tall={i % 2 === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
