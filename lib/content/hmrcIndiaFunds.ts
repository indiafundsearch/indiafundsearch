/**
 * Which India-domiciled and GIFT City funds hold HMRC reporting fund status.
 *
 * WHY THIS EXISTS
 * Nobody publishes it. UK-resident NRIs search for it and find nothing, so they
 * assume no Indian fund has the status. That is wrong, and the assumption is
 * expensive: without it a disposal is charged to income tax at up to 45% rather
 * than as a capital gain at 24%.
 *
 * METHOD
 * Parsed from HMRC's own published list of approved offshore reporting funds,
 * the file dated 4 August 2026 (124,141 share-class rows). A row is counted as
 * Indian if its ISIN is an Indian one, or if the parent or sub-fund name says
 * GIFT or IFSC. Grouped by parent fund. "From" is the earliest effective date
 * across that parent's share classes.
 *
 * MAINTENANCE
 * HMRC republishes monthly. Re-run the parse, update AS_OF and the rows below,
 * and keep the numbers in the page copy in step. If a class has ceased, say so
 * rather than dropping the row: a fund that lost status is the single most
 * useful thing on this page.
 */

export interface HmrcFund {
  parent: string
  /** share classes on the list under this parent */
  classes: number
  /** earliest "reporting fund with effect from" date, dd/mm/yyyy */
  from: string
  /** set if any class under this parent has ceased to be a reporting fund */
  ceased?: string
  /** parent or sub-fund name identifies it as GIFT City / IFSC */
  gift: boolean
}

/** The date on HMRC's published file, not the date we looked. */
export const AS_OF = '4 August 2026'
export const HMRC_SOURCE =
  'https://www.gov.uk/government/publications/offshore-funds-list-of-reporting-funds'

export const HMRC_INDIA_FUNDS: HmrcFund[] = [
  { parent: '3PIM India Equity (IFSC) Fund', classes: 6, from: '01/04/2026', ceased: undefined, gift: true },
  { parent: 'Aikyam India Discovery Fund', classes: 1, from: '01/04/2026', ceased: undefined, gift: false },
  { parent: 'Ashoka WhiteOak Capital India Opportunities GIFT Fund', classes: 1, from: '01/04/2025', ceased: '31/03/2026', gift: true },
  { parent: 'Buoyant Capital AIF', classes: 7, from: '02/11/2023', ceased: undefined, gift: false },
  { parent: 'DSP Mutual Fund', classes: 2, from: '01/04/2025', ceased: undefined, gift: false },
  { parent: 'Equirus IFSC Trust', classes: 7, from: '01/04/2025', ceased: undefined, gift: true },
  { parent: 'HDFC Mutual Fund', classes: 4, from: '01/04/2025', ceased: undefined, gift: false },
  { parent: 'ICICI Prudential Asset Management Company Limited', classes: 6, from: '01/04/2025', ceased: undefined, gift: false },
  { parent: 'ICICI Prudential Smart Navigator Fund (IFSC)', classes: 2, from: '03/02/2026', ceased: undefined, gift: true },
  { parent: 'Invesco India Arbitrage Fund', classes: 1, from: '01/04/2025', ceased: undefined, gift: false },
  { parent: 'Invesco India Flexi Cap Fund', classes: 1, from: '16/10/2025', ceased: undefined, gift: false },
  { parent: 'Kotak Iconic Fund', classes: 8, from: '01/04/2023', ceased: undefined, gift: false },
  { parent: 'Kotak Optimus India Allocation Aggressive Scheme', classes: 3, from: '01/04/2023', ceased: undefined, gift: false },
  { parent: 'Kotak Optimus India Allocation Moderate Scheme', classes: 3, from: '01/04/2023', ceased: undefined, gift: false },
  { parent: 'Quantum Mutual Fund', classes: 6, from: '01/04/2025', ceased: undefined, gift: false },
  { parent: 'SageOne India Growth GIFT Fund', classes: 9, from: '01/04/2025', ceased: undefined, gift: true },
  { parent: 'Samarth Invest India', classes: 1, from: '01/04/2025', ceased: undefined, gift: false },
  { parent: 'Triton Fund - II', classes: 1, from: '07/02/2025', ceased: undefined, gift: false },
]

export const HMRC_TOTALS = {
  parents: HMRC_INDIA_FUNDS.length,
  classes: HMRC_INDIA_FUNDS.reduce((n, f) => n + f.classes, 0),
  gift: HMRC_INDIA_FUNDS.filter((f) => f.gift).length,
  ceased: HMRC_INDIA_FUNDS.filter((f) => f.ceased).length,
}
