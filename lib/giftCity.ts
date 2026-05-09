/**
 * GIFT City explainer page content.
 *
 * Sourced from the standalone HTML prototype (`IndiaFundSearch
 * Standalone.html`, the GIFTCity component plus its `GIFT_CITY` data
 * block). Editorial — not derived from the Sanity dataset.
 *
 * Numbers and rule references are accurate as of Budget 2026 + the
 * RBI/SEBI 2024-2025 amendments cited inline.
 */

export type GiftCityFlow = 'inbound' | 'outbound'

export type GiftCityFlowDetail = {
  title: string
  sub: string
  direction: string
  investor: string
  currency: string
  taxNRI: string
  taxResident: string
  route: string
  example: string
}

export type GiftCityGap = { gap: string; solves: string }

export type GiftCityCostRow = { row: string; mainland: string; gift: string }

export type GiftCityEligibility = {
  tier: string
  who: string
  detail: string
}

export type GiftCityOption = {
  name: string
  flow: 'Inbound' | 'Outbound' | 'Both'
  detail: string
}

export type GiftCityTaxRow = { row: string; val: string }

export type GiftCityScenario = {
  tag: string
  title: string
  setup: string
  rows: [string, string][]
  outcome: string
}

export type GiftCityLrsRow = { k: string; v: string }

export type GiftCityStat = { v: string; l: string }

