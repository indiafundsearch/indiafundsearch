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
