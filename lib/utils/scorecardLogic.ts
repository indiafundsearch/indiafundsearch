/**
 * Scorecard — 20-criteria PMS evaluator.
 *
 * Five dimensions × four criteria, each rated 1–5. Used to surface
 * strengths, watch areas, and red flags. Sit alongside the Fee X-Ray
 * (cost lens) and Diagnostic (readiness lens).
 */

export type DimensionKey = 'manager' | 'performance' | 'fees' | 'operations' | 'fit'

export type ScorecardCriterion = {
  key: string
  dimension: DimensionKey
  label: string
  helper: string
}

export const DIMENSION_LABELS: Record<DimensionKey, string> = {
  manager: 'Manager Quality',
  performance: 'Performance Integrity',
  fees: 'Fee Fairness',
  operations: 'Operational Robustness',
  fit: 'Suitability Fit',
}

export const CRITERIA: ScorecardCriterion[] = [
  // A. Manager Quality
  {
    key: 'manager-coinvestment',
    dimension: 'manager',
    label: 'Manager co-investment',
    helper: '5 = manager has meaningful personal capital in the fund. 1 = no skin in the game.',
  },
  {
    key: 'manager-tenure',
    dimension: 'manager',
    label: 'Manager tenure',
    helper: '5 = lead PM running this strategy for 7+ years. 1 = new manager or recent reshuffle.',
  },
  {
    key: 'manager-team-depth',
    dimension: 'manager',
    label: 'Team depth',
    helper: '5 = three or more analysts plus risk function. 1 = key-person risk on a single PM.',
  },
  {
    key: 'manager-prior-record',
    dimension: 'manager',
    label: 'Prior record',
    helper: '5 = verifiable, audited prior outcomes. 1 = no track record outside marketing decks.',
  },

  // B. Performance Integrity
  {
    key: 'perf-full-cycle',
    dimension: 'performance',
    label: 'Full-cycle data',
    helper: '5 = 5+ years across at least one drawdown. 1 = bull-market only.',
  },
  {
    key: 'perf-benchmark',
    dimension: 'performance',
    label: 'Benchmark clarity',
    helper: '5 = relevant benchmark, total-return basis, consistently disclosed. 1 = vague or shifting benchmark.',
  },
  {
    key: 'perf-risk-metrics',
    dimension: 'performance',
    label: 'Risk metrics',
    helper: '5 = max drawdown, volatility, downside deviation all disclosed. 1 = returns-only.',
  },
  {
    key: 'perf-aum-trajectory',
    dimension: 'performance',
    label: 'AUM trajectory',
    helper: '5 = capacity-disciplined, soft-closed when needed. 1 = aggressive growth at strategy\'s expense.',
  },

  // C. Fee Fairness
  {
    key: 'fees-transparency',
    dimension: 'fees',
    label: 'Cost transparency',
    helper: '5 = full breakdown including brokerage, GST, custody. 1 = headline-fee marketing only.',
  },
  {
    key: 'fees-alignment',
    dimension: 'fees',
    label: 'Fee alignment',
    helper: '5 = high-water mark + meaningful hurdle. 1 = fee even if you lose money.',
  },
  {
    key: 'fees-churn',
    dimension: 'fees',
    label: 'Churn / turnover disclosure',
    helper: '5 = portfolio turnover disclosed clearly. 1 = no idea what tax drag you\'ll bear.',
  },
  {
    key: 'fees-exit',
    dimension: 'fees',
    label: 'Exit flexibility',
    helper: '5 = clear, reasonable exit-load grid. 1 = punitive or opaque exit terms.',
  },

  // D. Operational Robustness
  {
    key: 'ops-custodian',
    dimension: 'operations',
    label: 'Custodian quality',
    helper: '5 = top-tier independent custodian with public reputation. 1 = obscure or in-house.',
  },
  {
    key: 'ops-reporting',
    dimension: 'operations',
    label: 'Reporting cadence',
    helper: '5 = monthly factsheet + on-demand detail. 1 = quarterly summary only.',
  },
  {
    key: 'ops-sebi',
    dimension: 'operations',
    label: 'SEBI record',
    helper: '5 = clean record, no enforcement actions. 1 = past observations / cautions / penalties.',
  },
  {
    key: 'ops-communication',
    dimension: 'operations',
    label: 'Communication quality',
    helper: '5 = clear, candid commentary even on bad quarters. 1 = silence after losses.',
  },

  // E. Suitability Fit
  {
    key: 'fit-risk',
    dimension: 'fit',
    label: 'Risk profile match',
    helper: '5 = volatility band fits your tolerance. 1 = beyond what you\'ve historically held.',
  },
  {
    key: 'fit-timeline',
    dimension: 'fit',
    label: 'Timeline match',
    helper: '5 = lock-in matches your money\'s real horizon. 1 = lock-in clashes with planned needs.',
  },
  {
    key: 'fit-concentration',
    dimension: 'fit',
    label: 'Concentration comfort',
    helper: '5 = portfolio concentration is within your comfort. 1 = single-bet risk you cannot stomach.',
  },
  {
    key: 'fit-portfolio-gap',
    dimension: 'fit',
    label: 'Portfolio gap fit',
    helper: '5 = fills a real gap (e.g., small-cap, alternative). 1 = duplicates exposure you already have.',
  },
]

