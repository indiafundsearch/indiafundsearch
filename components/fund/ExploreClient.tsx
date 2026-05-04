'use client'

import { useMemo, useState } from 'react'
import { LayoutGrid, List } from 'lucide-react'
import { FundCard } from './FundCard'
import { FundRow } from './FundRow'
import { FundFilters, type PrimaryFilter } from './FundFilters'
import type { FundCardData } from './fundDisplay'
import { cn } from '@/lib/utils'

type View = 'grid' | 'list'

type Props = {
  funds: FundCardData[]
}

export function ExploreClient({ funds }: Props) {
  const [primary, setPrimary] = useState<PrimaryFilter>('All')
  const [subcategory, setSubcategory] = useState<string | null>(null)
  const [view, setView] = useState<View>('grid')

  const filtered = useMemo(
    () => funds.filter((fund) => matches(fund, primary, subcategory)),
    [funds, primary, subcategory],
  )

  return (
    <>
      <div className="flex flex-wrap items-end gap-4 border-b border-card-border pb-6">
        <div className="flex-1 min-w-0">
          <FundFilters
            primary={primary}
            subcategory={subcategory}
            onPrimaryChange={setPrimary}
            onSubcategoryChange={setSubcategory}
            resultCount={filtered.length}
          />
        </div>
        <ViewToggle view={view} onChange={setView} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : view === 'grid' ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((fund) => (
            <FundCard key={fund._id} fund={fund} variant="detailed" />
          ))}
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          {filtered.map((fund) => (
            <FundRow key={fund._id} fund={fund} />
          ))}
        </div>
      )}
    </>
  )
}

function matches(fund: FundCardData, primary: PrimaryFilter, subcategory: string | null): boolean {
  if (primary !== 'All') {
    const cat = fund.category ?? ''
    if (primary === 'AIF') {
      if (!cat.startsWith('AIF')) return false
    } else if (cat !== primary) {
      return false
    }
  }
  if (subcategory && fund.subcategory !== subcategory) return false
  return true
}

function ViewToggle({ view, onChange }: { view: View; onChange: (next: View) => void }) {
  return (
    <div
      role="group"
      aria-label="View"
      className="inline-flex items-center rounded-pill border border-card-border bg-card p-1 shadow-card"
    >
      <ToggleButton active={view === 'grid'} onClick={() => onChange('grid')} label="Grid view">
        <LayoutGrid size={16} />
      </ToggleButton>
      <ToggleButton active={view === 'list'} onClick={() => onChange('list')} label="List view">
        <List size={16} />
      </ToggleButton>
    </div>
  )
}

function ToggleButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean
  onClick: () => void
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'inline-flex h-8 w-9 items-center justify-center rounded-pill transition-colors',
        active ? 'bg-text-primary text-white' : 'text-text-muted hover:text-text-primary',
      )}
    >
      {children}
    </button>
  )
}

function EmptyState() {
  return (
    <div className="mt-12 rounded-card border border-dashed border-card-border bg-card p-10 text-center text-sm text-text-muted">
      No funds match these filters yet. Try widening the category, or clear the subcategory.
    </div>
  )
}
