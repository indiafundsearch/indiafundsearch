import Link from 'next/link'
import { AuthorByline } from '@/components/eeat/AuthorByline'
import { DisclosureLine } from '@/components/shared/DisclosureLine'

/** Hub page for a market-specific cluster (Appendix A). */
export function ClusterHub({
  eyebrow,
  title,
  lede,
  marketNote,
  sections,
  reviewed,
  children,
}: {
  eyebrow: string
  title: React.ReactNode
  lede: string[]
  marketNote: string
  sections: { heading: string; links: { label: string; href: string; note: string }[] }[]
  reviewed: string
  children?: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <div className="eyebrow mb-3.5">{eyebrow}</div>
      <h1 className="font-sans font-bold text-[clamp(30px,4.5vw,46px)] tracking-[-0.01em] leading-[1.06] max-w-[880px]">
        {title}
      </h1>
      <p className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-bronze mt-4">
        {marketNote}
      </p>
      {lede.map((p) => (
        <p key={p.slice(0, 40)} className="font-serif text-[18.5px] text-ink-soft max-w-[760px] mt-4">
          {p}
        </p>
      ))}
      <AuthorByline className="mt-6" reviewed={reviewed} regulatoryAsAt={reviewed} />

      {children}

      {sections.map((s) => (
        <section key={s.heading} className="mt-14">
          <div className="dim mb-6"><span>{s.heading}</span></div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {s.links.map((l) => (
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
      ))}

      <DisclosureLine extra="Nothing here is US or UK tax advice. Take your own position to a professional qualified in that country." />
    </div>
  )
}
