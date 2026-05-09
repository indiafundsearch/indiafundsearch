import type { PrimaryCategory, ProductMapPoint, RiskTier } from '@/lib/constants'

export type AccessAnswer = 'any' | 'need' | 'ok'
export type IncomeAnswer = 'any' | 'yes' | 'no'
export type RiskAnswer = 'any' | RiskTier
export type TicketAnswer = 'any' | '50L' | '1Cr' | '1.5Cr'

export type PathfinderFilters = {
  /**
   * "need" = user needs daily/weekly liquidity → filter to lockIn === 'none'.
   * "ok"   = user is fine with lock-up — does not exclude liquid products.
   *         Treated as a stated preference; permissive on filtering.
   */
  access: AccessAnswer
  /**
   * "yes" = user wants regular distributions (income only).
   * "no"  = growth-only (excludes income-oriented products).
   */
  income: IncomeAnswer
  /** Risk tolerance ladder — lower picks exclude higher-risk products. */
  risk: RiskAnswer
  /** Maximum budget bracket — products with min above this are excluded. */
  ticket: TicketAnswer
}

export const EMPTY_FILTERS: PathfinderFilters = {
  access: 'any',
  income: 'any',
  risk: 'any',
  ticket: 'any',
}

const RISK_ORDER: RiskTier[] = ['low', 'medium', 'high']

const TICKET_BUDGETS: Record<Exclude<TicketAnswer, 'any'>, number> = {
  '50L': 5_000_000,
  '1Cr': 10_000_000,
  '1.5Cr': 15_000_000,
}

export function isAnyFilterActive(f: PathfinderFilters): boolean {
  return (
    f.access !== 'any' || f.income !== 'any' || f.risk !== 'any' || f.ticket !== 'any'
  )
}

/** How many of the four questions have been answered. Used for the progress bar. */
export function answeredCount(f: PathfinderFilters): number {
  let n = 0
  if (f.access !== 'any') n++
  if (f.income !== 'any') n++
  if (f.risk !== 'any') n++
  if (f.ticket !== 'any') n++
  return n
}

export function matches(p: ProductMapPoint, f: PathfinderFilters): boolean {
  // "OK to lock" is permissive — the user is signalling tolerance, not
  // demanding only locked products. Only "need access" narrows.
  if (f.access === 'need' && p.lockIn !== 'none') return false
  if (f.income === 'yes' && !p.incomeOriented) return false
  if (f.income === 'no' && p.incomeOriented) return false
  if (f.risk !== 'any') {
    const userIdx = RISK_ORDER.indexOf(f.risk)
    const productIdx = RISK_ORDER.indexOf(p.riskTier)
    if (productIdx > userIdx) return false
  }
  if (f.ticket !== 'any') {
    if (p.minTicketAmount > TICKET_BUDGETS[f.ticket]) return false
  }
  return true
}

/**
 * Build a deep link to /explore that reflects the matched products.
 * /explore currently accepts a single `cat` param. If matches span
 * one primary category, narrow with cat=. Otherwise link to the
 * unfiltered grid.
 */
export function buildExploreHref(matched: ProductMapPoint[]): string {
  if (matched.length === 0) return '/explore'
  const cats = Array.from(new Set(matched.map((p) => p.primary))) as PrimaryCategory[]
  if (cats.length === 1) {
    const params = new URLSearchParams({ cat: cats[0] })
    return `/explore?${params.toString()}`
  }
  return '/explore'
}
