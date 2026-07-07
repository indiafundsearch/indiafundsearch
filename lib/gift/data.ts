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
  /** ★ — part of the recommended core */
  recommendedCore?: boolean
  /** orange * — materially lower minimum for Accredited Investors (per PPM) */
  lowerMinForAccredited?: boolean
}

export const OUTBOUND_GROUP_ORDER = [
  'Innovation & Growth',
  'Diversification & INR Hedge',
  'Alternatives & Absolute Return',
] as const

export const INBOUND_GROUP_ORDER = [
  'India Equity — Long Only',
  'Bonds & Structured Income',
  'Private Markets & Absolute Return',
] as const

const DIRECTION_VALUES: Record<GiftDirection, string> = {
  inbound: 'Inbound — Into India',
  outbound: 'Outbound — Global',
}

/**
 * Inbound repository — desk-provided list ("Gift inbound.xlsx", July 2026).
 * Real distributable routes for NRIs/overseas investors into India.
 * Internal desk fields (trail/commission) are intentionally NOT included here.
 * Sanity documents override when present.
 */
type InboundOverrides = Partial<Omit<GiftProduct, '_id' | 'name' | 'thesis' | 'direction'>>

function inboundFund(
  id: string,
  name: string,
  thesis: string,
  overrides: InboundOverrides = {},
): GiftProduct {
  return {
    _id: `in-${id}`,
    name,
    direction: 'inbound',
    structure: 'GIFT City',
    thesis,
    description: `${thesis} Subscribed in US dollars via the GIFT IFSC — no Indian bank account or resident-style filings needed.`,
    minInvestment: '$150K',
    currency: 'USD',
    status: 'Open',
    group: 'India Equity — Long Only',
    ...overrides,
  }
}

