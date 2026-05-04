/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://indiafundsearch.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/studio', '/studio/*', '/api/*', '/og'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/studio', '/api', '/og'] },
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    // Higher priority for top-level marketing routes; lower for individual
    // glossary terms (long tail).
    let priority = config.priority
    if (path === '/') priority = 1.0
    else if (
      path === '/explore' ||
      path === '/diagnostic' ||
      path === '/knowledge'
    ) {
      priority = 0.9
    } else if (path.startsWith('/knowledge/')) priority = 0.5

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },
}
