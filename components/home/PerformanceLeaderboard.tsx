import Link from 'next/link'
import { ArrowRight, Trophy } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { allFundsQuery } from '@/lib/sanity/queries'
import type { FundCardData } from '@/components/fund/fundDisplay'
import { LeaderboardClient } from './LeaderboardClient'

/**
 * Performance Leaderboard — top 10 funds across the universe with a
 * client-side time-period selector + bucket filter.
 *
 * Methodology (kept transparent so the artefact stays share-worthy):
 *   - Universe: every fund tagged Active.
 *   - AUM minimum: AUM ≥ ₹100 Cr (configurable in MIN_AUM_CRORE).
 *     Filters out very small / niche funds whose returns we can't
 *     defensibly rank against larger peers.
 *   - Metric: 1Y / 3Y / 5Y / Since-Inception CAGR (user picks).
 *   - Ties broken by AUM (larger first) as a stability proxy.
 */

const MIN_AUM_CRORE = 100

export async function PerformanceLeaderboard() {
  let funds: FundCardData[] = []
  try {
    funds = await client.fetch<FundCardData[]>(allFundsQuery, {}, {
      next: { tags: ['fund'], revalidate: 600 },
    })
  } catch (error) {
    console.error('PerformanceLeaderboard: Sanity fetch failed', error)
  }

  const eligible = funds.filter((f) => f.status === 'Active' && (f.aum ?? 0) >= MIN_AUM_CRORE)

  return (
    <section className="container-grid py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-gold">Leaderboard</p>
          <h2 className="mt-2 flex items-center gap-2">
            <Trophy size={28} className="text-gold" aria-hidden />
            Top 10 performers.
          </h2>
          <p className="mt-3 text-base text-text-muted">
            Picked from active SEBI / IFSCA-registered funds with AUM ≥ ₹{MIN_AUM_CRORE} Cr. Ranked by your chosen time horizon.
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

      <div className="mt-8">
        <LeaderboardClient funds={eligible} minAumCrore={MIN_AUM_CRORE} />
      </div>
    </section>
  )
}
