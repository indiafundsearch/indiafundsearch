import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = SITE.url

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // NOTE: /og is intentionally NOT disallowed — og:image points at it and
        // robots-respecting scrapers (LinkedInBot, Twitterbot) must be able to
        // fetch the share-card image. Keep only true admin/API paths blocked.
        disallow: ['/studio', '/studio/', '/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
