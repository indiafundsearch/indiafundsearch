/**
 * Fee X-Ray calculation engine.
 *
 * Year-by-year simulation that decomposes a PMS / AIF fee structure into:
 *   - Management fee (% of period-end pre-fee AUM)
 *   - Performance fee (% of returns above hurdle)
 *   - Brokerage (estimated 0.5% turnover drag on AUM)
 *   - GST (18% on management + performance fees)
 *   - Custody / audit (flat ₹25,000 per year)
 *
 * Returns three things consumers can drive charts off:
 *   - timeSeries[]   — gross / net / index value at each year (Fee Drag chart)
 *   - waterfall      — total ₹ paid in each fee bucket over the horizon
 *   - summary        — total fees, net CAGR, breakeven alpha
 */

export const BROKERAGE_DRAG = 0.005 // 0.5% of AUM, annual
export const GST_ON_FEES = 0.18 // 18%
export const CUSTODY_AUDIT_FLAT = 25_000 // ₹/year
export const INDEX_EXPENSE_RATIO = 0.005 // 0.5% — proxy for an index ETF

export const FEE_PRESETS = {
  fixed: {
    label: 'Fixed only',
    description: '2.5% management, no performance fee',
    managementFee: 2.5,
    performanceFee: 0,
    hurdleRate: 0,
    exitLoad: 1,
  },
  hybrid: {
    label: 'Hybrid',
    description: '1.5% mgmt + 15% perf above 10% hurdle',
    managementFee: 1.5,
    performanceFee: 15,
    hurdleRate: 10,
    exitLoad: 1,
  },
  performance: {
    label: 'Performance only',
    description: '0% mgmt + 20% perf above 8% hurdle',
    managementFee: 0,
    performanceFee: 20,
    hurdleRate: 8,
    exitLoad: 2,
  },
} as const

export type FeePresetKey = keyof typeof FEE_PRESETS

export type FeeStructure = {
  managementFee: number
  performanceFee: number
  hurdleRate: number
  exitLoad: number
}

export type FeeXRayInput = {
  amount: number
  grossCAGR: number
  years: number
  fees: FeeStructure
}

export type YearPoint = {
  year: number
  gross: number
  net: number
  index: number
}

export type WaterfallBucket = {
  key: 'management' | 'performance' | 'brokerage' | 'gst' | 'custody'
  label: string
  amount: number
}

export type FeeXRaySummary = {
  totalFees: number
  netFinal: number
  grossFinal: number
  indexFinal: number
  netCAGR: number
  breakevenAlpha: number
  exitLoadAtExit: number
}

export type FeeXRayResult = {
  timeSeries: YearPoint[]
  waterfall: WaterfallBucket[]
  summary: FeeXRaySummary
}

export function calculateFees(input: FeeXRayInput): FeeXRayResult {
  const { amount, grossCAGR, years, fees } = input
  const grossRate = grossCAGR / 100
  const mgmtRate = fees.managementFee / 100
  const perfRate = fees.performanceFee / 100
  const hurdleRate = fees.hurdleRate / 100

  let netValue = amount
  let grossValue = amount
  let indexValue = amount

  let mgmtTotal = 0
  let perfTotal = 0
  let brokerageTotal = 0
  let gstTotal = 0
  let custodyTotal = 0

  const timeSeries: YearPoint[] = [
    { year: 0, gross: amount, net: amount, index: amount },
  ]

  for (let y = 1; y <= years; y += 1) {
    // Pre-fee growth on previous year's net value (this is what fees attach to).
    const preFee = netValue * (1 + grossRate)
    const grossReturn = preFee - netValue

    // Management fee on period-end pre-fee AUM.
    const mgmt = preFee * mgmtRate

    // Brokerage drag (turnover proxy).
    const brokerage = preFee * BROKERAGE_DRAG

    // Performance fee on returns above hurdle (simple, not catch-up).
    const hurdleReturn = netValue * hurdleRate
    const excessReturn = Math.max(0, grossReturn - hurdleReturn)
    const perf = excessReturn * perfRate

    // GST on management + performance fees only (brokerage carries its own).
    const gst = (mgmt + perf) * GST_ON_FEES

    // Flat custody / audit.
    const custody = CUSTODY_AUDIT_FLAT

    const periodFees = mgmt + brokerage + perf + gst + custody
    netValue = preFee - periodFees

    // Track parallel paths.
    grossValue = grossValue * (1 + grossRate)
    indexValue = indexValue * (1 + grossRate - INDEX_EXPENSE_RATIO)

    mgmtTotal += mgmt
    perfTotal += perf
    brokerageTotal += brokerage
    gstTotal += gst
    custodyTotal += custody

    timeSeries.push({
      year: y,
      gross: round(grossValue),
      net: round(netValue),
      index: round(indexValue),
    })
  }

  // Exit load applies on the way out, computed against the final net value.
  const exitLoad = netValue * (fees.exitLoad / 100)
  netValue -= exitLoad

  // Patch the last point with the post-exit net value.
  timeSeries[timeSeries.length - 1].net = round(netValue)

  const totalFees = mgmtTotal + perfTotal + brokerageTotal + gstTotal + custodyTotal + exitLoad
  const netCAGR = years > 0 ? Math.pow(netValue / amount, 1 / years) - 1 : 0
  const breakevenAlpha = grossRate - netCAGR

  const waterfall: WaterfallBucket[] = [
    { key: 'management', label: 'Management', amount: round(mgmtTotal) },
    { key: 'performance', label: 'Performance', amount: round(perfTotal) },
    { key: 'brokerage', label: 'Brokerage (0.5%)', amount: round(brokerageTotal) },
    { key: 'gst', label: 'GST (18%)', amount: round(gstTotal) },
    { key: 'custody', label: 'Custody / audit', amount: round(custodyTotal) },
  ]

  return {
    timeSeries,
    waterfall,
    summary: {
      totalFees: round(totalFees),
      netFinal: round(netValue),
      grossFinal: round(grossValue),
      indexFinal: round(indexValue),
      netCAGR,
      breakevenAlpha,
      exitLoadAtExit: round(exitLoad),
    },
  }
}

function round(value: number): number {
  return Math.round(value)
}
