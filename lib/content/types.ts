// GENERATED from Beyond — The Architecture of Alternatives (R3), 2026-07.
// Source of truth for educational content. Edit deliberately — copy is compliance-reviewed.

export interface Product {
  id: string;
  slug: string;
  name: string;
  tag: string;
  badge: string;
  /** 0–100 indicative risk position */
  risk: number;
  /** 0–100 indicative liquidity position */
  liq: number;
  /** midpoint indicative return, % p.a. */
  mid: number;
  /** typical horizon, years */
  yrs: number;
  riskBand: string;
  liqLabel: string;
  min: string;
  /** minimum ticket in ₹ Lakh (for bubble sizing + Fit Finder minimum check) */
  minL: number;
  ret: string;
  horizon: string;
  cashflow: boolean;
  analogy: string;
  what: string;
  solves: string[];
  benefits: string[];
  risks: string[];
  tax: string;
  nriNote?: string;
  /** Search title, <=60 chars, keyword-first, no brand suffix. */
  seoTitle: string;
  /** Search description, <=155 chars. States what the page answers. */
  seoDescription: string;
  /**
   * Optional question-shaped depth for pages sitting in striking distance
   * (Phase 6). Rendered as native <details> so every answer stays crawlable,
   * and mirrored into FAQPage schema. Only the pages that need the depth carry
   * it — a spec page that already answers its query stays short on purpose.
   */
  deepDive?: DeepDive[];
}

export interface DeepDive {
  q: string;
  /** paragraphs; trusted in-house HTML (<b>, <em>, <a> only) */
  a: string[];
}

export interface Article {
  no: string;
  slug: string;
  title: string;
  sub: string;
  min: string;
  /** trusted HTML authored in-house — rendered via dangerouslySetInnerHTML */
  bodyHtml: string;
}

export interface ObjectiveGroup {
  heading: string;
  sub: string;
  /** [name, engine, role, badge, productId] */
  rows: [string, string, string, string, string][];
}

export interface ComparisonTable {
  head: string[];
  sub: string[];
  rows: string[][];
}

export interface FitProfile {
  liq: number;
  risk: number;
  cf: boolean;
  hz: number[];
  obj: Record<'grow' | 'bal' | 'inc' | 'pres' | 'frontier', number>;
}

export interface FitQuestion {
  k: 'obj' | 'hz' | 'risk' | 'lock' | 'cf' | 'ticket' | 'res';
  q: string;
  why: string;
  /** [value, label, hint] */
  opts: [string | number | boolean, string, string][];
}

export type TaxRow = [string, string, string, string, string, string];

/** A primary-source citation. Corridor pages link foreign law to the regulator
 *  that publishes it — never to a secondary summary. */
export interface Source {
  label: string;
  url: string;
  /** Issuing body, e.g. "SEBI", "HMRC", "IRS". Shown under the link. */
  issuer?: string;
  /** Regulation, circular or form number where one exists. */
  documentNumber?: string;
  /** Date of the document or the version cited. */
  date?: string;
}

/** One question-shaped section. `q` becomes an <h2>; `a` must answer it
 *  standalone, without needing the rest of the page (AEO: heading-matched,
 *  self-contained passages are what answer engines quote). */
export interface CorridorQA {
  q: string;
  a: string[];
  sources?: Source[];
}

export interface CorridorTable {
  caption: string;
  head: string[];
  rows: string[][];
  note?: string;
}

export interface Corridor {
  slug: string;
  /** ISO-ish short code used in the corridor switcher */
  code: string;
  flag: string;
  /** Country name as it reads in prose, e.g. "the United States" */
  country: string;
  /** Short label for nav/switcher, e.g. "United States" */
  label: string;
  /** hreflang locale this page is the regional variant for */
  hreflang: string;
  title: string;
  /** The contrarian, corridor-specific assertion. One line, no hedging. */
  hook: string;
  /**
   * 40–60 words, self-contained, NO links. Sits directly under the H1 and is
   * the passage most likely to be lifted whole by an answer engine.
   */
  capsule: string;
  lede: string;
  /** "At a glance" strip — [label, value] */
  facts: [string, string][];
  table: CorridorTable;
  qas: CorridorQA[];
  /** Problem-shaped headings — these rank for "…mistake" and "…wrong" queries. */
  mistakes: { m: string; why: string }[];
  /** What to actually do, in order. */
  checklist: string[];
  metaTitle: string;
  metaDescription: string;
  /** Visible "last reviewed" — a YMYL and freshness signal. Keep honest. */
  reviewed: string;
  /** Visible "Published" date (Phase 2, Task 2.3). */
  published?: string;
  /** Visible "Regulatory position as at" date. */
  regulatoryAsAt?: string;
  /** Market signal shown under the capsule (Appendix A, Task A.7). */
  marketNote?: string;
  /**
   * Hand-picked next reads (Phase 4, Task 4.3 and Phase 6). Corridor pages are
   * the deepest entry points on the site, so they carry the most weight to pass
   * on to the tax clusters they sit above.
   */
  related?: { label: string; href: string }[];
  sources: Source[];
}
