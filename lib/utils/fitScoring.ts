// Fit Finder scoring — ported verbatim from the Architecture of Alternatives
// drawing set. Pure function: seven answers in, ranked shortlist out.
import { PRODUCTS } from '@/lib/content/products'
import { FIT_PROFILES } from '@/lib/content/fitFinder'
import type { Product } from '@/lib/content/types'

export interface FitAnswers {
  obj: 'pres' | 'inc' | 'bal' | 'grow' | 'frontier'
  hz: 1 | 2 | 3 | 4
  risk: 1 | 2 | 3 | 4
  /** 4 = needs exit in days … 1 = 5+ years fine */
  lock: 1 | 2 | 3 | 4
  cf: boolean
  /** deployment size proxy in ₹ L (9 / 49 / 99 / 500) */
  ticket: number
  res: 'res' | 'nri'
}

export interface FitResult {
  product: Product
  score: number
  why: string[]
}

export function scoreFit(a: FitAnswers): FitResult[] {
  return PRODUCTS.map((product) => {
    const f = FIT_PROFILES[product.id]
    let sc = 0
    const why: string[] = []

    // Objective (heaviest)
    const ob = f.obj[a.obj] ?? 0
    sc += ob * 3
    if (ob >= 3) why.push('Directly serves your stated objective')

    // Horizon
    if (f.hz.includes(a.hz)) {
      sc += 4
    } else {
      const d = Math.min(...f.hz.map((h) => Math.abs(h - a.hz)))
      sc -= d * 2
      if (d >= 2) why.push('Horizon shorter than this structure needs')
    }

    // Risk distance
    const rd = Math.abs(f.risk - a.risk)
    sc += (4 - rd) * 1.6
    if (rd >= 3) why.push('Risk profile is a stretch from your comfort')

    // Liquidity vs lock-in need
    if (a.lock >= 4 && f.liq <= 1) {
      sc -= 6
      why.push('You need quick exit; this locks capital')
    } else if (a.lock <= 1 && f.liq <= 1) {
      sc += 3
      why.push('Your patience unlocks this structure')
    } else {
      sc += f.liq >= a.lock - 1 ? 2 : -1
    }

    // Cashflow preference
    if (a.cf === true) {
      if (f.cf) {
        sc += 3
        why.push('Pays regular cashflow, as you wanted')
      } else {
        sc -= 3
      }
    } else if (!f.cf) {
      sc += 1.5
    }

    // Ticket vs SEBI minimum (both in ₹ L)
    if (a.ticket < product.minL - 0.001) {
      sc -= 100
      why.push('Below the SEBI minimum for this structure')
    } else {
      sc += 1.5
    }

    return { product, score: sc, why: why.slice(0, 3) }
  })
    .filter((x) => x.score > -50)
    .sort((x, y) => y.score - x.score)
}

export const OBJECTIVE_NAMES: Record<FitAnswers['obj'], string> = {
  pres: 'capital preservation',
  inc: 'regular income',
  bal: 'balanced growth',
  grow: 'aggressive growth',
  frontier: 'a frontier allocation',
}

export const HORIZON_NAMES: Record<FitAnswers['hz'], string> = {
  1: 'a 1–3 year',
  2: 'a 3–5 year',
  3: 'a 5–7 year',
  4: 'a 7+ year',
}
