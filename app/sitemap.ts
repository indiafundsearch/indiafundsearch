import type { MetadataRoute } from 'next'
import { PRODUCTS } from '@/lib/content/products'

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/learn', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/fit-finder', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/tax', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/gift-city', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/gift-city/inbound', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/gift-city/outbound', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
]

export const revalidate = 3600

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://indiafundsearch.com'
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
  ]
}