const INBOUND_REPOSITORY: GiftProduct[] = [
  // ---- India Equity — Long Only ----
  inboundFund('alchemy-lt', 'Alchemy India Long Term Fund', 'Long-only Indian listed equity with a long-term compounding mandate.', {
    theme: 'LONG-TERM EQUITY',
    eligibility: 'US — Yes (K-1 available) · Canada — Yes (K-3 available) · UK — HMRC registered',
  }),
  inboundFund('absl-flexicap', 'ABSL India Flexicap Fund', 'Long-only Indian listed equity across market caps.', {
    theme: 'FLEXICAP',
  }),
  inboundFund('mirae-equity-allocation', 'Mirae Asset India Equity Allocation Fund', 'Long-only allocation across Indian listed equity.', {
    theme: 'EQUITY ALLOCATION',
    eligibility: 'US — No · Canada — No',
  }),
  inboundFund('motilal-growth-anchor', 'Motilal Growth Anchor Plus Fund', 'Long-only Indian growth equity with an anchor sleeve.', {
    theme: 'GROWTH',
    eligibility: 'US — Yes (K-1 filed with IRS, non-PFIC) · UK — HMRC compliant',
  }),
  inboundFund('motilal-fof', 'Motilal Oswal Fund of Fund', 'Fund-of-fund route into Motilal Oswal Indian equity strategies.', {
    theme: 'FUND OF FUND',
    eligibility: 'US — Yes (K-1 filed with IRS, non-PFIC) · UK — Yes',
  }),
  inboundFund('hdfc-flexicap', 'HDFC India Flexicap Fund', 'Long-only Indian equity across large, mid and small caps.', {
    theme: 'FLEXICAP',
    eligibility: 'US — Yes for $5M+ net worth (K-1 available) · Canada — No',
  }),
  inboundFund('hdfc-midcap', 'HDFC India Midcap Opportunities Fund', 'Long-only Indian midcap equity.', {
    theme: 'MIDCAP',
    eligibility: 'US — Yes for $5M+ net worth (K-1 available) · Canada — No',
  }),
  inboundFund('hdfc-smallcap', 'HDFC India Smallcap Fund', 'Long-only Indian smallcap equity.', {
    theme: 'SMALLCAP',
    eligibility: 'US — Yes for $5M+ net worth (K-1 available) · Canada — No',
  }),
  inboundFund('hdfc-baf', 'HDFC India Balanced Advantage Fund', 'Dynamic equity-debt balance on Indian markets.', {
    theme: 'BALANCED ADVANTAGE',
    eligibility: 'US — Yes for $5M+ net worth (K-1 available) · Canada — No',
  }),
  inboundFund('carnelian-amritkaal', 'Carnelian India Amritkaal Fund', 'Long-only Indian equity built around the decade-of-India thesis.', {
    theme: 'MULTICAP GROWTH',
    eligibility: 'US — Yes (K-1 available) · Canada — Yes (K-3 available) · UK — Yes (not yet HMRC registered)',
  }),
  inboundFund('ashoka-multicap', 'Ashoka WhiteOak India Multicap Fund', 'Long-only Indian multicap equity, WhiteOak process.', {
    theme: 'MULTICAP',
    eligibility: 'US — No · Canada — No',
    description:
      'Long-only Indian multicap equity run on the WhiteOak process. Minimum can be committed as 25% upfront plus three tranches within two years (lumpsum accepted). Subscribed in US dollars via the GIFT IFSC.',
  }),
  inboundFund('bandhan-large-mid', 'Bandhan Large & Midcap Fund', 'Long-only Indian large & midcap equity.', {
    theme: 'LARGE & MIDCAP',
    eligibility: 'US — Yes (K-1 available) · Canada — Not yet · UK — Yes (not yet HMRC registered)',
  }),
  inboundFund('bandhan-smallcap', 'Bandhan Smallcap Fund', 'Long-only Indian smallcap equity.', {
    theme: 'SMALLCAP',
    eligibility: 'US — Yes (K-1 available) · Canada — Not yet · UK — Yes (not yet HMRC registered)',
  }),
  inboundFund('valuequest-gift', 'ValueQuest India GIFT Fund', 'Long-only Indian listed equity, ValueQuest process.', {
    theme: 'LISTED EQUITY',
  }),
  inboundFund('icici-smart-navigator', 'ICICI Smart Navigator', 'Long-only Indian equity with dynamic navigation.', {
    theme: 'DYNAMIC EQUITY',
    eligibility: 'US — Yes (no K-1) · Canada — No · UK — No',
  }),
  inboundFund('sundaram-midcap', 'Sundaram Midcap Fund', 'Long-only Indian midcap equity at a retail-scheme minimum.', {
    theme: 'MIDCAP',
    minInvestment: '$5K',
    eligibility: 'US — No',
  }),
  inboundFund('edelweiss-multimanager', 'Edelweiss India Multimanager Equity Fund — Series 1', 'Multi-manager Indian equity — several managers, one commitment.', {
    theme: 'MULTI-MANAGER',
    eligibility: 'US — Yes (K-1 available) · Canada — No · UK — Yes (not yet HMRC registered)',
  }),
  // ---- Bonds & Structured Income ----
  inboundFund('bandhan-gsec', 'Bandhan Govt Securities Investment Plan', 'Indian government securities — sovereign INR yield in a GIFT wrapper.', {
    group: 'Bonds & Structured Income',
    theme: 'GOVT SECURITIES',
    eligibility: 'US — Yes (K-1 available) · Canada — Not yet · UK — Yes (not yet HMRC registered)',
  }),
  // ---- Private Markets & Absolute Return ----
  inboundFund('neo-secondaries', 'NEO Secondaries Fund', 'Private-equity secondaries — seasoned fund stakes, often at a discount.', {
    group: 'Private Markets & Absolute Return',
    theme: 'PE SECONDARIES',
  }),
  inboundFund('neo-infra-2', 'NEO Infra Fund II', 'Senior secured lending to operating Indian infrastructure.', {
    group: 'Private Markets & Absolute Return',
    theme: 'INFRA DEBT',
  }),
  inboundFund('ask-re-3', 'ASK Real Estate Fund III', 'Secured real-estate debt across Indian developers.', {
    group: 'Private Markets & Absolute Return',
    theme: 'REAL ESTATE DEBT',
  }),
  inboundFund('whitespace-alpha', 'Whitespace Alpha Debt Plus', 'Market-neutral Indian equity engine targeting debt-plus outcomes.', {
    group: 'Private Markets & Absolute Return',
    theme: 'MARKET NEUTRAL',
  }),
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
    thesis: "~20 global leaders, US-listed + ADRs. GARP discipline; innovation & international dominance. Unifi Capital's 23-yr DNA.",
    description:
      "A concentrated portfolio of roughly twenty global leaders — US-listed names and ADRs — run with GARP (growth at a reasonable price) discipline and a focus on innovation and international dominance, backed by Unifi Capital's 23-year investing DNA.",
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
    manager: 'GenInnov (Nilesh Jasani, ex-Jefferies)',
    thesis: '30–40 GenAI-era companies. Nilesh Jasani (ex-Jefferies). Kotak AMC-backed.',
    description:
      'A 30–40 stock portfolio of GenAI-era companies across semiconductors, robotics and AI, managed by Nilesh Jasani (ex-Jefferies) with Kotak AMC backing.',
    minInvestment: '$150K',
    currency: 'USD',
    status: 'Open',
    group: 'Innovation & Growth',
    theme: 'SEMIS · ROBOTICS · AI',
    recommendedCore: true,
  },
  {
    _id: 'out-ashoka-whiteoak-em',
    name: 'Ashoka WhiteOak EM (Ex-India)',
    direction: 'outbound',
    structure: 'GIFT City',
    manager: 'WhiteOak (Prashant Khemka team)',
    thesis: 'Long-only EM equities. Prashant Khemka team.',
    description:
      'Long-only emerging-market equities excluding India, run by the Prashant Khemka (WhiteOak) team — EM growth without doubling up on the India exposure you already hold.',
    minInvestment: '$150K',
    currency: 'USD',
    status: 'Open',
    group: 'Innovation & Growth',
    theme: 'EM EX-INDIA',
    recommendedCore: true,
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
    recommendedCore: true,
  },
  {
    _id: 'out-dsp-global-equity',
    name: 'DSP Global Equity',
    direction: 'outbound',
    structure: 'GIFT City',
    manager: 'DSP',
    thesis: 'Active global fund. Amazon, Tencent, Booking, BYD.',
    description:
      'An actively managed global equity fund holding names like Amazon, Tencent, Booking and BYD — broad global growth in a single GIFT-accessible wrapper.',
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
    manager: 'Varanium (ex-Goldman / Citi team)',
    thesis: 'Global 60:40 multi-asset core, ±20% tactical. Equity, fixed income & hedges. Ex-Goldman / Citi team.',
    description:
      'A global 60:40 multi-asset core with ±20% tactical flexibility across equity, fixed income and hedges, run by an ex-Goldman / Citi team — designed as the anchor of a global sleeve.',
    minInvestment: '$150K',
    currency: 'USD',
    status: 'Open',
    group: 'Diversification & INR Hedge',
    theme: 'MULTI-ASSET CORE',
    recommendedCore: true,
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
    manager: 'Barings (MassMutual)',
    thesis: 'Senior-secured direct lending to global middle-market firms. Capital-preservation focus, low equity correlation. Barings (MassMutual), 50+ yrs in private credit.',
    description:
      'Senior-secured direct lending to global middle-market companies with a capital-preservation focus and low correlation to equities — run by Barings (a MassMutual company) with 50+ years in private credit.',
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
    manager: 'Pinetree (Ritesh Jain, ex-CIO Tata MF & BNP Paribas MF)',
    thesis: 'Active global asset allocation driven by central-bank liquidity & capital flows. US-listed ETFs/ETNs; absolute return, low-vol. Ritesh Jain (ex-CIO Tata MF & BNP Paribas MF).',
    description:
      'Active global asset allocation driven by central-bank liquidity and capital flows, expressed through US-listed ETFs and ETNs — an absolute-return, low-volatility profile managed by Ritesh Jain (ex-CIO, Tata MF & BNP Paribas MF).',
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
  "group": productGroup, theme, recommendedCore, lowerMinForAccredited
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
