import Link from 'next/link'
import { ArrowRight, Trophy } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { allFundsQuery } from '@/lib/sanity/queries'
import type { FundCardData } from '@/components/fund/fundDisplay'
import { formatPercent } from '@/components/fund/fundDisplay'
import { PRIMARY_LABELS, SUBCATEGORY_LABELS } from '@/lib/constants'
import { cn } from '@/lib/utils'

/**
 * Methodology — kept transparent so this becomes share-worthy:
 *   - Universe: every fund tagged Active.
 *   - Metric: 3-year CAGR. Falls back to Since-Inception when 3Y is
 *     missing (younger funds).
 *   - Bucket: top 3 across PMS, AIF, GIFT City. Three columns side-by-
 *     side so AIFs aren't drowned by the larger PMS bucket.
 *   - No "best of" — explicit ranks (#1, #2, #3) so readers see how
 *     small the sample is.
 *   - Ties broken by AUM (larger first, as a proxy for stability).
 */

type Bucket = 'PMS' | 'AIF' | 'GIFT City'

type Row = {
  rank: 1 | 2 | 3
  fund: FundCardData
  metric: number
  metricLabel: '3Y CAGR' | 'Since inception'
}

export async function PerformanceLeaderboard() {
  let funds: FundCardData[] = []
  try {
    funds = await client.fetch<FundCardData[]>(allFundsQuery, {}, {
      next: { tags: ['fund'], revalidate: 600 },
    })
  } catch (error) {
    console.error('PerformanceLeaderboard: Sanity fetch failed', error)
  }

  const active = funds.filter((f) => f.status === 'Active')
  const buckets: Bucket[] = ['PMS', 'AIF', 'GIFT City']

  return (
    <section className="container-grid py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-gold">Leaderboard</p>
          <h2 className="mt-2">Top performers — by 3-year CAGR.</h2>
          <p className="mt-3 text-base text-text-muted">
            Three buckets, three names each. SEBI / IFSCA active funds only. Ranked on 3-year CAGR (since-inception when 3Y isn&rsquo;t available). Updated as the data updates.
          </p>
        </div>
        <Link
          href="/explore"
          className="inline-flex items-center gap-1 text-sm font-medium text-text-primary hover:text-gold"
        >
          See full universe
          <ArrowRight size={14} aria-hidden />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
        {buckets.map((bucket) => (
          <BucketColumn key={bucket} bucket={bucket} rows={topThree(active, bucket)} />
        ))}
      </div>

      <p className="mt-8 max-w-prose text-xs text-text-muted">
        Methodology: 3-year CAGR, ties broken by AUM. Past performance does not guarantee future results — high CAGR is one input among twenty. Use the{' '}
        <Link href="/tools/scorecard" className="underline decoration-gold/40 underline-offset-4 hover:decoration-gold">
          Scorecard
        </Link>{' '}
        before allocating.
      </p>
    </section>
  )
}

function BucketColumn({ bucket, rows }: { bucket: Bucket; rows: Row[] }) {
  return (
    <article className="rounded-card border border-card-border bg-card p-5 shadow-card md:p-6">
      <header className="flex items-center justify-between">
        <h3 className="text-base font-semibold tracking-tight text-text-primary md:text-lg">
          {PRIMARY_LABELS[bucket].pro}
        </h3>
        <span className="text-xs font-medium text-text-muted">Top {rows.length}</span>
      </header>

      {rows.length === 0 ? (
        <p className="mt-4 text-sm text-text-muted">
          Not enough funds with 3Y data in this bucket yet.
        </p>
      ) : (
        <ol className="mt-4 divide-y divide-card-border">
          {rows.map((row) => (
            <RankRow key={row.fund._id} row={row} />
          ))}
        </ol>
      )}
    </article>
  )
}

function RankRow({ row }: { row: Row }) {
  const { rank, fund, metric, metricLabel } = row
  const sub = fund.subcategory ? SUBCATEGORY_LABELS[fund.subcategory]?.pro ?? fund.subcategory : null
  return (
    <li>
      <Link
        href={`/explore/${fund.slug}`}
        className="group flex items-start gap-3 py-4 transition-colors hover:bg-text-primary/[0.02]"
      >
        <RankBadge rank={rank} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-text-primary group-hover:text-gold">
            {fund.name}
          </p>
          <p className="truncate text-xs text-text-muted">
            {fund.provider}
            {sub ? ` · ${sub}` : ''}
          </p>
        </div>
        <div className="w-16 shrink-0 text-right">
          <p className="whitespace-nowrap text-base font-semibold tabular-nums text-text-primary">
            {formatPercent(metric)}
          </p>
          <p className="text-[10px] uppercase tracking-wide text-text-muted">{metricLabel}</p>
        </div>
      </Link>
    </li>
  )
}

function RankBadge({ rank }: { rank: 1 | 2 | 3 }) {
  const tone =
    rank === 1
      ? 'bg-gold text-white'
      : rank === 2
        ? 'bg-text-primary text-white'
        : 'bg-text-primary/10 text-text-primary'
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold tabular-nums',
        tone,
      )}
    >
      {rank === 1 ? <Trophy size={14} /> : `#${rank}`}
    </span>
  )
}

function topThree(funds: FundCardData[], bucket: Bucket): Row[] {
  const inBucket = funds.filter((f) => {
    const cat = f.category ?? ''
    if (bucket === 'PMS') return cat === 'PMS'
    if (bucket === 'AIF') return cat.startsWith('AIF')
    return cat === 'GIFT City'
  })

  const ranked = inBucket
    .map((f) => {
      const threeY = numOrNull(f.returns?.threeYear)
      const since = numOrNull(f.returns?.sinceInception)
      const metric = threeY ?? since ?? null
      return metric == null
        ? null
        : { fund: f, metric, metricLabel: threeY != null ? '3Y CAGR' : 'Since inception' }
    })
    .filter(Boolean) as { fund: FundCardData; metric: number; metricLabel: '3Y CAGR' | 'Since inception' }[]

  ranked.sort((a, b) => {
    if (b.metric !== a.metric) return b.metric - a.metric
    return (b.fund.aum ?? 0) - (a.fund.aum ?? 0)
  })

  return ranked.slice(0, 3).map((r, i) => ({ rank: (i + 1) as 1 | 2 | 3, ...r }))
}

function numOrNull(v: number | undefined): number | null {
  return typeof v === 'number' && v > 0 ? v : null
}
