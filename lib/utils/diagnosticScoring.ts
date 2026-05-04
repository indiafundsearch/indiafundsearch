/**
 * Diagnostic — 12-question readiness assessment for PMS / AIF.
 *
 * Each answer maps to 0-10 points. Total raw score is 0-120; we normalise
 * to 0-100. Per-dimension subtotals (0-30 raw → 0-100 normalised) feed
 * the radar chart on the result screen.
 *
 * Per CLAUDE.md business rule #3, Verdict A ("Not Yet. And That's a
 * Strength.") MUST exist — it is the core trust differentiator.
 */

export type Dimension = 'capital' | 'liquidity' | 'risk' | 'knowledge'

export type AnswerOption = {
  value: string
  label: string
  points: number
}

export type Question = {
  id: string
  dimension: Dimension
  prompt: string
  helper?: string
  options: AnswerOption[]
}

export const DIMENSION_LABELS: Record<Dimension, string> = {
  capital: 'Capital Structure',
  liquidity: 'Liquidity & Timeline',
  risk: 'Risk Architecture',
  knowledge: 'Knowledge',
}

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    dimension: 'capital',
    prompt: 'What is your total investable surplus (excluding home and emergency fund)?',
    options: [
      { value: 'under-10', label: 'Under ₹10 L', points: 0 },
      { value: '10-25', label: '₹10–25 L', points: 2 },
      { value: '25-50', label: '₹25–50 L', points: 4 },
      { value: '50-100', label: '₹50 L–1 Cr', points: 7 },
      { value: '100-500', label: '₹1–5 Cr', points: 9 },
      { value: '500-plus', label: '₹5 Cr+', points: 10 },
    ],
  },
  {
    id: 'q2',
    dimension: 'capital',
    prompt: 'How much of your investable surplus is in FDs and savings?',
    options: [
      { value: 'over-80', label: 'Over 80%', points: 0 },
      { value: '50-80', label: '50–80%', points: 3 },
      { value: '20-50', label: '20–50%', points: 7 },
      { value: 'under-20', label: 'Under 20%', points: 10 },
    ],
  },
  {
    id: 'q3',
    dimension: 'capital',
    prompt: 'What is your existing mutual fund / direct equity portfolio worth?',
    options: [
      { value: 'none', label: 'None', points: 0 },
      { value: 'under-10', label: 'Under ₹10 L', points: 3 },
      { value: '10-50', label: '₹10–50 L', points: 7 },
      { value: 'over-50', label: 'Over ₹50 L', points: 10 },
    ],
  },
  {
    id: 'q4',
    dimension: 'liquidity',
    prompt: 'Do you have major expenses planned in the next 3 years (home, education, medical, business)?',
    options: [
      { value: 'major', label: 'Yes — major (₹25 L+)', points: 0 },
      { value: 'moderate', label: 'Yes — moderate', points: 5 },
      { value: 'no', label: 'No, nothing material', points: 10 },
    ],
  },
  {
    id: 'q5',
    dimension: 'liquidity',
    prompt: 'How would you describe your income stability?',
    options: [
      { value: 'salaried', label: 'Salaried, predictable', points: 8 },
      { value: 'business-stable', label: 'Business — stable cash flows', points: 9 },
      { value: 'business-variable', label: 'Business — variable cash flows', points: 5 },
      { value: 'retired', label: 'Retired / reliant on portfolio', points: 6 },
    ],
  },
  {
    id: 'q6',
    dimension: 'liquidity',
    prompt: 'How long can you genuinely lock money away without needing it back?',
    options: [
      { value: 'under-1', label: 'Under 1 year', points: 0 },
      { value: '1-3', label: '1–3 years', points: 3 },
      { value: '3-5', label: '3–5 years', points: 6 },
      { value: '5-7', label: '5–7 years', points: 9 },
      { value: '7-plus', label: '7 years+', points: 10 },
    ],
  },
  {
    id: 'q7',
    dimension: 'risk',
    prompt: 'What is the largest portfolio drop you\'ve experienced — and how did you actually react?',
    options: [
      { value: 'never', label: 'Never seen >10% — no real test yet', points: 3 },
      { value: 'panic-sold', label: 'Saw a big drop and sold', points: 0 },
      { value: 'held-stress', label: 'Held but lost sleep', points: 5 },
      { value: 'stayed-calm', label: 'Stayed calm, kept SIPs', points: 9 },
      { value: 'added-more', label: 'Added more during the drop', points: 10 },
    ],
  },
  {
    id: 'q8',
    dimension: 'risk',
    prompt: 'How concentrated is your existing equity portfolio?',
    options: [
      { value: 'single-stock', label: 'Heavy in 1–2 single stocks', points: 2 },
      { value: 'sector-heavy', label: 'Concentrated in one sector', points: 4 },
      { value: 'diversified', label: 'Diversified across cap + sector', points: 9 },
      { value: 'unknown', label: 'I genuinely don\'t know', points: 0 },
    ],
  },
  {
    id: 'q9',
    dimension: 'risk',
    prompt: 'A 3–5 year lock-in with quarterly statements only — how do you feel?',
    options: [
      { value: 'very-uncomfortable', label: 'Very uncomfortable', points: 0 },
      { value: 'somewhat', label: 'Somewhat — would need handholding', points: 4 },
      { value: 'comfortable', label: 'Comfortable, this is fine', points: 8 },
      { value: 'prefer-longer', label: 'I prefer longer lock-ins', points: 10 },
    ],
  },
  {
    id: 'q10',
    dimension: 'knowledge',
    prompt: 'Could you explain the difference between PMS and AIF to a friend right now?',
    options: [
      { value: 'confidently', label: 'Yes, confidently', points: 10 },
      { value: 'roughly', label: 'Roughly', points: 6 },
      { value: 'not-really', label: 'Not really', points: 2 },
      { value: 'never-heard', label: 'Never heard of one of them', points: 0 },
    ],
  },
  {
    id: 'q11',
    dimension: 'knowledge',
    prompt: 'Do you currently work with a SEBI-registered advisor?',
    options: [
      { value: 'fee-only', label: 'Yes — fee-only RIA', points: 10 },
      { value: 'distributor', label: 'Yes — distributor / commission-based', points: 5 },
      { value: 'self-directed', label: 'No — I\'m self-directed', points: 4 },
      { value: 'unsure', label: 'What\'s the difference?', points: 0 },
    ],
  },
  {
    id: 'q12',
    dimension: 'knowledge',
    prompt: 'Have you ever read a PMS factsheet or an AIF Private Placement Memorandum (PPM)?',
    options: [
      { value: 'multiple', label: 'Yes — multiple', points: 10 },
      { value: 'one', label: 'Yes — one', points: 6 },
      { value: 'no', label: 'No', points: 2 },
      { value: 'whats-ppm', label: 'What is a PPM?', points: 0 },
    ],
  },
]

