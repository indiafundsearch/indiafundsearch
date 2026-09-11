import { client } from '@/lib/sanity/client'

export type GiftDirection = 'inbound' | 'outbound'

export interface GiftProduct {
  _id: string
  name: string
  direction: GiftDirection
  /** domicile / route badge — e.g. "GIFT City", "Cayman", "Global", "GIFT AIF Cat III" */
  structure: string
  manager?: string
  /** the one-line approach shown in listings */
  thesis: string
  description: string
  minInvestment: string
  indicativeReturn?: string
  liquidity?: string
  currency?: string
  eligibility?: string
  taxNote?: string
  status: 'Open' | 'Closing Soon' | 'Waitlist' | 'Closed'
  /** repository grouping — the role this fund plays in a global sleeve */
  group?: string
  /** theme chip, e.g. "SEMIS · ROBOTICS · AI" */
  theme?: string
  /** orange * — materially lower minimum for Accredited Investors (per PPM).
   *  A factual, non-evaluative disclosure — not a recommendation. */
  lowerMinForAccredited?: boolean
  /** The accredited-investor minimum itself, where the desk one-pager states it. */
  accreditedMin?: string
  /**
   * Per-corridor acceptance, as confirmed with each house. 'tbc' means the
   * desk has not confirmed it either way — shown as a dash, never as a no.
   */
  access?: { us: AccessMark; uk: AccessMark; ca: AccessMark }
}

export type AccessMark = 'yes' | 'no' | 'tbc'

export const OUTBOUND_GROUP_ORDER = [
  'Innovation & Growth',
  'Diversification & INR Hedge',
  'Alternatives & Absolute Return',
] as const

export const INBOUND_GROUP_ORDER = ['Equity', 'Fixed Income', 'Unlisted'] as const

const DIRECTION_VALUES: Record<GiftDirection, string> = {
  inbound: 'Inbound — Into India',
  outbound: 'Outbound — Global',
}

/**
 * Inbound repository — the desk one-pager "Curated Inbound Fund Repository",
 * August 2026. India-dedicated funds accessible through GIFT City, grouped by
 * asset class, with structure, minimum and per-corridor acceptance as
 * confirmed with each house. The one-pager's "recommended core" star is
 * deliberately NOT carried: this is a reference list, not a recommendation.
 * Internal desk fields (trail/commission) are intentionally absent. Sanity
 * documents override when present.
 */
