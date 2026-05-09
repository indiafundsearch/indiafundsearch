'use client'

import Link from 'next/link'
import { useMode } from '@/components/shared/SimpleProToggle'
import { formatINR } from '@/lib/utils/formatCurrency'
import { cn } from '@/lib/utils'
import { SUBCATEGORY_LABELS } from '@/lib/constants'
import {
  feeHeadlineFor,
  formatPercent,
  type FundCardData,
} from './fundDisplay'

type Props = {
  fund: FundCardData
  className?: string
}

export function FundRow({ fund, className }: Props) {
  const { mode } = useMode()
  const feeHeadline = feeHeadlineFor(fund.fees)

  return (
    <Link
      href={`/explore/${fund.slug}`}
      className={cn(
        'group grid grid-cols-1 gap-4 rounded-card border border-card-border bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover md:grid-cols-[2fr_1fr_1fr_1.2fr_0.8fr_auto] md:items-center md:px-6',
        className,
      )}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          {fund.subcategory ? (
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gold">
              {SUBCATEGORY_LABELS[fund.subcategory]?.[mode] ?? fund.subcategory}
            </span>
          ) : null}
          <StatusBadge status={fund.status} />
        </div>
        <p className="mt-1.5 truncate text-base font-semibold leading-tight text-text-primary">
          {fund.name}
        </p>
        {fund.provider || fund.fundManager ? (
          <p className="mt-0.5 truncate text-xs text-text-muted">
            {fund.provider}
            {fund.provider && fund.fundManager ? ' · ' : ''}
            {fund.fundManager}
          </p>
        ) : null}
      </div>

      <ReturnsCell label="3Y CAGR" value={fund.returns?.threeYear} />
      <ReturnsCell label="5Y CAGR" value={fund.returns?.fiveYear} />

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Fee</p>
        <p className="mt-1 text-sm font-medium text-gold tabular-nums">{feeHeadline}</p>
      </div>

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Min</p>
        <p className="mt-1 text-sm font-medium text-text-primary tabular-nums">
          {fund.minInvestment ? formatINR(fund.minInvestment, { compact: true }) : '—'}
        </p>
      </div>

      <span className="text-sm font-medium text-text-primary group-hover:text-gold">
        View →
      </span>
    </Link>
  )
}

function StatusBadge({ status }: { status?: string }) {
  if (!status) return null
  const palette =
    status === 'Active'
      ? 'bg-gold/10 text-gold'
      : status === 'Closed'
        ? 'bg-error/10 text-error'
        : 'bg-text-primary/5 text-text-muted'
  return (
    <span className={cn('rounded-pill px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide', palette)}>
      {status}
    </span>
  )
}

function ReturnsCell({ label, value }: { label: string; value?: number }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold tabular-nums text-text-primary">
        {formatPercent(value)}
      </p>
    </div>
  )
}
