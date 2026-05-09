'use client'

import Link from 'next/link'
import { useMode } from '@/components/shared/SimpleProToggle'
import { formatMoney } from '@/lib/utils/formatCurrency'
import { cn } from '@/lib/utils'
import { SUBCATEGORY_LABELS } from '@/lib/constants'
import {
  feeHeadlineFor,
  formatPercent,
  type FundCardData,
} from './fundDisplay'
import { StatusBadge } from './badges/StatusBadge'
import { RiskBadge } from './badges/RiskBadge'
import { Tag } from './badges/Tag'

type Variant = 'preview' | 'detailed'

type Props = {
  fund: FundCardData
  variant?: Variant
  className?: string
  inCompare?: boolean
  onToggleCompare?: (id: string) => void
}

export type { FundCardData }

export function FundCard({
  fund,
  variant = 'preview',
  className,
  inCompare = false,
  onToggleCompare,
}: Props) {
  const { mode } = useMode()
  const description = mode === 'simple' ? fund.simpleDescription : fund.proDescription
  const feeHeadline = feeHeadlineFor(fund.fees)
  const returnLine = formatReturnLine(fund.returns)
  const tags = (fund.tags ?? []).slice(0, 2)

  return (
    <Link
      href={`/explore/${fund.slug}`}
      className={cn(
        'group flex h-full flex-col rounded-card border border-card-border bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover md:p-6',
        variant === 'preview' ? 'min-w-[280px] max-w-[320px]' : 'w-full',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        {fund.subcategory ? (
          <span className="text-[11px] font-semibold uppercase tracking-widest text-gold">
            {SUBCATEGORY_LABELS[fund.subcategory]?.[mode] ?? fund.subcategory}
          </span>
        ) : null}
        <StatusBadge status={fund.status} />
      </div>

      <h3 className="mt-2 text-base font-semibold leading-snug tracking-tight text-text-primary md:text-lg">
        {fund.name}
      </h3>
      {fund.provider || fund.fundManager ? (
        <p className="mt-1 text-xs text-text-muted">
          {fund.provider}
          {fund.provider && fund.fundManager ? ' · ' : ''}
          {fund.fundManager}
        </p>
      ) : null}

      {description ? (
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-text-muted">
          {description}
        </p>
      ) : null}

      <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-card-border pt-4 text-sm">
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Fee</dt>
          <dd className="mt-1 font-medium text-gold tabular-nums">{feeHeadline}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Returns</dt>
          <dd className="mt-1 font-medium text-text-primary tabular-nums">{returnLine}</dd>
        </div>
      </dl>

      {(fund.risk || tags.length > 0) ? (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <RiskBadge level={fund.risk} />
          {tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
      ) : null}

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-card-border pt-4">
        <span className="text-xs text-text-muted">
          {fund.minInvestment
            ? `Min ${formatMoney(fund.minInvestment, fund.currency, { compact: true })}`
            : ''}
        </span>
        <div className="flex items-center gap-3">
          {onToggleCompare ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onToggleCompare(fund._id)
              }}
              aria-pressed={inCompare}
              className={cn(
                'rounded-pill border px-2.5 py-1 text-xs font-medium transition-colors',
                inCompare
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-card-border bg-card text-text-muted hover:border-text-primary hover:text-text-primary',
              )}
            >
              {inCompare ? '✓ Comparing' : '+ Compare'}
            </button>
          ) : null}
          <span className="text-sm font-medium text-text-primary group-hover:text-gold">
            View details →
          </span>
        </div>
      </div>
    </Link>
  )
}

function formatReturnLine(returns: FundCardData['returns']): string {
  const parts: string[] = []
  if (returns?.threeYear) parts.push(`3Y ${formatPercent(returns.threeYear)}`)
  else if (returns?.oneYear) parts.push(`1Y ${formatPercent(returns.oneYear)}`)
  if (returns?.fiveYear) parts.push(`5Y ${formatPercent(returns.fiveYear)}`)
  return parts.length ? parts.join(' · ') : '—'
}
