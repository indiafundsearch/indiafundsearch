import Link from 'next/link'
import { AuthorByline } from '@/components/eeat/AuthorByline'
import { DisclosureLine } from '@/components/shared/DisclosureLine'

/**
 * Scaffold for a route whose copy is pending supply (Appendix A, Task A.4).
 *
 * The brief is explicit that regulatory content for the GIFT City cluster is
 * supplied rather than drafted here. So the route, schema and internal links
 * exist, and the page is noindex until copy lands. Shipping an empty page into
 * the index would be thin content competing with pages that already say
 * something.
 */
export function PendingContent({
  eyebrow,
  title,
  intent,
  covers,
  insteadRead,
}: {
  eyebrow: string
  title: string
  /** The query this page is being built to answer. */
  intent: string
  covers: string[]
  insteadRead: { label: string; href: string }[]
}) {
  return (
    <div className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <div className="eyebrow mb-3.5">{eyebrow}</div>
      <h1 className="font-sans font-bold text-[clamp(28px,4.2vw,42px)] tracking-[-0.01em] leading-[1.08] max-w-[820px]">
        {title}
      </h1>
      <AuthorByline className="mt-6" reviewed="September 2026" />

      <div className="mt-8 bg-bronze-wash border border-dashed border-bronze-soft px-6 py-6 max-w-[860px]">
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-bronze mb-2">
          TODO: CONTENT — copy pending
        </p>
        <p className="text-[16.5px] text-ink-soft">
          The route, schema and internal links are built. The copy is held back until it has been
          supplied and reviewed, and this page stays out of the search index until then.
        </p>
        <p className="text-[15.5px] text-slate mt-3">
          <b>Target query:</b> {intent}
        </p>
        <ul className="mt-3">
          {covers.map((c) => (
            <li
              key={c}
              className="relative py-1 pl-[22px] text-[15.5px] text-ink-soft before:content-[''] before:absolute before:left-0.5 before:top-[13px] before:w-2.5 before:h-[1.5px] before:bg-bronze-soft"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>

      <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze mt-12 mb-4">
        Meanwhile
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 max-w-[860px]">
        {insteadRead.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="plot-card px-5 py-4 hover:shadow-plot-hover transition-shadow group"
          >
            <span className="font-sans text-[15.5px] font-semibold group-hover:text-bronze transition-colors">
              {l.label} →
            </span>
          </Link>
        ))}
      </div>

      <DisclosureLine />
    </div>
  )
}
