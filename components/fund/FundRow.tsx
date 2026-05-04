'use client'

import Link from 'next/link'
import { useMode } from '@/components/shared/SimpleProToggle'
import { formatINR } from '@/lib/utils/formatCurrency'
import { cn } from '@/lib/utils'
import {
  categoryLabelFor,
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
  const categoryLabel = categoryLabelFor(fund, mode)
  const feeHeadline = feeHeadlineFor(fund.fees)

  return (
    <Link
      href={`/explore/${fund.slug}`}
      className={cn(
        'group grid grid-cols-1 gap-4 rounded-card border border-card-border bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover md:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] md:items-center',
        className,
      )}
    >
      <div className="min-w-0">
        {categoryLabel ? (
          <span className="inline-flex w-fit items-center rounded-pill bg-text-primary/5 px-2.5 py-1 text-xs font-medium text-text-primary">
            {categoryLabel}
          </span>
        ) : null}
        <p className="mt-2 truncate text-base font-semibold leading-tight text-text-primary">
          {fund.name}
        </p>
        {fund.provider ? (
          <p className="mt-0.5 truncate text-xs text-text-muted">{fund.provider}</p>
        ) : null}
      </div>

      <ReturnsCell label="1Y" value={fund.returns?.oneYear} />
      <ReturnsCell label="3Y" value={fund.returns?.threeYear} />
      <ReturnsCell label="5Y" value={fund.returns?.fiveYear} />

      <div>
        <p className="text-xs uppercase tracking-wide text-text-muted">Fees</p>
        <p className="mt-1 text-sm font-medium text-text-primary">{feeHeadline}</p>
      </div>

      <div className="text-right">
        <p className="text-xs uppercase tracking-wide text-text-muted">Min. invest</p>
        <p className="mt-1 text-sm font-medium text-text-primary">
          {fund.minInvestment ? formatINR(fund.minInvestment, { compact: true }) : '—'}
        </p>
      </div>
    </Link>
  )
}

function ReturnsCell({ label, value }: { label: string; value?: number }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-text-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold tabular-nums text-text-primary">
        {formatPercent(value)}
      </p>
    </div>
  )
}
