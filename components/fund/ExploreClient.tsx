'use client'

import { useMemo, useState } from 'react'
import { LayoutGrid, List, Search, SlidersHorizontal, X, Info } from 'lucide-react'
import { FundCard } from './FundCard'
import { FundRow } from './FundRow'
import type { PrimaryFilter } from './FundFilters'
import type { FundCardData } from './fundDisplay'
import {
  FUND_SORTS,
  PRIMARY_CURRENCY,
  PRIMARY_LABELS,
  RISK_LEVELS,
  SUB_INFO,
  SUBCATEGORIES,
  SUBCATEGORY_LABELS,
  type FundSort,
  type Mode,
  type PrimaryCategory,
} from '@/lib/constants'
import { useMode } from '@/components/shared/SimpleProToggle'
import { cn } from '@/lib/utils'

type View = 'grid' | 'list'
type Status = 'All' | 'Active' | 'Upcoming' | 'Closed'

type Props = {
  funds: FundCardData[]
  initialPrimary?: PrimaryFilter
}

export function ExploreClient({ funds, initialPrimary = 'All' }: Props) {
  const { mode } = useMode()
  const [primary, setPrimary] = useState<PrimaryFilter>(initialPrimary)
  const [subcategory, setSubcategory] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('All')
  const [sort, setSort] = useState<FundSort>('default')
  const [view, setView] = useState<View>('grid')
  const [query, setQuery] = useState('')
  const [showAdv, setShowAdv] = useState(false)
  const [vintageMin, setVintageMin] = useState(2000)
  const [minAUM, setMinAUM] = useState(0)
  const [risk, setRisk] = useState<string>('All')

  const counts = useMemo(() => countByPrimary(funds), [funds])
  const subCounts = useMemo(
    () => countBySubcategory(funds, primary),
    [funds, primary],
  )

  const filtered = useMemo(() => {
    return sortFunds(
      funds.filter((fund) =>
        matches(fund, { primary, subcategory, status, query, vintageMin, minAUM, risk }),
      ),
      sort,
    )
  }, [funds, primary, subcategory, status, query, vintageMin, minAUM, risk, sort])

  const activeAdv = [
    risk !== 'All' ? `Risk: ${risk}` : null,
    vintageMin > 2000 ? `Vintage: ${vintageMin}+` : null,
    minAUM > 0 ? `AUM ≥ ₹${minAUM} Cr` : null,
  ].filter(Boolean) as string[]

  const clearAdv = () => {
    setRisk('All')
    setVintageMin(2000)
    setMinAUM(0)
  }

  return (
    <>
      <div className="space-y-4">
        <PrimaryPills primary={primary} counts={counts} mode={mode} onChange={(p) => { setPrimary(p); setSubcategory(null) }} />

        {primary !== 'All' ? (
          <SubcategoryPills
            primary={primary}
            active={subcategory}
            counts={subCounts}
            mode={mode}
            onChange={setSubcategory}
          />
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <SearchInput value={query} onChange={setQuery} />
          <StatusToggle value={status} onChange={setStatus} />
          <SortDropdown value={sort} onChange={setSort} />
          <AdvancedFiltersButton
            active={showAdv}
            count={activeAdv.length}
            onClick={() => setShowAdv((s) => !s)}
          />
          <ViewToggle view={view} onChange={setView} />
        </div>

        {showAdv ? (
          <AdvancedDrawer
            risk={risk}
            vintageMin={vintageMin}
            minAUM={minAUM}
            onRisk={setRisk}
            onVintage={setVintageMin}
            onMinAUM={setMinAUM}
            activeFilters={activeAdv}
            onClear={clearAdv}
          />
        ) : null}
      </div>

      {subcategory && SUB_INFO[subcategory] ? (
        <EducationalBanner text={SUB_INFO[subcategory][mode]} />
      ) : null}

      <ResultLine
        count={filtered.length}
        primary={primary}
        subcategory={subcategory}
        sort={sort}
        mode={mode}
      />

      {filtered.length === 0 ? (
        <EmptyState />
      ) : view === 'grid' ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((fund) => (
            <FundCard key={fund._id} fund={fund} variant="detailed" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((fund) => (
            <FundRow key={fund._id} fund={fund} />
          ))}
        </div>
      )}
    </>
  )
}

function matches(
  fund: FundCardData,
  f: {
    primary: PrimaryFilter
    subcategory: string | null
    status: Status
    query: string
    vintageMin: number
    minAUM: number
    risk: string
  },
): boolean {
  const cat = fund.category ?? ''
  if (f.primary !== 'All') {
    if (f.primary === 'AIF') {
      if (!cat.startsWith('AIF')) return false
    } else if (f.primary === 'GIFT City') {
      if (cat !== 'GIFT City') return false
    } else if (cat !== f.primary) {
      return false
    }
  }
  if (f.subcategory && fund.subcategory !== f.subcategory) return false
  if (f.status !== 'All' && fund.status !== f.status) return false
  if (f.risk !== 'All' && fund.risk !== f.risk) return false

  if (f.vintageMin > 2000 && fund.inceptionDate) {
    const year = new Date(fund.inceptionDate).getFullYear()
    if (Number.isFinite(year) && year < f.vintageMin) return false
  }
  if (f.minAUM > 0 && (fund.aum ?? 0) < f.minAUM) return false

  if (f.query) {
    const q = f.query.toLowerCase().trim()
    if (!q) return true
    const hay = [fund.name, fund.provider, fund.fundManager, fund.subcategory]
      .filter(Boolean)
      .map((s) => String(s).toLowerCase())
    if (!hay.some((s) => s.includes(q))) return false
  }
  return true
}

function sortFunds(list: FundCardData[], sort: FundSort): FundCardData[] {
  if (sort === 'default') return list
  const out = [...list]
  switch (sort) {
    case 'returns':
      out.sort((a, b) => bestReturn(b) - bestReturn(a))
      break
    case 'aum':
      out.sort((a, b) => (b.aum ?? 0) - (a.aum ?? 0))
      break
    case 'vintage_new':
      out.sort((a, b) => vintage(b) - vintage(a))
      break
    case 'vintage_old':
      out.sort((a, b) => (vintage(a) || 9999) - (vintage(b) || 9999))
      break
    case 'name':
      out.sort((a, b) => a.name.localeCompare(b.name))
      break
  }
  return out
}

function bestReturn(f: FundCardData): number {
  return Math.max(
    f.returns?.oneYear ?? 0,
    f.returns?.threeYear ?? 0,
    f.returns?.fiveYear ?? 0,
  )
}

function vintage(f: FundCardData): number {
  if (!f.inceptionDate) return 0
  const y = new Date(f.inceptionDate).getFullYear()
  return Number.isFinite(y) ? y : 0
}

function countByPrimary(funds: FundCardData[]): Record<string, number> {
  const out: Record<string, number> = { All: funds.length, PMS: 0, AIF: 0, 'GIFT City': 0 }
  for (const f of funds) {
    const c = f.category ?? ''
    if (c === 'PMS') out.PMS += 1
    else if (c.startsWith('AIF')) out.AIF += 1
    else if (c === 'GIFT City') out['GIFT City'] += 1
  }
  return out
}

function countBySubcategory(
  funds: FundCardData[],
  primary: PrimaryFilter,
): Record<string, number> {
  const subs = primary !== 'All' ? SUBCATEGORIES[primary as PrimaryCategory] ?? [] : []
  const total = funds.filter((f) => {
    if (primary === 'All') return true
    if (primary === 'AIF') return (f.category ?? '').startsWith('AIF')
    return f.category === primary
  }).length
  const out: Record<string, number> = { All: total }
  for (const s of subs) out[s] = funds.filter((f) => f.subcategory === s).length
  return out
}

// ── Sub-components ────────────────────────────────────────────────────────

function PrimaryPills({
  primary,
  counts,
  mode,
  onChange,
}: {
  primary: PrimaryFilter
  counts: Record<string, number>
  mode: Mode
  onChange: (p: PrimaryFilter) => void
}) {
  const opts: PrimaryFilter[] = ['All', 'PMS', 'AIF', 'GIFT City']
  return (
    <div className="flex flex-wrap items-center gap-2">
      {opts.map((opt) => {
        const symbol = opt !== 'All' ? PRIMARY_CURRENCY[opt as PrimaryCategory] : null
        return (
          <Pill key={opt} active={primary === opt} onClick={() => onChange(opt)}>
            {symbol ? (
              <span aria-hidden className="mr-1 opacity-50">
                {symbol}
              </span>
            ) : null}
            {PRIMARY_LABELS[opt][mode]} <Count>{counts[opt] ?? 0}</Count>
          </Pill>
        )
      })}
    </div>
  )
}

function SubcategoryPills({
  primary,
  active,
  counts,
  mode,
  onChange,
}: {
  primary: Exclude<PrimaryFilter, 'All'>
  active: string | null
  counts: Record<string, number>
  mode: Mode
  onChange: (next: string | null) => void
}) {
  const subs = SUBCATEGORIES[primary as PrimaryCategory] ?? []
  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-card-border pt-4">
      <SmallPill active={active === null} gold onClick={() => onChange(null)}>
        All sub-categories <Count>{counts.All ?? 0}</Count>
      </SmallPill>
      {subs.map((sub) => (
        <SmallPill
          key={sub}
          gold
          active={active === sub}
          onClick={() => onChange(sub)}
        >
          {SUBCATEGORY_LABELS[sub]?.[mode] ?? sub} <Count>{counts[sub] ?? 0}</Count>
        </SmallPill>
      ))}
    </div>
  )
}

function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex min-w-[220px] flex-1 items-center gap-2 rounded-button border border-card-border bg-card px-3 py-2.5">
      <Search size={14} aria-hidden className="text-text-muted" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search fund, provider, manager…"
        className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="text-text-muted hover:text-text-primary"
        >
          <X size={14} aria-hidden />
        </button>
      ) : null}
    </label>
  )
}

