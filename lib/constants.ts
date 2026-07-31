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
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://indiafundsearch.com',
  description:
    'Every SEBI-regulated alternative investment in India — PMS, AIF, SIF, REITs, private credit, GIFT City — explained the way a good advisor would across a table.',
} as const

export const CONTACT = {
  /** Desk WhatsApp (country code, no +) */
  whatsappNumber: '919898424577',
  whatsappMessage:
    "Hi Beyond, I found you through IndiaFundSearch and I'd like to understand my options in alternative investments (PMS / AIF / GIFT City). When would be a good time to talk?",
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
  // 20s OTP lead gate — live (Resend configured in production). Set to false
  // to switch the popup off site-wide without removing any gate code.
  enabled: true,
  /** seconds of visible on-page time before the gate appears */
  delaySeconds: 20,
  /**
   * 'hard' — gate every page (owner's choice; note: intrusive-interstitial
   *          risk for mobile SEO).
   * 'soft' — gate everything except /learn so the SEO engine stays
   *          friction-free (recommended).
   * Flip this one value to switch.
   */
  mode: 'soft' as 'hard' | 'soft',
  /** paths never gated (CMS admin must stay reachable) */
  exemptPaths: ['/studio'],
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
