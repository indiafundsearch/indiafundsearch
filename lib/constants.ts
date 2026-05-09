export type FundCategory = 'PMS' | 'AIF Cat I' | 'AIF Cat II' | 'AIF Cat III' | 'GIFT City'

export type Mode = 'simple' | 'pro'

/**
 * Top-level filter buckets shown on /explore.
 * "All" is rendered separately.
 */
export const PRIMARY_CATEGORIES = ['PMS', 'AIF', 'GIFT City'] as const

export type PrimaryCategory = (typeof PRIMARY_CATEGORIES)[number]

/**
 * Display labels for the primary pill row, switched by Simple/Pro toggle.
 */
export const PRIMARY_LABELS: Record<PrimaryCategory | 'All', { simple: string; pro: string }> = {
  All: { simple: 'All funds', pro: 'All funds' },
  PMS: { simple: 'Managed Portfolios', pro: 'PMS' },
  AIF: { simple: 'Alternative Funds', pro: 'AIF' },
  'GIFT City': { simple: 'NRI & Global Access', pro: 'GIFT City' },
}

/**
 * Subcategory options per primary category, used for the level-2 filter
 * row. Stored values are the canonical/Pro names; SUBCATEGORY_LABELS
 * maps each to a Simple display variant.
 */
export const SUBCATEGORIES: Record<PrimaryCategory, readonly string[]> = {
  PMS: ['Equity', 'Debt', 'Multi Asset'],
  AIF: [
    'Cat I — VC',
    'Cat II — PE',
    'Cat II — Credit',
    'Cat II — RE & Infra',
    'Cat II — Pre-IPO',
    'Cat III — Long Short',
  ],
  'GIFT City': ['Inbound — India', 'Outbound — Global'],
}

/**
 * Display labels per subcategory, switched by Simple/Pro toggle.
 * Keys must match the canonical (Pro) values in SUBCATEGORIES.
 */
export const SUBCATEGORY_LABELS: Record<string, { simple: string; pro: string }> = {
  // PMS
  Equity: { simple: 'Stock Portfolios', pro: 'Equity' },
  Debt: { simple: 'Lending & Bond Portfolios', pro: 'Debt' },
  'Multi Asset': { simple: 'Balanced Portfolios', pro: 'Multi Asset' },
  // AIF
  'Cat I — VC': { simple: 'Startup Investing', pro: 'Cat I — VC' },
  'Cat II — PE': { simple: 'Private Company Investing', pro: 'Cat II — PE' },
  'Cat II — Credit': { simple: 'Private Lending', pro: 'Cat II — Credit' },
  'Cat II — RE & Infra': { simple: 'Real Estate & Infra Funds', pro: 'Cat II — RE & Infra' },
  'Cat II — Pre-IPO': { simple: 'Pre-IPO Investing', pro: 'Cat II — Pre-IPO' },
  'Cat III — Long Short': { simple: 'Hedge Funds', pro: 'Cat III — Long Short' },
  // GIFT City
  'Inbound — India': { simple: 'NRI India Access (USD)', pro: 'Inbound — India' },
  'Outbound — Global': { simple: 'Global Market Access', pro: 'Outbound — Global' },
}

/**
 * Display label per fund-category (the granular value stored on a fund
 * document), switched by Simple/Pro. Used for fund-detail headers and
 * any place that needs the category name as opposed to the primary pill.
 */
export const CATEGORY_LABELS: Record<FundCategory, { simple: string; pro: string }> = {
  PMS: { simple: 'Stock Picking Funds', pro: 'PMS' },
  'AIF Cat I': { simple: 'Early-Stage Funds', pro: 'AIF Category I' },
  'AIF Cat II': { simple: 'Private Deals Fund', pro: 'AIF Category II' },
  'AIF Cat III': { simple: 'Hedge Funds', pro: 'AIF Category III — Long Short' },
  'GIFT City': { simple: 'NRI & Global Access', pro: 'GIFT City' },
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
  { href: '/tools', label: 'Tools' },
  { href: '/knowledge', label: 'Learn' },
  { href: '/insights', label: 'Insights' },
  { href: '/gift-city', label: 'GIFT City' },
  { href: '/about', label: 'About' },
] as const

