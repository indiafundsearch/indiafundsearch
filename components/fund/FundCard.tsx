'use client'

import Link from 'next/link'
import { useMode } from '@/components/shared/SimpleProToggle'
import { CATEGORY_LABELS, type FundCategory } from '@/lib/constants'
import { formatINR } from '@/lib/utils/formatCurrency'
import { cn } from '@/lib/utils'

export type FundCardData = {
  _id: string
  name: string
  slug: string
  provider?: string
  category?: FundCategory
  simpleCategoryName?: string
  returns?: { threeYear?: number; oneYear?: number; fiveYear?: number }
  fees?: { managementFee?: number; performanceFee?: number; hurdleRate?: number }
  minInvestment?: number
}

export function FundCard({ fund, className }: { fund: FundCardData; className?: string }) {
  const { mode } = useMode()
  const categoryLabel = labelFor(fund, mode)
  const feeHeadline = headlineFor(fund.fees)

  return (
    <Link
      href={`/explore/${fund.slug}`}
      className={cn(
        'group flex h-full min-w-[280px] max-w-[320px] flex-col rounded-card border border-card-border bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover',
        className,
      )}
    >
      {categoryLabel ? (
        <span className="inline-flex w-fit items-center rounded-pill bg-text-primary/5 px-2.5 py-1 text-xs font-medium text-text-primary">
          {categoryLabel}
        </span>
      ) : null}

      <h3 className="mt-3 text-lg font-semibold leading-tight text-text-primary">
        {fund.name}
      </h3>
      {fund.provider ? (
        <p className="mt-1 text-sm text-text-muted">{fund.provider}</p>
      ) : null}

      <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-card-border pt-4">
        <div>
          <dt className="text-xs uppercase tracking-wide text-text-muted">3Y CAGR</dt>
          <dd className="mt-1 text-base font-semibold tabular-nums text-text-primary">
            {fund.returns?.threeYear != null ? `${fund.returns.threeYear.toFixed(1)}%` : '—'}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-text-muted">Fees</dt>
          <dd className="mt-1 text-base font-medium text-text-primary">{feeHeadline}</dd>
        </div>
      </dl>

      {fund.minInvestment ? (
        <p className="mt-4 text-xs text-text-muted">
          Min. investment {formatINR(fund.minInvestment, { compact: true })}
        </p>
      ) : null}

      <span className="mt-auto pt-5 text-sm font-medium text-text-primary group-hover:text-gold">
        View details →
      </span>
    </Link>
  )
}

function labelFor(fund: FundCardData, mode: 'simple' | 'pro') {
  if (mode === 'simple' && fund.simpleCategoryName) return fund.simpleCategoryName
  if (fund.category) {
    const map = CATEGORY_LABELS[fund.category]
    if (map) return mode === 'simple' ? map.simple : map.pro
    return fund.category
  }
  return ''
}

function headlineFor(fees?: FundCardData['fees']): string {
  if (!fees) return '—'
  const parts: string[] = []
  if (fees.managementFee != null) parts.push(`${fees.managementFee}% mgmt`)
  if (fees.performanceFee != null && fees.performanceFee > 0) {
    parts.push(`${fees.performanceFee}% perf`)
  }
  return parts.length ? parts.join(' + ') : '—'
}
