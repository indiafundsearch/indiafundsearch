import Link from 'next/link'
import { Award, Trophy } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { allFundsQuery } from '@/lib/sanity/queries'
import type { FundCardData } from '@/components/fund/fundDisplay'
import { formatPercent } from '@/components/fund/fundDisplay'
import { PRIMARY_LABELS, SUBCATEGORY_LABELS, SUBCATEGORIES, type PrimaryCategory } from '@/lib/constants'

/**
 * Fund of the Year — one winner per primary × subcategory.
 *
 * Methodology (kept transparent so the artefact stays share-worthy):
 *   - Universe: Active funds, AUM ≥ ₹100 Cr.
 *   - Composite score per fund =
 *       60% normalized 3Y CAGR (or Since Inception when 3Y missing)
 *     + 25% normalized AUM (proxy for stability + investor trust)
 *     + 15% fee discipline (lower mgmt + perf %, normalized)
 *   - Winner per subcategory is the fund with the highest composite.
 *   - Empty subcategories show no card; we don't fabricate winners.
 *
 * The composite is opinionated but documented. Fund houses that win can
 * cite the methodology to share with confidence; those that don't can
 * see exactly which axis they lost on.
 */

const MIN_AUM_CRORE = 100

const COMPOSITE_WEIGHTS = {
  returns: 0.6,
  aum: 0.25,
  fee: 0.15,
} as const

type Award = {
  primary: PrimaryCategory
  subcategory: string
  winner: FundCardData
  score: number
  metric: number
}

export async function FundOfTheYear() {
  let funds: FundCardData[] = []
  try {
    funds = await client.fetch<FundCardData[]>(allFundsQuery, {}, {
      next: { tags: ['fund'], revalidate: 600 },
    })
  } catch (error) {
    console.error('FundOfTheYear: Sanity fetch failed', error)
  }

  const eligible = funds.filter((f) => f.status === 'Active' && (f.aum ?? 0) >= MIN_AUM_CRORE)

  // For each primary × subcategory, pick the highest composite-score fund.
  const awards: Award[] = []
  const primaries: PrimaryCategory[] = ['PMS', 'AIF', 'GIFT City']

  for (const primary of primaries) {
    const inPrimary = eligible.filter((f) => matchesPrimary(f, primary))
    if (inPrimary.length === 0) continue

    const subs = SUBCATEGORIES[primary] ?? []
    for (const sub of subs) {
      const inSub = inPrimary.filter((f) => f.subcategory === sub)
      if (inSub.length === 0) continue

      const scored = inSub.map((f) => ({
        winner: f,
        score: composite(f, inPrimary),
        metric: f.returns?.threeYear ?? f.returns?.sinceInception ?? 0,
      }))
      scored.sort((a, b) => b.score - a.score)
      const top = scored[0]
      if (top) {
        awards.push({ primary, subcategory: sub, ...top })
      }
    }
  }

  if (awards.length === 0) return null

  return (
    <section className="container-grid py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-gold">Awards 2026</p>
          <h2 className="mt-2 flex items-center gap-2">
            <Award size={28} className="text-gold" aria-hidden />
            Fund of the Year — by subcategory.
          </h2>
          <p className="mt-3 text-base text-text-muted">
            One winner per subcategory. Composite score: 60% returns · 25% AUM · 15% fee discipline. Active funds with AUM ≥ ₹{MIN_AUM_CRORE} Cr only.
          </p>
        </div>
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {awards.map((award) => (
          <li key={`${award.primary}-${award.subcategory}`}>
            <AwardCard award={award} />
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-prose text-xs text-text-muted">
        Methodology details: returns normalized within bucket; AUM normalized log-scale; fee discipline = inverse of management + performance fees. Past performance is not a guarantee of future results — use the{' '}
        <Link href="/tools/scorecard" className="underline decoration-gold/40 underline-offset-4 hover:decoration-gold">
          Scorecard
        </Link>{' '}
        before allocating.
      </p>
    </section>
  )
}

function AwardCard({ award }: { award: Award }) {
  const subLabel = SUBCATEGORY_LABELS[award.subcategory]?.pro ?? award.subcategory
  const primaryLabel = PRIMARY_LABELS[award.primary].pro

  return (
    <Link
      href={`/explore/${award.winner.slug}`}
      className="group flex h-full flex-col rounded-card border border-card-border border-l-4 border-l-gold bg-card p-5 shadow-card transition-all hover:shadow-card-hover md:p-6"
    >
      <div className="flex items-center gap-2">
        <Trophy size={14} className="text-gold" aria-hidden />
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">
          Winner · {primaryLabel} · {subLabel}
        </p>
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-text-primary group-hover:text-gold md:text-xl">
        {award.winner.name}
      </h3>
      {award.winner.provider ? (
        <p className="mt-1 text-xs text-text-muted">{award.winner.provider}</p>
      ) : null}

      <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-card-border pt-4 text-sm">
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">3Y CAGR</dt>
          <dd className="mt-0.5 font-semibold tabular-nums text-text-primary">
            {formatPercent(award.metric)}
          </dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">AUM</dt>
          <dd className="mt-0.5 font-semibold tabular-nums text-text-primary">
            ₹{Math.round(award.winner.aum ?? 0).toLocaleString('en-IN')} Cr
          </dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Score</dt>
          <dd className="mt-0.5 font-semibold tabular-nums text-gold">
            {Math.round(award.score)}/100
          </dd>
        </div>
      </dl>
    </Link>
  )
}

function matchesPrimary(fund: FundCardData, primary: PrimaryCategory): boolean {
  const cat = fund.category ?? ''
  if (primary === 'AIF') return cat.startsWith('AIF')
  if (primary === 'GIFT City') return cat === 'GIFT City'
  return cat === primary
}

/**
 * Composite score in the 0–100 range. Inputs normalized within the
 * primary-category peer set.
 */
function composite(fund: FundCardData, peers: FundCardData[]): number {
  const ret = fund.returns?.threeYear ?? fund.returns?.sinceInception ?? 0
  const aum = fund.aum ?? 0
  const feeRaw = (fund.fees?.managementFee ?? 0) + (fund.fees?.performanceFee ?? 0) * 0.5

  const peerReturns = peers.map((p) => p.returns?.threeYear ?? p.returns?.sinceInception ?? 0)
  const peerAums = peers.map((p) => Math.log10(Math.max(1, p.aum ?? 0)))
  const peerFees = peers.map(
    (p) => (p.fees?.managementFee ?? 0) + (p.fees?.performanceFee ?? 0) * 0.5,
  )

  const retScore = normalize(ret, peerReturns)
  const aumScore = normalize(Math.log10(Math.max(1, aum)), peerAums)
  // Fee discipline = inverse of fee
  const feeScore = 1 - normalize(feeRaw, peerFees)

  return (
    (retScore * COMPOSITE_WEIGHTS.returns +
      aumScore * COMPOSITE_WEIGHTS.aum +
      feeScore * COMPOSITE_WEIGHTS.fee) *
    100
  )
}

function normalize(value: number, peers: number[]): number {
  if (peers.length === 0) return 0
  const min = Math.min(...peers)
  const max = Math.max(...peers)
  if (max === min) return 0.5
  return (value - min) / (max - min)
}
