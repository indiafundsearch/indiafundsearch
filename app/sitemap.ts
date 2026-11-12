import type { MetadataRoute } from 'next'
import { PRODUCTS } from '@/lib/content/products'
import { CORRIDORS } from '@/lib/content/corridors'
import { ANSWER_SLUGS } from '@/lib/content/answers'
import { AUTHORS } from '@/lib/content/authors'
import { US_TAX_SLUGS } from '@/lib/content/usTax'
import { UK_TAX_SLUGS } from '@/lib/content/ukTax'
import { GIFT_CITY_SLUGS } from '@/lib/content/giftCity'
import { SITE } from '@/lib/constants'

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/learn', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/fit-finder', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/tax', priority: 0.8, changeFrequency: 'monthly' },
  // /gift-city hub stays indexed (the SEO asset). The inbound/outbound fund
  // shelves are intentionally excluded — they are noindex, eligibility-gated
  // private-placement references (P0-5).
  { path: '/gift-city', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
  // NRI corridor hub — the corridor pages themselves are appended below.
  { path: '/nri', priority: 0.9, changeFrequency: 'monthly' },
  // Standalone money-keyword guides (P3-25)
  { path: '/learn/what-is-pms', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/learn/what-is-aif', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/learn/pms-vs-aif', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'monthly' },
  { path: '/disclosures', priority: 0.3, changeFrequency: 'monthly' },
  { path: '/us-tax', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/uk-tax', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/learn/us-nri-pfic', priority: 0.8, changeFrequency: 'monthly' },
  // NOTE: both /gift-city shelves are noindex by design and deliberately absent
  // (Phase 7, Task 7.3).
]

/**
 * Real last-modified dates, by content group. Every URL used to carry the build
 * time, which made all 69 entries identical — and a lastmod that is always
 * "now" is one Google learns to ignore. BUMP THE RELEVANT LINE when that
 * content actually changes; leave the rest alone.
 */
const UPDATED = {
  hubs: '2026-11-11', // home, learn, footer links to the tax clusters
  products: '2026-11-11', // heading levels; capsules + quick answers 2026-10-23
  corridors: '2026-11-11', // eight country guides added; hreflang cluster removed
  answers: '2026-10-23', // contextual links
  usTax: '2026-10-23',
  ukTax: '2026-11-11', // HMRC extract refreshed from the 4 Nov 2026 file
  giftCity: '2026-10-23',
  articles: '2026-09-11', // capsule + FAQ
  tax: '2026-10-23',
  about: '2026-10-23',
  legal: '2026-09-10',
} as const

const LASTMOD: Record<string, string> = {
  '': UPDATED.hubs,
  '/learn': UPDATED.hubs,
  '/fit-finder': UPDATED.legal,
  '/tax': UPDATED.tax,
  '/gift-city': UPDATED.giftCity,
  '/contact': UPDATED.about,
  '/nri': UPDATED.corridors,
  '/learn/what-is-pms': UPDATED.articles,
  '/learn/what-is-aif': UPDATED.articles,
  '/learn/pms-vs-aif': UPDATED.articles,
  '/privacy': '2026-11-12', // analytics paragraph added
  '/disclosures': UPDATED.legal,
  '/us-tax': UPDATED.usTax,
  '/uk-tax': UPDATED.ukTax,
  '/about': UPDATED.about,
  '/learn/us-nri-pfic': UPDATED.tax,
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = SITE.url
  const d = (iso: string) => new Date(`${iso}T00:00:00.000Z`)

  return [
    ...STATIC_ROUTES.map((entry) => ({
      url: `${siteUrl}${entry.path}`,
      lastModified: d(LASTMOD[entry.path] ?? UPDATED.legal),
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    })),
    ...PRODUCTS.map((p) => ({
      url: `${siteUrl}/learn/${p.slug}`,
      lastModified: d(UPDATED.products),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...CORRIDORS.map((c) => ({
      url: `${siteUrl}/nri/${c.slug}`,
      lastModified: d(UPDATED.corridors),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    // Long-tail answer pages — one question each.
    ...AUTHORS.map((a) => ({
      url: `${siteUrl}/about/${a.slug}`,
      lastModified: d(UPDATED.about),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
    ...US_TAX_SLUGS.map((slug) => ({
      url: `${siteUrl}/us-tax/${slug}`,
      lastModified: d(UPDATED.usTax),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...GIFT_CITY_SLUGS.map((slug) => ({
      url: `${siteUrl}/gift-city/${slug}`,
      lastModified: d(UPDATED.giftCity),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...UK_TAX_SLUGS.map((slug) => ({
      url: `${siteUrl}/uk-tax/${slug}`,
      lastModified: d(UPDATED.ukTax),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...ANSWER_SLUGS.map((slug) => ({
      url: `${siteUrl}/learn/${slug}`,
      // The HMRC page moves with the monthly extract, not with the other answers.
      lastModified: d(slug === 'hmrc-reporting-fund-status-india' ? UPDATED.ukTax : UPDATED.answers),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
