import { marqueeKeywords } from '../data.js'

export default function Marquee() {
  const row = [...marqueeKeywords, ...marqueeKeywords]
  return (
    <div aria-hidden className="overflow-hidden border-b border-line py-5">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((word, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-lg italic text-faint">
            {word}
            <span className="not-italic text-accent">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
