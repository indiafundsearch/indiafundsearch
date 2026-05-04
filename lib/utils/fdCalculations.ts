/**
 * FD Visualiser math.
 *
 * Hero formula (per Phase 2 §1 spec):
 *   FD nominal return:    7% gross
 *   Post-tax return:      grossRate × (1 - taxRate)
 *   Real return:          postTaxRate − inflationRate
 *   Final value:          principal × (1 + realRate) ** years
 *
 * Comparison table tracks (gross, tax treatment):
 *   FD              7%    slab        — interest taxed at slab
 *   Debt MF         8.5%  slab        — taxed at slab post FY24
 *   Balanced PMS    14%   12.5% LTCG  — pass-through, equity-oriented
 *   Equity PMS      18%   12.5% LTCG  — held > 1y
 *
 * All comparison numbers are real (post-tax, post-inflation, 10 years) so the
 * relative scale matches the hero number.
 */

export const FD_GROSS = 0.07
export const DEBT_MF_GROSS = 0.085
export const BALANCED_PMS_GROSS = 0.14
export const EQUITY_PMS_GROSS = 0.18

export const LTCG_RATE = 0.125
export const INFLATION = 0.055
export const HORIZON_YEARS = 10

export type TaxBracket = 0.2 | 0.3

export function realValueAfter(
  principal: number,
  grossRate: number,
  taxRate: number,
  inflation: number = INFLATION,
  years: number = HORIZON_YEARS,
) {
  const postTax = grossRate * (1 - taxRate)
  const real = postTax - inflation
  return principal * (1 + real) ** years
}

export type Track = {
  key: 'fd' | 'debtMf' | 'balancedPms' | 'equityPms'
  label: string
  grossRate: number
  taxNote: string
  /** Effective tax for this track. */
  taxRate: number
}

export function buildTracks(slab: TaxBracket): Track[] {
  return [
    {
      key: 'fd',
      label: 'FD',
      grossRate: FD_GROSS,
      taxNote: `${(slab * 100).toFixed(0)}% slab`,
      taxRate: slab,
    },
    {
      key: 'debtMf',
      label: 'Debt MF',
      grossRate: DEBT_MF_GROSS,
      taxNote: `${(slab * 100).toFixed(0)}% slab`,
      taxRate: slab,
    },
    {
      key: 'balancedPms',
      label: 'Balanced PMS',
      grossRate: BALANCED_PMS_GROSS,
      taxNote: '12.5% LTCG',
      taxRate: LTCG_RATE,
    },
    {
      key: 'equityPms',
      label: 'Equity PMS',
      grossRate: EQUITY_PMS_GROSS,
      taxNote: '12.5% LTCG',
      taxRate: LTCG_RATE,
    },
  ]
}
