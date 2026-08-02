import Link from 'next/link'
import type { Article } from '@/lib/content/types'
import { Disclosure } from '@/components/shared/Disclosure'
import { OpenHashDetails } from '@/components/shared/OpenHashDetails'

interface ArticleAccordionProps {
  articles: Article[]
}

import { STANDALONE_ARTICLE_SLUGS } from '@/lib/content/articles'

/**
 * Expandable fundamentals reads — deep-linkable via #slug.
 *
 * Server component on purpose: every body is rendered into the DOM inside a
 * native <details>, so the text is crawlable even while collapsed. The previous
 * motion-based version mounted bodies only when open, which left them in the
 * RSC script payload where extractors never see them.
 */
export function ArticleAccordion({ articles }: ArticleAccordionProps) {
  return (
    <div className="grid gap-4">
      <OpenHashDetails slugs={articles.map((a) => a.slug)} />
      {articles.map((a) => (
        <Disclosure
          key={a.slug}
          id={a.slug}
          meta={a.min}
          title={
            <span className="flex items-baseline gap-4.5">
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-bronze font-semibold w-[78px] shrink-0 max-sm:hidden">
                {a.no}
              </span>
              <span className="min-w-0">
                <span className="font-sans text-xl font-bold block max-sm:text-lg">{a.title}</span>
                <span className="font-serif italic text-[15px] text-slate">{a.sub}</span>
              </span>
            </span>
          }
        >
          <div
            className="article-body"
            // In-house authored content from lib/content — not user input
            dangerouslySetInnerHTML={{ __html: a.bodyHtml }}
          />
          {STANDALONE_ARTICLE_SLUGS.has(a.slug) && (
            <Link
              href={`/learn/${a.slug}`}
              className="inline-block mt-5 font-sans text-[13px] font-medium tracking-[0.06em] uppercase text-bronze border-b-[1.5px] border-bronze-soft hover:text-ink transition-colors"
            >
              Open as its own page →
            </Link>
          )}
        </Disclosure>
      ))}
    </div>
  )
}
