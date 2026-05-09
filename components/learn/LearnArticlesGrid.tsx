'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { countSections, firstParagraph, readingTimeMinutes } from '@/lib/utils/articleStats'

export type LearnArticle = {
  _id: string
  title: string
  slug: string
  category?: string
  publishedAt?: string
  seoDescription?: string
  body?: { _type?: string; style?: string; children?: { text?: string }[] }[]
}

type Props = {
  articles: LearnArticle[]
}

export function LearnArticlesGrid({ articles }: Props) {
  const categories = useMemo(() => {
    const set = new Set<string>()
    for (const a of articles) if (a.category) set.add(a.category)
    return Array.from(set)
  }, [articles])

  const showFilter = categories.length > 1
  const [active, setActive] = useState<string>('All')

  const filtered = useMemo(() => {
    if (!showFilter || active === 'All') return articles
    return articles.filter((a) => a.category === active)
  }, [articles, active, showFilter])

  if (articles.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-card-border bg-card p-10 text-center text-sm text-text-muted">
        New guides are publishing soon.
      </div>
    )
  }

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <div>
      {showFilter ? (
        <div className="flex flex-wrap gap-2">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={cn(
                'rounded-pill border px-4 py-1.5 text-sm font-medium transition-colors',
                active === cat
                  ? 'border-text-primary bg-text-primary text-white'
                  : 'border-card-border bg-card text-text-muted hover:text-text-primary',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      ) : null}

      {featured ? (
        <div className={cn(showFilter ? 'mt-8' : '')}>
          <FeaturedCard article={featured} index={0} />
        </div>
      ) : null}

      {rest.length > 0 ? (
        <ul className="mt-5 grid gap-5 md:grid-cols-2">
          {rest.map((article, i) => (
            <li key={article._id}>
              <ArticleCard article={article} index={i + 1} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

function FeaturedCard({ article, index }: { article: LearnArticle; index: number }) {
  const sections = countSections(article.body)
  const minutes = readingTimeMinutes(article.body)
  const excerpt = firstParagraph(article.body, 220)
  const articleNumber = String(index + 1).padStart(2, '0')

  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group grid overflow-hidden rounded-card border border-card-border bg-card shadow-card transition-all hover:shadow-card-hover md:grid-cols-[1fr_1.05fr]"
    >
      <div className="flex flex-col justify-between gap-7 p-7 md:p-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">
            Featured · Article {articleNumber}
          </p>
          <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-text-primary group-hover:text-gold md:text-4xl">
            {article.title}
          </h3>
          {article.seoDescription ? (
            <p className="mt-4 text-base leading-relaxed text-text-muted">
              {article.seoDescription}
            </p>
          ) : null}
          {excerpt ? (
            <p className="mt-5 border-l-2 border-gold pl-4 text-sm leading-relaxed text-text-muted">
              {excerpt}
            </p>
          ) : null}
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-text-primary group-hover:text-gold">
          Read the full guide
          <ArrowRight
            size={14}
            aria-hidden
            className="transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </div>
      <div
        aria-hidden
        className="relative flex items-center justify-center overflow-hidden p-12 md:p-14"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(184,150,12,0.18) 0%, rgba(184,150,12,0.08) 100%)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent 0 14px, rgba(184,150,12,0.10) 14px 15px)',
          }}
        />
        <div className="relative text-center">
          <p className="text-7xl font-semibold leading-none tracking-tight text-gold md:text-[120px]">
            {String(sections).padStart(2, '0')}
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
            Sections · {minutes} min read
          </p>
        </div>
      </div>
    </Link>
  )
}

function ArticleCard({ article, index }: { article: LearnArticle; index: number }) {
  const sections = countSections(article.body)
  const minutes = readingTimeMinutes(article.body)
  const articleNumber = String(index + 1).padStart(2, '0')

  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group flex h-full gap-5 rounded-card border border-card-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover md:gap-6 md:p-8"
    >
      <div
        aria-hidden
        className="flex h-20 w-20 shrink-0 items-center justify-center rounded-card md:h-24 md:w-24"
        style={{ backgroundColor: 'rgba(184,150,12,0.12)' }}
      >
        <span className="text-3xl font-semibold tracking-tight text-gold md:text-4xl">
          {articleNumber}
        </span>
      </div>
      <div className="flex flex-1 flex-col">
        {article.category ? (
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">
            {article.category}
          </p>
        ) : null}
        <h3 className="mt-2 text-lg font-semibold leading-snug text-text-primary group-hover:text-gold md:text-xl">
          {article.title}
        </h3>
        {article.seoDescription ? (
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            {article.seoDescription}
          </p>
        ) : null}
        <div className="mt-auto flex items-center justify-between pt-4 text-xs text-text-muted">
          <span>{minutes} min read · {sections} sections</span>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-text-primary group-hover:text-gold">
            Read guide
            <ArrowRight
              size={14}
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  )
}