export const GIFT_CITY = {
  hero: {
    eyebrow: 'GIFT City IFSC',
    title: 'India built a financial centre',
    titleAccent: 'for cross-border wealth.',
    sub: "GIFT IFSC is India's first International Financial Services Centre — onshore in Gujarat, regulated by IFSCA, transacting in foreign currency. For NRIs investing into India, and for residents going global, it removes the friction that mainland structures impose.",
  },

  chips: [
    { k: 'Onshore in Gujarat', v: 'Created by an Act of Parliament (IFSCA Act 2019)' },
    { k: 'Foreign currency', v: 'USD-denominated funds, USD repatriation' },
    { k: 'FATF · FATCA · CRS compliant', v: 'Not an offshore loophole' },
    { k: '20-year tax holiday', v: 'Extended in Budget 2026' },
  ] as const,

  marketStats: [
    { v: 'USD 0.9T', l: 'India MF AUM (2025) — but only 3-4% of global equity markets' },
    { v: '35M+', l: 'NRIs globally · USD 125B+ remittances to India annually' },
    { v: 'USD 100B+', l: 'Cat III AIF AUM target for GIFT City by 2030' },
    { v: '37', l: 'Global and domestic banks with IFSC banking units (Feb 2026)' },
  ] satisfies GiftCityStat[],

  gaps: [
    {
      gap: 'Indian MFs cannot invest more than USD 7 billion overseas (SEBI cap).',
      solves: 'GIFT IFSC funds have no such cap. Full global exposure, no concentration limits.',
    },
    {
      gap: 'NRIs investing in India face PAN, NRE/NRO, Form 15CA/CB, and 45+ day repatriation.',
      solves: 'No PAN required for most products. No NRE/NRO. Repatriation in 24-48 hours via SWIFT.',
    },
    {
      gap: 'Foreign investors must register as FPI with SEBI — complex and expensive.',
      solves: 'No FPI registration needed. Access India growth through IFSC funds directly in USD.',
    },
    {
      gap: 'Indian AMCs had to set up shop in Singapore or Mauritius to serve global clients.',
      solves: 'Indian AMCs can now run foreign-currency global funds from Indian soil, regulated by IFSCA.',
    },
    {
      gap: 'STT, CTT, and 18% GST on management fees made Indian fund structures expensive.',
      solves: 'Zero STT, CTT, and GST on management fees in IFSC. Cost-competitive globally.',
    },
  ] satisfies GiftCityGap[],

  flows: {
    inbound: {
      title: 'Inbound — Global capital into India',
      sub: 'For NRIs, OCIs and foreign investors who want India exposure without mainland friction.',
      direction: 'Global capital → Indian opportunities',
      investor: 'NRIs, OCIs/PIOs, foreign investors, family offices, sovereign funds',
      currency: 'Invest in USD · returns in USD · repatriate in USD',
      taxNRI: '0% capital gains in eligible IFSC schemes (Section 10(4D))',
      taxResident: 'Resident Indians cannot invest in inbound-only structures',
      route: 'FEMA IFSC framework, IFSCA-regulated. No FPI license required.',
      example: 'ABSL India Flexicap Fund (IFSC) · ABSL MSCI India Fund',
    },
    outbound: {
      title: 'Outbound — Indian capital going global',
      sub: 'For residents seeking global diversification beyond the SEBI overseas cap.',
      direction: 'Indian capital → global opportunities',
      investor: 'Resident individuals (via LRS), resident corporates (via OPI route)',
      currency: 'Rupees converted to USD at remittance · returns in USD',
      taxNRI: "Gains taxable per NRI's tax jurisdiction; no Indian capital gains in select structures",
      taxResident: '12.5% LTCG / 30% STCG · TCS on LRS (refundable as ITR credit)',
      route: 'LRS for individuals (USD 250K/yr/PAN); OPI route for corporates up to 50% net worth.',
      example: 'ABSL Global Bluechip Equity Fund (IFSC) · ABSL Global Emerging Market Equity Fund',
    },
  } satisfies Record<GiftCityFlow, GiftCityFlowDetail>,

  nriCost: [
    {
      row: 'Capital gains tax on equity (>1 yr)',
      mainland: '12.5% LTCG above ₹1.25L',
      gift: '0% — fully exempt for eligible NRIs',
    },
    {
      row: 'TDS at redemption',
      mainland: '10% withheld (refundable but creates cash-flow drag)',
      gift: '0%',
    },
    {
      row: 'Indian ITR filing requirement',
      mainland: 'Mandatory each year',
      gift: 'Not required if income is solely from IFSC funds',
    },
    {
      row: 'Repatriation timeline',
      mainland: '45+ days via NRO route',
      gift: '24-48 hours via SWIFT from IFSC banking unit',
    },
    {
      row: 'Form 15CA/CB compliance',
      mainland: 'Required, with CA sign-off',
      gift: 'Not required',
    },
    {
      row: 'Repatriation cap',
      mainland: 'USD 1M/year via NRO with CA cert (no cap via NRE)',
      gift: 'No annual cap',
    },
    {
      row: 'Currency conversion',
      mainland: 'INR in, INR out, then convert to USD',
      gift: 'USD in, USD out — no conversion',
    },
  ] satisfies GiftCityCostRow[],

  eligibility: [
    {
      tier: 'Category 1',
      who: 'Non-Resident Indians (NRIs)',
      detail:
        'Indian passport + 182+ days outside India in the financial year. Full access to all GIFT City structures — both inbound and outbound. Invest directly in foreign currency from any overseas bank. No NRE/NRO needed. PAN not mandatory. 100% repatriation, no annual cap.',
    },
    {
      tier: 'Category 2',
      who: 'Overseas Citizens of India (OCIs)',
      detail:
        "Treated as non-residents for IFSC purposes. SEBI's June 2024 amendment allows OCIs to hold up to 100% of corpus in IFSC FPI-registered funds. Same benefits as NRIs.",
    },
    {
      tier: 'Category 3',
      who: 'Resident Indians',
      detail:
        'Individuals via LRS — USD 250,000 per financial year per PAN. Each family member qualifies independently. Corporates via OPI route — up to 50% of net worth. Outbound funds accessible. Inbound NRI-only structures are NOT available to residents.',
    },
    {
      tier: 'Category 4',
      who: 'Foreign investors and institutions',
      detail:
        'FPIs, sovereign wealth funds, global family offices, endowments, pension funds. No FPI license or SEBI registration required. Transact in foreign currency. No Indian bank account required.',
    },
  ] satisfies GiftCityEligibility[],

  options: [
    { name: 'Retail Mutual Funds', flow: 'Both', detail: 'USD-denominated open-ended MF; feeder structures into India or global equity/debt.' },
    { name: 'Category I AIFs', flow: 'Both', detail: 'VC, SME, infrastructure, social venture. Government-incentivised sectors. Min corpus USD 3M.' },
    { name: 'Category II AIFs', flow: 'Both', detail: 'Unlisted instruments — private equity, credit, bonds. Closed-ended only. Min corpus USD 3M.' },
    { name: 'Category III AIFs', flow: 'Both', detail: 'Listed securities, hedge, derivatives, long-short. Open or closed-ended. Min corpus USD 3M.' },
    { name: 'Portfolio Management Services', flow: 'Both', detail: 'Separately managed accounts with direct securities ownership in client demat at GIFT IFSC.' },
    { name: 'Foreign Currency FDs', flow: 'Outbound', detail: 'Tax-free interest via IFSC Banking Units. Min USD 500-1,000. HDFC, ICICI, DBS IBUs available.' },
    { name: 'REITs', flow: 'Both', detail: 'Listed Real Estate Investment Trusts on IFSC exchanges.' },
    { name: 'IFSC Exchange Trading', flow: 'Both', detail: 'Global equities, ETFs, bonds, derivatives via India INX and NSE IFSC.' },
  ] satisfies GiftCityOption[],

  taxBenefits: [
    { row: 'Capital Gains — NRI in eligible retail MF scheme', val: '0% — exempt under Section 10(4D), Income Tax Act' },
    { row: 'Capital Gains — NRI in Cat III AIF (specified securities)', val: '0% — exempt under Section 10(4D)' },
    { row: 'Capital Gains — Resident Indian (outbound fund)', val: '12.5% LTCG (>2 yr) / 30% STCG' },
    { row: 'STT / CTT / Stamp Duty', val: 'NIL on all IFSC exchange transactions' },
    { row: 'GST on Management Fees', val: 'NIL for IFSC fund managers (vs 18% on mainland)' },
    { row: 'TDS for Non-Resident Investors', val: 'Fully exempt' },
    { row: 'Interest on Foreign Currency Deposits', val: 'Fully exempt for non-residents' },
    { row: 'Corporate Tax for IFSC Units (Sec 80LA)', val: '100% holiday for any 20 consecutive years within 25; deadline extended to March 2030' },
  ] satisfies GiftCityTaxRow[],

  scenarios: [
    {
      tag: 'UAE NRI',
      title: 'UAE-based NRI · Inbound India fund',
      setup: 'USD 100,000 invested in ABSL India Flexicap Fund (IFSC). Grows to USD 145,000 over 3 years.',
      rows: [
        ['Capital Gains (USD 45,000)', '0% — fully exempt (non-resident + eligible scheme)'],
        ['TDS at redemption', 'NIL from July 2025'],
        ['Indian ITR filing', 'Not required'],
        ['UAE personal income tax', '0% — UAE has no capital gains tax'],
        ['Repatriation', '100% free · 24-48 hours via SWIFT'],
      ],
      outcome: 'Combined effective tax rate: 0%. Keeps USD 45,000 in full.',
    },
    {
      tag: 'Resident · LRS',
      title: 'Resident Indian · Outbound global fund',
      setup: 'USD 100,000 remitted under LRS into ABSL Global Bluechip Equity Fund (IFSC). Held 2+ years.',
      rows: [
        ['TCS at remittance', '20% on amount above ₹10L — fully refundable in ITR'],
        ['Capital Gains (LTCG >2 yr)', '12.5%'],
        ['Foreign asset reporting', 'Schedule FA in annual ITR'],
        ['GST on management fees', 'NIL — saves 18% vs mainland'],
        ['STT / CTT / Stamp Duty', 'NIL — cost advantage vs domestic equity'],
      ],
      outcome: 'Effective taxation cleaner than mainland equity outbound routes.',
    },
    {
      tag: 'US-based NRI',
      title: 'US NRI · Special considerations',
      setup: 'US persons are taxed by IRS on global income. PFIC rules and Form 8621 apply.',
      rows: [
        ['India GIFT City tax', '0% on eligible schemes'],
        ['IRS treatment', 'PFIC risk — pooled AIFs trigger punitive IRS rates without QEF election'],
        ['Workaround', 'AIFs that issue K1/K3 statements enable QEF election'],
        ['Treaty benefit', 'Form W-8BEN required for India-US DTAA treaty claim'],
      ],
      outcome: 'Always engage a US-licensed CPA before subscribing. Structure matters.',
    },
  ] satisfies GiftCityScenario[],

  lrs: [
    { k: 'Annual limit per PAN', v: 'USD 250,000 per financial year (Apr-Mar)' },
    { k: 'Family members', v: 'Each can independently remit USD 250,000' },
    { k: 'TCS applicable', v: '20% on remittances above ₹10 lakh/year (since Oct 2023)' },
    { k: 'TCS recovery', v: 'Fully recoverable as credit against ITR liability' },
    { k: 'Form 15CA/CB', v: "Not needed — RBI's 2024 amendment greenlights GIFT as 'permitted IFSC'" },
    { k: 'Permissible investments', v: 'Global equities, ETFs, IFSC funds, PMS — all permitted' },
    { k: 'Capital gains on return', v: 'Taxable in India: 12.5% LTCG (>2 yr) / 30% STCG' },
  ] satisfies GiftCityLrsRow[],
} as const
