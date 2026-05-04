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

type Variant = 'preview' | 'detailed'

type Props = {
  fund: FundCardData
  variant?: Variant
  className?: string
}

export type { FundCardData }

export function FundCard({ fund, variant = 'preview', className }: Props) {
  const { mode } = useMode()
  const categoryLabel = categoryLabelFor(fund, mode)
  const feeHeadline = feeHeadlineFor(fund.fees)

  return (
    <Link
      href={`/explore/${fund.slug}`}
      className={cn(
        'group flex h-full flex-col rounded-card border border-card-border bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover',
        variant === 'preview' ? 'min-w-[280px] max-w-[320px]' : 'w-full',
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

      {variant === 'preview' ? (
        <PreviewBody fund={fund} feeHeadline={feeHeadline} />
      ) : (
        <DetailedBody fund={fund} feeHeadline={feeHeadline} />
      )}

      <span className="mt-auto pt-5 text-sm font-medium text-text-primary group-hover:text-gold">
        View details →
      </span>
    </Link>
  )
}

function PreviewBody({
  fund,
  feeHeadline,
}: {
  fund: FundCardData
  feeHeadline: string
}) {
  return (
    <>
      <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-card-border pt-4">
        <div>
          <dt className="text-xs uppercase tracking-wide text-text-muted">3Y CAGR</dt>
          <dd className="mt-1 text-base font-semibold tabular-nums text-text-primary">
            {formatPercent(fund.returns?.threeYear)}
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
    </>
  )
}

function DetailedBody({
  fund,
  feeHeadline,
}: {
  fund: FundCardData
  feeHeadline: string
}) {
  return (
    <>
      <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-card-border pt-4 text-center">
        <ReturnCell label="1Y" value={fund.returns?.oneYear} />
        <ReturnCell label="3Y" value={fund.returns?.threeYear} />
        <ReturnCell label="5Y" value={fund.returns?.fiveYear} />
      </dl>

      <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-card-border pt-4">
        <div>
          <dt className="text-xs uppercase tracking-wide text-text-muted">Fees</dt>
          <dd className="mt-1 text-sm font-medium text-text-primary">{feeHeadline}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-text-muted">Min. invest</dt>
          <dd className="mt-1 text-sm font-medium text-text-primary">
            {fund.minInvestment ? formatINR(fund.minInvestment, { compact: true }) : '—'}
          </dd>
        </div>
      </dl>
    </>
  )
}

function ReturnCell({ label, value }: { label: string; value?: number }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-text-muted">{label}</dt>
      <dd className="mt-1 text-base font-semibold tabular-nums text-text-primary">
        {formatPercent(value)}
      </dd>
    </div>
  )
}
