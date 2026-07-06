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
