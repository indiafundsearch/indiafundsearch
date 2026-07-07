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

const DIRECTION_VALUES: Record<GiftDirection, string> = {
  inbound: 'Inbound — Into India',
  outbound: 'Outbound — Global',
}

/**
 * ⚠️ PLACEHOLDER SHELF (inbound) — representative product shapes, not real
 * offers. Shown only while the Sanity dataset has no inbound giftProduct
 * documents. Replace by adding real products in /studio.
 */
const INBOUND_SEED: GiftProduct[] = [
  {
    _id: 'seed-in-1',
    name: 'India Long-Only Equity AIF — Series I',
    direction: 'inbound',
    structure: 'GIFT AIF Cat III',
    manager: 'Representative example',
    thesis: 'Concentrated Indian listed equity, held in USD — the clean NRI route into the India story.',
    description:
      'A GIFT IFSC-domiciled fund running a concentrated Indian equity strategy. Overseas investors subscribe in US dollars without opening Indian bank accounts or resident-style tax filings; the fund handles India access under the IFSCA framework.',
    minInvestment: 'US $150,000',
    indicativeReturn: '14–18% p.a. in USD terms (indicative)',
    liquidity: 'Quarterly windows after 1-year soft lock',
    currency: 'USD',
    eligibility: 'NRIs, OCIs & foreign investors (not resident Indians)',
    taxNote: 'IFSC structures can offer simplified treatment for non-residents — verified per fund before commitment.',
    status: 'Open',
  },
  {
    _id: 'seed-in-2',
    name: 'India Market-Neutral Fund (GIFT)',
    direction: 'inbound',
    structure: 'GIFT AIF Cat III',
    manager: 'Representative example',
    thesis: 'Long-short engine aiming for steady positive USD returns whether the index rises or falls.',
    description:
      'Pairs long and short Indian equity positions to strip out market direction — debt-plus outcomes from an equity engine, built inside GIFT specifically for overseas investors who want India exposure without full market beta.',
    minInvestment: 'US $150,000',
    indicativeReturn: '8–12% p.a. in USD terms (indicative)',
    liquidity: 'Monthly windows (typical)',
    currency: 'USD',
    eligibility: 'NRIs, OCIs & foreign investors',
    taxNote: 'Often cleaner than the domestic Cat III route for non-residents — fund-level treatment verified per scheme.',
    status: 'Open',
  },
  {
    _id: 'seed-in-3',
    name: 'India Private Credit Fund (GIFT)',
    direction: 'inbound',
    structure: 'GIFT AIF Cat II',
    manager: 'Representative example',
    thesis: 'Secured lending to performing Indian companies — USD cashflow from Indian credit spreads.',
    description:
      'Lends directly to performing companies and real-estate projects in India — secured, covenant-protected loans. Interest returns as regular USD payouts; principal returns as loans mature. Built for overseas investors seeking income.',
    minInvestment: 'US $150,000',
    indicativeReturn: '9–12% p.a. in USD terms (indicative)',
    liquidity: '3–5 year tenor, locked',
    currency: 'USD',
    eligibility: 'NRIs, OCIs & foreign investors',
    taxNote: 'Distribution TDS mechanics differ from domestic AIFs — reviewed per fund and treaty position.',
    status: 'Open',
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
 * Fetch the shelf for one direction. Sanity documents take over when present;
 * otherwise inbound falls back to a representative seed (isSeed: true) and
 * outbound to the desk-curated Global Fund Repository (isSeed: false — real
 * curated routes).
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
  if (direction === 'inbound') {
    return { products: INBOUND_SEED, isSeed: true }
  }
  return { products: OUTBOUND_REPOSITORY, isSeed: false }
}