export type ScoreMap = Record<string, number> // criterion key -> 1..5

export type Verdict = 'strength' | 'watch' | 'redflag'

export type ScorecardResult = {
  /** 0-100 overall. */
  overallScore: number
  /** Per-dimension averages, 0-100 (×20 of the 1-5 mean). */
  dimensionScores: Record<DimensionKey, number>
  buckets: Record<Verdict, ScorecardCriterion[]>
  ratings: Array<{ criterion: ScorecardCriterion; rating: number; verdict: Verdict }>
}

export function calculateScorecard(scores: ScoreMap): ScorecardResult | null {
  if (CRITERIA.some((c) => !(c.key in scores))) return null

  const dimensionTotals: Record<DimensionKey, { sum: number; count: number }> = {
    manager: { sum: 0, count: 0 },
    performance: { sum: 0, count: 0 },
    fees: { sum: 0, count: 0 },
    operations: { sum: 0, count: 0 },
    fit: { sum: 0, count: 0 },
  }

  const buckets: Record<Verdict, ScorecardCriterion[]> = {
    strength: [],
    watch: [],
    redflag: [],
  }

  const ratings: ScorecardResult['ratings'] = []

  let totalSum = 0
  for (const criterion of CRITERIA) {
    const rating = clamp(Math.round(scores[criterion.key] ?? 0), 1, 5)
    totalSum += rating
    dimensionTotals[criterion.dimension].sum += rating
    dimensionTotals[criterion.dimension].count += 1

    const verdict: Verdict = rating >= 4 ? 'strength' : rating === 3 ? 'watch' : 'redflag'
    buckets[verdict].push(criterion)
    ratings.push({ criterion, rating, verdict })
  }

  const dimensionScores: Record<DimensionKey, number> = {
    manager: pct(dimensionTotals.manager),
    performance: pct(dimensionTotals.performance),
    fees: pct(dimensionTotals.fees),
    operations: pct(dimensionTotals.operations),
    fit: pct(dimensionTotals.fit),
  }

  // Total max = 100 (20 criteria × 5).
  const overallScore = totalSum

  return { overallScore, dimensionScores, buckets, ratings }
}

function pct({ sum, count }: { sum: number; count: number }): number {
  if (count === 0) return 0
  return Math.round(((sum / count) / 5) * 100)
}

function clamp(value: number, lo: number, hi: number): number {
  if (value < lo) return lo
  if (value > hi) return hi
  return value
}
