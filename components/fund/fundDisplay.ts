import { CATEGORY_LABELS, type FundCategory, type Mode } from '@/lib/constants'

export type FundStatus = 'Active' | 'Closed' | 'Upcoming'

export type FundCardData = {
  _id: string
  name: string
  slug: string
  provider?: string
  category?: FundCategory
  subcategory?: string
  simpleCategoryName?: string
  simpleDescription?: string
  proDescription?: string
  returns?: {
    oneYear?: number
    threeYear?: number
    fiveYear?: number
    sinceInception?: number
  }
  fees?: {
    managementFee?: number
    performanceFee?: number
    hurdleRate?: number
    exitLoad?: number
  }
  minInvestment?: number
  aum?: number
  sebiRegistration?: string
  fundManager?: string
  inceptionDate?: string
  status?: FundStatus | string
}

export type FundDetailData = FundCardData & {
  fundManagerBio?: string
  benchmark?: string
}

export function categoryLabelFor(fund: FundCardData, mode: Mode): string {
  if (mode === 'simple' && fund.simpleCategoryName) return fund.simpleCategoryName
  if (fund.category) {
    const map = CATEGORY_LABELS[fund.category]
    if (map) return mode === 'simple' ? map.simple : map.pro
    return fund.category
  }
  return ''
}

export function feeHeadlineFor(fees?: FundCardData['fees']): string {
  if (!fees) return '—'
  const parts: string[] = []
  if (fees.managementFee != null) parts.push(`${fees.managementFee}% mgmt`)
  if (fees.performanceFee != null && fees.performanceFee > 0) {
    parts.push(`${fees.performanceFee}% perf`)
  }
  return parts.length ? parts.join(' + ') : '—'
}

export function formatPercent(value: number | undefined): string {
  if (value == null || value === 0) return '—'
  return `${value.toFixed(1)}%`
}