export const MODE_STORAGE_KEY = 'ifs:mode'

/**
 * Educational copy surfaced as a banner on /explore when a specific
 * subcategory filter is active. Switched by Simple/Pro toggle. Keys
 * match the canonical (Pro) values in SUBCATEGORIES.
 */
export const SUB_INFO: Record<string, { simple: string; pro: string }> = {
  // PMS
  Equity: {
    simple: 'Stock Portfolios = a pro picks Indian stocks for your demat account. Min ₹50L. You own every share.',
    pro: 'PMS Equity = SEBI-regulated discretionary management of listed Indian equities held in client demat. Min ₹50L.',
  },
  Debt: {
    simple: 'Lending Portfolios = your money lends to solid companies. Aim is regular interest, not stock-market gains.',
    pro: 'PMS Debt = performing credit and structured paper, managed in client demat. Steady-income mandate.',
  },
  'Multi Asset': {
    simple: 'Balanced Portfolios = mix of stocks, bonds and gold, rebalanced as markets shift.',
    pro: 'PMS Multi Asset = dynamic allocation across equity, debt, gold and arbitrage in client demat.',
  },
  // AIF
  'Cat I — VC': {
    simple: 'Startup Investing = backing tiny companies. Most fail. The few winners can return many times your money.',
    pro: 'AIF Cat I = SEBI-regulated venture capital. Long lock-up, J-curve, 1–2 winners drive returns.',
  },
  'Cat II — PE': {
    simple: 'Private Company Investing = big stakes in profitable companies that aren\'t on the stock market yet.',
    pro: 'AIF Cat II PE = growth-stage private equity. 5–8 year hold. IPO / strategic exits.',
  },
  'Cat II — Credit': {
    simple: 'Private Lending = lending to companies that don\'t want to use big banks. Higher interest for the extra work.',
    pro: 'AIF Cat II Credit = senior-secured private debt to mid-market corporates. Yield > public credit.',
  },
  'Cat II — RE & Infra': {
    simple: 'Real Estate & Infra = funds that buy buildings, roads, power lines. Long timelines, real assets behind your money.',
    pro: 'AIF Cat II RE/Infra = project-level real estate equity and operating infrastructure debt.',
  },
  'Cat II — Pre-IPO': {
    simple: 'Pre-IPO Investing = buying shares in companies just before they list on the stock market.',
    pro: 'AIF Cat II Pre-IPO = late-stage equity 12–24 months from listing. Lock-up tied to IPO event.',
  },
  'Cat III — Long Short': {
    simple: 'Hedge Funds = try to make money whether markets go up or down. Bets on some stocks rising and others falling.',
    pro: 'AIF Cat III = hedge-style long-short with derivatives. Absolute-return / market-neutral mandates.',
  },
  // GIFT City
  'Inbound — India': {
    simple: 'NRI India Access = if you live abroad, invest in Indian stocks in dollars without rupee paperwork.',
    pro: 'GIFT IFSC Inbound = USD-denominated India equity vehicles for NRIs. IFSCA-regulated, tax-efficient, repatriable.',
  },
  'Outbound — Global': {
    simple: 'Global Market Access = Indians can invest in US, Europe and other markets — legally, in USD, from India.',
    pro: 'GIFT IFSC Outbound = Indian residents access global equities through the IFSC liberalised remittance route.',
  },
}

/**
 * Risk ladder. Stored on each fund as `risk`. Filtered via the advanced
 * drawer; surfaced as a colored chip on the fund card.
 */
export const RISK_LEVELS = [
  'Low',
  'Low-Medium',
  'Medium',
  'Medium-High',
  'High',
  'Very High',
] as const

export type RiskLevel = (typeof RISK_LEVELS)[number]

/**
 * Currency symbol per primary category. Used to mark each pill (₹/$)
 * so the user knows which products are INR-denominated vs USD.
 */
export const PRIMARY_CURRENCY: Record<PrimaryCategory, '₹' | '$'> = {
  PMS: '₹',
  AIF: '₹',
  'GIFT City': '$',
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