function StatusToggle({ value, onChange }: { value: Status; onChange: (s: Status) => void }) {
  const options: { k: Status; label: string }[] = [
    { k: 'All', label: 'All' },
    { k: 'Active', label: 'Active' },
    { k: 'Upcoming', label: 'Upcoming' },
    { k: 'Closed', label: 'Closed' },
  ]
  return (
    <div
      role="group"
      aria-label="Status"
      className="inline-flex overflow-hidden rounded-button border border-card-border bg-card text-sm"
    >
      {options.map((o, i) => (
        <button
          key={o.k}
          type="button"
          aria-pressed={value === o.k}
          onClick={() => onChange(o.k)}
          className={cn(
            'px-3 py-2 font-medium transition-colors',
            value === o.k ? 'bg-text-primary text-white' : 'text-text-muted hover:text-text-primary',
            i < options.length - 1 ? 'border-r border-card-border' : '',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function SortDropdown({ value, onChange }: { value: FundSort; onChange: (s: FundSort) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as FundSort)}
      aria-label="Sort"
      className="rounded-button border border-card-border bg-card px-3 py-2.5 text-sm text-text-primary focus:outline-none"
    >
      {FUND_SORTS.map((s) => (
        <option key={s.value} value={s.value}>
          Sort: {s.label}
        </option>
      ))}
    </select>
  )
}

function AdvancedFiltersButton({
  active,
  count,
  onClick,
}: {
  active: boolean
  count: number
  onClick: () => void
}) {
  const highlighted = active || count > 0
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 rounded-button border px-3 py-2.5 text-sm font-medium transition-colors',
        highlighted
          ? 'border-gold bg-gold/10 text-gold'
          : 'border-card-border bg-card text-text-primary hover:border-text-primary',
      )}
    >
      <SlidersHorizontal size={14} aria-hidden />
      Filters
      {count > 0 ? (
        <span className="rounded-pill bg-gold px-1.5 py-0.5 text-[10px] font-semibold text-white">
          {count}
        </span>
      ) : null}
    </button>
  )
}

function ViewToggle({ view, onChange }: { view: View; onChange: (v: View) => void }) {
  return (
    <div
      role="group"
      aria-label="View"
      className="inline-flex items-center rounded-button border border-card-border bg-card p-1"
    >
      <ViewButton active={view === 'grid'} onClick={() => onChange('grid')} label="Grid view">
        <LayoutGrid size={14} />
      </ViewButton>
      <ViewButton active={view === 'list'} onClick={() => onChange('list')} label="List view">
        <List size={14} />
      </ViewButton>
    </div>
  )
}

function ViewButton({
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
        'inline-flex h-7 w-8 items-center justify-center rounded-button transition-colors',
        active ? 'bg-text-primary text-white' : 'text-text-muted hover:text-text-primary',
      )}
    >
      {children}
    </button>
  )
}

