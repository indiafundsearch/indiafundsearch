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
  const subcategoryLabel = fund.subcategory
    ? SUBCATEGORY_LABELS[fund.subcategory]?.[mode] ?? fund.subcategory
    : null
  const allTags = fund.tags ?? []
  // Show up to 2 tags inline in the banner; rest collapse into the +N counter.
  const inlineTags = allTags.slice(0, 2)
  const overflowTags = allTags.slice(2)
  // Active is the default state — only surface non-default statuses to keep the banner tidy.
  const showStatus = !!fund.status && fund.status !== 'Active'

  return (
    <Link
      href={`/explore/${fund.slug}`}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-card border border-card-border bg-card shadow-card transition-shadow hover:shadow-card-hover',
        variant === 'preview' ? 'min-w-[280px] max-w-[320px]' : 'w-full',
        className,
      )}
    >
      {/* Dark header band — logo + every category/tag pill */}
      <div className="flex items-start justify-between gap-3 bg-text-primary px-4 py-3 md:px-5 md:py-4">
        <ProviderLogo src={fund.providerLogoUrl} provider={fund.provider} size={56} />
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          {subcategoryLabel ? (
            <span className="rounded-pill border border-gold/60 px-2.5 py-0.5 text-[11px] font-semibold tracking-tight text-gold">
              {subcategoryLabel}
            </span>
          ) : null}
          {showStatus ? <StatusBadge status={fund.status} /> : null}
          <RiskBadge level={fund.risk} />
          {inlineTags.map((t) => (
            <Tag key={t} label={t} variant="dark" />
          ))}
          <TagCounter tags={overflowTags} />
        </div>
      </div>

      {/* Body — content only: name, description, fee/returns, footer */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="text-base font-semibold leading-snug tracking-tight text-text-primary md:text-lg">
          {fund.name}
        </h3>

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
