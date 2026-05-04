/**
 * NRI Pathfinder — surfaces which GIFT City / onshore structures fit a given
 * NRI's profile based on country, FEMA status, and repatriation needs.
 *
 * These are heuristics, not tax advice. The output ranks products by
 * suitability so the user knows what to ask their advisor about first.
 */

export type Country = 'US' | 'UK_EU' | 'GCC' | 'SG_HK' | 'OTHER'
export type FemaStatus = 'NRI' | 'OCI' | 'RNOR' | 'RESIDENT'
export type Repatriation = 'full' | 'partial' | 'none'

export type NriAnswer = {
  country: Country
  fema: FemaStatus
  repatriation: Repatriation
}

export type Verdict = 'fit' | 'partial' | 'not-fit'

export type NriProduct = {
  key: string
  label: string
  summary: string
}

export const NRI_PRODUCTS: NriProduct[] = [
  {
    key: 'ifsc-aif',
    label: 'IFSC AIF (GIFT City)',
    summary: 'USD-denominated alternative funds onshore in India under IFSCA — no FEMA frictions, distinct tax regime.',
  },
  {
    key: 'ifsc-bank',
    label: 'IFSC Banking Unit',
    summary: 'USD-denominated deposits and structured products at GIFT-City branches of Indian banks.',
  },
  {
    key: 'ifsc-broker',
    label: 'IFSC Brokerage / Family Office',
    summary: 'USD trading accounts to access US and global equities through GIFT-City brokerages.',
  },
  {
    key: 'onshore-pms',
    label: 'Onshore PMS via NRO',
    summary: 'INR-denominated PMS held in your NRO account. Repatriation capped at $1M / FY.',
  },
  {
    key: 'onshore-mf',
    label: 'Onshore Mutual Funds',
    summary: 'INR mutual funds via NRE / NRO. Available to NRIs but PFIC reporting is a real concern for US investors.',
  },
]

export function evaluateNri(answer: NriAnswer): Record<string, Verdict> {
  const { country, fema, repatriation } = answer

  return {
    'ifsc-aif': pickIfscAif(fema, repatriation),
    'ifsc-bank': pickIfscBank(fema, repatriation),
    'ifsc-broker': pickIfscBroker(fema, country),
    'onshore-pms': pickOnshorePms(fema, repatriation),
    'onshore-mf': pickOnshoreMf(fema, country),
  }
}

function pickIfscAif(fema: FemaStatus, repat: Repatriation): Verdict {
  if (fema === 'RESIDENT') return 'not-fit'
  // GIFT structures keep capital in USD onshore — perfect for full repatriation needs.
  if (repat === 'full' || repat === 'partial') return 'fit'
  return 'partial'
}

function pickIfscBank(fema: FemaStatus, repat: Repatriation): Verdict {
  if (fema === 'RESIDENT') return 'not-fit'
  if (repat === 'full') return 'fit'
  return 'partial'
}

function pickIfscBroker(fema: FemaStatus, country: Country): Verdict {
  if (fema === 'RESIDENT') return 'not-fit'
  if (country === 'US') return 'partial' // PFIC and W-8 paperwork still apply
  return 'fit'
}

function pickOnshorePms(fema: FemaStatus, repat: Repatriation): Verdict {
  if (fema === 'RESIDENT') return 'fit'
  if (repat === 'full') return 'partial' // capped at $1M / FY
  return 'fit'
}

function pickOnshoreMf(fema: FemaStatus, country: Country): Verdict {
  if (fema === 'RESIDENT') return 'fit'
  if (country === 'US') return 'not-fit' // PFIC pain
  return 'partial'
}