function AdvancedDrawer({
  risk,
  vintageMin,
  minAUM,
  onRisk,
  onVintage,
  onMinAUM,
  activeFilters,
  onClear,
}: {
  risk: string
  vintageMin: number
  minAUM: number
  onRisk: (r: string) => void
  onVintage: (v: number) => void
  onMinAUM: (v: number) => void
  activeFilters: string[]
  onClear: () => void
}) {
  return (
    <div className="rounded-card border border-card-border bg-card p-5 shadow-card md:p-6">
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest text-text-muted">
            Risk level
          </label>
          <select
            value={risk}
            onChange={(e) => onRisk(e.target.value)}
            className="mt-2 w-full rounded-button border border-card-border bg-background px-3 py-2 text-sm text-text-primary focus:outline-none"
          >
            <option value="All">All risk levels</option>
            {RISK_LEVELS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest text-text-muted">
            Vintage from <span className="text-gold">{vintageMin}</span>
          </label>
          <input
            type="range"
            min={2000}
            max={2026}
            value={vintageMin}
            onChange={(e) => onVintage(parseInt(e.target.value))}
            className="mt-3 w-full accent-gold"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest text-text-muted">
            Min AUM <span className="text-gold">{minAUM > 0 ? `₹${minAUM.toLocaleString('en-IN')} Cr` : 'Any'}</span>
          </label>
          <input
            type="range"
            min={0}
            max={20000}
            step={500}
            value={minAUM}
            onChange={(e) => onMinAUM(parseInt(e.target.value))}
            className="mt-3 w-full accent-gold"
          />
        </div>
      </div>
      {activeFilters.length > 0 ? (
        <div className="mt-5 flex items-center justify-between border-t border-card-border pt-4">
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((f) => (
              <span
                key={f}
                className="rounded-pill bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-gold"
              >
                {f}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-medium text-text-muted hover:text-text-primary"
          >
            Clear filters
          </button>
        </div>
      ) : null}
    </div>
  )
}

function EducationalBanner({ text }: { text: string }) {
  return (
    <div className="mt-6 flex items-start gap-3 rounded-card border border-gold/30 bg-gold/5 p-4 text-sm text-text-primary md:p-5">
      <Info size={16} aria-hidden className="mt-0.5 shrink-0 text-gold" />
      <p className="leading-relaxed">{text}</p>
    </div>
  )
}

function ResultLine({
  count,
  primary,
  subcategory,
  sort,
  mode,
}: {
  count: number
  primary: PrimaryFilter
  subcategory: string | null
  sort: FundSort
  mode: Mode
}) {
  const sortLabel = FUND_SORTS.find((s) => s.value === sort)?.label
  const subLabel = subcategory ? SUBCATEGORY_LABELS[subcategory]?.[mode] ?? subcategory : null
  const primaryLabel = primary !== 'All' ? PRIMARY_LABELS[primary][mode] : null
  return (
    <div className="mt-6 mb-3 flex flex-wrap items-baseline gap-x-2 text-sm text-text-muted">
      <span>
        <strong className="text-text-primary tabular-nums">{count}</strong> {count === 1 ? 'fund' : 'funds'}
      </span>
      {subLabel ? (
        <span>
          in <strong className="text-text-primary">{subLabel}</strong>
        </span>
      ) : primaryLabel ? (
        <span>
          in <strong className="text-text-primary">{primaryLabel}</strong>
        </span>
      ) : null}
      {sort !== 'default' && sortLabel ? (
        <span>
          · sorted by <strong className="text-text-primary">{sortLabel}</strong>
        </span>
      ) : null}
    </div>
  )
}

function Pill({
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
        'rounded-pill border px-4 py-2 text-sm font-medium transition-colors',
        active
          ? 'border-text-primary bg-text-primary text-white'
          : 'border-card-border bg-card text-text-muted hover:border-text-primary hover:text-text-primary',
      )}
    >
      {children}
    </button>
  )
}

function SmallPill({
  active,
  onClick,
  children,
  gold = false,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  gold?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-pill border px-3 py-1 text-xs font-medium transition-colors',
        active
          ? gold
            ? 'border-gold bg-gold/10 text-gold'
            : 'border-text-primary bg-text-primary text-white'
          : 'border-card-border bg-card text-text-muted hover:border-text-primary hover:text-text-primary',
      )}
    >
      {children}
    </button>
  )
}

function Count({ children }: { children: React.ReactNode }) {
  return <span className="ml-1 opacity-60 tabular-nums">{children}</span>
}

function EmptyState() {
  return (
    <div className="mt-10 rounded-card border border-dashed border-card-border bg-card p-10 text-center text-sm text-text-muted">
      No funds match these filters yet. Try widening the category or clearing the search.
    </div>
  )
}
