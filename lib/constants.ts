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

/**
 * Subcategory educational copy. Surfaces as a banner on /explore when a
 * specific subcategory filter is active. Switched by Simple/Pro toggle.
 *
 * Keys must exactly match the values in SUBCATEGORIES above.
 */
export const SUB_INFO: Record<string, { simple: string; pro: string }> = {
  // PMS subs
  Equity: {
    simple: 'Stock Portfolios = a pro picks Indian stocks for your demat account. Min ₹50L. You see every name.',
    pro: 'PMS Equity = SEBI-regulated discretionary management of listed Indian equities held in client demat. Min ₹50L.',
  },
  'Multi-Cap': {
    simple: 'Multi-Cap = large, mid and small companies in one strategy. The manager flexes to where the opportunity is.',
    pro: 'PMS Multi-Cap = discretionary mandate spanning large-/mid-/small-cap with no fixed bucket weights. Active sizing by manager.',
  },
  'Small-Mid Cap': {
    simple: 'Small-Mid Cap = smaller, less-followed companies. Higher upside, higher swings.',
    pro: 'PMS Small-Mid Cap = concentrated exposure to companies ranked below the top 100 by market cap. Higher dispersion, longer holds.',
  },
  Thematic: {
    simple: 'Thematic = a bet on a single idea (consumption, manufacturing, etc.). Win big or lose if the theme shifts.',
    pro: 'PMS Thematic = concentrated portfolio aligned to a single sector or megatrend thesis. Higher tracking error.',
  },
  Sector: {
    simple: 'Sector = a bet on one industry — banking, IT, pharma. Best for someone with an already-balanced core.',
    pro: 'PMS Sector = single-sector mandate with concentrated industry exposure. Suits investors with a diversified core elsewhere.',
  },
  // AIF subs
  'Real Estate': {
    simple: 'Real Estate Funds = pool money to back buildings, projects and rental income. Long lock-up, real assets behind your money.',
    pro: 'AIF Cat II Real Estate = pooled vehicle in stabilized assets, development equity or yield debt. Closed-ended, 5–8 year lock-up.',
  },
  'Infra Debt': {
    simple: 'Infra Debt = lend to big infrastructure projects (power, roads). Aim is steady yield over years.',
    pro: 'AIF Cat II Infra Debt = senior-secured infra loans with rated underlying. Yield-driven, longer-duration instruments.',
  },
  'Pre-IPO': {
    simple: 'Pre-IPO = buy shares in companies just before they list on the stock market. Lock-up ends at IPO.',
    pro: 'AIF Cat II Pre-IPO = late-stage equity 12–24 months from listing. Liquidity tied to IPO event; valuation via 409A.',
  },
  'Long-Short': {
    simple: 'Long-Short = bet on stocks rising AND falling. Try to make money even when the market drops.',
    pro: 'AIF Cat III Long-Short = hedge-style strategy using leverage and derivatives. Absolute-return or market-neutral mandates.',
  },
  Credit: {
    simple: 'Private Credit = lend to companies that want flexible terms. Higher interest, more diligence required up front.',
    pro: 'AIF Cat II Credit = senior-secured private debt to mid-market corporates. Yield premium over public credit.',
  },
  'Private Equity': {
    simple: 'Private Equity = buy big stakes in private companies. 5–10 year hold. Exit via IPO or strategic sale.',
    pro: 'AIF Cat II PE = growth-stage private equity with control or significant minority positions. IPO / M&A exits.',
  },
}

/**
 * Sort options surfaced in the /explore sort dropdown.
 */
export const FUND_SORTS = [
  { value: 'default', label: 'Curated order' },
  { value: 'returns', label: 'Returns · highest' },
  { value: 'aum', label: 'AUM · largest' },
  { value: 'vintage_new', label: 'Vintage · newest' },
  { value: 'vintage_old', label: 'Vintage · oldest' },
  { value: 'name', label: 'Name · A → Z' },
] as const

export type FundSort = (typeof FUND_SORTS)[number]['value']
