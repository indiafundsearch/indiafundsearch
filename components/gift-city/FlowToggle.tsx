'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { GIFT_CITY, type GiftCityFlow } from '@/lib/giftCity'

const ROWS: { key: keyof typeof GIFT_CITY.flows.inbound; label: string }[] = [
  { key: 'investor', label: 'Primary investor' },
  { key: 'currency', label: 'Currency' },
  { key: 'taxNRI', label: 'Tax — non-resident' },
  { key: 'taxResident', label: 'Tax — resident Indian' },
  { key: 'route', label: 'Regulatory route' },
]

export function FlowToggle() {
  const [flow, setFlow] = useState<GiftCityFlow>('inbound')
  const F = GIFT_CITY.flows[flow]

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">Two flows</p>
          <h2 className="mt-3">Capital coming in. Capital going out.</h2>
          <p className="mt-3 max-w-prose text-base text-text-muted">
            GIFT City enables two fundamentally different capital flows — each serving a distinct
            client need, each with its own tax treatment and product set.
          </p>
        </div>
        <div
          role="tablist"
          aria-label="Capital flow direction"
          className="inline-flex rounded-pill border border-card-border bg-card p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={flow === 'inbound'}
            onClick={() => setFlow('inbound')}
            className={cn(
              'rounded-pill px-4 py-1.5 text-xs font-medium transition-colors',
              flow === 'inbound'
                ? 'bg-text-primary text-card'
                : 'text-text-muted hover:text-text-primary',
            )}
          >
            Inbound · NRIs into India
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={flow === 'outbound'}
            onClick={() => setFlow('outbound')}
            className={cn(
              'rounded-pill px-4 py-1.5 text-xs font-medium transition-colors',
              flow === 'outbound'
                ? 'bg-text-primary text-card'
                : 'text-text-muted hover:text-text-primary',
            )}
          >
            Outbound · Indians going global
          </button>
        </div>
      </div>

      <div className="rounded-card border border-card-border bg-card p-6 shadow-card md:p-10">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-12">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">
              {flow === 'inbound' ? 'Inbound' : 'Outbound'} · {F.direction}
            </p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-text-primary md:text-3xl">
              {F.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-text-muted">{F.sub}</p>
            <div className="mt-6 rounded-md border border-gold/30 bg-gold/5 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">
                Example fund
              </p>
              <p className="mt-1.5 text-sm font-medium leading-snug text-text-primary">
                {F.example}
              </p>
            </div>
          </div>

          <dl className="divide-y divide-card-border">
            {ROWS.map((r) => (
              <div
                key={r.key}
                className="grid grid-cols-1 gap-2 py-3.5 text-sm md:grid-cols-[150px_1fr] md:gap-4"
              >
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-text-muted">
                  {r.label}
                </dt>
                <dd className="leading-relaxed text-text-primary">{F[r.key]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
