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
 * Product positioning map — each subcategory plotted by typical
 * return potential and recommended time horizon. Powers the homepage
 * hero scatter chart. Numbers are illustrative orientation aids, not
 * forecasts.
 */
export type LockIn = 'none' | 'soft' | 'hard'
export type RiskTier = 'low' | 'medium' | 'high'
export type GoalBucket = 'Wealth Creation' | 'Income' | 'Capital Preservation'
export type Listing = 'Listed' | 'Unlisted' | 'Mixed'

export type ProductMapPoint = {
  primary: PrimaryCategory
  subcategory: string
  /** Typical CAGR midpoint, in %. */
  expectedReturn: number
  /** Typical investment horizon, in years. */
  horizon: number
  /** Display string for the minimum ticket (e.g. "₹50L", "$150K"). */
  minTicket: string
  /** Indian-rupee-equivalent of the minimum ticket, used for budget filtering. */
  minTicketAmount: number
  blurb: string
  /**
   * Illustrative weight (1-10) of capital parked in this subcategory in
   * the Indian alternatives universe. Drives bubble size on the
   * homepage product map. Not an AUM source of truth.
   */
  weight: number
  /**
   * Practical liquidity profile.
   * 'none' = daily/weekly redemption (PMS, GIFT City).
   * 'soft' = 1-2 year exit windows or open-ended with notice.
   * 'hard' = multi-year contractual lock (most Cat I/II AIFs).
   */
  lockIn: LockIn
  /** True if the product distributes regular income / coupons / dividends. */
  incomeOriented: boolean
  /** Coarse risk tier for the Pathfinder filter. */
  riskTier: RiskTier
  /** Investor-facing goal bucket — drives the "Goal" lens on the chart. */
  goal: GoalBucket
  /** Whether the underlying instruments are listed, unlisted, or mixed. */
  listing: Listing
  /** One-line tax treatment hint, surfaced in the tooltip. */
  taxNote: string
  /**
   * Illustrative sub-strategy variants within this subcategory. The
   * spread between the lowest and highest variant is the IRR range
   * shown in the "Inside your shortlist" panel and as whiskers on the
   * chart. Numbers are typical-case orientations, not forecasts.
   */
  variants: ProductVariant[]
}

export type ProductVariant = {
  name: string
  expectedReturn: number
}

