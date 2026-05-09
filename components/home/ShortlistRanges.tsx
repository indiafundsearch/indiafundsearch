'use client'

import {
  GOAL_COLORS,
  PRIMARY_LABELS,
  SUBCATEGORY_LABELS,
  type ProductMapPoint,
  type ProductVariant,
} from '@/lib/constants'
import { useMode } from '@/components/shared/SimpleProToggle'

// Bar axis bounds, matching the chart's X-axis so users feel
// continuity between the chart and this drill-down.
const X_MIN = 8
const X_MAX = 28

type Props = {
  matched: ProductMapPoint[]
}

export function ShortlistRanges({ matched }: Props) {
  const { mode } = useMode()

  if (matched.length === 0) return null

  return (
    <div className="mt-4 rounded-card border border-card-border bg-card p-4 md:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted">
          Inside your shortlist
        </p>
        <p className="text-[10px] uppercase tracking-widest text-text-muted">
          Where each subcategory&rsquo;s flavors land
        </p>
      </div>

      <div className="mt-4 space-y-4">
        {matched.map((p) => {
          const range = computeRange(p.variants)
          const goalColor = GOAL_COLORS[p.goal]
          const subLabel = SUBCATEGORY_LABELS[p.subcategory]?.[mode] ?? p.subcategory
          return (
            <div key={`${p.primary}::${p.subcategory}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm font-medium text-text-primary">
                  {subLabel}
                  <span className="ml-2 text-[10px] uppercase tracking-widest text-text-muted">
                    {PRIMARY_LABELS[p.primary][mode]}
                  </span>
                </p>
                <p className="text-xs tabular-nums text-text-muted">
                  <span className="font-semibold text-text-primary">{range.min}%</span>
                  <span className="mx-1.5">—</span>
                  <span className="font-semibold text-text-primary">{range.max}%</span>
                </p>
              </div>

              <div className="relative mt-3 h-[3px] rounded-pill bg-card-border">
                {/* the colored span between min and max */}
                <div
                  className="absolute h-full rounded-pill"
                  style={{
                    left: `${pct(range.min)}%`,
                    width: `${pct(range.max) - pct(range.min)}%`,
                    background: `${goalColor}40`,
                  }}
                />
                {p.variants.map((v) => (
                  <div
                    key={v.name}
                    className="absolute -top-[5px] h-[13px] w-[13px] rounded-pill border-2 border-card"
                    style={{
                      left: `${pct(v.expectedReturn)}%`,
                      transform: 'translateX(-50%)',
                      background: goalColor,
                    }}
                    title={`${v.name} · ${v.expectedReturn}%`}
                  />
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-text-muted">
                {p.variants.map((v) => (
                  <span key={v.name}>
                    <span className="font-semibold tabular-nums text-text-primary">
                      {v.expectedReturn}%
                    </span>{' '}
                    {v.name}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function pct(value: number): number {
  return ((value - X_MIN) / (X_MAX - X_MIN)) * 100
}

function computeRange(variants: ProductVariant[]) {
  const rs = variants.map((v) => v.expectedReturn)
  return { min: Math.min(...rs), max: Math.max(...rs) }
}
