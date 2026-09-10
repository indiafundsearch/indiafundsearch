/**
 * IFSCA threshold table (Appendix A, Task A.5).
 *
 * ⚠️ TODO: CONTENT — rows are pending legal review. The brief is explicit that
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
}

export const VERSION = '0.1.0-draft'
export const LAST_VERIFIED: string | null = null // TODO: CONTENT
export const ROWS: ThresholdRow[] = [] // TODO: CONTENT — pending legal review

export const CHANGELOG: { version: string; date: string; note: string }[] = [
  { version: '0.1.0-draft', date: 'September 2026', note: 'Table shape, CSV export and schema built. Rows pending legal review.' },
]

export const COLUMNS: { key: keyof ThresholdRow; label: string }[] = [
  { key: 'vehicleType', label: 'Vehicle type' },
  { key: 'investorClass', label: 'Investor class' },
  { key: 'minimumInvestment', label: 'Minimum investment' },
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
