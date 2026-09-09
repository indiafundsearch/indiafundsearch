import Link from 'next/link'
import type { HubLink } from '@/lib/content/hubs'

/** Hub-to-spoke link grid (Phase 4, Task 4.1). */
export function HubSpokes({ links, heading }: { links: HubLink[]; heading: string }) {
  return (
    <section className="mx-auto max-w-[1180px]">
      <div className="dim mb-6"><span>{heading}</span></div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="plot-card px-5 py-4 hover:shadow-plot-hover transition-shadow group"
          >
            <span className="font-sans text-[15px] font-semibold leading-snug group-hover:text-bronze transition-colors">
              {l.label}
            </span>
            <span className="font-serif text-[14px] text-slate block mt-1.5 leading-snug">
              {l.note}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
