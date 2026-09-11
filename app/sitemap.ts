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
  // NOTE: both /gift-city shelves and /gift-city/thresholds (until its rows are
  // verified) are noindex by design and deliberately absent (Phase 7, Task 7.3).
]

export const revalidate = 3600

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = SITE.url
  const now = new Date()

  return [
    ...STATIC_ROUTES.map((entry) => ({
      url: `${siteUrl}${entry.path}`,
      lastModified: now,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    })),
    ...PRODUCTS.map((p) => ({
      url: `${siteUrl}/learn/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...CORRIDORS.map((c) => ({
      url: `${siteUrl}/nri/${c.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    // Long-tail answer pages — one question each.
    ...AUTHORS.map((a) => ({
      url: `${siteUrl}/about/${a.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
    ...US_TAX_SLUGS.map((slug) => ({
      url: `${siteUrl}/us-tax/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...GIFT_CITY_SLUGS.map((slug) => ({
      url: `${siteUrl}/gift-city/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...UK_TAX_SLUGS.map((slug) => ({
      url: `${siteUrl}/uk-tax/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...ANSWER_SLUGS.map((slug) => ({
      url: `${siteUrl}/learn/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
