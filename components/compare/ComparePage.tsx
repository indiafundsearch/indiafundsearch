import Link from 'next/link'
import type { ComparePageContent } from '@/lib/content/compare'
import { FIT_FINDER, SHEETS } from '@/lib/constants'
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/shared/JsonLd'
import { Sources } from '@/components/eeat/Sources'
import { RelatedReading } from '@/components/eeat/RelatedReading'
import { Disclosure } from '@/components/shared/Disclosure'
import { DisclosureLine } from '@/components/shared/DisclosureLine'
import { CompareHeader } from './CompareHeader'
import { DecisionTable } from './DecisionTable'
import { VerdictSplit } from './VerdictSplit'

/**
 * The comparison page shell.
 *
 * Order is the whole design. A reader arriving here has already decided to buy
 * something and is choosing between two options — so the page gives them the
 * capsule, then the matrix, then the verdict, all above the reasoning. The
 * essay comes after. Anyone who wants it will scroll; nobody should have to
 * scroll to find the answer.
 */
export function ComparePage({ page }: { page: ComparePageContent }) {
  const path = `/compare/${page.slug}`

  return (
    <article className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <JsonLd
        data={[
          articleJsonLd({ title: page.title, description: page.capsule, path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Compare', path: '/compare' },
            { name: page.title, path },
          ]),
          // Mirrors what is visible on the page and nothing else.
          faqJsonLd([
            { q: page.title, a: page.capsule },
            ...page.sections.map((s) => ({
              q: s.h,
              a: [...s.body, ...(s.points ?? [])].join(' ').replace(/<[^>]+>/g, ''),
            })),
            ...(page.faqs ?? []),
          ]),
        ]}
      />

      <nav
        className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-slate mb-8"
        aria-label="Breadcrumb"
      >
        <Link href="/compare" className="hover:text-ink">
          Sheet {SHEETS.compare.no} — {SHEETS.compare.title}
        </Link>
      </nav>

      <CompareHeader page={page} />

      <DecisionTable table={page.table} />

      <VerdictSplit verdicts={page.verdicts} />

      <div className="max-w-[820px] article-body mt-12">
        {page.sections.map((s) => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            {s.body.map((p) => (
              <p key={p.slice(0, 40)} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
            {s.points && (
              <ul className="pts">
                {s.points.map((pt) => (
                  <li key={pt.slice(0, 40)} dangerouslySetInnerHTML={{ __html: pt }} />
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {page.numbers && (
        <section className="mt-6 max-w-[980px]">
          <h2 className="font-sans font-bold text-[clamp(20px,2.4vw,25px)] tracking-[-0.01em] mb-1">
            {page.numbers.caption}
          </h2>
          <DecisionTable table={page.numbers} />
        </section>
      )}

      {page.mistakes && (
        <section className="mt-12 max-w-[860px]">
          <h2 className="font-sans font-bold text-[clamp(20px,2.4vw,25px)] tracking-[-0.01em] mb-5">
            What goes wrong here
          </h2>
          <ol className="space-y-5">
            {page.mistakes.map((mi, i) => (
              <li key={mi.m} className="border-l-[3px] border-l-alert/60 pl-4">
                <h3 className="font-sans font-semibold text-[16.5px] text-ink">
                  <span className="font-mono text-[11px] text-alert mr-2">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {mi.m}
                </h3>
                <p className="text-[15.5px] text-ink-soft mt-1 leading-[1.6]">{mi.why}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {page.faqs && (
        <section className="max-w-[860px] mt-12">
          <h2 className="font-sans font-bold text-[clamp(20px,2.4vw,25px)] tracking-[-0.01em] mb-4">
            Common questions
          </h2>
          <div className="grid gap-3">
            {page.faqs.map((f) => (
              <Disclosure
                key={f.q}
                title={
                  <h3 className="font-sans font-semibold text-[16.5px] leading-snug text-ink">
                    {f.q}
                  </h3>
                }
              >
                <p className="text-[16px] text-ink-soft leading-[1.6]">{f.a}</p>
              </Disclosure>
            ))}
          </div>
        </section>
      )}

      <Sources sources={page.sources} />

      <RelatedReading links={page.related} heading="Next reads" />

      <div className="mt-14 plot-card px-8 py-8 flex items-center justify-between gap-6 flex-wrap max-w-[880px] max-sm:px-5">
        <div>
          <p className="font-sans font-bold text-[20px]">Still deciding?</p>
          <p className="font-serif italic text-[15.5px] text-slate mt-1 max-w-[460px]">
            {FIT_FINDER.questions} questions, {FIT_FINDER.durationShort}. It narrows thirteen
            structures to a shortlist — including when the honest answer is none of them yet.
          </p>
        </div>
        <Link
          href="/fit-finder"
          className="font-sans text-[14px] font-medium tracking-[0.08em] uppercase px-6 py-3 rounded-[3px] bg-ink text-white-warm border-[1.5px] border-ink hover:bg-bronze hover:border-bronze transition-colors shrink-0"
        >
          Run the Fit Finder →
        </Link>
      </div>

      <DisclosureLine />
    </article>
  )
}
