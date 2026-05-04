export type Stage = {
  key: string
  label: string
  minTicket: string
  complexity: 'Low' | 'Medium' | 'High' | 'Very High' | 'Specialized'
  summary: string
  /** Glossary slug to deep-link via "Learn more". */
  learnMoreSlug?: string
}

/**
 * The Indian wealth ladder, ordered by complexity and minimum ticket size.
 * Used by ProductMap (visual flow) and Pathfinder (eligibility output).
 */
export const STAGES: Stage[] = [
  {
    key: 'fd',
    label: 'Fixed Deposit',
    minTicket: '₹1,000+',
    complexity: 'Low',
    summary:
      'Bank deposit at a fixed rate. Capital safe up to ₹5L (DICGC). Interest taxed at slab rate. Real returns often negative after tax and inflation.',
  },
  {
    key: 'debt-mf',
    label: 'Debt MF',
    minTicket: '₹500+',
    complexity: 'Low',
    summary:
      'Mutual fund holding government and corporate bonds. Daily liquidity. Taxed at slab post FY24. Higher than FD, lower volatility than equity.',
  },
  {
    key: 'equity-mf',
    label: 'Equity MF',
    minTicket: '₹500+',
    complexity: 'Medium',
    summary:
      'Pooled equity exposure. Daily NAV, broad diversification, LTCG 12.5% > 1y. Best entry product for most investors building a portfolio.',
  },
  {
    key: 'sif',
    label: 'SIF',
    minTicket: '₹10 L',
    complexity: 'Medium',
    summary:
      'Specialised Investment Fund. New SEBI 2025 category for sophisticated mutual-fund-style strategies (long-short, derivatives, concentrated).',
    learnMoreSlug: 'sif',
  },
  {
    key: 'pms',
    label: 'PMS',
    minTicket: '₹50 L',
    complexity: 'High',
    summary:
      'Direct stock portfolio in your own demat, managed by a SEBI-licensed manager. Concentrated, high transparency, performance fee common.',
    learnMoreSlug: 'pms',
  },
  {
    key: 'aif-2',
    label: 'AIF Cat II',
    minTicket: '₹1 Cr',
    complexity: 'High',
    summary:
      'Closed-ended pooled vehicle for private equity, real estate, structured credit, and pre-IPO. Long lock-in (5–8 years), illiquid, asymmetric returns possible.',
    learnMoreSlug: 'aif',
  },
  {
    key: 'aif-3',
    label: 'AIF Cat III',
    minTicket: '₹1 Cr',
    complexity: 'Very High',
    summary:
      'Hedge-fund-style vehicles using long-short, derivatives, leverage. Open or closed-ended. Daily NAV. Highest fee load, target uncorrelated returns.',
    learnMoreSlug: 'aif',
  },
  {
    key: 'gift',
    label: 'GIFT City',
    minTicket: 'Variable',
    complexity: 'Specialized',
    summary:
      'India\'s onshore IFSC. USD-denominated investing, distinct tax + FEMA regime. Designed for NRIs and family offices wanting global exposure without offshoring.',
    learnMoreSlug: 'gift-city',
  },
]
