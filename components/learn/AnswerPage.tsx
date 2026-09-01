import Link from 'next/link'
import type { Answer } from '@/lib/content/answers'
import { SHEETS } from '@/lib/constants'
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/shared/JsonLd'
import { Byline } from '@/components/shared/Byline'
import { DisclosureLine } from '@/components/shared/DisclosureLine'

/**
 * One question, one page. Deliberately not collapsible: these run about 600
 * words, and the whole point is that the answer is readable the moment the page
 * loads. The capsule under the H1 carries the answer on its own, before any
 * context, because that is the passage search and answer engines quote.
 */
export function AnswerPage({
  answer,
  children,
}: {
  answer: Answer
  /** Optional extra block rendered after the sections, before the sources. */
  children?: React.ReactNode
}) {
  const path = `/learn/${answer.slug}`

  return (
    <article className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <JsonLd
        data={[
          articleJsonLd({ title: answer.question, description: answer.answer, path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Learn', path: '/learn' },
            { name: answer.question, path },
          ]),
          faqJsonLd([
            { q: answer.question, a: answer.answer },
            ...answer.sections.map((s) => ({ q: s.h, a: [...s.body, ...(s.points ?? [])].join(' ') })),
          ]),
        ]}
      />

      <nav className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-slate mb-8" aria-label="Breadcrumb">
        <Link href="/learn" className="hover:text-ink">Sheet {SHEETS.fundamentals.no} — Learn</Link>
      </nav>

      <header className="max-w-[820px]">
        <h1 className="font-sans font-bold text-[clamp(28px,4.2vw,42px)] tracking-[-0.01em] leading-[1.1]">
          {answer.question}
        </h1>

        {/* The answer, before any context. No links inside it. */}
        <div className="mt-6 plot-card px-6 py-5 max-sm:px-5">
          <span className="corner corner-tl" /><span className="corner corner-tr" />
          <span className="corner corner-bl" /><span className="corner corner-br" />
          <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-signal font-semibold block mb-2">
            The short answer
          </span>
          <p className="font-sans text-[17.5px] leading-[1.5] text-ink">{answer.answer}</p>
        </div>

        <div className="mt-5">
          <Byline reviewed={answer.reviewed} />
        </div>
      </header>

      <div className="max-w-[820px] article-body mt-4">
        {answer.sections.map((s) => (
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

      {children}

      {/* Sources */}
      <div className="max-w-[820px] mt-10 border-t border-line-soft pt-4">
        <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-slate block mb-1.5">
          Sources
        </span>
        <ul className="space-y-1">
          {answer.sources.map((s) => (
            <li key={s.url} className="text-[13.5px] leading-snug">
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-bronze hover:text-ink border-b border-bronze-soft/60"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Related — internal depth, and the next question a reader has */}
      <div className="dim my-11"><span>Next questions</span></div>
      <div className="grid gap-3 sm:grid-cols-2 max-w-[820px]">
        {answer.related.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="plot-card px-5 py-4 hover:shadow-plot-hover transition-shadow group"
          >
            <span className="font-sans text-[15.5px] font-semibold group-hover:text-bronze transition-colors">
              {r.label} →
            </span>
          </Link>
        ))}
      </div>

      {/* One CTA */}
      <div className="mt-14 plot-card px-8 py-8 flex items-center justify-between gap-6 flex-wrap max-w-[860px] max-sm:px-5">
        <div>
          <p className="font-sans font-bold text-[20px]">Not sure this applies to you?</p>
          <p className="font-serif italic text-[15.5px] text-slate mt-1 max-w-[460px]">
            Seven questions, ninety seconds. It will tell you which structures fit, including when
            the answer is none of them yet.
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
