import type { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/explore', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/knowledge', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/insights', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/diagnostic', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/tools/fee-x-ray', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/tools/scorecard', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/gift-city', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
]

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://indiafundsearch.com'
  const now = new Date()

  let funds: { slug: string; updatedAt?: string }[] = []
  let terms: { slug: string; updatedAt?: string }[] = []
  let articles: { slug: string; publishedAt?: string; updatedAt?: string }[] = []

  try {
    ;[funds, terms, articles] = await Promise.all([
      client.fetch<{ slug: string; updatedAt?: string }[]>(
        `*[_type == "fund" && status == "Active" && defined(slug.current)]{
          "slug": slug.current,
          "updatedAt": _updatedAt
        }`,
      ),
      client.fetch<{ slug: string; updatedAt?: string }[]>(
        `*[_type == "glossaryTerm" && defined(slug.current)]{
          "slug": slug.current,
          "updatedAt": _updatedAt
        }`,
      ),
      client.fetch<{ slug: string; publishedAt?: string; updatedAt?: string }[]>(
        `*[_type == "article" && defined(slug.current) && defined(publishedAt)]{
          "slug": slug.current,
          publishedAt,
          "updatedAt": _updatedAt
        }`,
      ),
    ])
  } catch (error) {
    console.error('sitemap: Sanity fetch failed', error)
  }

  return [
    ...STATIC_ROUTES.map((entry) => ({
      url: `${siteUrl}${entry.path}`,
      lastModified: now,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    })),
    ...funds.map((fund) => ({
      url: `${siteUrl}/explore/${fund.slug}`,
      lastModified: fund.updatedAt ? new Date(fund.updatedAt) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...terms.map((term) => ({
      url: `${siteUrl}/knowledge/${term.slug}`,
      lastModified: term.updatedAt ? new Date(term.updatedAt) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
    ...articles.map((article) => ({
      url: `${siteUrl}/insights/${article.slug}`,
      lastModified:
        article.updatedAt
          ? new Date(article.updatedAt)
          : article.publishedAt
            ? new Date(article.publishedAt)
            : now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
