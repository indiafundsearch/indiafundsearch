import type { Source } from '../types'

/** Primary sources shared across the comparison cluster. Every one of these has
 *  been opened and checked — a dead or wrong citation on a YMYL page costs more
 *  trust than no citation at all. Verified 12 September 2026. */

export const SEBI_PMS: Source = {
  label: 'SEBI (Portfolio Managers) Regulations, 2020',
  url: 'https://www.sebi.gov.in/legal/regulations/sep-2025/securities-and-exchange-board-of-india-portfolio-managers-regulations-2020-last-amended-on-september-03-2025-_96560.html',
  issuer: 'SEBI',
  date: 'Last amended September 2025',
}

export const SEBI_AIF: Source = {
  label: 'SEBI (Alternative Investment Funds) Regulations, 2012',
  url: 'https://www.sebi.gov.in/legal/regulations/jul-2026/securities-and-exchange-board-of-india-alternative-investment-funds-regulations-2012-last-amended-on-july-14-2026-_102975.html',
  issuer: 'SEBI',
  date: 'Last amended July 2026',
}

export const SEBI_MF: Source = {
  label: 'SEBI (Mutual Funds) Regulations, 1996',
  url: 'https://www.sebi.gov.in/sebi_data/commondocs/mfregulations_p.pdf',
  issuer: 'SEBI',
}

export const SEBI_SIF: Source = {
  label: 'Specialised Investment Funds — SEBI framework',
  url: 'https://www.sebi.gov.in/legal/circulars/feb-2025/specialized-investment-funds-sif-_92155.html',
  issuer: 'SEBI',
  date: 'February 2025',
}

export const SEBI_REIT: Source = {
  label: 'SEBI (Real Estate Investment Trusts) Regulations, 2014',
  url: 'https://www.sebi.gov.in/legal/regulations/aug-2025/securities-and-exchange-board-of-india-real-estate-investment-trusts-regulations-2014-last-amended-on-august-05-2025-_96069.html',
  issuer: 'SEBI',
}

export const SEBI_RA: Source = {
  label: 'SEBI (Research Analysts) Regulations, 2014',
  url: 'https://www.sebi.gov.in/legal/regulations/jan-2025/securities-and-exchange-board-of-india-research-analysts-regulations-2014-last-amended-on-january-08-2025-_91170.html',
  issuer: 'SEBI',
}

export const RBI_FI: Source = {
  label: 'RBI Master Direction — Foreign Investment in India',
  url: 'https://rbi.org.in/scripts/BS_ViewMasDirections.aspx?id=11200',
  issuer: 'RBI',
}

export const RBI_DEPOSITS: Source = {
  label: 'RBI Master Direction — Interest Rate on Deposits',
  url: 'https://rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=10295',
  issuer: 'RBI',
}

export const DICGC: Source = {
  label: 'DICGC — deposit insurance cover',
  url: 'https://www.dicgc.org.in/FD_DepositInsurance.html',
  issuer: 'DICGC (RBI subsidiary)',
}

export const IFSCA_FM: Source = {
  label: 'IFSCA (Fund Management) Regulations, 2025',
  url: 'https://ifsca.gov.in/Pages/Contents/Fund_Management',
  issuer: 'IFSCA',
}

export const ITA_2025: Source = {
  label: 'India — Income-tax Act, 2025 (in force 1 April 2026)',
  url: 'https://www.incometaxindia.gov.in/income-tax-act-2025',
  issuer: 'Government of India',
}

export const IRS_PFIC: Source = {
  label: 'IRS — Form 8621, Passive Foreign Investment Companies',
  url: 'https://www.irs.gov/forms-pubs/about-form-8621',
  issuer: 'IRS',
  documentNumber: 'Form 8621',
}
