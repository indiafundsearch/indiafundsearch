import type { Metadata } from 'next'
import { CONTACT, SITE } from './constants'
import { CORRIDORS } from './content/corridors'

/** Named author + publisher for E-E-A-T (P3-26). */
export const AUTHOR = {
  name: 'Yash Jhaveri',
  role: 'Founder & Principal Adviser, IndiaFundSearch · A Beyond Initiative',
  url: `${SITE.url}/about`,
} as const

/** Site-wide hreflang corridors for the NRI thesis (P3-29). For a page with no
 *  region-specific variant these all resolve to the same URL — self-referential
 *  and harmless. The /nri corridor cluster overrides them with real per-region
 *  URLs via `languages` below. */
export const HREFLANG = ['en-IN', 'en-AE', 'en-US'] as const

/**
 * The one genuine hreflang cluster on the site: the /nri hub is the generic
 * (x-default and en-IN) version, and each corridor page is the regional variant
 * for its own market. Every page in the cluster declares the identical set, so
 * the annotations are reciprocal — which is what makes Google honour them.
 */
export function nriHreflang(): Record<string, string> {
  const languages: Record<string, string> = {
    'x-default': '/nri',
    'en-IN': '/nri',
  }
  for (const c of CORRIDORS) languages[c.hreflang] = `/nri/${c.slug}`
  return languages
}

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
  /**
   * Override the hreflang alternates with a real cluster — a map of locale to
   * site-relative path (see `nriHreflang`). Omit for ordinary pages, which get
   * the self-referential site-wide set.
   */
  languages?: Record<string, string>
}

/**
 * Single source of per-route SEO metadata (P3-24, P3-29): fills openGraph and
 * twitter from the page's own title/description (no more identical cards), sets
 * a self-canonical, a per-page branded OG image, and hreflang alternates.
 */
export function pageMeta({
  title,
  description,
  path,
  ogTitle,
  absoluteTitle,
  noindex,
  languages: languageOverride,
}: PageMetaInput): Metadata {
  const url = `${SITE.url}${path}`
  let languages: Record<string, string>
  if (languageOverride) {
    languages = Object.fromEntries(
      Object.entries(languageOverride).map(([locale, p]) => [locale, `${SITE.url}${p}`]),
    )
  } else {
    languages = { 'x-default': url }
    for (const lang of HREFLANG) languages[lang] = url
  }

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

/**
 * Entity building. Google has to work out that "IndiaFundSearch", "Beyond" and
 * "JSL Wealth Management" are one organisation, and that the byline author is a
 * real person attached to it. Left to itself it often does not. `sameAs` is the
 * standard way to say so: each URL is a corroborating profile Google already
 * knows, so the entity resolves instead of floating.
 *
 * Add more as they exist: Crunchbase, a Wikidata Q-ID, an MCA listing. Only
 * ever list profiles that genuinely belong to the entity; a wrong sameAs is
 * worse than none, so each one here has been opened and checked.
 */
const PERSON_PROFILES = ['https://www.linkedin.com/in/yash-jhaveri-/']

/** The company page, "Beyond | JSL Wealth Management". Verified 2026-08-05. */
const ORG_PROFILES = [
  'https://www.linkedin.com/company/beyond-jsl/',
  ...PERSON_PROFILES,
]

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: ['Beyond', SITE.legalEntity],
    legalName: SITE.legalEntity,
    url: SITE.url,
    description: SITE.description,
    logo: `${SITE.url}/og`,
    email: CONTACT.email,
    areaServed: 'IN',
    // The CIN identifies the entity unambiguously, independent of how the
    // trading name is written on any given page.
    identifier: SITE.cin,
    foundingDate: '2023-01-13',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '136/137, Paradise Complex, Sayajigunj',
      addressLocality: SITE.city,
      addressRegion: SITE.state,
      postalCode: '390020',
      addressCountry: 'IN',
    },
    knowsAbout: [
      'Portfolio Management Services',
      'Alternative Investment Funds',
      'Specialised Investment Funds',
      'GIFT City IFSC',
      'NRI investing in India',
    ],
    founder: { '@type': 'Person', '@id': `${SITE.url}/#person` },
    sameAs: ORG_PROFILES,
  }
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE.url}/#person`,
    name: AUTHOR.name,
    jobTitle: 'Founder & Principal Adviser',
    url: AUTHOR.url,
    sameAs: PERSON_PROFILES,
    worksFor: {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      legalName: SITE.legalEntity,
      url: SITE.url,
    },
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
