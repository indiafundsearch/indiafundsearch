/**
 * Hub-and-spoke map (Phase 4, Task 4.1).
 *
 * Internal links are the only ranking lever fully under our control while the
 * domain has no external authority. Every hub links to every spoke; the spokes
 * link back through their own `related` lists.
 *
 * Kept as data rather than hand-written JSX so a new answer page cannot quietly
 * end up orphaned — add it here and it appears on its hub.
 */
export interface HubLink {
  label: string
  href: string
  /** One line under the link. Keeps the block scannable. */
  note: string
}

export const GIFT_CITY_SPOKES: HubLink[] = [
  { label: 'Who can invest in GIFT City funds', href: '/gift-city/eligibility', note: 'The four investor classes, and where residence changes the answer' },
  { label: 'How to invest in a GIFT City fund', href: '/gift-city/how-to-invest', note: 'The account, KYC and money route for NRIs and residents' },
  { label: 'How GIFT City funds are taxed', href: '/gift-city/taxation', note: 'In India, then at home. The second level decides it' },
  { label: 'GIFT City for resident Indians', href: '/gift-city/for-resident-indians', note: 'The outbound route, the LRS cap and Schedule FA' },
  { label: 'What funds are available in GIFT City', href: '/gift-city/funds-list', note: 'By category. The named shelf is behind the gate' },
  { label: 'GIFT City fund minimum investment', href: '/learn/gift-city-minimum-investment', note: 'IFSCA thresholds by scheme type and investor class' },
  { label: 'GIFT City vs Indian mutual fund', href: '/learn/gift-city-vs-mutual-fund-for-nri', note: 'Why the answer differs by the country you file in' },
  { label: 'GIFT City and global USD investing', href: '/learn/gift-city-global-usd', note: 'The outbound route for resident Indians' },
  { label: 'Can an NRI invest in an AIF?', href: '/learn/can-nri-invest-in-aif', note: 'Rules, minimum and the repatriation routes' },
]

export const NRI_SPOKES: HubLink[] = [
  { label: 'Can an NRI invest in PMS?', href: '/learn/can-nri-invest-in-pms', note: 'No SEBI residency bar; the ₹50 lakh minimum applies' },
  { label: 'Can an NRI invest in an AIF?', href: '/learn/can-nri-invest-in-aif', note: 'Expressly permitted; the work is the FEMA route' },
  { label: 'NRE vs NRO account', href: '/learn/nre-vs-nro-account', note: 'Which one your investments should run through' },
  { label: 'NRI repatriation limit', href: '/learn/nri-repatriation-limit', note: 'The US $1 million rule, and when it does not apply' },
  { label: 'Form 10F, now Form 41', href: '/learn/form-10f-for-nri', note: 'How to file without a PAN, and without a DSC' },
  { label: 'Tax residency certificate, UAE', href: '/learn/tax-residency-certificate-uae', note: 'The 183-day calendar-year test India applies' },
  { label: 'Are Indian mutual funds PFICs?', href: '/learn/are-indian-mutual-funds-pfic', note: 'For a US taxpayer, almost always yes' },
  { label: 'HMRC reporting fund status', href: '/learn/hmrc-reporting-fund-status-india', note: 'Which Indian funds hold it, and why 24% or 45%' },
  { label: 'Which AMCs accept US NRIs?', href: '/learn/which-amcs-accept-us-nri', note: 'Why most decline, and what to ask instead' },
  { label: 'US and Canadian NRIs: PFIC, FATCA and FBAR', href: '/learn/us-nri-pfic', note: 'Read this before you shortlist anything' },
]

export const TAX_SPOKES: HubLink[] = [
  { label: 'Are Indian mutual funds PFICs?', href: '/learn/are-indian-mutual-funds-pfic', note: 'The US tax treatment of pooled Indian funds' },
  { label: 'US and Canadian NRIs: PFIC, FATCA and FBAR', href: '/learn/us-nri-pfic', note: 'The orientation page for a US or Canadian passport' },
  { label: 'HMRC reporting fund status', href: '/learn/hmrc-reporting-fund-status-india', note: 'Income at 45% against a capital gain at 24%' },
  { label: 'Form 10F, now Form 41', href: '/learn/form-10f-for-nri', note: 'Claiming treaty relief on Indian income' },
  { label: 'Tax residency certificate, UAE', href: '/learn/tax-residency-certificate-uae', note: 'What India needs before it honours the treaty' },
  { label: 'PMS fees and the tax on churn', href: '/learn/pms-fees-explained', note: 'Why turnover matters as much as performance' },
  { label: 'AIF Category I, II and III', href: '/learn/aif-categories-explained', note: 'Pass-through against fund-level taxation' },
]
