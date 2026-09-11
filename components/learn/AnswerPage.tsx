import Link from 'next/link'
import type { Answer } from '@/lib/content/answers'
import { FIT_FINDER, SHEETS } from '@/lib/constants'
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/shared/JsonLd'
import { AuthorByline } from '@/components/eeat/AuthorByline'
import { Sources } from '@/components/eeat/Sources'
import { RelatedReading } from '@/components/eeat/RelatedReading'
import { Disclosure } from '@/components/shared/Disclosure'
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
  basePath = '/learn',
  hubLabel = `Sheet ${SHEETS.fundamentals.no} — Learn`,
  hubHref = '/learn',
  /** Market signal in the first 100 words (Appendix A, Task A.7). */
  marketNote,
}: {
  answer: Answer
  /** Optional extra block rendered after the sections, before the sources. */
  children?: React.ReactNode
  /** URL prefix for this cluster, e.g. "/us-tax". */
  basePath?: string
  hubLabel?: string
  hubHref?: string
  marketNote?: string
}) {
  const path = `${basePath}/${answer.slug}`

  return (
    <article className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <JsonLd
        data={[
          articleJsonLd({ title: answer.question, description: answer.answer, path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: hubLabel.replace(/^Sheet \d+ — /, ''), path: hubHref },
            { name: answer.question, path },
          ]),
          // Mirrors what is visible on the page and nothing else.
          faqJsonLd([
            { q: answer.question, a: answer.answer },
            ...answer.sections.map((s) => ({ q: s.h, a: [...s.body, ...(s.points ?? [])].join(' ') })),
            ...(answer.faqs ?? []),
          ]),
        ]}
      />

      <nav className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-slate mb-8" aria-label="Breadcrumb">
        <Link href={hubHref} className="hover:text-ink">{hubLabel}</Link>
      </nav>

      <header className="max-w-[820px]">
        <h1 className="font-sans font-bold text-[clamp(28px,4.2vw,42px)] tracking-[-0.01em] leading-[1.1]">
          {answer.question}
        </h1>

        {/* The answer, before any context. No links inside it. */}
        <div className="mt-6 plot-card px-6 py-5 max-sm:px-5">
          <span className="corner corner-tl" /><span className="corner corner-tr" />
          <span className="corner corner-bl" /><span className="corner corner-br" />
          <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-signal-ink font-semibold block mb-2">
            The short answer
          </span>
          <p className="font-sans text-[17.5px] leading-[1.5] text-ink">{answer.answer}</p>
        </div>

        {marketNote && (
          <p className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-bronze mt-4">
            {marketNote}
          </p>
        )}

        <AuthorByline
          className="mt-6"
          published={answer.published}
          reviewed={answer.reviewed}
          regulatoryAsAt={answer.regulatoryAsAt}
        />
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

      {answer.faqs && (
        <section className="max-w-[820px] mt-12">
          <h2 className="font-sans font-bold text-[clamp(20px,2.4vw,25px)] tracking-[-0.01em] mb-4">
            Common questions
          </h2>
          <div className="grid gap-3">
            {answer.faqs.map((f) => (
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

      <Sources sources={answer.sources} />

      <RelatedReading links={answer.related} heading="Next questions" />

      {/* One CTA */}
      <div className="mt-14 plot-card px-8 py-8 flex items-center justify-between gap-6 flex-wrap max-w-[860px] max-sm:px-5">
        <div>
          <p className="font-sans font-bold text-[20px]">Not sure this applies to you?</p>
          <p className="font-serif italic text-[15.5px] text-slate mt-1 max-w-[460px]">
            Seven questions, {FIT_FINDER.durationShort}. It will tell you which structures fit, including when
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
