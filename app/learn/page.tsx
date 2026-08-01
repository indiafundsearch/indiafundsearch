import type { Metadata } from 'next'
import Link from 'next/link'
import { ArticleAccordion } from '@/components/learn/ArticleAccordion'
import { ComparisonTable } from '@/components/learn/ComparisonTable'
import { FadeInOnScroll } from '@/components/shared/FadeInOnScroll'
import { ARTICLES } from '@/lib/content/articles'
import { PRODUCTS } from '@/lib/content/products'
import { SHEETS } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Learn — PMS, AIF, SIF & GIFT City fundamentals',
  description:
    'Plain-English fundamentals of Indian alternative investing: what is PMS, what is AIF, PMS vs AIF, AIF categories decoded, GIFT City for NRIs — plus the thirteen materials of a modern portfolio.',
  path: '/learn',
})

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      {/* Sheet 02 — Fundamentals */}
      <div className="mb-10">
        <div className="eyebrow mb-3.5">Sheet {SHEETS.fundamentals.no} — First Principles</div>
        <h1 className="font-sans font-bold text-[clamp(30px,4.5vw,44px)] tracking-[-0.01em] leading-[1.08] max-w-[800px]">
          Start with the fundamentals.
        </h1>
        <p className="font-serif text-[19px] text-ink-soft max-w-[700px] mt-3.5">
          Six short reads that make everything else in this drawing set obvious — written the way
          we would explain it across a table.{' '}
          <em className="text-bronze italic">No jargon survives past the first sentence.</em>
        </p>
      </div>

      <ArticleAccordion articles={[...ARTICLES]} />

      <div className="dim my-11">
        <span>Reference — the four structures, side by side</span>
      </div>
      <ComparisonTable />
      <p className="font-mono text-[11px] text-slate tracking-[0.04em] mt-3">
        Structural comparison, simplified for conversation. Category rules per SEBI; individual schemes vary.
      </p>

      {/* Sheet 03 — The Materials */}
      <div className="mt-20 mb-9">
        <div className="eyebrow mb-3.5">Sheet {SHEETS.materials.no} — Material Specifications</div>
        <h2 className="font-sans font-bold text-[clamp(26px,3.8vw,38px)] tracking-[-0.01em] leading-[1.1] max-w-[800px]">
          The thirteen materials of a modern portfolio.
        </h2>
        <p className="font-serif text-[18px] text-ink-soft max-w-[700px] mt-3">
          From the familiar to the frontier — what each structure is, the job it does, what it
          costs to enter, and how the taxman treats it.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p, i) => (
          <FadeInOnScroll key={p.id} delay={(i % 3) * 0.06}>
            <Link
              href={`/learn/${p.slug}`}
              className="plot-card block p-6 h-full relative hover:shadow-plot-hover transition-shadow group before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-signal"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-[11px] text-bronze font-semibold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-[9.5px] tracking-[0.1em] uppercase bg-ink text-white-warm px-2 py-[3px] rounded-[2px]">
                  {p.badge}
                </span>
              </div>
              <h3 className="font-sans text-[19px] font-bold mt-2 group-hover:text-bronze transition-colors">
                {p.name}
              </h3>
              <p className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-slate mt-0.5">
                {p.tag}
              </p>
              <p className="font-serif italic text-[15px] text-ink-soft mt-3 line-clamp-3">{p.analogy}</p>
              <div className="flex gap-2 flex-wrap mt-4 font-mono text-[10px] tracking-[0.06em] uppercase">
                <span className="border border-bronze-soft text-bronze bg-bronze-wash px-2 py-1 rounded-[2px]">
                  {p.ret.split('·')[0].trim()}
                </span>
                <span className="border border-line text-slate bg-paper px-2 py-1 rounded-[2px]">
                  MIN {p.min.split('(')[0].trim()}
                </span>
              </div>
            </Link>
          </FadeInOnScroll>
        ))}
      </div>
    </div>
  )
}
