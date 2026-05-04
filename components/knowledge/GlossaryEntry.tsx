'use client'

import Link from 'next/link'
import { useMode } from '@/components/shared/SimpleProToggle'
import type { GlossaryTerm } from './glossaryTypes'

type Props = {
  term: GlossaryTerm
  /** When true, show both definitions side-by-side regardless of mode (term page). */
  showBoth?: boolean
}

export function GlossaryEntry({ term, showBoth = false }: Props) {
  const { mode } = useMode()
  const definition = mode === 'pro'
    ? term.proDefinition || term.simpleDefinition
    : term.simpleDefinition || term.proDefinition

  return (
    <article id={term.slug} className="rounded-card border border-card-border bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-text-primary">{term.term}</h3>
        {term.relatedProducts && term.relatedProducts.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {term.relatedProducts.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-pill bg-text-primary/5 px-2 py-0.5 text-[11px] font-medium text-text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {showBoth ? (
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          <DualDefinition label="Simple" body={term.simpleDefinition} />
          <DualDefinition label="Pro" body={term.proDefinition} />
        </div>
      ) : (
        <p className="mt-3 text-sm leading-relaxed text-text-primary">
          {definition || <span className="text-text-muted">No definition yet.</span>}
        </p>
      )}

      {term.whyItMatters ? (
        <p className="mt-3 border-t border-card-border pt-3 text-xs text-text-muted">
          <span className="font-semibold text-gold">Why it matters:</span> {term.whyItMatters}
        </p>
      ) : null}

      <div className="mt-4">
        <Link
          href={`/knowledge/${term.slug}`}
          className="text-xs font-medium text-text-primary hover:text-gold"
        >
          Read full entry →
        </Link>
      </div>
    </article>
  )
}

function DualDefinition({ label, body }: { label: string; body?: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-widest text-text-muted">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-text-primary">
        {body || <span className="text-text-muted">—</span>}
      </p>
    </div>
  )
}
