// Deterministic layout math for the Spectrum maps, ported from the
// "Architecture of Alternatives" drawing set. Pure functions — computed
// once per render via useMemo in the map components.
import { PRODUCTS } from '@/lib/content/products'
import type { Product } from '@/lib/content/types'

/** Hand-tuned map positions (risk, liquidity) — kept separate from the
 * product spec values so the map stays legible. */
const POS: Record<string, [number, number]> = {
  mf: [55, 92], fdplus: [15, 72], dpms: [30, 62], reit: [38, 88],
  mn: [30, 46], lssif: [48, 58], pcredit: [36, 20], gift: [60, 40],
  loaif: [76, 44], pms: [70, 66], pe: [86, 8], preipo: [82, 22], vc: [95, 4],
}

export const MAP = { W: 1000, H: 640, PL: 86, PR: 30, PT: 36, PB: 78 } as const

export interface NodeRect {
  product: Product
  x: number
  y: number
  w: number
  h: number
  /** 0–1 shade of the risk swatch */
  shade: number
}

export function computeSpectrumRects(): NodeRect[] {
  const { W, H, PL, PR, PT, PB } = MAP
  const iw = W - PL - PR
  const ih = H - PT - PB
  const X = (r: number) => PL + (r / 100) * iw
  const Y = (l: number) => PT + ih - (l / 100) * ih

  const rects = PRODUCTS.map((product) => {
    const [risk, liq] = POS[product.id]
    const w = Math.min(178, 40 + product.name.length * 7.4)
    const h = 46
    let x = X(risk) - w / 2
    let y = Y(liq) - h / 2
    x = Math.max(PL + 6, Math.min(PL + iw - w - 6, x))
    y = Math.max(PT + 6, Math.min(PT + ih - h - 6, y))
    return { product, x, y, w, h, shade: 0.08 + (risk / 100) * 0.55 }
  })

  // Vertical de-collision, 8 relaxation passes (as in the source drawing)
  for (let pass = 0; pass < 8; pass++) {
    for (let i = 0; i < rects.length; i++) {
      for (let j = i + 1; j < rects.length; j++) {
        const a = rects[i]
        const b = rects[j]
        if (a.x < b.x + b.w + 6 && b.x < a.x + a.w + 6 && a.y < b.y + b.h + 6 && b.y < a.y + a.h + 6) {
          const dy = a.y <= b.y ? a.y + a.h + 7 - b.y : -(b.y + b.h + 7 - a.y)
          b.y = Math.max(PT + 6, Math.min(PT + ih - b.h - 6, b.y + dy / 1.4))
          a.y = Math.max(PT + 6, Math.min(PT + ih - a.h - 6, a.y - dy / 2.8))
        }
      }
    }
  }
  return rects
}

export interface Bubble {
  product: Product
  cx: number
  cy: number
  r: number
  fill: string
  labelX: number
  labelY: number
  /** whether a connector tick is needed from bubble to displaced label */
  tick: { y1: number; y2: number } | null
}

export const BUBBLE_LEGEND = [
  ['#013528', 'AIF structures'],
  ['#C08A2E', 'PMS'],
  ['#FF862F', 'GIFT / Global'],
  ['#7A8B7F', 'Listed & deposits'],
] as const

export function computeOutcomeBubbles(): Bubble[] {
  const { W, H, PL, PB } = MAP
  const PR = 36
  const PT2 = 48
  const iw = W - PL - PR
  const ih = H - PT2 - PB
  const X0 = 5, X1 = 33, Y0 = 0, Y1 = 11
  const X = (v: number) => PL + ((v - X0) / (X1 - X0)) * iw
  const Y = (v: number) => PT2 + ih - ((v - Y0) / (Y1 - Y0)) * ih

  const nodes = PRODUCTS.map((product) => {
    const cx = X(product.mid)
    const cy = Y(product.yrs)
    const r = 11 + 4.2 * Math.log10(Math.max(product.minL, 0.01) * 100 + 1)
    const fill = product.badge.includes('AIF')
      ? '#013528'
      : product.badge === 'PMS'
        ? '#C08A2E'
        : product.badge.includes('GIFT')
          ? '#FF862F'
          : '#7A8B7F'
    return { product, cx, cy, r, fill, w: product.name.length * 6.5 + 10, h: 15, lx: cx, ly: cy - r - 10 }
  })

  const clampY = (y: number) => Math.max(PT2 + 13, Math.min(PT2 + ih - 5, y))
  nodes.forEach((n) => (n.ly = clampY(n.ly)))
  for (let pass = 0; pass < 24; pass++) {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i]
        const b = nodes[j]
        const overlapX = Math.abs(a.lx - b.lx) < (a.w + b.w) / 2 + 3
        const gap = a.ly - b.ly
        if (overlapX && Math.abs(gap) < a.h + 3) {
          const push = (a.h + 3 - Math.abs(gap)) / 2 + 0.4
          if (gap <= 0) {
            a.ly = clampY(a.ly - push)
            b.ly = clampY(b.ly + push)
          } else {
            a.ly = clampY(a.ly + push)
            b.ly = clampY(b.ly - push)
          }
        }
      }
    }
  }

  return nodes.map((n) => {
    let tick: Bubble['tick'] = null
    if (Math.abs(n.ly - (n.cy - n.r - 10)) > 4) {
      const above = n.ly < n.cy
      const y1 = above ? n.cy - n.r : n.cy + n.r
      const y2 = above ? n.ly + 2 : n.ly - 9
      if (Math.abs(y2 - y1) > 3) tick = { y1, y2 }
    }
    return { product: n.product, cx: n.cx, cy: n.cy, r: n.r, fill: n.fill, labelX: n.lx, labelY: n.ly, tick }
  })
}

export const OUTCOME_MAP = { PL: 86, PR: 36, PT: 48, PB: 78, X0: 5, X1: 33, Y0: 0, Y1: 11 } as const
