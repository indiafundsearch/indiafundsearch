import type { Metadata } from 'next'
import { SITE } from './constants'

/** Named author + publisher for E-E-A-T (P3-26). */
export const AUTHOR = {
  name: 'Yash Jhaveri',
  role: 'Founder & Principal Adviser, IndiaFundSearch · A Beyond Initiative',
  url: `${SITE.url}/about`,
} as const

/** hreflang corridors for the NRI thesis (P3-29). All point at the same
 *  English page today; region-specific landing routes are a later phase. */
export const HREFLANG = ['en-IN', 'en-AE', 'en-US'] as const

/** Dynamic branded OG image via the /og route, titled per page. */
function ogImage(title: string, subtitle: string) {
  const q = new URLSearchParams({ title, subtitle: subtitle.slice(0, 120) })
  return {
    url: `/og?${q.toString()}`,
    width: 1200,
    height: 630,
    alt: title,
  }
}

interface PageMetaInput {
  title: string
  description: string
  /** path with leading slash, e.g. "/tax" */
  path: string
  /** override the OG image headline (defaults to `title`) */
  ogTitle?: string
  /** use the title verbatim (skip the "· IndiaFundSearch" template) */
  absoluteTitle?: boolean
  noindex?: boolean
}

/**
 * Single source of per-route SEO metadata (P3-24, P3-29): fills openGraph and
 * twitter from the page's own title/description (no more identical cards), sets
 * a self-canonical, a per-page branded OG image, and hreflang alternates.
 */
export function pageMeta({ title, description, path, ogTitle, absoluteTitle, noindex }: PageMetaInput): Metadata {
  const url = `${SITE.url}${path}`
  const languages: Record<string, string> = { 'x-default': url }
  for (const lang of HREFLANG) languages[lang] = url

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type: 'website',
      locale: 'en_IN',
      images: [ogImage(ogTitle ?? title, description)],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/og?title=${encodeURIComponent(ogTitle ?? title)}`],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  }
}

// ---------- JSON-LD builders (P3-27) ----------

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    logo: `${SITE.url}/og`,
    founder: { '@type': 'Person', name: AUTHOR.name },
  }
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR.name,
    jobTitle: 'Founder & Principal Adviser',
    url: AUTHOR.url,
    worksFor: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  }
}

export function articleJsonLd(input: {
  title: string
  description: string
  path: string
  datePublished?: string
  dateModified?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    mainEntityOfPage: `${SITE.url}${input.path}`,
    author: { '@type': 'Person', name: AUTHOR.name, url: AUTHOR.url },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/og` },
    },
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
  }
}

/** trail: [{ name, path }] — last item is the current page. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: `${SITE.url}${t.path}`,
    })),
  }
}

export function faqJsonLd(qas: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qas.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}
