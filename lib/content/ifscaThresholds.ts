/**
 * IFSCA threshold table (Appendix A, Task A.5).
 *
 * The minimum-investment and investor-cap columns are filled from figures
 * already verified for /learn/gift-city-minimum-investment (IFSCA Fund
 * Management Regulations). Corpus, FME category, sponsor commitment, tenure
 * and repatriability are NOT yet verified and render as "Pending
 * verification" — never guessed. The brief is explicit that
 * the content is supplied after review and must not be drafted here, so this
 * file ships the SHAPE and the machinery (CSV export, versioning, changelog,
 * Dataset schema) with an empty dataset. `/gift-city/thresholds` stays noindex
 * until ROWS is populated; publishing an empty table would be worse than not
 * publishing it.
 *
 * When the rows land: populate ROWS, bump VERSION, add a CHANGELOG entry, set
 * LAST_VERIFIED, and remove `noindex` from the route.
 *
 * Design rules that must survive, because they are the commercial point of the
 * page: semantic <table>, a governing provision against every row, a visible
 * last-verified date, CSV download, and no lead form, email gate or product
 * mention anywhere on the page.
 */

export interface ThresholdRow {
  vehicleType: string
  investorClass: string
  minimumInvestment: string
  minimumCorpus: string
  fmeCategory: string
  sponsorCommitment: string
  tenureLockIn: string
  repatriability: string
  /** Regulation and clause, e.g. "IFSCA (Fund Management) Regulations, 2025, Reg. 32(2)". */
  governingProvision: string
  lastVerified: string
  /** Maximum number of investors the scheme may take, where the rules set one. */
  investorCap: string
}

export const VERSION = '0.2.0-draft'
/** Date the minimum-investment column was checked against the IFSCA rules. */
export const LAST_VERIFIED: string | null = 'August 2026'
/** True until every column has been verified — the page stays noindex meanwhile. */
export const PARTIAL = true // TODO: VERIFY — corpus, FME category, sponsor commitment, tenure, repatriability
export const ROWS: ThresholdRow[] = [
  { vehicleType: 'Restricted scheme (non-retail)', investorClass: 'Ordinary investor', minimumInvestment: 'US $150,000', minimumCorpus: 'Pending verification', fmeCategory: 'Pending verification', sponsorCommitment: 'Pending verification', tenureLockIn: 'Pending verification', repatriability: 'Pending verification', governingProvision: 'IFSCA (Fund Management) Regulations, 2025', lastVerified: 'August 2026', investorCap: 'Maximum 1,000 investors' },
  { vehicleType: 'Restricted scheme (non-retail)', investorClass: 'Employee or director of the FME', minimumInvestment: 'US $40,000', minimumCorpus: 'Pending verification', fmeCategory: 'Pending verification', sponsorCommitment: 'Pending verification', tenureLockIn: 'Pending verification', repatriability: 'Pending verification', governingProvision: 'IFSCA (Fund Management) Regulations, 2025', lastVerified: 'August 2026', investorCap: 'Maximum 1,000 investors' },
  { vehicleType: 'Restricted scheme (non-retail)', investorClass: 'IFSCA-accredited investor', minimumInvestment: 'Per scheme — several houses set a lower minimum', minimumCorpus: 'Pending verification', fmeCategory: 'Pending verification', sponsorCommitment: 'Pending verification', tenureLockIn: 'Pending verification', repatriability: 'Pending verification', governingProvision: 'IFSCA (Fund Management) Regulations, 2025', lastVerified: 'August 2026', investorCap: 'Maximum 1,000 investors' },
  { vehicleType: 'Venture capital scheme', investorClass: 'Ordinary investor', minimumInvestment: 'US $250,000', minimumCorpus: 'Pending verification', fmeCategory: 'Pending verification', sponsorCommitment: 'Pending verification', tenureLockIn: 'Pending verification', repatriability: 'Pending verification', governingProvision: 'IFSCA (Fund Management) Regulations, 2025', lastVerified: 'August 2026', investorCap: 'Maximum 50 investors' },
  { vehicleType: 'Venture capital scheme', investorClass: 'Employee or director of the FME', minimumInvestment: 'US $60,000', minimumCorpus: 'Pending verification', fmeCategory: 'Pending verification', sponsorCommitment: 'Pending verification', tenureLockIn: 'Pending verification', repatriability: 'Pending verification', governingProvision: 'IFSCA (Fund Management) Regulations, 2025', lastVerified: 'August 2026', investorCap: 'Maximum 50 investors' },
  { vehicleType: 'IFSC portfolio management (managed account)', investorClass: 'Any eligible client', minimumInvestment: 'US $75,000 (reduced from US $150,000)', minimumCorpus: 'Pending verification', fmeCategory: 'Pending verification', sponsorCommitment: 'Pending verification', tenureLockIn: 'Pending verification', repatriability: 'Pending verification', governingProvision: 'IFSCA (Fund Management) Regulations, 2025', lastVerified: 'August 2026', investorCap: '—' },
  { vehicleType: 'Retail scheme', investorClass: 'Any eligible investor', minimumInvestment: 'No per-investor minimum', minimumCorpus: 'Pending verification', fmeCategory: 'Pending verification', sponsorCommitment: 'Pending verification', tenureLockIn: 'Pending verification', repatriability: 'Pending verification', governingProvision: 'IFSCA (Fund Management) Regulations, 2025', lastVerified: 'August 2026', investorCap: '—' },
  { vehicleType: 'Retail scheme, close-ended, >15% in unlisted securities', investorClass: 'Any eligible investor', minimumInvestment: 'US $10,000', minimumCorpus: 'Pending verification', fmeCategory: 'Pending verification', sponsorCommitment: 'Pending verification', tenureLockIn: 'Pending verification', repatriability: 'Pending verification', governingProvision: 'IFSCA (Fund Management) Regulations, 2025', lastVerified: 'August 2026', investorCap: '—' },
]

export const CHANGELOG: { version: string; date: string; note: string }[] = [
  { version: '0.1.0-draft', date: 'September 2026', note: 'Table shape, CSV export and schema built. Rows pending legal review.' },
  { version: '0.2.0-draft', date: 'September 2026', note: 'Minimum-investment and investor-cap columns filled from the IFSCA rules as verified in August 2026. Remaining columns pending verification.' },
]

export const COLUMNS: { key: keyof ThresholdRow; label: string }[] = [
  { key: 'vehicleType', label: 'Vehicle type' },
  { key: 'investorClass', label: 'Investor class' },
  { key: 'minimumInvestment', label: 'Minimum investment' },
  { key: 'investorCap', label: 'Investor cap' },
  { key: 'minimumCorpus', label: 'Minimum corpus' },
  { key: 'fmeCategory', label: 'FME category' },
  { key: 'sponsorCommitment', label: 'Sponsor commitment' },
  { key: 'tenureLockIn', label: 'Tenure / lock-in' },
  { key: 'repatriability', label: 'Repatriability' },
  { key: 'governingProvision', label: 'Governing provision' },
  { key: 'lastVerified', label: 'Last verified' },
]

/** CSV for the download link. Quotes every field so commas in provisions survive. */
export function toCsv(rows: ThresholdRow[] = ROWS): string {
  const esc = (v: string) => `"${(v ?? '').replace(/"/g, '""')}"`
  const head = COLUMNS.map((c) => esc(c.label)).join(',')
  const body = rows.map((r) => COLUMNS.map((c) => esc(r[c.key])).join(',')).join('\n')
  return body ? `${head}\n${body}\n` : `${head}\n`
}
