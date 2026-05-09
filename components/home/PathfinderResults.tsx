'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  PRIMARY_LABELS,
  SUBCATEGORY_LABELS,
  type ProductMapPoint,
} from '@/lib/constants'
import { useMode } from '@/components/shared/SimpleProToggle'
import { buildExploreHref } from '@/lib/pathfinder'
import { ShortlistRanges } from './ShortlistRanges'

type Props = {
  matched: ProductMapPoint[]
  totalCount: number
  active: boolean
  onChipClick?: (p: ProductMapPoint) => void
}

export function PathfinderResults({ matched, totalCount, active, onChipClick }: Props) {
  const { mode } = useMode()

  if (!active) return null

  if (matched.length === 0) {
    return (
      <div
        key="empty"
        className="animate-pf-fade rounded-card border border-card-border bg-card p-4 md:p-5"
      >
        <p className="text-[11px] font-semibold uppercase tracking-widest text-error">
          Nothing fits all your answers
        </p>
        <p className="mt-1 text-sm text-text-primary">
          Loosen one constraint — risk, lock-in, cashflow, or budget — to widen the shortlist.
        </p>
      </div>
    )
  }

  const href = buildExploreHref(matched)

  return (
    <div key={matched.length} className="animate-pf-fade">
      <div className="rounded-card border border-card-border bg-card p-4 shadow-card md:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted">
              Your shortlist
            </p>
            <p className="mt-0.5 leading-none">
              <span className="text-3xl font-semibold tabular-nums text-gold md:text-4xl">
                {matched.length}
              </span>
              <span className="ml-1.5 text-sm text-text-muted">
                of {totalCount} fit
              </span>
            </p>
          </div>
          <Link
            href={href}
            className="rounded-pill bg-text-primary px-4 py-2 text-xs font-medium text-card transition-colors hover:bg-gold"
          >
            View matching funds →
          </Link>
        </div>

        <div className="mt-3 -mx-1 overflow-x-auto">
          <div className="flex min-w-min items-center gap-1.5 px-1 pb-1 md:flex-wrap md:overflow-visible">
            {matched.map((p) => (
              <Chip
                key={`${p.primary}-${p.subcategory}`}
                label={SUBCATEGORY_LABELS[p.subcategory]?.[mode] ?? p.subcategory}
                sublabel={PRIMARY_LABELS[p.primary][mode]}
                onClick={onChipClick ? () => onChipClick(p) : undefined}
              />
            ))}
          </div>
        </div>
      </div>

      <ShortlistRanges matched={matched} />
    </div>
  )
}

function Chip({
  label,
  sublabel,
  onClick,
}: {
  label: string
  sublabel?: string
  onClick?: () => void
}) {
  const inner = (
    <>
      <span className="font-medium text-text-primary">{label}</span>
      {sublabel ? (
        <span className="ml-1.5 text-[10px] uppercase tracking-widest text-text-muted">
          {sublabel}
        </span>
      ) : null}
    </>
  )
  const cls = cn(
    'inline-flex shrink-0 items-baseline rounded-pill border border-gold/40 bg-gold/5 px-2.5 py-1 text-xs',
    onClick ? 'cursor-pointer transition-colors hover:bg-gold/15' : '',
  )
  return onClick ? (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  ) : (
    <span className={cls}>{inner}</span>
  )
}