const INBOUND_REPOSITORY: GiftProduct[] = [
  // ---- Equity ----
  {
    _id: 'in-tata-dynamic',
    name: 'Tata India Dynamic Equity – GIFT',
    direction: 'inbound',
    structure: 'Cat III Feeder AIF',
    thesis: 'Dynamic allocation between India equity and debt.',
    description: 'Dynamic allocation between India equity and debt. Subscribed in US dollars via the GIFT IFSC — no Indian bank account or resident-style filings needed. Structure, minimum and eligibility are confirmed against the PPM at onboarding.',
    minInvestment: '$500',
    currency: 'USD',
    status: 'Open',
    group: 'Equity',
    theme: 'DYNAMIC EQUITY–DEBT',
    access: { us: 'no', uk: 'yes', ca: 'tbc' },
  },
  {
    _id: 'in-sundaram-midcap',
    name: 'Sundaram India Mid Cap – GIFT',
    direction: 'inbound',
    structure: 'Cat III Feeder AIF',
    thesis: 'India mid-cap equity.',
    description: 'India mid-cap equity. Subscribed in US dollars via the GIFT IFSC — no Indian bank account or resident-style filings needed. Structure, minimum and eligibility are confirmed against the PPM at onboarding.',
    minInvestment: '$5k',
    currency: 'USD',
    status: 'Open',
    group: 'Equity',
    theme: 'MIDCAP',
    access: { us: 'no', uk: 'yes', ca: 'no' },
  },
  {
    _id: 'in-mirae-equity-allocation',
    name: 'Mirae India Equity Allocation Fund',
    direction: 'inbound',
    structure: 'Cat III Feeder AIF',
    thesis: 'Multi-cap India equity allocation.',
    description: 'Multi-cap India equity allocation. Subscribed in US dollars via the GIFT IFSC — no Indian bank account or resident-style filings needed. Structure, minimum and eligibility are confirmed against the PPM at onboarding.',
    minInvestment: '$150k',
    currency: 'USD',
    status: 'Open',
    group: 'Equity',
    theme: 'MULTICAP',
    access: { us: 'no', uk: 'yes', ca: 'no' },
    lowerMinForAccredited: true,
    accreditedMin: '$25k',
  },
  {
    _id: 'in-hdfc-midcap',
    name: 'HDFC India Midcap Opportunities Fund',
    direction: 'inbound',
    structure: 'Cat III Feeder AIF',
    thesis: 'India mid-cap equity.',
    description: 'India mid-cap equity. Subscribed in US dollars via the GIFT IFSC — no Indian bank account or resident-style filings needed. Structure, minimum and eligibility are confirmed against the PPM at onboarding.',
    minInvestment: '$150k',
    currency: 'USD',
    status: 'Open',
    group: 'Equity',
    theme: 'MIDCAP',
    access: { us: 'yes', uk: 'yes', ca: 'no' },
    lowerMinForAccredited: true,
    accreditedMin: '$50k',
  },
  {
    _id: 'in-carnelian-amritkaal',
    name: 'Carnelian India Amritkaal Fund',
    direction: 'inbound',
    structure: 'Cat III Feeder AIF',
    thesis: 'India multi-cap; long-term growth themes.',
    description: 'India multi-cap; long-term growth themes. Subscribed in US dollars via the GIFT IFSC — no Indian bank account or resident-style filings needed. Structure, minimum and eligibility are confirmed against the PPM at onboarding.',
    minInvestment: '$150k',
    currency: 'USD',
    status: 'Open',
    group: 'Equity',
    theme: 'MULTICAP GROWTH',
    access: { us: 'yes', uk: 'yes', ca: 'no' },
  },
  {
    _id: 'in-alchemy-lt',
    name: 'Alchemy India Long Term Fund',
    direction: 'inbound',
    structure: 'Cat III AIF',
    thesis: 'India equity, long-term buy-and-hold.',
    description: 'India equity, long-term buy-and-hold. Subscribed in US dollars via the GIFT IFSC — no Indian bank account or resident-style filings needed. Structure, minimum and eligibility are confirmed against the PPM at onboarding.',
    minInvestment: '$150k',
    currency: 'USD',
    status: 'Open',
    group: 'Equity',
    theme: 'LONG-TERM EQUITY',
    access: { us: 'yes', uk: 'yes', ca: 'yes' },
  },
  {
    _id: 'in-motilal-anchor-plus',
    name: 'Motilal Oswal Anchor Plus Fund',
    direction: 'inbound',
    structure: 'Cat III AIF',
    thesis: 'Concentrated India equity.',
    description: 'Concentrated India equity. Subscribed in US dollars via the GIFT IFSC — no Indian bank account or resident-style filings needed. Structure, minimum and eligibility are confirmed against the PPM at onboarding.',
    minInvestment: '$150k',
    currency: 'USD',
    status: 'Open',
    group: 'Equity',
    theme: 'CONCENTRATED',
    access: { us: 'yes', uk: 'yes', ca: 'tbc' },
  },
  {
    _id: 'in-nippon-nifty-bees',
    name: 'Nippon India ETF Nifty 50 BeES GIFT',
    direction: 'inbound',
    structure: 'Cat III Feeder AIF',
    thesis: 'Passive Nifty 50 index exposure.',
    description: 'Passive Nifty 50 index exposure. Subscribed in US dollars via the GIFT IFSC — no Indian bank account or resident-style filings needed. Structure, minimum and eligibility are confirmed against the PPM at onboarding.',
    minInvestment: '$150k',
    currency: 'USD',
    status: 'Open',
    group: 'Equity',
    theme: 'PASSIVE · NIFTY 50',
    access: { us: 'no', uk: 'yes', ca: 'no' },
  },
  {
    _id: 'in-icici-smart-navigator',
    name: 'ICICI Pru Smart Navigator',
    direction: 'inbound',
    structure: 'Cat III Feeder AIF',
    thesis: 'Dynamic India equity–debt allocation.',
    description: 'Dynamic India equity–debt allocation. Subscribed in US dollars via the GIFT IFSC — no Indian bank account or resident-style filings needed. Structure, minimum and eligibility are confirmed against the PPM at onboarding.',
    minInvestment: '$150k',
    currency: 'USD',
    status: 'Open',
    group: 'Equity',
    theme: 'DYNAMIC EQUITY–DEBT',
    access: { us: 'yes', uk: 'yes', ca: 'no' },
    lowerMinForAccredited: true,
    accreditedMin: '$40k',
  },
  {
    _id: 'in-bandhan-smallcap',
    name: 'Bandhan Smallcap Fund',
    direction: 'inbound',
    structure: 'Cat III Feeder AIF',
    thesis: 'India small-cap equity.',
    description: 'India small-cap equity. Subscribed in US dollars via the GIFT IFSC — no Indian bank account or resident-style filings needed. Structure, minimum and eligibility are confirmed against the PPM at onboarding.',
    minInvestment: '$150k',
    currency: 'USD',
    status: 'Open',
    group: 'Equity',
    theme: 'SMALLCAP',
    access: { us: 'yes', uk: 'yes', ca: 'no' },
    lowerMinForAccredited: true,
    accreditedMin: '$50k',
  },
  {
    _id: 'in-edelweiss-multimanager',
    name: 'Edelweiss India Multimanager Equity – Series I',
    direction: 'inbound',
    structure: 'Cat III Feeder AIF',
    thesis: 'Multi-manager India equity.',
    description: 'Multi-manager India equity. Subscribed in US dollars via the GIFT IFSC — no Indian bank account or resident-style filings needed. Structure, minimum and eligibility are confirmed against the PPM at onboarding.',
    minInvestment: '$150k',
    currency: 'USD',
    status: 'Open',
    group: 'Equity',
    theme: 'MULTI-MANAGER',
    access: { us: 'yes', uk: 'yes', ca: 'no' },
    lowerMinForAccredited: true,
    accreditedMin: '$10k',
  },
  {
    _id: 'in-valuequest-gift',
    name: 'ValueQuest India GIFT Fund',
    direction: 'inbound',
    structure: 'Cat III AIF',
    thesis: 'India equity, concentrated bottom-up.',
    description: 'India equity, concentrated bottom-up. Subscribed in US dollars via the GIFT IFSC — no Indian bank account or resident-style filings needed. Structure, minimum and eligibility are confirmed against the PPM at onboarding.',
    minInvestment: '$150k',
    currency: 'USD',
    status: 'Open',
    group: 'Equity',
    theme: 'BOTTOM-UP EQUITY',
    access: { us: 'no', uk: 'yes', ca: 'no' },
  },
  // ---- Fixed Income ----
  {
    _id: 'in-neo-infra-2',
    name: 'Neo Infra Income Opportunities Fund II',
    direction: 'inbound',
    structure: 'Cat II AIF Feeder',
    thesis: 'Indian infrastructure debt; income.',
    description: 'Indian infrastructure debt; income. Subscribed in US dollars via the GIFT IFSC — no Indian bank account or resident-style filings needed. Structure, minimum and eligibility are confirmed against the PPM at onboarding.',
    minInvestment: '$150k',
    currency: 'USD',
    status: 'Open',
    group: 'Fixed Income',
    theme: 'INFRA DEBT · INCOME',
    access: { us: 'yes', uk: 'yes', ca: 'yes' },
  },
  {
    _id: 'in-bandhan-gsec',
    name: 'Bandhan Govt Securities Investment Plan',
    direction: 'inbound',
    structure: 'Cat II AIF Feeder',
    thesis: 'Indian government securities.',
    description: 'Indian government securities. Subscribed in US dollars via the GIFT IFSC — no Indian bank account or resident-style filings needed. Structure, minimum and eligibility are confirmed against the PPM at onboarding.',
    minInvestment: '$150k',
    currency: 'USD',
    status: 'Open',
    group: 'Fixed Income',
    theme: 'GOVT SECURITIES',
    access: { us: 'yes', uk: 'yes', ca: 'no' },
  },
  {
    _id: 'in-ask-re-3',
    name: 'ASK Real Estate Fund III',
    direction: 'inbound',
    structure: 'Cat II AIF Feeder',
    thesis: 'Indian real estate debt.',
    description: 'Indian real estate debt. Subscribed in US dollars via the GIFT IFSC — no Indian bank account or resident-style filings needed. Structure, minimum and eligibility are confirmed against the PPM at onboarding.',
    minInvestment: '$150k',
    currency: 'USD',
    status: 'Open',
    group: 'Fixed Income',
    theme: 'REAL ESTATE DEBT',
    access: { us: 'tbc', uk: 'tbc', ca: 'tbc' },
  },
  // ---- Unlisted ----
  {
    _id: 'in-neo-secondaries',
    name: 'Neo Secondaries Fund',
    direction: 'inbound',
    structure: 'Cat II AIF Feeder',
    thesis: 'Private equity secondaries.',
    description: 'Private equity secondaries. Subscribed in US dollars via the GIFT IFSC — no Indian bank account or resident-style filings needed. Structure, minimum and eligibility are confirmed against the PPM at onboarding.',
    minInvestment: '$150k',
    currency: 'USD',
    status: 'Open',
    group: 'Unlisted',
    theme: 'PE SECONDARIES',
    access: { us: 'yes', uk: 'yes', ca: 'yes' },
  },
]

