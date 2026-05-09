'use client'

import { useRouter } from 'next/navigation'
import { Fragment, useMemo, useState } from 'react'
import {
  CartesianGrid,
  ErrorBar,
  Legend,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts'
import {
  GOAL_COLORS,
  LOCKIN_COLORS,
  PRIMARY_CURRENCY,
  PRIMARY_LABELS,
  PRODUCT_MAP_POINTS,
  SUBCATEGORY_LABELS,
  type GoalBucket,
  type LockIn,
  type PrimaryCategory,
  type ProductMapPoint,
} from '@/lib/constants'
import { useMode } from '@/components/shared/SimpleProToggle'
import { cn } from '@/lib/utils'
import { PathfinderQuiz } from './PathfinderQuiz'
import { PathfinderResults } from './PathfinderResults'
import {
  EMPTY_FILTERS,
  isAnyFilterActive,
  matches,
  type PathfinderFilters,
} from '@/lib/pathfinder'

const FAMILY_COLORS: Record<PrimaryCategory, string> = {
  PMS: '#b8960c',
  AIF: '#1d1d1f',
  'GIFT City': '#d97706',
}

// Chart axis bounds
const X_MIN = 8
const X_MAX = 28
const Y_MIN = 2
const Y_MAX = 9

// Quadrant midpoints
const X_MID = 17
const Y_MID = 5

// Post-tax FD baseline used in the storytelling tooltip.
const FD_NET_RATE = 0.042
const FD_LABEL = 'FD (post-tax)'

type Lens = 'family' | 'goal' | 'liquidity'

const LENS_OPTIONS: { value: Lens; label: string }[] = [
  { value: 'family', label: 'Family' },
  { value: 'goal', label: 'Goal' },
  { value: 'liquidity', label: 'Liquidity' },
]

const LOCKIN_LABELS: Record<LockIn, string> = {
  none: 'Liquid',
  soft: 'Soft lock',
  hard: 'Locked',
}

const LISTING_BADGE: Record<ProductMapPoint['listing'], string> = {
  Listed: 'Listed',
  Unlisted: 'Unlisted',
  Mixed: 'Listed + Unlisted',
}

type ChartPoint = ProductMapPoint & {
  primary: PrimaryCategory
  displayLabel: string
  /** [loDelta, hiDelta] from `expectedReturn` — fed to Recharts ErrorBar. */
  errorBarRange: [number, number]
}

type LensGroup = {
  key: string
  label: string
  color: string
  points: ChartPoint[]
}

export function ProductMapHero() {
  const router = useRouter()
  const { mode } = useMode()
  const [filters, setFilters] = useState<PathfinderFilters>(EMPTY_FILTERS)
  const [lens, setLens] = useState<Lens>('family')

  const filterActive = isAnyFilterActive(filters)

  const enriched = useMemo<ChartPoint[]>(() => {
    return PRODUCT_MAP_POINTS.map((p) => {
      const rs = p.variants.map((v) => v.expectedReturn)
      const lo = Math.min(...rs)
      const hi = Math.max(...rs)
      // Recharts ErrorBar with array values uses [loDelta, hiDelta] —
      // deltas from the data point, not absolute coordinates.
      const errorBarRange: [number, number] = [
        Math.max(0, p.expectedReturn - lo),
        Math.max(0, hi - p.expectedReturn),
      ]
      return {
        ...p,
        errorBarRange,
        displayLabel: SUBCATEGORY_LABELS[p.subcategory]?.[mode] ?? p.subcategory,
      }
    })
  }, [mode])

  const groups = useMemo<LensGroup[]>(() => buildLensGroups(enriched, lens, mode), [enriched, lens, mode])

  const matched = useMemo(
    () => enriched.filter((p) => matches(p, filters)),
    [enriched, filters],
  )
  const matchedKeys = useMemo(
    () => new Set(matched.map((p) => `${p.primary}::${p.subcategory}`)),
    [matched],
  )

  const onPointClick = (point: ChartPoint) => {
    const params = new URLSearchParams({ cat: point.primary })
    router.push(`/explore?${params.toString()}`)
  }

  // Trigger halo / re-entry animation by re-keying scatters on every
  // filter or lens change. Applied to <Scatter> only, not the chart
  // container, so Recharts doesn't remeasure the responsive container.
  const animKey = `${lens}-${matched.length}-${filters.access}-${filters.income}-${filters.risk}-${filters.ticket}`

  return (
    <section className="container-grid pt-12 pb-12 md:pt-20 md:pb-20">
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-widest text-gold">
          Where each product sits
        </p>
        <h1 className="mt-2">The Indian alternatives universe — at a glance.</h1>
        <p className="mt-4 max-w-prose text-base text-text-muted md:text-lg">
          Each bubble is a product subcategory, plotted by typical return and the time you should
          commit. Answer four quick questions and we&rsquo;ll spotlight the buckets that fit. Switch
          lenses to recolor the map by goal or liquidity.
        </p>
      </div>

      <div className="mt-8 rounded-card border border-card-border bg-card p-4 shadow-card md:mt-10 md:p-6">
        <PathfinderQuiz
          filters={filters}
          onChange={setFilters}
          showNudge={!filterActive}
        />

        {filterActive ? (
          <div className="mt-4">
            <PathfinderResults
              matched={matched}
              totalCount={PRODUCT_MAP_POINTS.length}
              active={filterActive}
            />
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-card-border pt-4 md:mt-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted">
            View by
          </p>
          <LensToggle value={lens} onChange={setLens} />
        </div>

        <div className={cn('product-map mt-3 h-[460px] w-full md:h-[520px]')}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 16, right: 32, bottom: 40, left: 28 }}>
              <CartesianGrid stroke="rgba(0,0,0,0.05)" vertical={false} />

              {/* Quadrant tinting */}
              <ReferenceArea x1={X_MIN} x2={X_MID} y1={Y_MIN} y2={Y_MID} fill="#1d1d1f" fillOpacity={0.025} stroke="none" ifOverflow="visible" />
              <ReferenceArea x1={X_MID} x2={X_MAX} y1={Y_MIN} y2={Y_MID} fill="#c0392b" fillOpacity={0.04} stroke="none" ifOverflow="visible" />
              <ReferenceArea x1={X_MIN} x2={X_MID} y1={Y_MID} y2={Y_MAX} fill="#86868b" fillOpacity={0.045} stroke="none" ifOverflow="visible" />
              <ReferenceArea x1={X_MID} x2={X_MAX} y1={Y_MID} y2={Y_MAX} fill="#b8960c" fillOpacity={0.06} stroke="none" ifOverflow="visible" />

              <ReferenceLine x={X_MID} stroke="rgba(0,0,0,0.06)" strokeDasharray="3 4" />
              <ReferenceLine y={Y_MID} stroke="rgba(0,0,0,0.06)" strokeDasharray="3 4" />

              <ReferenceArea x1={X_MIN} x2={X_MID} y1={Y_MIN} y2={Y_MID} fill="transparent" stroke="none"
                label={{ value: 'Boring & Safe', position: 'insideBottomLeft', fill: '#86868b', fontSize: 10, letterSpacing: '0.16em', offset: 8 }} />
              <ReferenceArea x1={X_MID} x2={X_MAX} y1={Y_MIN} y2={Y_MID} fill="transparent" stroke="none"
                label={{ value: 'Hidden Risk', position: 'insideBottomRight', fill: '#c0392b', fontSize: 10, letterSpacing: '0.16em', offset: 8 }} />
              <ReferenceArea x1={X_MIN} x2={X_MID} y1={Y_MID} y2={Y_MAX} fill="transparent" stroke="none"
                label={{ value: 'Patience Tax', position: 'insideTopLeft', fill: '#86868b', fontSize: 10, letterSpacing: '0.16em', offset: 8 }} />
              <ReferenceArea x1={X_MID} x2={X_MAX} y1={Y_MID} y2={Y_MAX} fill="transparent" stroke="none"
                label={{ value: 'Long Game', position: 'insideTopRight', fill: '#b8960c', fontSize: 10, letterSpacing: '0.16em', offset: 8 }} />

              <XAxis type="number" dataKey="expectedReturn" domain={[X_MIN, X_MAX]}
                tick={{ fill: '#86868b', fontSize: 11 }} tickLine={false} axisLine={{ stroke: 'rgba(0,0,0,0.08)' }}
                label={{ value: 'Typical return (% CAGR)', position: 'insideBottom', offset: -16, fill: '#86868b', fontSize: 11, letterSpacing: '0.08em' }} />
              <YAxis type="number" dataKey="horizon" domain={[Y_MIN, Y_MAX]}
                tick={{ fill: '#86868b', fontSize: 11 }} tickLine={false} axisLine={{ stroke: 'rgba(0,0,0,0.08)' }}
                label={{ value: 'Horizon (years)', angle: -90, position: 'insideLeft', fill: '#86868b', fontSize: 11, letterSpacing: '0.08em' }} />
              <ZAxis type="number" dataKey="weight" range={[120, 1100]} />

              <Tooltip cursor={{ stroke: 'rgba(0,0,0,0.08)', strokeDasharray: '4 4' }} content={<CustomTooltip />} />
              <Legend verticalAlign="top" align="right" iconType="circle" iconSize={8}
                wrapperStyle={{ fontSize: 12, paddingBottom: 12 }} />

              {groups.map((g) => {
                const matchedInGroup = g.points.filter((p) =>
                  matchedKeys.has(`${p.primary}::${p.subcategory}`),
                )
                const dimmedInGroup = g.points.filter(
                  (p) => !matchedKeys.has(`${p.primary}::${p.subcategory}`),
                )
                const colored = filterActive ? matchedInGroup : g.points
                const greyed = filterActive ? dimmedInGroup : []
                return (
                  <Fragment key={g.key}>
                    {greyed.length > 0 ? (
                      <Scatter
                        legendType="none"
                        data={greyed}
                        fill="#86868b"
                        fillOpacity={0.18}
                        stroke="none"
                        isAnimationActive={false}
                        onClick={(_, idx) => {
                          const point = greyed[idx]
                          if (point) onPointClick(point)
                        }}
                        style={{ cursor: 'pointer' }}
                      />
                    ) : null}
                    <Scatter
                      key={`${g.key}-${animKey}`}
                      name={g.label}
                      data={colored}
                      fill={g.color}
                      fillOpacity={0.85}
                      stroke={g.color}
                      strokeOpacity={0.95}
                      strokeWidth={filterActive ? 1.75 : 1.25}
                      shape={(props: ShapeProps) => (
                        <BubbleShape {...props} halo={filterActive} haloColor={g.color} />
                      )}
                      onClick={(_, idx) => {
                        const point = colored[idx]
                        if (point) onPointClick(point)
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {filterActive ? (
                        <ErrorBar
                          dataKey="errorBarRange"
                          direction="x"
                          stroke={g.color}
                          strokeWidth={2}
                          strokeOpacity={0.55}
                          width={6}
                        />
                      ) : null}
                    </Scatter>
                  </Fragment>
                )
              })}
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex flex-col gap-2 text-xs text-text-muted md:flex-row md:items-center md:justify-between">
          <p className="md:text-left">
            Numbers are typical-case orientations, not forecasts. Actual returns and lock-ups vary by fund.
          </p>
          <p className="md:text-right">Bubble size = capital parked here (illustrative).</p>
        </div>
      </div>
    </section>
  )
}

// ----- Lens helpers -------------------------------------------------------

function colorOf(p: ProductMapPoint, lens: Lens): string {
  if (lens === 'goal') return GOAL_COLORS[p.goal]
  if (lens === 'liquidity') return LOCKIN_COLORS[p.lockIn]
  return FAMILY_COLORS[p.primary]
}

function buildLensGroups(points: ChartPoint[], lens: Lens, mode: 'simple' | 'pro'): LensGroup[] {
  if (lens === 'family') {
    const order: PrimaryCategory[] = ['PMS', 'AIF', 'GIFT City']
    return order
      .map((primary) => ({
        key: `family-${primary}`,
        label: PRIMARY_LABELS[primary][mode],
        color: FAMILY_COLORS[primary],
        points: points.filter((p) => p.primary === primary),
      }))
      .filter((g) => g.points.length > 0)
  }
  if (lens === 'goal') {
    const order: GoalBucket[] = ['Wealth Creation', 'Income', 'Capital Preservation']
    return order
      .map((g) => ({
        key: `goal-${g}`,
        label: g,
        color: GOAL_COLORS[g],
        points: points.filter((p) => p.goal === g),
      }))
      .filter((g) => g.points.length > 0)
  }
  const order: LockIn[] = ['none', 'soft', 'hard']
  return order
    .map((l) => ({
      key: `lockin-${l}`,
      label: LOCKIN_LABELS[l],
      color: LOCKIN_COLORS[l],
      points: points.filter((p) => p.lockIn === l),
    }))
    .filter((g) => g.points.length > 0)
}

// ----- Lens toggle UI -----------------------------------------------------

function LensToggle({ value, onChange }: { value: Lens; onChange: (l: Lens) => void }) {
  return (
    <div className="inline-flex rounded-pill border border-card-border bg-card p-1">
      {LENS_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
          className={cn(
            'rounded-pill px-3 py-1 text-xs font-medium transition-colors',
            value === opt.value
              ? 'bg-text-primary text-card'
              : 'text-text-muted hover:text-text-primary',
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

// ----- Custom bubble shape (with optional halo) ---------------------------

type ShapeProps = {
  cx?: number
  cy?: number
  fill?: string
  fillOpacity?: number
  stroke?: string
  strokeOpacity?: number
  strokeWidth?: number
  size?: number
  payload?: ChartPoint
}

function BubbleShape(props: ShapeProps & { halo?: boolean; haloColor?: string }) {
  const { cx, cy, fill, fillOpacity = 1, stroke, strokeOpacity = 1, strokeWidth = 0, size, halo, haloColor } = props
  if (cx == null || cy == null) return null
  const area = typeof size === 'number' && size > 0 ? size : 200
  const r = Math.max(4, Math.sqrt(area / Math.PI))
  return (
    <g>
      {halo ? (
        <circle
          className="pf-halo"
          cx={cx}
          cy={cy}
          r={r + 5}
          fill="none"
          stroke={haloColor ?? fill ?? '#b8960c'}
          strokeWidth={2}
        />
      ) : null}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        fillOpacity={fillOpacity}
        stroke={stroke}
        strokeOpacity={strokeOpacity}
        strokeWidth={strokeWidth}
      />
    </g>
  )
}

// ----- Storytelling tooltip ----------------------------------------------

function computeStory(p: ChartPoint) {
  const er = p.expectedReturn / 100
  const horizon = p.horizon
  const product = Math.pow(1 + er, horizon)
  const fd = Math.pow(1 + FD_NET_RATE, horizon)
  return { productMultiple: product, fdMultiple: fd, vsFd: product / fd }
}

function formatMultiple(m: number): string {
  if (m >= 10) return m.toFixed(0)
  if (m >= 2) return m.toFixed(1)
  return m.toFixed(2)
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
  const story = computeStory(p)
  const productEnd = formatMultiple(story.productMultiple)
  const fdEnd = formatMultiple(story.fdMultiple)
  const beat = formatMultiple(story.vsFd)
  const currency = p.primary === 'GIFT City' ? '$' : '₹'
  const denom = p.primary === 'GIFT City' ? 'M' : 'Cr'

  return (
    <div className="max-w-[300px] rounded-card border border-card-border bg-card p-3 shadow-card-hover">
      <div className="flex flex-wrap items-center gap-1.5">
        <span aria-hidden className="inline-block h-2 w-2 rounded-pill" style={{ background: FAMILY_COLORS[p.primary] }} />
        <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
          {symbol} {p.primary}
        </p>
        <span
          className="inline-flex items-center rounded-pill px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest"
          style={{ background: `${GOAL_COLORS[p.goal]}1f`, color: GOAL_COLORS[p.goal] }}
        >
          {p.goal}
        </span>
        <span className="rounded-pill border border-card-border px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-widest text-text-muted">
          {LISTING_BADGE[p.listing]}
        </span>
      </div>
      <p className="mt-1 text-sm font-semibold text-text-primary">{p.displayLabel}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-text-muted">{p.blurb}</p>

      <div className="mt-3 rounded-md border border-card-border bg-background/60 p-2.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
          The story · {p.horizon}y
        </p>
        <p className="mt-1 text-sm font-medium leading-snug text-text-primary">
          {currency}1{denom} →{' '}
          <span className="font-semibold text-gold tabular-nums">
            ~{currency}{productEnd}{denom}
          </span>
        </p>
        <p className="mt-0.5 text-[11px] leading-snug text-text-muted">
          vs {FD_LABEL} → <span className="tabular-nums">~{currency}{fdEnd}{denom}</span>
        </p>
        <p className="mt-1.5 text-[11px] font-semibold leading-snug text-text-primary">
          <span className="tabular-nums">{beat}×</span> the FD path.
        </p>
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-2 border-t border-card-border pt-2 text-[10px] uppercase tracking-wide text-text-muted">
        <div>
          <dt>Return</dt>
          <dd className="mt-0.5 text-sm font-semibold tabular-nums normal-case tracking-normal text-text-primary">
            ~{p.expectedReturn}%
          </dd>
        </div>
        <div>
          <dt>Min</dt>
          <dd className="mt-0.5 text-sm font-semibold tabular-nums normal-case tracking-normal text-text-primary">
            {p.minTicket}
          </dd>
        </div>
      </dl>
      <p className="mt-2 text-[10px] leading-snug text-text-muted">
        <span className="font-semibold uppercase tracking-widest">Tax · </span>
        {p.taxNote}
      </p>
      <p className="mt-2 text-[10px] uppercase tracking-widest text-gold">Click to explore →</p>
    </div>
  )
}
