'use client'

import { useMemo } from 'react'
import {
  CRITERIA,
  DIMENSION_LABELS,
  type DimensionKey,
  type ScorecardCriterion,
  type ScoreMap,
} from '@/lib/utils/scorecardLogic'
import { cn } from '@/lib/utils'

type Props = {
  scores: ScoreMap
  onChange: (next: ScoreMap) => void
  onBack: () => void
  onSubmit: () => void
  fundName: string
}

const DIMENSION_ORDER: DimensionKey[] = ['manager', 'performance', 'fees', 'operations', 'fit']

export function CriteriaForm({ scores, onChange, onBack, onSubmit, fundName }: Props) {
  const grouped = useMemo(
    () =>
      DIMENSION_ORDER.map((key) => ({
        key,
        label: DIMENSION_LABELS[key],
        items: CRITERIA.filter((c) => c.dimension === key),
      })),
    [],
  )

  const answered = CRITERIA.filter((c) => scores[c.key] != null).length
  const allAnswered = answered === CRITERIA.length

  const setRating = (criterionKey: string, value: number) => {
    onChange({ ...scores, [criterionKey]: value })
  }

  return (
    <div className="space-y-6">
      <div className="rounded-card border border-card-border bg-card p-5 shadow-card md:p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Step 2 of 2</p>
        <h2 className="mt-1 text-2xl font-semibold text-text-primary md:text-3xl">
          Score {fundName} on 20 criteria.
        </h2>
        <p className="mt-2 max-w-prose text-sm text-text-muted">
          1 = poor, 5 = excellent. Score what you can — leave nothing blank. {answered}/20 answered.
        </p>
      </div>

      {grouped.map((group, index) => (
        <DimensionSection
          key={group.key}
          index={index + 1}
          label={group.label}
          items={group.items}
          scores={scores}
          onSetRating={setRating}
        />
      ))}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-card-border pt-6">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-text-muted hover:text-text-primary"
        >
          ← Change fund
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!allAnswered}
          className="inline-flex items-center gap-2 rounded-button bg-text-primary px-5 py-2.5 text-sm font-medium text-white shadow-card hover:opacity-90 hover:shadow-card-hover disabled:opacity-60"
        >
          {allAnswered ? 'See verdict →' : `${20 - answered} criteria left`}
        </button>
      </div>
    </div>
  )
}

function DimensionSection({
  index,
  label,
  items,
  scores,
  onSetRating,
}: {
  index: number
  label: string
  items: ScorecardCriterion[]
  scores: ScoreMap
  onSetRating: (key: string, value: number) => void
}) {
  return (
    <section className="rounded-card border border-card-border bg-card p-5 shadow-card md:p-6">
      <header className="flex items-baseline gap-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
          Dimension {index} of 5
        </span>
        <h3 className="text-lg font-semibold text-text-primary">{label}</h3>
      </header>
      <ul className="mt-4 divide-y divide-card-border">
        {items.map((criterion) => (
          <li key={criterion.key} className="grid gap-2 py-4 md:grid-cols-[1fr_auto] md:items-center md:gap-6">
            <div>
              <p className="text-sm font-medium text-text-primary">{criterion.label}</p>
              <p className="mt-1 text-xs text-text-muted">{criterion.helper}</p>
            </div>
            <RatingScale
              value={scores[criterion.key]}
              onChange={(value) => onSetRating(criterion.key, value)}
              ariaLabel={criterion.label}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

function RatingScale({
  value,
  onChange,
  ariaLabel,
}: {
  value: number | undefined
  onChange: (next: number) => void
  ariaLabel: string
}) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((num) => {
        const active = value === num
        return (
          <button
            key={num}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(num)}
            className={cn(
              'inline-flex h-9 w-9 items-center justify-center rounded-pill border text-sm font-semibold transition-colors',
              active
                ? 'border-text-primary bg-text-primary text-white'
                : 'border-card-border bg-card text-text-muted hover:text-text-primary',
            )}
          >
            {num}
          </button>
        )
      })}
    </div>
  )
}
