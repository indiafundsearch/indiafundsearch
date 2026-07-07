import { client } from '@/lib/sanity/client'

export type GiftDirection = 'inbound' | 'outbound'

export interface GiftProduct {
  _id: string
  name: string
  direction: GiftDirection
  structure: string
  manager?: string
  thesis: string
  description: string
  minInvestment: string
  indicativeReturn: string
  liquidity: string
  currency: string
  eligibility: string
  taxNote?: string
  status: 'Open' | 'Closing Soon' | 'Waitlist' | 'Closed'
}

const DIRECTION_VALUES: Record<GiftDirection, string> = {
  inbound: 'Inbound — Into India',
  outbound: 'Outbound — Global',
}

/**
 * ⚠️ PLACEHOLDER SHELF — representative product shapes, not real offers.
 * Shown only while the Sanity dataset has no giftProduct documents.
 * Replace by adding real products in /studio (they take over automatically).
 */
const SEED: GiftProduct[] = [
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
  {
    _id: 'seed-out-1',
    name: 'Global Equity Fund (LRS Route)',
    direction: 'outbound',
    structure: 'GIFT Retail Scheme',
    manager: 'Representative example',
    thesis: 'Listed global equity in USD — geographic and currency diversification for resident Indians.',
    description:
      'Resident Indians invest via the RBI’s LRS route (US $250,000 per person per year) into a GIFT-domiciled fund holding global listed equity. Dollar assets, Indian paperwork — GIFT structures cut the friction of direct overseas accounts.',
    minInvestment: 'US $5,000',
    indicativeReturn: '10–14% p.a. in USD terms (indicative)',
    liquidity: 'Monthly liquidity (typical)',
    currency: 'USD',
    eligibility: 'Resident Indians via LRS · NRIs eligible in most schemes',
    taxNote: 'Fund units: LTCG 12.5% after 24 months; slab rate if sooner. Schedule FA reporting mandatory; TCS on LRS above ₹10 L/yr (adjustable).',
    status: 'Open',
  },
  {
    _id: 'seed-out-2',
    name: 'US Technology Leaders Portfolio',
    direction: 'outbound',
    structure: 'GIFT PMS / Managed Account',
    manager: 'Representative example',
    thesis: 'Concentrated exposure to the US technology complex — owned in dollars, not through feeder-fund layers.',
    description:
      'A managed USD portfolio of US-listed technology leaders, run from GIFT City. For investors who want the compounding engine of US tech with direct ownership economics and LRS-route simplicity.',
    minInvestment: 'US $25,000',
    indicativeReturn: '12–18% p.a. in USD terms (indicative)',
    liquidity: 'Exit in days (listed underlying)',
    currency: 'USD',
    eligibility: 'Resident Indians via LRS',
    taxNote: 'Capital gains per unlisted-unit / direct-holding rules depending on structure; Schedule FA applies.',
    status: 'Open',
  },
  {
    _id: 'seed-out-3',
    name: 'Global USD Income Fund',
    direction: 'outbound',
    structure: 'GIFT Retail Scheme',
    manager: 'Representative example',
    thesis: 'Investment-grade global bonds paying in dollars — the defensive sleeve of an international allocation.',
    description:
      'A USD fixed-income portfolio of investment-grade global credit, built for Indians who want dollar income and a hedge against rupee depreciation without picking individual bonds.',
    minInvestment: 'US $10,000',
    indicativeReturn: '5.5–7% p.a. in USD terms (indicative)',
    liquidity: 'Monthly liquidity (typical)',
    currency: 'USD',
    eligibility: 'Resident Indians via LRS · NRIs eligible',
    taxNote: 'Fund units: LTCG 12.5% after 24 months; slab rate if sooner. Schedule FA reporting mandatory.',
    status: 'Open',
  },
]

const GIFT_QUERY = `*[_type == "giftProduct" && direction == $direction && status != "Closed"] | order(order asc, name asc) {
  _id, name, direction, structure, manager, thesis, description,
  minInvestment, indicativeReturn, liquidity, currency, eligibility, taxNote, status
}`

/** Fetch the curated shelf for one direction; falls back to the seed shelf
 *  while the CMS is empty so the section is never blank. */
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
    console.warn('gift: Sanity fetch failed, using seed shelf', error)
  }
  return { products: SEED.filter((p) => p.direction === direction), isSeed: true }
}
