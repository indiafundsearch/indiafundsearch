'use client'

import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  PRIMARY_CURRENCY,
  PRIMARY_LABELS,
  PRODUCT_MAP_POINTS,
  SUBCATEGORY_LABELS,
  type PrimaryCategory,
  type ProductMapPoint,
} from '@/lib/constants'
import { useMode } from '@/components/shared/SimpleProToggle'

const COLORS: Record<PrimaryCategory, string> = {
  PMS: '#b8960c',         // gold
  AIF: '#1d1d1f',         // text-primary
  'GIFT City': '#d97706', // warning amber
}

type ChartPoint = ProductMapPoint & {
  primary: PrimaryCategory
  displayLabel: string
  fill: string
}

export function ProductMapHero() {
  const router = useRouter()
  const { mode } = useMode()

  const series = useMemo(() => {
    const buckets: Record<PrimaryCategory, ChartPoint[]> = {
      PMS: [],
      AIF: [],
      'GIFT City': [],
    }
    for (const p of PRODUCT_MAP_POINTS) {
      buckets[p.primary].push({
        ...p,
        displayLabel: SUBCATEGORY_LABELS[p.subcategory]?.[mode] ?? p.subcategory,
        fill: COLORS[p.primary],
      })
    }
    return buckets
  }, [mode])

  const onPointClick = (point: ChartPoint) => {
    const params = new URLSearchParams({ cat: point.primary })
    router.push(`/explore?${params.toString()}`)
  }

  return (
    <section className="container-grid pt-12 pb-12 md:pt-20 md:pb-20">
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-widest text-gold">
          Where each product sits
        </p>
        <h1 className="mt-2">
          The Indian alternatives universe — at a glance.
        </h1>
        <p className="mt-4 max-w-prose text-base text-text-muted md:text-lg">
          Each dot is a product subcategory, plotted by typical return and the time you should commit. Hover to see what it is. Click to explore the funds in that bucket.
        </p>
      </div>

      <div className="mt-8 rounded-card border border-card-border bg-card p-4 shadow-card md:mt-10 md:p-6">
        <div className="h-[420px] w-full md:h-[480px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 12, right: 28, bottom: 36, left: 28 }}>
              <CartesianGrid stroke="rgba(0,0,0,0.06)" vertical={false} />
              <XAxis
                type="number"
                dataKey="expectedReturn"
                domain={[8, 28]}
                tick={{ fill: '#86868b', fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: 'rgba(0,0,0,0.08)' }}
                label={{
                  value: 'Typical return (% CAGR)',
                  position: 'insideBottom',
                  offset: -16,
                  fill: '#86868b',
                  fontSize: 11,
                  letterSpacing: '0.08em',
                }}
              />
              <YAxis
                type="number"
                dataKey="horizon"
                domain={[2, 9]}
                tick={{ fill: '#86868b', fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: 'rgba(0,0,0,0.08)' }}
                label={{
                  value: 'Horizon (years)',
                  angle: -90,
                  position: 'insideLeft',
                  fill: '#86868b',
                  fontSize: 11,
                  letterSpacing: '0.08em',
                }}
              />
              <Tooltip
                cursor={{ stroke: 'rgba(0,0,0,0.08)', strokeDasharray: '4 4' }}
                content={<CustomTooltip />}
              />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, paddingBottom: 12 }}
              />
              {(Object.entries(series) as [PrimaryCategory, ChartPoint[]][]).map(
                ([primary, points]) => (
                  <Scatter
                    key={primary}
                    name={`${PRIMARY_LABELS[primary][mode]}`}
                    data={points}
                    fill={COLORS[primary]}
                    onClick={(_, idx) => {
                      const point = points[idx]
                      if (point) onPointClick(point)
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                ),
              )}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-4 text-xs text-text-muted md:text-center">
          Numbers are typical-case orientations, not forecasts. Actual returns and lock-ups vary by fund.
        </p>
      </div>
    </section>
  )
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { payload: ChartPoint }[]
}) {
  if (!active || !payload?.[0]) return null
  const p = payload[0].payload
  const symbol = PRIMARY_CURRENCY[p.primary]
  return (
    <div className="max-w-[260px] rounded-card border border-card-border bg-card p-3 shadow-card-hover">
      <div className="flex items-center gap-1.5">
        <span
          aria-hidden
          className="inline-block h-2 w-2 rounded-pill"
          style={{ background: COLORS[p.primary] }}
        />
        <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
          {symbol} {p.primary}
        </p>
      </div>
      <p className="mt-1 text-sm font-semibold text-text-primary">{p.displayLabel}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-text-muted">{p.blurb}</p>
      <dl className="mt-3 grid grid-cols-3 gap-2 border-t border-card-border pt-2 text-[10px] uppercase tracking-wide text-text-muted">
        <div>
          <dt>Return</dt>
          <dd className="mt-0.5 text-sm font-semibold tabular-nums normal-case tracking-normal text-text-primary">
            ~{p.expectedReturn}%
          </dd>
        </div>
        <div>
          <dt>Horizon</dt>
          <dd className="mt-0.5 text-sm font-semibold tabular-nums normal-case tracking-normal text-text-primary">
            {p.horizon}y
          </dd>
        </div>
        <div>
          <dt>Min</dt>
          <dd className="mt-0.5 text-sm font-semibold tabular-nums normal-case tracking-normal text-text-primary">
            {p.minTicket}
          </dd>
        </div>
      </dl>
      <p className="mt-2 text-[10px] uppercase tracking-widest text-gold">Click to explore →</p>
    </div>
  )
}
