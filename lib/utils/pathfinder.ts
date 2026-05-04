/**
 * Pathfinder eligibility — given a (surplus, goal, lock-in) tuple, returns a
 * fit verdict per stage on the wealth ladder. Used by Pathfinder UI on
 * /knowledge to highlight which products to look at first.
 *
 * The rules below are heuristics, not advice. Conservative by default —
 * "partial" is preferred over "fit" when in doubt.
 */

export type Surplus = 'under-10' | '10-25' | '25-50' | '50-100' | '100-plus'
export type Goal = 'preservation' | 'income' | 'growth' | 'inflation' | 'upside'
export type Lockin = 'short' | 'medium' | 'long' | 'very-long'

export type PathfinderAnswer = {
  surplus: Surplus
  goal: Goal
  lockin: Lockin
}

export type Verdict = 'fit' | 'partial' | 'not-fit'

const SURPLUS_LAKHS: Record<Surplus, number> = {
  'under-10': 5,
  '10-25': 15,
  '25-50': 35,
  '50-100': 75,
  '100-plus': 200,
}

const LOCKIN_YEARS: Record<Lockin, number> = {
  short: 1,
  medium: 3,
  long: 6,
  'very-long': 10,
}

/**
 * Verdict per stage. Stage keys match productMapData.STAGES.
 */
export function evaluatePathfinder(answer: PathfinderAnswer): Record<string, Verdict> {
  const surplusL = SURPLUS_LAKHS[answer.surplus]
  const horizonY = LOCKIN_YEARS[answer.lockin]
  const { goal } = answer

  return {
    fd: pickFD(goal, horizonY),
    'debt-mf': pickDebtMF(goal, horizonY),
    'equity-mf': pickEquityMF(goal, horizonY),
    sif: pickSIF(surplusL, goal, horizonY),
    pms: pickPMS(surplusL, goal, horizonY),
    'aif-2': pickAIFCatII(surplusL, goal, horizonY),
    'aif-3': pickAIFCatIII(surplusL, goal, horizonY),
    gift: pickGIFT(surplusL),
  }
}

function pickFD(goal: Goal, horizon: number): Verdict {
  if (goal === 'preservation') return 'fit'
  if (goal === 'income' && horizon <= 3) return 'fit'
  if (goal === 'growth' || goal === 'inflation' || goal === 'upside') return 'not-fit'
  return 'partial'
}

function pickDebtMF(goal: Goal, horizon: number): Verdict {
  if (goal === 'income' || goal === 'preservation') return 'fit'
  if (goal === 'inflation' && horizon >= 3) return 'partial'
  return 'not-fit'
}

function pickEquityMF(goal: Goal, horizon: number): Verdict {
  if (horizon < 3) return 'not-fit'
  if (goal === 'growth' || goal === 'inflation') return 'fit'
  if (goal === 'upside') return 'partial'
  return 'not-fit'
}

function pickSIF(surplus: number, goal: Goal, horizon: number): Verdict {
  if (surplus < 10) return 'not-fit'
  if (horizon < 3) return 'partial'
  if (goal === 'growth' || goal === 'upside') return 'fit'
  if (goal === 'inflation') return 'partial'
  return 'not-fit'
}

function pickPMS(surplus: number, goal: Goal, horizon: number): Verdict {
  if (surplus < 50) return 'not-fit'
  if (horizon < 3) return 'not-fit'
  if (goal === 'growth' || goal === 'upside') return 'fit'
  if (goal === 'inflation') return 'partial'
  return 'not-fit'
}

function pickAIFCatII(surplus: number, goal: Goal, horizon: number): Verdict {
  if (surplus < 100) return 'not-fit'
  if (horizon < 6) return 'not-fit'
  if (goal === 'upside' || goal === 'growth') return 'fit'
  if (goal === 'income') return 'partial'
  return 'not-fit'
}

function pickAIFCatIII(surplus: number, goal: Goal, horizon: number): Verdict {
  if (surplus < 100) return 'not-fit'
  if (horizon < 3) return 'partial'
  if (goal === 'upside') return 'fit'
  if (goal === 'growth') return 'partial'
  return 'not-fit'
}

function pickGIFT(surplus: number): Verdict {
  if (surplus < 25) return 'not-fit'
  if (surplus < 50) return 'partial'
  return 'fit'
}
