'use client'

import { PRIMARY_CATEGORIES, SUBCATEGORIES } from '@/lib/constants'
import { cn } from '@/lib/utils'

export type PrimaryFilter = (typeof PRIMARY_CATEGORIES)[number] | 'All'

type Props = {
  primary: PrimaryFilter
  subcategory: string | null
  onPrimaryChange: (next: PrimaryFilter) => void
  onSubcategoryChange: (next: string | null) => void
  resultCount?: number
}

const PRIMARY_OPTIONS: PrimaryFilter[] = ['All', 'PMS', 'AIF', 'SIF']

export function FundFilters({
  primary,
  subcategory,
  onPrimaryChange,
  onSubcategoryChange,
  resultCount,
}: Props) {
  const subList = primary === 'All' ? null : SUBCATEGORIES[primary]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {PRIMARY_OPTIONS.map((option) => (
          <FilterChip
            key={option}
            active={primary === option}
            onClick={() => {
              onPrimaryChange(option)
              onSubcategoryChange(null)
            }}
          >
            {option}
          </FilterChip>
        ))}
        {resultCount != null ? (
          <span className="ml-auto text-sm text-text-muted">
            {resultCount} {resultCount === 1 ? 'fund' : 'funds'}
          </span>
        ) : null}
      </div>

      {subList ? (
        <div className="flex flex-wrap items-center gap-2 border-t border-card-border pt-4">
          <FilterChip
            small
            active={subcategory === null}
            onClick={() => onSubcategoryChange(null)}
          >
            All {primary}
          </FilterChip>
          {subList.map((option) => (
            <FilterChip
              key={option}
              small
              active={subcategory === option}
              onClick={() => onSubcategoryChange(option)}
            >
              {option}
            </FilterChip>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
  small = false,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  small?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-pill border font-medium transition-colors',
        small ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm',
        active
          ? 'border-text-primary bg-text-primary text-white'
          : 'border-card-border bg-card text-text-muted hover:text-text-primary',
      )}
    >
      {children}
    </button>
  )
}
