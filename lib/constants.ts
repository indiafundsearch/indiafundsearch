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
  /** TODO: replace with the real desk WhatsApp number (country code, no +) */
  whatsappNumber: '919999999999',
  whatsappMessage:
    'Hi Beyond — I was reading IndiaFundSearch and would like to talk about alternatives.',
  /** TODO: replace with the real booking link */
  calendlyUrl: 'https://calendly.com/beyond-desk/conversation',
  /** TODO: replace with the real desk email */
  email: 'desk@indiafundsearch.com',
} as const

export const whatsappHref = (message: string = CONTACT.whatsappMessage) =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`

export const DISCLOSURE = {
  /** TODO: replace with Beyond's actual registration number(s) */
  registrationLine: 'Beyond · [REGISTRATION NO. — AMFI ARN / other]',
  commission:
    'Beyond may earn distribution or referral fees from product providers when you invest through us. This is disclosed before any transaction. Our education content is written independently of these arrangements.',
  education:
    'Content on this site is for education only and is not investment advice or an offer to sell any product. Past performance does not guarantee future results. Please consult your Chartered Accountant and read all scheme documents before investing.',
  tax: 'Tax rates summarised as of FY 2026–27. Actual liability depends on residency, treaty position and income mix — always confirm with your Chartered Accountant.',
} as const

export const NAV_LINKS = [
  { href: '/', label: 'The Spectrum', no: '01' },
  { href: '/learn', label: 'Learn', no: '02' },
  { href: '/fit-finder', label: 'Fit Finder', no: '03' },
  { href: '/tax', label: 'Taxation', no: '04' },
  { href: '/gift-city', label: 'GIFT City', no: '05', highlight: true },
  { href: '/contact', label: 'Talk to Us', no: '06' },
] as const
