'use client'

import { useMemo, useState } from 'react'
import { ArticleCard } from './ArticleCard'
import {
  ARTICLE_CATEGORIES,
  type ArticleCategory,
  type ArticleSummary,
} from './articleTypes'
import { cn } from '@/lib/utils'

type FilterValue = 'All' | ArticleCategory

type Props = {
  articles: ArticleSummary[]
}

export function InsightsClient({ articles }: Props) {
  const [filter, setFilter] = useState<FilterValue>('All')

  const filtered = useMemo(
    () => (filter === 'All' ? articles : articles.filter((a) => a.category === filter)),
    [articles, filter],
  )

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <FilterChip active={filter === 'All'} onClick={() => setFilter('All')}>
          All
        </FilterChip>
        {ARTICLE_CATEGORIES.map((category) => (
          <FilterChip
            key={category}
            active={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
          </FilterChip>
        ))}
        <span className="ml-auto text-xs text-text-muted">
          {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 rounded-card border border-dashed border-card-border bg-card p-8 text-center text-sm text-text-muted">
          No articles in this category yet.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-pill border px-3 py-1.5 text-xs font-medium transition-colors',
        active
          ? 'border-text-primary bg-text-primary text-white'
          : 'border-card-border bg-card text-text-muted hover:text-text-primary',
      )}
    >
      {children}
    </button>
  )
}
