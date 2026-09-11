/**
 * Author entities for E-E-A-T (Phase 2).
 *
 * Every page here is YMYL. Google applies elevated trust requirements to
 * financial pages, and a named, credentialled, linkable author is the cheapest
 * signal we can give it.
 *
 * ⚠️ TODO: VERIFY — AMFI ARN. The owner has asked for the visible placeholder
 * "XXXXX" until the real number is to hand (September 2026). The ARN is held by
 * JSL Wealth Management Private Limited. `ARN_IS_PLACEHOLDER` keeps the
 * placeholder OUT of JSON-LD — a fake identifier in schema is worse than none —
 * while the byline and footer render it exactly as asked. Replace the string
 * and the flag goes false on its own.
 */

export interface Author {
  slug: string
  name: string
  role: string
  /** Short credential line under the byline. Keep to one clause. */
  credential: string
  /** AMFI ARN. Placeholder until verified — never guess it. */
  arn: string | null
  bio: string[]
  expertise: string[]
  linkedInUrl: string
  /** Headshot in /public. null until supplied; the byline falls back to a monogram. */
  image: string | null
}

export const AUTHORS: Author[] = [
  {
    slug: 'yash-jhaveri',
    name: 'Yash Jhaveri',
    role: 'Founder & CEO, Beyond',
    credential: 'Beyond · JSL Wealth Management · Vadodara',
    arn: 'XXXXX', // TODO: VERIFY — AMFI ARN of JSL Wealth Management Pvt Ltd; owner to supply
    bio: [
      'Yash Jhaveri is the founder and CEO of Beyond, the wealth-distribution boutique behind IndiaFundSearch, based in Vadodara, Gujarat. Beyond operates within JSL Wealth Management Private Limited and is built on Jhaveri Securities Ltd, a securities business established in 1992.',
      'Before Beyond he spent ten years at Jhaveri Securities, from 2012 to 2023, distributing across the full spectrum — equities, mutual funds, PMS, AIFs, private equity, venture and structured products — to resident families, promoters and NRIs. Beyond distributes; it does not advise. His work is with resident Indian families and with NRIs in the United States, the United Kingdom and the Gulf, on the structures that sit above mutual funds.',
      'He read at the University of Manchester. He writes the education on this site himself, and its governing idea is that the answer is sometimes "not yet" — a site that never says so is a brochure.',
    ],
    expertise: [
      'Portfolio Management Services (PMS)',
      'Alternative Investment Funds (AIF)',
      'Specialised Investment Funds (SIF)',
      'GIFT City and IFSCA-regulated structures',
      'Cross-border investing for NRIs (US, UK, UAE)',
    ],
    linkedInUrl: 'https://www.linkedin.com/in/yashjhaveriwealth/',
    image: null, // TODO: owner to supply a headshot
  },
]

/** True while `arn` is the owner-requested placeholder. Consumers that feed schema check this. */
export const ARN_IS_PLACEHOLDER = /^x+$/i

export const authorBySlug = (slug: string): Author | undefined =>
  AUTHORS.find((a) => a.slug === slug)

/** The default author for site content. */
export const PRIMARY_AUTHOR = AUTHORS[0]
