/**
 * Author entities for E-E-A-T (Phase 2).
 *
 * Every page here is YMYL. Google applies elevated trust requirements to
 * financial pages, and a named, credentialled, linkable author is the cheapest
 * signal we can give it.
 *
 * ⚠️ TODO: VERIFY — AMFI ARN. There is no ARN anywhere in this repo. The brief
 * requires it on the byline, in the firm-credentials footer and as the
 * Organization schema `identifier`, and explicitly forbids inventing one. The
 * `arn` field below stays null until the owner supplies it; every consumer
 * checks for null and simply omits the line rather than rendering a blank.
 * Also confirm WHICH entity holds it — JSL Wealth Management, or Jhaveri
 * Securities — because that changes what the footer should say.
 */

export interface Author {
  slug: string
  name: string
  role: string
  /** Short credential line under the byline. Keep to one clause. */
  credential: string
  /** AMFI ARN. null until verified — never guess it. */
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
    role: 'Founder & Principal Adviser',
    credential: 'Beyond · JSL Wealth Management · Vadodara',
    arn: null, // TODO: VERIFY — AMFI ARN, and which entity holds it
    bio: [
      'Yash Jhaveri runs Beyond, the advisory practice behind IndiaFundSearch, from Vadodara in Gujarat. The practice sits within JSL Wealth Management Private Limited and is built on Jhaveri Securities Ltd, a securities business established in 1992.',
      'His work is with resident Indian families and with NRIs in the United States, the United Kingdom and the Gulf, on the structures that sit above mutual funds: portfolio management services, alternative investment funds, specialised investment funds, and GIFT City.',
      'He read at the University of Manchester. He writes the education on this site himself, and its governing idea is that the answer is sometimes "not yet" — a site that never says so is a brochure.',
    ],
    expertise: [
      'Portfolio Management Services (PMS)',
      'Alternative Investment Funds (AIF)',
      'Specialised Investment Funds (SIF)',
      'GIFT City and IFSCA-regulated structures',
      'Cross-border investing for NRIs (US, UK, UAE)',
    ],
    linkedInUrl: 'https://www.linkedin.com/in/yash-jhaveri-/',
    image: null, // TODO: owner to supply a headshot
  },
]

export const authorBySlug = (slug: string): Author | undefined =>
  AUTHORS.find((a) => a.slug === slug)

/** The default author for site content. */
export const PRIMARY_AUTHOR = AUTHORS[0]