/**
 * Curated Global Fund Repository — outbound shelf.
 * Source: Beyond "Curated Global Fund Repository", June 2026 (desk-provided).
 * Real curated routes, not placeholders. Sanity documents override when present.
 */
const OUTBOUND_REPOSITORY: GiftProduct[] = [
  // ---- Innovation & Growth ----
  {
    _id: 'out-unifi-g20',
    name: 'Unifi G20 Fund',
    direction: 'outbound',
    structure: 'GIFT City',
    manager: 'Unifi Capital',
    thesis: '~20 global leaders, US-listed + ADRs. GARP discipline; innovation & international dominance.',
    description:
      'A concentrated portfolio of roughly twenty global leaders — US-listed names and ADRs — run with GARP (growth at a reasonable price) discipline and a focus on innovation and international dominance.',
    minInvestment: '$150K',
    currency: 'USD',
    status: 'Open',
    group: 'Innovation & Growth',
    theme: 'GLOBAL LEADERS · US TECH',
    lowerMinForAccredited: true,
  },
  {
    _id: 'out-geninnov',
    name: 'GenInnov Global Innovation',
    direction: 'outbound',
    structure: 'Cayman',
    manager: 'GenInnov',
    thesis: '30–40 GenAI-era companies across semiconductors, robotics and AI.',
    description:
      'A 30–40 stock portfolio of GenAI-era companies across semiconductors, robotics and AI.',
    minInvestment: '$150K',
    currency: 'USD',
    status: 'Open',
    group: 'Innovation & Growth',
    theme: 'SEMIS · ROBOTICS · AI',
  },
  {
    _id: 'out-ashoka-whiteoak-em',
    name: 'Ashoka WhiteOak EM (Ex-India)',
    direction: 'outbound',
    structure: 'GIFT City',
    manager: 'WhiteOak',
    thesis: 'Long-only emerging-market equities, excluding India.',
    description:
      'Long-only emerging-market equities excluding India — EM growth without doubling up on the India exposure you already hold.',
    minInvestment: '$150K',
    currency: 'USD',
    status: 'Open',
    group: 'Innovation & Growth',
    theme: 'EM EX-INDIA',
    lowerMinForAccredited: true,
  },
  {
    _id: 'out-edelweiss-greater-china',
    name: 'Edelweiss Greater China',
    direction: 'outbound',
    structure: 'GIFT City',
    manager: 'Edelweiss',
    thesis: 'FoF into JPMorgan Greater China. China, HK & Taiwan.',
    description:
      'A fund-of-fund route into the JPMorgan Greater China strategy — exposure to China, Hong Kong and Taiwan through an established global manager, at an accessible minimum.',
    minInvestment: '$5K',
    currency: 'USD',
    status: 'Open',
    group: 'Innovation & Growth',
    theme: 'GREATER CHINA',
  },
  {
    _id: 'out-dsp-global-equity',
    name: 'DSP Global Equity',
    direction: 'outbound',
    structure: 'GIFT City',
    manager: 'DSP',
    thesis: 'Active, high-conviction global equity across developed and emerging markets.',
    description:
      'An actively managed global equity fund with broad global growth exposure across developed and emerging markets, in a single GIFT-accessible wrapper.',
    minInvestment: '$5K',
    currency: 'USD',
    status: 'Open',
    group: 'Innovation & Growth',
    theme: 'GLOBAL GROWTH',
  },
  // ---- Diversification & INR Hedge ----
  {
    _id: 'out-varanium-daa',
    name: 'Varanium Dynamic Asset Allocation',
    direction: 'outbound',
    structure: 'GIFT City',
    manager: 'Varanium',
    thesis: 'Global 60:40 multi-asset core, ±20% tactical. Equity, fixed income & hedges.',
    description:
      'A global 60:40 multi-asset core with ±20% tactical flexibility across equity, fixed income and hedges — designed as the anchor of a global sleeve.',
    minInvestment: '$150K',
    currency: 'USD',
    status: 'Open',
    group: 'Diversification & INR Hedge',
    theme: 'MULTI-ASSET CORE',
    lowerMinForAccredited: true,
  },
  {
    _id: 'out-ppfas-global',
    name: 'PPFAS Global Strategy',
    direction: 'outbound',
    structure: 'GIFT City',
    manager: 'PPFAS',
    thesis: 'Select high-quality, high-ROIC global corporations (primarily in the US and Europe).',
    description:
      'A select portfolio of high-quality, high-ROIC global corporations, primarily in the US and Europe — the PPFAS quality discipline applied to a global opportunity set.',
    minInvestment: '$75K',
    currency: 'USD',
    status: 'Open',
    group: 'Diversification & INR Hedge',
    theme: 'US LARGE CAP',
  },
  {
    _id: 'out-phillip-pioneer',
    name: 'Phillip International Pioneer',
    direction: 'outbound',
    structure: 'GIFT City',
    manager: 'PhillipCapital',
    thesis: 'Global equity ETFs across themes & geographies. PhillipCapital.',
    description:
      'A portfolio of global equity ETFs across themes and geographies, managed by PhillipCapital — diversified global exposure without single-stock risk.',
    minInvestment: '$75K',
    currency: 'USD',
    status: 'Open',
    group: 'Diversification & INR Hedge',
    theme: 'MULTI-THEME ETFS',
    lowerMinForAccredited: true,
  },
  {
    _id: 'out-mirae-global-allocation',
    name: 'Mirae Asset Global Allocation',
    direction: 'outbound',
    structure: 'GIFT City',
    manager: 'Mirae Asset',
    thesis: 'Multi-asset global allocation feeder.',
    description:
      'A multi-asset global allocation feeder from Mirae Asset — one commitment, globally allocated across asset classes.',
    minInvestment: '$150K',
    currency: 'USD',
    status: 'Open',
    group: 'Diversification & INR Hedge',
    theme: 'GLOBAL MULTI-ASSET',
    lowerMinForAccredited: true,
  },
  // ---- Alternatives & Absolute Return ----
  {
    _id: 'out-barings-private-credit',
    name: 'Barings Private Credit',
    direction: 'outbound',
    structure: 'Global',
    manager: 'Barings',
    thesis: 'Senior-secured direct lending to global middle-market firms. Capital-preservation focus, low equity correlation.',
    description:
      'Senior-secured direct lending to global middle-market companies, with a capital-preservation focus and low correlation to equities.',
    minInvestment: '$150K+',
    currency: 'USD',
    status: 'Open',
    group: 'Alternatives & Absolute Return',
    theme: 'PRIVATE CREDIT · INCOME',
    lowerMinForAccredited: true,
  },
  {
    _id: 'out-pinetree-macro',
    name: 'Pinetree Macro',
    direction: 'outbound',
    structure: 'Cayman',
    manager: 'Pinetree',
    thesis: 'Active global asset allocation driven by central-bank liquidity & capital flows. US-listed ETFs/ETNs; absolute return, low-vol.',
    description:
      'Active global asset allocation driven by central-bank liquidity and capital flows, expressed through US-listed ETFs and ETNs — an absolute-return, low-volatility profile.',
    minInvestment: '$100K',
    currency: 'USD',
    status: 'Open',
    group: 'Alternatives & Absolute Return',
    theme: 'GLOBAL MACRO',
  },
]

