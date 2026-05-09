'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Trophy } from 'lucide-react'
import type { FundCardData } from '@/components/fund/fundDisplay'
import { formatPercent } from '@/components/fund/fundDisplay'
import { PRIMARY_LABELS, SUBCATEGORY_LABELS, type Mode } from '@/lib/constants'
import { useMode } from '@/components/shared/SimpleProToggle'
import { cn } from '@/lib/utils'

type Period = 'oneYear' | 'threeYear' | 'fiveYear' | 'sinceInception'
type Bucket = 'All' | 'PMS' | 'AIF' | 'GIFT City'

const PERIODS: { key: Period; label: string; metricLabel: string }[] = [
  { key: 'oneYear',         label: '1Y',              metricLabel: '1Y CAGR' },
  { key: 'threeYear',       label: '3Y',              metricLabel: '3Y CAGR' },
  { key: 'fiveYear',        label: '5Y',              metricLabel: '5Y CAGR' },
  { key: 'sinceInception',  label: 'Since inception', metricLabel: 'Since inception' },
]

const BUCKETS: Bucket[] = ['All', 'PMS', 'AIF', 'GIFT City']

type Props = {
  funds: FundCardData[]
  minAumCrore: number
}

export function LeaderboardClient({ funds, minAumCrore }: Props) {
  const { mode } = useMode()
  const [period, setPeriod] = useState<Period>('threeYear')
  const [bucket, setBucket] = useState<Bucket>('All')

  const ranked = useMemo(
    () => rank(funds, period, bucket).slice(0, 10),
    [funds, period, bucket],
  )

  const periodLabel = PERIODS.find((p) => p.key === period)?.metricLabel ?? '3Y CAGR'

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        <SegmentedControl
          options={PERIODS.map((p) => ({ value: p.key, label: p.label }))}
          value={period}
          onChange={(v) => setPeriod(v as Period)}
          ariaLabel="Time period"
        />
        <SegmentedControl
          options={BUCKETS.map((b) => ({ value: b, label: bucketShort(b, mode) }))}
          value={bucket}
          onChange={(v) => setBucket(v as Bucket)}
          ariaLabel="Bucket"
        />
      </div>

      <p className="mt-4 text-xs text-text-muted">
        Methodology: ranked by <strong className="text-text-primary">{periodLabel}</strong> · AUM ≥ ₹{minAumCrore} Cr · ties broken by AUM. Past performance is not a guarantee of future results.
      </p>

      {ranked.length === 0 ? (
        <p className="mt-8 rounded-card border border-dashed border-card-border bg-card p-8 text-center text-sm text-text-muted">
          No funds match this period yet — most funds need 3+ years of history before {periodLabel} is meaningful. Try Since inception, or widen the bucket.
        </p>
      ) : (
        <ol className="mt-6 divide-y divide-card-border rounded-card border border-card-border bg-card shadow-card">
          {ranked.map((row) => (
            <Row key={row.fund._id} row={row} mode={mode} />
          ))}
        </ol>
      )}
    </div>
  )
}

function Row({
  row,
  mode,
}: {
  row: { rank: number; fund: FundCardData; metric: number }
  mode: Mode
}) {
  const { rank, fund, metric } = row
  const sub = fund.subcategory ? SUBCATEGORY_LABELS[fund.subcategory]?.[mode] ?? fund.subcategory : null
  const cat = fund.category ?? ''
  const bucketLabel = cat === 'PMS'
    ? PRIMARY_LABELS.PMS[mode]
    : cat.startsWith('AIF')
      ? PRIMARY_LABELS.AIF[mode]
      : cat === 'GIFT City'
        ? PRIMARY_LABELS['GIFT City'][mode]
        : ''

  return (
    <li>
      <Link
        href={`/explore/${fund.slug}`}
        className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-text-primary/[0.02] md:px-5"
      >
        <RankBadge rank={rank} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-text-primary group-hover:text-gold">
            {fund.name}
          </p>
          <p className="truncate text-xs text-text-muted">
            {fund.provider}
            {bucketLabel ? <> · {bucketLabel}</> : null}
            {sub ? <> · {sub}</> : null}
          </p>
        </div>
        <div className="w-16 shrink-0 text-right">
          <p className="whitespace-nowrap text-base font-semibold tabular-nums text-text-primary">
            {formatPercent(metric)}
          </p>
        </div>
      </Link>
    </li>
  )
}

function RankBadge({ rank }: { rank: number }) {
  const isFirst = rank === 1
  const isPodium = rank <= 3
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums md:h-8 md:w-8',
        isFirst
          ? 'bg-gold text-white'
          : isPodium
            ? 'bg-text-primary text-white'
            : 'bg-text-primary/[0.06] text-text-primary',
      )}
    >
      {isFirst ? <Trophy size={12} /> : rank}
    </span>
  )
}

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
  ariaLabel: string
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex overflow-hidden rounded-button border border-card-border bg-card text-sm"
    >
      {options.map((o, i) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={cn(
            'px-3 py-2 font-medium transition-colors md:px-3.5',
            value === o.value
              ? 'bg-text-primary text-white'
              : 'text-text-muted hover:text-text-primary',
            i < options.length - 1 ? 'border-r border-card-border' : '',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function bucketShort(b: Bucket, mode: Mode): string {
  if (b === 'All') return 'All'
  if (mode === 'simple') {
    if (b === 'PMS') return 'Managed'
    if (b === 'AIF') return 'Alternatives'
    if (b === 'GIFT City') return 'NRI'
  }
  return b
}

function rank(
  funds: FundCardData[],
  period: Period,
  bucket: Bucket,
): { rank: number; fund: FundCardData; metric: number }[] {
  const inBucket = funds.filter((f) => {
    if (bucket === 'All') return true
    const cat = f.category ?? ''
    if (bucket === 'AIF') return cat.startsWith('AIF')
    if (bucket === 'GIFT City') return cat === 'GIFT City'
    return cat === bucket
  })

  const withMetric = inBucket
    .map((f) => {
      const v = f.returns?.[period]
      return typeof v === 'number' && v > 0 ? { fund: f, metric: v } : null
    })
    .filter(Boolean) as { fund: FundCardData; metric: number }[]

  withMetric.sort((a, b) => {
    if (b.metric !== a.metric) return b.metric - a.metric
    return (b.fund.aum ?? 0) - (a.fund.aum ?? 0)
  })

  return withMetric.map((r, i) => ({ rank: i + 1, ...r }))
}
