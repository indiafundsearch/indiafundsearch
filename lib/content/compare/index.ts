import type { ComparePageContent, CompareKind } from './types'
import { VERSUS } from './versus'
import { ALTERNATIVES } from './alternatives'
import { BEST_FOR } from './bestFor'

export type { ComparePageContent, CompareKind, CompareSide, CompareVerdict, CompareTable } from './types'

/** Every page in the /compare cluster, in the order the hub lists them. */
export const COMPARE_PAGES: ComparePageContent[] = [...VERSUS, ...ALTERNATIVES, ...BEST_FOR]

export const COMPARE_SLUGS: string[] = COMPARE_PAGES.map((p) => p.slug)

export const compareBySlug = (slug: string): ComparePageContent | undefined =>
  COMPARE_PAGES.find((p) => p.slug === slug)

export const compareByKind = (kind: CompareKind): ComparePageContent[] =>
  COMPARE_PAGES.filter((p) => p.kind === kind)

/** Hub section headings. Kept here so the hub and the sitemap cannot drift. */
export const COMPARE_SECTIONS: { kind: CompareKind; heading: string; blurb: string }[] = [
  {
    kind: 'versus',
    heading: 'One structure against another',
    blurb:
      'Two structures, side by side on minimum, liquidity, tax and what each is actually allowed to hold — ending with which one suits which situation, stated plainly.',
  },
  {
    kind: 'alternatives',
    heading: 'Alternatives to what you already hold',
    blurb:
      'You own the thing and want to know what else exists. Each page starts with the case for staying put, because for a good number of readers that is the right answer.',
  },
  {
    kind: 'best-for',
    heading: 'Shortlists for a specific situation',
    blurb:
      'A passport, a ticket size, a cash-flow need. The structures that fit, the ones that are ruled out, and what decides it. Categories only — no scheme is named and no manager is ranked.',
  },
]

/**
 * Comparison pages that live outside /compare.
 *
 * These two already rank on their own /learn URLs and are deliberately NOT
 * duplicated into this cluster — two pages competing for one query split the
 * signal and neither wins. The hub indexes them so a reader browsing
 * comparisons finds everything in one place.
 */
export const EXTERNAL_COMPARISONS: { label: string; href: string; note: string }[] = [
  {
    label: 'PMS vs AIF',
    href: '/learn/pms-vs-aif',
    note: 'Direct ownership against pooled units, ₹50 lakh against ₹1 crore',
  },
  {
    label: 'PMS vs mutual fund',
    href: '/learn/pms-vs-mutual-fund',
    note: 'The churn tax, the minimum, and who each one is built for',
  },
  {
    label: 'GIFT City vs Indian mutual fund, for an NRI',
    href: '/learn/gift-city-vs-mutual-fund-for-nri',
    note: 'Why the answer changes with the country you file in',
  },
  {
    label: 'NRE vs NRO account',
    href: '/learn/nre-vs-nro-account',
    note: 'Which one your investments should be routed through',
  },
  {
    label: 'UK reporting vs non-reporting funds',
    href: '/uk-tax/reporting-vs-non-reporting-funds',
    note: 'A capital gain at 24%, or income at 45%. The status decides it',
  },
]