export type AnswerMap = Record<string, string>

export type DiagnosticResult = {
  score: number
  dimensionScores: Record<Dimension, number>
  weakestDimensions: Dimension[]
  verdictKey: 'A' | 'B' | 'C' | 'D'
  verdict: VerdictMeta
}

export type VerdictMeta = {
  key: 'A' | 'B' | 'C' | 'D'
  headline: string
  subhead: string
  body: string
  bullets: string[]
  tone: 'caution' | 'progress' | 'ready' | 'advanced'
}

const VERDICTS: Record<'A' | 'B' | 'C' | 'D', VerdictMeta> = {
  A: {
    key: 'A',
    headline: 'Not Yet. And That\'s a Strength.',
    subhead: 'You don\'t need PMS or AIF right now — and saying no is the highest-leverage move you can make.',
    tone: 'caution',
    body: 'Most people in your spot are sold products that compound costs faster than returns. Build the foundation first; the alternatives market will still be here in 18 months.',
    bullets: [
      'Build a 6–12 month emergency fund in a liquid debt MF before locking anything away.',
      'Start a ₹25–50K monthly SIP into 3 broad equity index funds — keep it boring and on autopilot.',
      'Read one annual report cover-to-cover every quarter. Pick a business you already use.',
      'Revisit this Diagnostic in 12–18 months once your investable surplus crosses ₹25 L outside FDs.',
    ],
  },
  B: {
    key: 'B',
    headline: 'Almost. Close Two Gaps First.',
    subhead: 'You\'re close, but two dimensions need work before sophisticated products are worth the cost.',
    tone: 'progress',
    body: 'PMS and AIF aren\'t banned for you — they\'re just not where the next ₹1 L of effort buys the most. Close the highlighted gaps and the picture changes fast.',
    bullets: [
      'The radar above shows your two weakest dimensions. Build there first.',
      'If liquidity is weak: shorten lock-in horizon by clearing planned expenses or building reserves.',
      'If knowledge is weak: read a real PMS factsheet and a real AIF PPM end-to-end before any meeting.',
      'Re-take the Diagnostic in 6 months — most people in this band cross into Verdict C with one focused quarter.',
    ],
  },
  C: {
    key: 'C',
    headline: 'Ready for PMS.',
    subhead: 'You have the surplus, the time horizon, and the discipline. PMS is on the table — AIF is not yet.',
    tone: 'ready',
    body: 'A concentrated, fee-transparent PMS in your conviction style fits your profile. Skip AIF until you\'ve experienced a full PMS cycle.',
    bullets: [
      'Anchor on a 25–35 stock multi-cap or quality-compounder PMS. Avoid thematic on first allocation.',
      'Insist on 5+ year disclosed performance through at least one drawdown.',
      'Cap fees: aim for ≤1.5% mgmt + 15% perf above a 10% hurdle. Anything richer needs justification.',
      'Take five questions to your first meeting — ask about manager co-investment, churn, and exit terms.',
      'Run the Fee X-Ray with the actual fund\'s fees before signing anything.',
    ],
  },
  D: {
    key: 'D',
    headline: 'Ready for PMS + AIF.',
    subhead: 'Surplus, horizon, and risk architecture all check out. Build a layered allocation across both.',
    tone: 'advanced',
    body: 'You\'re in the small minority who can carry illiquid positions. The risk now is over-allocation — concentration kills more wealth than missed opportunity.',
    bullets: [
      'Cap any single AIF at 15% of investable surplus. Total alternatives ≤ 35%.',
      'Pair a quality-compounder PMS with a single Cat II AIF (PE / pre-IPO / RE credit) for asymmetric exposure.',
      'Keep ₹50 L–₹1 Cr in liquid public-market instruments for vintage diversification across funds.',
      'For NRIs / high-tax brackets: GIFT City structures merit a separate conversation.',
      'Run every fund through the Fee X-Ray and Scorecard before allocating.',
    ],
  },
}

