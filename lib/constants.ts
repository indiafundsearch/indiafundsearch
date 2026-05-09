export type FundCategory = 'PMS' | 'AIF Cat I' | 'AIF Cat II' | 'AIF Cat III'

export type Mode = 'simple' | 'pro'

/**
 * Top-level filter buckets shown on /explore.
 * "All" is rendered separately.
 */
export const PRIMARY_CATEGORIES = ['PMS', 'AIF'] as const

/**
 * Subcategory options per primary category, used for the level-2 filter bar.
 */
export const SUBCATEGORIES: Record<(typeof PRIMARY_CATEGORIES)[number], readonly string[]> = {
  PMS: ['Equity', 'Multi-Cap', 'Small-Mid Cap', 'Thematic', 'Sector'],
  AIF: ['Real Estate', 'Infra Debt', 'Pre-IPO', 'Long-Short', 'Credit', 'Private Equity'],
}

/**
 * Display label per category, switched by Simple/Pro toggle.
 * Keep keys here in sync with the `category` field in the fund schema.
 */
export const CATEGORY_LABELS: Record<FundCategory, { simple: string; pro: string }> = {
  PMS: { simple: 'Stock Picking Funds', pro: 'PMS' },
  'AIF Cat I': { simple: 'Early-Stage Funds', pro: 'AIF Category I' },
  'AIF Cat II': { simple: 'Private Deals Fund', pro: 'AIF Category II' },
  'AIF Cat III': { simple: 'Hedge Funds', pro: 'AIF Category III — Long Short' },
}

/**
 * Trust strip — must appear on every page that hosts a lead magnet.
 * Per CLAUDE.md, business rule #2.
 */
export const TRUST_STRIP_ITEMS = [
  'No login required',
  'No distributor commissions',
  '100% education-first',
] as const

/**
 * Site-wide footer disclaimer — business rule #1.
 */
export const FOOTER_DISCLAIMER =
  'IndiaFundSearch.com is an educational platform. We do not distribute or sell any financial products. For investment advice, consult a SEBI-registered advisor.'

/**
 * Top navigation links, shared by Header and MobileNav.
 */
export const NAV_LINKS = [
  { href: '/explore', label: 'Explore' },
  { href: '/knowledge', label: 'Learn' },
  { href: '/insights', label: 'Insights' },
  { href: '/gift-city', label: 'GIFT City' },
  { href: '/about', label: 'About' },
] as const

export const MODE_STORAGE_KEY = 'ifs:mode'
