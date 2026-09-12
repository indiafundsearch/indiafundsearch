import type { Source } from '../types'
import type { AnswerSection } from '../answers'

/**
 * Bottom-of-funnel decision pages — the "comparison cluster".
 *
 * NOT to be confused with `lib/content/comparison.ts`, which is the single
 * four-column PMS/AIF/MF/SIF reference table shown on the Learn hub. This
 * module is the page type.
 *
 * WHY THIS CLUSTER EXISTS
 * The rest of the site answers "what is X". Those queries are read by someone
 * who does not yet know they have a problem, and they are contested by every
 * AMC blog and every aggregator in India. A page like "SIF vs PMS" is read by
 * someone who has already shortlisted two structures and is deciding between
 * them this month. Same writing effort, a fraction of the competition, and a
 * reader who is at the end of their research rather than the start.
 *
 * THE COMPLIANCE LINE — READ BEFORE ADDING A PAGE
 * These pages compare REGULATORY STRUCTURES and ASSET CLASSES. They never
 * compare named third-party schemes, never rank managers, and never publish
 * or imply a performance claim for a specific product. Beyond earns referral
 * fees on some of what is described here (see DISCLOSURE in lib/constants),
 * which is exactly why a page that ranked named products would be indefensible
 * whatever the disclaimer said. No third-party platform, distributor or product
 * brand is named anywhere in this cluster, not even as a structural contrast.
 *
 * Every indicative return band is inherited from lib/content/products.ts and
 * carries its "indicative" label. Do not add a number here that is not either
 * a regulatory threshold or already published elsewhere on the site.
 *
 * HOUSE STYLE (same as answers.ts and guides.ts)
 * Written for a busy person with money, reading on a phone. The verdict first,
 * before any context. Short sentences, one idea each. No throat-clearing, and
 * no pretending the answer is always "the expensive one".
 */

export type CompareKind = 'versus' | 'alternatives' | 'best-for'

/** One column of the decision matrix, named in the page header. */
export interface CompareSide {
  /** Short label — becomes a table column head and a verdict heading. */
  label: string
  /** The one fact that most defines it, e.g. "₹50 lakh · your own demat". */
  sub: string
  /** Optional link to the structure's own specification page. */
  href?: string
}

/** "Choose this when…" — the block a decided reader scrolls straight to. */
export interface CompareVerdict {
  side: string
  /** Conditions, each one testable against the reader's own situation. */
  when: string[]
}

export interface CompareTable {
  caption: string
  /** First cell is the row-label column head; usually left blank. */
  head: string[]
  rows: string[][]
  note?: string
}

export interface ComparePageContent {
  slug: string
  kind: CompareKind
  /** The H1. Should read like the query someone typed into Google. */
  title: string
  /** The columns being compared. Two for a versus page, more for the others. */
  sides: CompareSide[]
  /** The contrarian one-liner. No hedging, no "it depends". */
  hook: string
  /**
   * 40–60 words, self-contained, NO links. Sits under the H1 and is the passage
   * an answer engine lifts whole. It must contain an actual verdict — a capsule
   * that says "it depends on your situation" is a wasted capsule.
   */
  capsule: string
  metaTitle: string
  metaDescription: string
  /** The decision matrix. The reason the page exists. */
  table: CompareTable
  /** Optional second table — usually the cost or tax arithmetic. */
  numbers?: CompareTable
  verdicts: CompareVerdict[]
  sections: AnswerSection[]
  /** Problem-shaped headings. These rank for "…mistake" and "…wrong" queries. */
  mistakes?: { m: string; why: string }[]
  faqs?: { q: string; a: string }[]
  related: { label: string; href: string }[]
  sources: Source[]
  /** Visible "Last reviewed". Keep honest. */
  reviewed: string
  published?: string
  /** Only where the page states a regulatory position. */
  regulatoryAsAt?: string
}