export function calculateDiagnostic(answers: AnswerMap): DiagnosticResult | null {
  // Need every question answered.
  if (QUESTIONS.some((q) => !answers[q.id])) return null

  const dimensionRaw: Record<Dimension, number> = {
    capital: 0,
    liquidity: 0,
    risk: 0,
    knowledge: 0,
  }
  let total = 0

  for (const question of QUESTIONS) {
    const answerValue = answers[question.id]
    const option = question.options.find((o) => o.value === answerValue)
    const points = option?.points ?? 0
    dimensionRaw[question.dimension] += points
    total += points
  }

  // Each dimension has 3 questions × 10 points = 30 raw max.
  const dimensionScores: Record<Dimension, number> = {
    capital: Math.round((dimensionRaw.capital / 30) * 100),
    liquidity: Math.round((dimensionRaw.liquidity / 30) * 100),
    risk: Math.round((dimensionRaw.risk / 30) * 100),
    knowledge: Math.round((dimensionRaw.knowledge / 30) * 100),
  }

  // Total max = 120; normalise to 100.
  const score = Math.round((total / 120) * 100)

  const verdictKey = score <= 30 ? 'A' : score <= 50 ? 'B' : score <= 70 ? 'C' : 'D'

  const dims = Object.entries(dimensionScores)
    .sort(([, a], [, b]) => a - b)
    .map(([k]) => k as Dimension)
  const weakestDimensions = dims.slice(0, 2)

  return {
    score,
    dimensionScores,
    weakestDimensions,
    verdictKey,
    verdict: VERDICTS[verdictKey],
  }
}
