import Link from 'next/link'
import { CORRIDORS } from '@/lib/content/corridors'

/**
 * Persistent three-way corridor switcher. Every corridor page links to both
 * siblings, so authority is distributed rather than pooling in the hub — and a
 * reader who picked the wrong country is one click from the right one.
 */
export function CorridorSwitcher({ current }: { current?: string }) {
  return (
    <nav className="mt-14" aria-label="Other corridors">
      <div className="dim mb-6"><span>Other corridors</span></div>
      <div className="grid gap-4 sm:grid-cols-3">
        {CORRIDORS.map((c) => {
          const isCurrent = c.slug === current
          return (
            <Link
              key={c.slug}
              href={`/nri/${c.slug}`}
              aria-current={isCurrent ? 'page' : undefined}
              className={`plot-card p-5 group transition-shadow ${
                isCurrent ? 'bg-paper-2' : 'hover:shadow-plot-hover'
              }`}
            >
              <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-slate">
                <span className="mr-1.5 text-[12px]" aria-hidden="true">{c.flag}</span>
                Corridor {c.code}
              </span>
              <h3 className="font-sans text-[17px] font-bold mt-1 group-hover:text-bronze transition-colors">
                NRIs in {c.label}
              </h3>
              <p className="font-serif text-[14.5px] text-ink-soft mt-1.5 leading-snug">{c.hook}</p>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