const GIFT_QUERY = `*[_type == "giftProduct" && direction == $direction && status != "Closed"] | order(order asc, name asc) {
  _id, name, direction, structure, manager, thesis, description,
  minInvestment, indicativeReturn, liquidity, currency, eligibility, taxNote, status,
  "group": productGroup, theme, lowerMinForAccredited, accreditedMin, access
}`

/**
 * Fetch the shelf for one direction. Sanity documents take over when
 * present; otherwise the desk-curated in-code repository is used (both
 * directions are real curated routes).
 */
export async function getGiftProducts(direction: GiftDirection): Promise<{
  products: GiftProduct[]
  isSeed: boolean
}> {
  try {
    const rows = await client.fetch<(Omit<GiftProduct, 'direction'> & { direction: string })[]>(
      GIFT_QUERY,
      { direction: DIRECTION_VALUES[direction] },
      { next: { revalidate: 300 } },
    )
    if (rows && rows.length > 0) {
      return { products: rows.map((r) => ({ ...r, direction })), isSeed: false }
    }
  } catch (error) {
    console.warn('gift: Sanity fetch failed, using in-code shelf', error)
  }
  return {
    products: direction === 'inbound' ? INBOUND_REPOSITORY : OUTBOUND_REPOSITORY,
    isSeed: false,
  }
}
