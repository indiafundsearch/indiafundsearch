'use client'

import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import type { GlossaryTerm } from './glossaryTypes'
import { GlossaryEntry } from './GlossaryEntry'
import { cn } from '@/lib/utils'

type Props = {
  terms: GlossaryTerm[]
}

const PRODUCT_FILTERS = ['All', 'PMS', 'AIF', 'SIF', 'GIFT City'] as const
type ProductFilter = (typeof PRODUCT_FILTERS)[number]

export function GlossaryBrowser({ terms }: Props) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<ProductFilter>('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return terms.filter((term) => {
      if (filter !== 'All') {
        const tags = term.relatedProducts ?? []
        const tagged = tags.includes(filter) || tags.includes('All')
        if (!tagged) return false
      }
      if (!q) return true
      return (
        term.term.toLowerCase().includes(q) ||
        (term.simpleDefinition?.toLowerCase().includes(q) ?? false) ||
        (term.proDefinition?.toLowerCase().includes(q) ?? false) ||
        (term.whyItMatters?.toLowerCase().includes(q) ?? false)
      )
    })
  }, [terms, query, filter])

  const grouped = useMemo(() => groupByLetter(filtered), [filtered])

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[260px]">
          <Search
            size={18}
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search any investment term"
            aria-label="Search glossary"
            className="w-full rounded-button border border-card-border bg-card py-3 pl-11 pr-10 text-base text-text-primary shadow-card placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold"
          />
          {query ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-pill text-text-muted hover:bg-black/5"
            >
              <X size={14} />
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {PRODUCT_FILTERS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            aria-pressed={filter === option}
            className={cn(
              'rounded-pill border px-3 py-1 text-xs font-medium transition-colors',
              filter === option
                ? 'border-text-primary bg-text-primary text-white'
                : 'border-card-border bg-card text-text-muted hover:text-text-primary',
            )}
          >
            {option}
          </button>
        ))}
        <span className="ml-auto text-xs text-text-muted">
          {filtered.length} {filtered.length === 1 ? 'term' : 'terms'}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 rounded-card border border-dashed border-card-border bg-card p-8 text-center text-sm text-text-muted">
          No terms match. Try clearing the search or filter.
        </p>
      ) : (
        <div className="mt-8 space-y-10">
          {grouped.map(({ letter, items }) => (
            <section key={letter}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gold">{letter}</h3>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                {items.map((term) => (
                  <GlossaryEntry key={term._id} term={term} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}

function groupByLetter(terms: GlossaryTerm[]) {
  const map = new Map<string, GlossaryTerm[]>()
  for (const term of terms) {
    const letter = (term.term[0] ?? '#').toUpperCase()
    const bucket = map.get(letter) ?? []
    bucket.push(term)
    map.set(letter, bucket)
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, items]) => ({
      letter,
      items: items.sort((a, b) => a.term.localeCompare(b.term)),
    }))
}
