import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = SITE.url

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/studio/', '/api/', '/og'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