export const PRODUCT_MAP_POINTS: ProductMapPoint[] = [
  // PMS
  {
    primary: 'PMS', subcategory: 'Equity', expectedReturn: 17, horizon: 5,
    minTicket: '₹50L', minTicketAmount: 5_000_000, weight: 10,
    lockIn: 'none', incomeOriented: false, riskTier: 'high',
    goal: 'Wealth Creation', listing: 'Listed',
    taxNote: 'LTCG 12.5% (>1y) · STCG 20%',
    blurb: 'Direct equity in your demat, manager-picked.',
    variants: [
      { name: 'Large-cap', expectedReturn: 12 },
      { name: 'Multi-cap', expectedReturn: 15 },
      { name: 'Thematic',  expectedReturn: 18 },
      { name: 'Small-cap', expectedReturn: 22 },
    ],
  },
  {
    primary: 'PMS', subcategory: 'Debt', expectedReturn: 10, horizon: 3,
    minTicket: '₹50L', minTicketAmount: 5_000_000, weight: 5,
    lockIn: 'none', incomeOriented: true, riskTier: 'low',
    goal: 'Income', listing: 'Mixed',
    taxNote: 'Slab rate · indexation removed',
    blurb: 'Performing credit and structured paper.',
    variants: [
      { name: 'Senior secured',     expectedReturn: 9 },
      { name: 'Performing credit',  expectedReturn: 11 },
      { name: 'High-yield',         expectedReturn: 13 },
    ],
  },
  {
    primary: 'PMS', subcategory: 'Multi Asset', expectedReturn: 13, horizon: 4,
    minTicket: '₹50L', minTicketAmount: 5_000_000, weight: 6,
    lockIn: 'none', incomeOriented: false, riskTier: 'medium',
    goal: 'Wealth Creation', listing: 'Mixed',
    taxNote: 'Treated per underlying holding',
    blurb: 'Dynamic equity / debt / gold blend.',
    variants: [
      { name: 'Conservative', expectedReturn: 11 },
      { name: 'Balanced',     expectedReturn: 13 },
      { name: 'Aggressive',   expectedReturn: 16 },
    ],
  },
  // AIF
  {
    primary: 'AIF', subcategory: 'Cat I — VC', expectedReturn: 25, horizon: 8,
    minTicket: '₹1Cr', minTicketAmount: 10_000_000, weight: 4,
    lockIn: 'hard', incomeOriented: false, riskTier: 'high',
    goal: 'Wealth Creation', listing: 'Unlisted',
    taxNote: 'Pass-through · LTCG on equity exits',
    blurb: 'Early-stage venture. J-curve, 1–2 winners drive returns.',
    variants: [
      { name: 'Late VC',   expectedReturn: 18 },
      { name: 'Series A',  expectedReturn: 25 },
      { name: 'Seed',      expectedReturn: 32 },
    ],
  },
  {
    primary: 'AIF', subcategory: 'Cat II — PE', expectedReturn: 20, horizon: 7,
    minTicket: '₹1Cr', minTicketAmount: 10_000_000, weight: 7,
    lockIn: 'hard', incomeOriented: false, riskTier: 'high',
    goal: 'Wealth Creation', listing: 'Unlisted',
    taxNote: 'Pass-through · LTCG on equity exits',
    blurb: 'Growth-stage private equity, control or near-control stakes.',
    variants: [
      { name: 'Late stage', expectedReturn: 16 },
      { name: 'Growth',     expectedReturn: 20 },
      { name: 'Buyout',     expectedReturn: 24 },
    ],
  },
  {
    primary: 'AIF', subcategory: 'Cat II — Credit', expectedReturn: 13, horizon: 4,
    minTicket: '₹1Cr', minTicketAmount: 10_000_000, weight: 6,
    lockIn: 'hard', incomeOriented: true, riskTier: 'medium',
    goal: 'Income', listing: 'Unlisted',
    taxNote: 'Pass-through · interest at slab',
    blurb: 'Senior-secured private debt.',
    variants: [
      { name: 'Senior secured',     expectedReturn: 11 },
      { name: 'Performing credit',  expectedReturn: 14 },
      { name: 'Mezzanine / hi-yld', expectedReturn: 22 },
    ],
  },
  {
    primary: 'AIF', subcategory: 'Cat II — RE & Infra', expectedReturn: 15, horizon: 6,
    minTicket: '₹1Cr', minTicketAmount: 10_000_000, weight: 5,
    lockIn: 'hard', incomeOriented: true, riskTier: 'medium',
    goal: 'Income', listing: 'Unlisted',
    taxNote: 'Pass-through · rental at slab',
    blurb: 'Real estate equity / infra debt.',
    variants: [
      { name: 'Infra debt',     expectedReturn: 12 },
      { name: 'Stabilized RE',  expectedReturn: 14 },
      { name: 'Opportunistic',  expectedReturn: 19 },
    ],
  },
  {
    primary: 'AIF', subcategory: 'Cat II — Pre-IPO', expectedReturn: 18, horizon: 5,
    minTicket: '₹1Cr', minTicketAmount: 10_000_000, weight: 4,
    lockIn: 'hard', incomeOriented: false, riskTier: 'high',
    goal: 'Wealth Creation', listing: 'Unlisted',
    taxNote: 'Pass-through · LTCG on IPO exit',
    blurb: 'Late-stage equity tied to IPO event.',
    variants: [
      { name: 'Pre-IPO 2-3y', expectedReturn: 15 },
      { name: 'Pre-IPO 1y',   expectedReturn: 18 },
      { name: 'Hot tech IPO', expectedReturn: 23 },
    ],
  },
  {
    primary: 'AIF', subcategory: 'Cat III — Long Short', expectedReturn: 14, horizon: 3,
    minTicket: '₹1Cr', minTicketAmount: 10_000_000, weight: 5,
    lockIn: 'soft', incomeOriented: false, riskTier: 'medium',
    goal: 'Capital Preservation', listing: 'Listed',
    taxNote: 'Fund-level · max marginal rate',
    blurb: 'Hedge-style absolute / market-neutral.',
    variants: [
      { name: 'Market neutral', expectedReturn: 10 },
      { name: 'Equity LS',      expectedReturn: 14 },
      { name: 'Multi-strategy', expectedReturn: 18 },
    ],
  },
  // GIFT City
  {
    primary: 'GIFT City', subcategory: 'Inbound — India', expectedReturn: 14, horizon: 5,
    minTicket: '$150K', minTicketAmount: 12_500_000, weight: 3,
    lockIn: 'none', incomeOriented: false, riskTier: 'high',
    goal: 'Wealth Creation', listing: 'Listed',
    taxNote: 'IFSC: tax-free for NRIs',
    blurb: 'USD India equity for NRIs from IFSC.',
    variants: [
      { name: 'ETF / passive',  expectedReturn: 10 },
      { name: 'Active equity',  expectedReturn: 14 },
      { name: 'Concentrated',   expectedReturn: 18 },
    ],
  },
  {
    primary: 'GIFT City', subcategory: 'Outbound — Global', expectedReturn: 12, horizon: 5,
    minTicket: '$150K', minTicketAmount: 12_500_000, weight: 3,
    lockIn: 'none', incomeOriented: false, riskTier: 'medium',
    goal: 'Wealth Creation', listing: 'Listed',
    taxNote: 'LRS route · LTCG 12.5%',
    blurb: 'IFSC-route global equity for residents.',
    variants: [
      { name: 'US large-cap',     expectedReturn: 10 },
      { name: 'Global thematic',  expectedReturn: 14 },
    ],
  },
]

/**
 * Color tokens for the Goal lens on the homepage product map. Aligned
 * with the design system: gold for the aspirational growth bucket,
 * success-green for cashflow, muted neutral for capital preservation.
 */
export const GOAL_COLORS: Record<GoalBucket, string> = {
  'Wealth Creation': '#b8960c',
  Income: '#1a7f4d',
  'Capital Preservation': '#5b6470',
}

/** Color tokens for the Liquidity lens. */
export const LOCKIN_COLORS: Record<LockIn, string> = {
  none: '#1a7f4d',
  soft: '#d97706',
  hard: '#1d1d1f',
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
