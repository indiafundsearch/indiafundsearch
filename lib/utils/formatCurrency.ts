/**
 * Indian number formatting (₹1,00,000 instead of ₹100,000).
 * Business rule #9 in CLAUDE.md.
 */
export function formatINR(value: number, options: { compact?: boolean; decimals?: number } = {}) {
  const { compact = false, decimals = 0 } = options
  if (!Number.isFinite(value)) return '—'

  if (compact) {
    if (value >= 1_00_00_000) return `₹${(value / 1_00_00_000).toFixed(decimals || 2)} Cr`
    if (value >= 1_00_000) return `₹${(value / 1_00_000).toFixed(decimals || 2)} L`
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value)
}

/**
 * Plain Indian-grouped number without the ₹ prefix.
 */
export function formatIndianNumber(value: number, decimals = 0) {
  if (!Number.isFinite(value)) return '—'
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value)
}

/**
 * USD compact formatter — used for GIFT City IFSC funds whose mins/AUM
 * are quoted in dollars. Mirrors formatINR's compact behaviour: K / M.
 */
export function formatUSD(value: number, options: { compact?: boolean; decimals?: number } = {}) {
  const { compact = false, decimals = 0 } = options
  if (!Number.isFinite(value)) return '—'
  if (compact) {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(decimals || 2)}M`
    if (value >= 1_000) return `$${Math.round(value / 1_000)}K`
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value)
}

/**
 * Currency-aware compact formatter. Routes to formatINR or formatUSD based
 * on the fund's currency setting (defaults to INR).
 */
export function formatMoney(
  value: number,
  currency: 'INR' | 'USD' | string | undefined,
  options: { compact?: boolean; decimals?: number } = {},
) {
  if (currency === 'USD') return formatUSD(value, options)
  return formatINR(value, options)
}
