'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMode } from '@/components/shared/SimpleProToggle'
import { SUBCATEGORY_LABELS } from '@/lib/constants'
import { feeHeadlineFor, formatPercent, type FundCardData } from './fundDisplay'
import { formatMoney } from '@/lib/utils/formatCurrency'
import { StatusBadge } from './badges/StatusBadge'
import { RiskBadge } from './badges/RiskBadge'

type Props = {
  funds: FundCardData[]
  onRemove: (id: string) => void
  onClose: () => void
  onClearAll: () => void
}

/**
 * Side-by-side comparison of 2–3 funds. The shape comes straight from
 * the FundCardData already loaded by /explore — no additional fetch.
 */
export function CompareModal({ funds, onRemove, onClose, onClearAll }: Props) {
  const { mode } = useMode()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Compare funds"
      className="fixed inset-0 z-50 flex items-stretch justify-center bg-text-primary/40 p-0 md:items-center md:p-8"
      onClick={onClose}
    >
      <div
        className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden bg-card shadow-card-hover md:h-auto md:max-h-[90vh] md:rounded-card"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-card-border px-5 py-4 md:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Compare</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-text-primary md:text-xl">
              {funds.length} fund{funds.length === 1 ? '' : 's'} side by side
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClearAll}
              className="text-sm font-medium text-text-muted hover:text-text-primary"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close compare"
              className="inline-flex h-8 w-8 items-center justify-center rounded-button text-text-muted hover:bg-text-primary/5 hover:text-text-primary"
            >
              <X size={16} aria-hidden />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <div
            className={cn(
              'grid gap-px bg-card-border',
              funds.length === 2 ? 'grid-cols-2' : 'grid-cols-3',
            )}
          >
            {funds.map((fund) => (
              <FundColumn key={fund._id} fund={fund} mode={mode} onRemove={() => onRemove(fund._id)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FundColumn({
  fund,
  mode,
  onRemove,
}: {
  fund: FundCardData
  mode: 'simple' | 'pro'
  onRemove: () => void
}) {
  const subLabel = fund.subcategory ? SUBCATEGORY_LABELS[fund.subcategory]?.[mode] ?? fund.subcategory : null

  return (
    <div className="flex flex-col bg-card">
      <header className="flex items-start justify-between gap-3 border-b border-card-border p-5">
        <div>
          {subLabel ? (
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">{subLabel}</p>
          ) : null}
          <Link
            href={`/explore/${fund.slug}`}
            className="mt-1.5 block text-base font-semibold leading-tight text-text-primary hover:text-gold md:text-lg"
          >
            {fund.name}
          </Link>
          {fund.provider ? (
            <p className="mt-1 text-xs text-text-muted">{fund.provider}</p>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-1.5">
            <StatusBadge status={fund.status} />
            <RiskBadge level={fund.risk} />
          </div>
        </div>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${fund.name} from compare`}
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-button text-text-muted hover:bg-text-primary/5 hover:text-text-primary"
        >
          <X size={14} aria-hidden />
        </button>
      </header>

      <dl className="divide-y divide-card-border text-sm">
        <Row label="Manager" value={fund.fundManager} />
        <Row label="Min investment" value={fund.minInvestment ? formatMoney(fund.minInvestment, fund.currency, { compact: true }) : null} />
        <Row label="AUM" value={fund.aum ? formatMoney(fund.aum, fund.currency, { compact: true }) : null} />
        <Row label="Fee" value={feeHeadlineFor(fund.fees)} />
        <Row label="Hurdle" value={fund.fees?.hurdleRate != null ? `${fund.fees.hurdleRate}%` : null} />
        <Row label="Exit load" value={fund.fees?.exitLoad != null ? `${fund.fees.exitLoad}%` : null} />
        <Row label="1Y CAGR" value={fund.returns?.oneYear ? formatPercent(fund.returns.oneYear) : null} />
        <Row label="3Y CAGR" value={fund.returns?.threeYear ? formatPercent(fund.returns.threeYear) : null} />
        <Row label="5Y CAGR" value={fund.returns?.fiveYear ? formatPercent(fund.returns.fiveYear) : null} />
        <Row label="Inception" value={fund.inceptionDate ? new Date(fund.inceptionDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' }) : null} />
        <Row label="SEBI / IFSCA" value={fund.sebiRegistration} />
        <Row
          label="Tags"
          value={
            fund.tags && fund.tags.length > 0 ? (
              <span className="flex flex-wrap gap-1">
                {fund.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-pill bg-text-primary/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-text-muted"
                  >
                    {t}
                  </span>
                ))}
              </span>
            ) : null
          }
        />
      </dl>

      <div className="mt-auto border-t border-card-border p-5">
        <Link
          href={`/explore/${fund.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-text-primary hover:text-gold"
        >
          View full detail →
        </Link>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 px-5 py-3">
      <dt className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">{label}</dt>
      <dd className="text-right text-sm font-medium tabular-nums text-text-primary">
        {value || <span className="text-text-muted">—</span>}
      </dd>
    </div>
  )
}
