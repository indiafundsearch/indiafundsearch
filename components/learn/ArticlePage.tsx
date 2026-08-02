import Link from 'next/link'
import type { Article } from '@/lib/content/types'
import { guideBySlug, guideReadingTime } from '@/lib/content/guides'
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/shared/JsonLd'
import { Byline } from '@/components/shared/Byline'
import { DisclosureLine } from '@/components/shared/DisclosureLine'

/**
 * Standalone article page (P3-25) — gives the high-volume money keywords
 * (what-is-pms, what-is-aif, pms-vs-aif) their own indexable URL, with an
 * author byline (P3-26) and Article + Breadcrumb schema (P3-27).
 */
export function ArticlePage({ article }: { article: Article }) {
  const path = `/learn/${article.slug}`
  const description = article.sub

  return (
    <article className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <JsonLd
        data={[
          articleJsonLd({ title: article.title, description, path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Learn', path: '/learn' },
            { name: article.title, path },
          ]),
        ]}
      />

      <nav className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-slate mb-8" aria-label="Breadcrumb">
        <Link href="/learn" className="hover:text-ink">Learn</Link>
        <span className="mx-2">/</span>
        <span className="text-bronze">{article.no}</span>
      </nav>

      <header className="mb-8 max-w-[820px]">
        <h1 className="font-sans font-bold text-[clamp(30px,4.5vw,44px)] tracking-[-0.01em] leading-[1.08]">
          {article.title}
        </h1>
        <p className="font-serif italic text-[19px] text-ink-soft mt-3">{article.sub}</p>
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          <Byline />
          <span className="font-mono text-[10.5px] text-slate">
            · {guideReadingTime(article.slug) ?? article.min}
          </span>
        </div>
      </header>

      {/* The long-form guide where one exists, otherwise the short answer. The
          two are deliberately different content: /learn shows the summary, this
          page carries the depth, so the same copy isn't served at two URLs. */}
      <div
        className="article-body max-w-[820px]"
        // In-house authored content from lib/content — not user input
        dangerouslySetInnerHTML={{ __html: guideBySlug(article.slug) ?? article.bodyHtml }}
      />

      {/* CTA */}
      <div className="mt-14 plot-card px-8 py-8 flex items-center justify-between gap-6 flex-wrap max-w-[860px] max-sm:px-5">
        <div>
          <p className="font-sans font-bold text-[20px]">Which structure fits your situation?</p>
          <p className="font-serif italic text-[15.5px] text-slate mt-1">
            Seven questions narrow thirteen structures to a shortlist.
          </p>
        </div>
        <Link
          href="/fit-finder"
          className="font-sans text-[14px] font-medium tracking-[0.08em] uppercase px-6 py-3 rounded-[3px] bg-ink text-white-warm border-[1.5px] border-ink hover:bg-bronze hover:border-bronze transition-colors"
        >
          Run the Fit Finder →
        </Link>
      </div>

      <DisclosureLine />
    </article>
  )
}
