import Link from 'next/link'
import type { ComparePageContent } from '@/lib/content/compare'
import { AuthorByline } from '@/components/eeat/AuthorByline'

/**
 * Page head: the H1, the sides as linked chips, the hook, and the capsule.
 *
 * The capsule carries the verdict on its own, with no links inside it — it is
 * the passage a search or answer engine lifts whole, and a link in the middle
 * of it is an invitation to truncate.
 */
export function CompareHeader({ page }: { page: ComparePageContent }) {
  return (
    <header className="max-w-[900px]">
      <h1 className="font-sans font-bold text-[clamp(28px,4.2vw,42px)] tracking-[-0.01em] leading-[1.1]">
        {page.title}
      </h1>

      {/* Each side links to its own specification page where one exists, so the
          comparison feeds the structure pages rather than ending the journey. */}
      <ul className="flex flex-wrap gap-2 mt-5">
        {page.sides.map((s) => {
          const body = (
            <>
              <span className="font-sans text-[13.5px] font-semibold text-ink">{s.label}</span>
              <span className="font-mono text-[9.5px] tracking-[0.1em] uppercase text-slate block mt-[2px]">
                {s.sub}
              </span>
            </>
          )
          return (
            <li key={s.label}>
              {s.href ? (
                <Link
                  href={s.href}
                  className="block border border-line bg-white-warm px-3.5 py-2 rounded-[3px] hover:border-bronze transition-colors"
                >
                  {body}
                </Link>
              ) : (
                <span className="block border border-line bg-paper px-3.5 py-2 rounded-[3px]">
                  {body}
                </span>
              )}
            </li>
          )
        })}
      </ul>

      <p className="font-serif italic text-[19.5px] text-ink-soft border-l-[3px] border-signal pl-4 mt-6 max-w-[760px]">
        {page.hook}
      </p>

      <div className="mt-6 plot-card px-6 py-5 relative max-w-[820px] max-sm:px-5">
        <span className="corner corner-tl" />
        <span className="corner corner-tr" />
        <span className="corner corner-bl" />
        <span className="corner corner-br" />
        <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-signal-ink font-semibold block mb-2">
          The short answer
        </span>
        <p className="font-sans text-[17.5px] leading-[1.5] text-ink">{page.capsule}</p>
      </div>

      <AuthorByline
        className="mt-6"
        published={page.published}
        reviewed={page.reviewed}
        regulatoryAsAt={page.regulatoryAsAt}
      />
    </header>
  )
}
