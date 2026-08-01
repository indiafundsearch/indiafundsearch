/**
 * Site-wide configuration — IndiaFundSearch × Beyond.
 *
 * ⚠️ PLACEHOLDERS: the values marked TODO below must be replaced with real
 * details before production launch. Everything reads from this one file.
 */

export const SITE = {
  name: 'IndiaFundSearch',
  initiative: 'A Beyond Initiative',
  tagline: 'The Architecture of Alternatives',
  /**
   * Canonical production origin — hardcoded on purpose. This is the primary
   * domain (apex 301-redirects to www), so every canonical, og:url, og:image,
   * sitemap and robots URL must use it. It is NOT read from an env var: a wrong
   * NEXT_PUBLIC_SITE_URL (e.g. the *.vercel.app alias) previously leaked into
   * all SEO tags and split ranking signals. Change here if the domain ever moves.
   */
  url: 'https://www.indiafundsearch.com',
  description:
    'Every SEBI-regulated alternative investment in India — PMS, AIF, SIF, REITs, private credit, GIFT City — explained the way a good advisor would across a table.',
} as const

export const CONTACT = {
  /** Desk WhatsApp (country code, no +) */
  whatsappNumber: '919898424577',
  whatsappMessage:
    "Hello team, I found IndiaFundSearch and I'm interested in GIFT City / global investing options. Could we set up a quick call?",
  /** Booking link — leave empty until a Calendly/Cal.com link exists; the
   *  "Book a conversation" CTAs hide themselves while this is blank. */
  calendlyUrl: '',
  /** Desk email — also receives instant new-lead notifications. */
  email: 'hello@jslwealth.in',
} as const

export const whatsappHref = (message: string = CONTACT.whatsappMessage) =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`

export const DISCLOSURE = {
  commission:
    'Beyond may earn distribution or referral fees from product providers when you invest through us. This is disclosed before any transaction. Our education content is written independently of these arrangements.',
  education:
    'Content on this site is for education only and is not investment advice or an offer to sell any product. Past performance does not guarantee future results. Please consult your Chartered Accountant and read all scheme documents before investing.',
  tax: 'Tax rates summarised as of FY 2026–27. Actual liability depends on residency, treaty position and income mix — always confirm with your Chartered Accountant.',
} as const

export const GATE = {
  // 20s OTP lead popup — live (Resend configured in production). Set to false
  // to switch it off entirely without removing any gate code.
  enabled: true,
  /** seconds of visible on-page time before the popup appears */
  delaySeconds: 20,
  /**
   * The popup fires ONLY on these high-intent path prefixes (the GIFT City
   * section). All education (home, /learn, /tax, /fit-finder, /contact) stays
   * open so cold traffic and shared links are friction-free.
   */
  gatedPaths: ['/gift-city'] as string[],
  /**
   * Never popped — /studio (CMS), and the two fund shelves which already have
   * their own eligibility interstitial (no double-gating).
   */
  exemptPaths: ['/studio', '/gift-city/inbound', '/gift-city/outbound'] as string[],
  /** days a verified visitor stays ungated on this device */
  verifiedDays: 90,
} as const

export const NAV_LINKS = [
  { href: '/', label: 'The Spectrum', no: '01' },
  { href: '/learn', label: 'Learn', no: '02' },
  { href: '/fit-finder', label: 'Fit Finder', no: '03' },
  { href: '/tax', label: 'Taxation', no: '04' },
  { href: '/gift-city', label: 'GIFT City', no: '05', highlight: true },
  { href: '/contact', label: 'Talk to Us', no: '06' },
] as const

/**
 * Drawing-set sheet numbers — the SINGLE source of truth (P2-13). Every
 * "Sheet NN — …" eyebrow imports its number from here, so the sequence can
 * never drift (previously the homepage's Fit-Finder block said Sheet 03 while
 * /fit-finder said Sheet 04).
 */
export const SHEETS = {
  spectrum: { no: '01', title: 'Site Plan' },
  // Learn is one sheet (02); "First Principles" and "The Materials" are its two
  // sections — so the sheet numbers line up 1:1 with the six nav tabs.
  fundamentals: { no: '02', title: 'First Principles' },
  materials: { no: '02', title: 'Material Specifications' },
  fitFinder: { no: '03', title: 'Load Calculation' },
  tax: { no: '04', title: 'Compliance Schedule' },
  giftCity: { no: '05', title: 'GIFT City' },
  contact: { no: '06', title: 'Site Office' },
} as const

/**
 * Curation currency for both GIFT shelves (P2-20) — one field drives both so
 * they can't disagree. Keep `curatedAsOf` current when the desk reviews them.
 */
export const GIFT_SHELF = {
  // Bump monthly when the desk reviews the shelves (keeps "Reviewed monthly" honest).
  curatedAsOf: 'August 2026',
  reviewCadence: 'Reviewed monthly',
} as const
