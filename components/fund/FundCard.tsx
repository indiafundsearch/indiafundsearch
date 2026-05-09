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
import { ProviderLogo } from './ProviderLogo'
import { TagCounter } from './TagCounter'

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
  const subcategoryLabel = fund.subcategory
    ? SUBCATEGORY_LABELS[fund.subcategory]?.[mode] ?? fund.subcategory
    : null
  const extraTags = (fund.tags ?? []).slice(0, 6)

  return (
    <Link
      href={`/explore/${fund.slug}`}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-card border border-card-border bg-card shadow-card transition-shadow hover:shadow-card-hover',
        variant === 'preview' ? 'min-w-[280px] max-w-[320px]' : 'w-full',
        className,
      )}
    >
      {/* Dark header band — logo + category pill + extra-tag counter */}
      <div className="flex items-center justify-between gap-3 bg-text-primary px-4 py-3 md:px-5 md:py-4">
        <ProviderLogo src={fund.providerLogoUrl} provider={fund.provider} size={56} />
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          {subcategoryLabel ? (
            <span className="rounded-pill border border-gold/60 px-2.5 py-0.5 text-[11px] font-semibold tracking-tight text-gold">
              {subcategoryLabel}
            </span>
          ) : null}
          <TagCounter tags={extraTags} />
        </div>
      </div>

      {/* Body — existing content preserved */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          {subcategoryLabel ? (
            <span className="text-[11px] font-semibold uppercase tracking-widest text-gold">
              {subcategoryLabel}
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
