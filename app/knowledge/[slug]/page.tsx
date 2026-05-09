import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity/client'
import {
  allGlossarySlugsQuery,
  glossaryTermBySlugQuery,
} from '@/lib/sanity/queries'
import type { GlossaryTermDetail } from '@/components/knowledge/glossaryTypes'

type Props = { params: Promise<{ slug: string }> }

export const revalidate = 600

export async function generateStaticParams() {
  try {
    const rows = await client.fetch<{ slug: string }[]>(allGlossarySlugsQuery)
    return rows.filter((r) => r.slug).map((r) => ({ slug: r.slug }))
  } catch (error) {
    console.error('generateStaticParams (glossary): Sanity fetch failed', error)
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const term = await getTerm(slug)
  if (!term) return { title: 'Term not found' }

  const description = term.simpleDefinition ?? term.proDefinition ?? `${term.term} — explained.`
  return {
    title: `${term.term} explained`,
    description,
    openGraph: { title: `${term.term} explained`, description },
  }
}

export default async function GlossaryTermPage({ params }: Props) {
  const { slug } = await params
  const term = await getTerm(slug)
  if (!term) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.simpleDefinition ?? term.proDefinition,
    inDefinedTermSet: 'https://indiafundsearch.com/knowledge',
  }

  return (
    <div className="container-grid py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="max-w-3xl">
        <Link
          href="/knowledge"
          className="inline-flex items-center text-xs font-medium uppercase tracking-widest text-text-muted hover:text-text-primary"
        >
          ← Learn
        </Link>
        <h1 className="mt-3">{term.term}</h1>
        {term.whyItMatters ? (
          <p className="mt-4 text-lg text-text-primary">
            <span className="font-semibold text-gold">Why it matters:</span> {term.whyItMatters}
          </p>
        ) : null}
        {term.relatedProducts && term.relatedProducts.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {term.relatedProducts.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-pill bg-text-primary/5 px-3 py-1 text-xs font-medium text-text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <section className="rounded-card border border-card-border bg-card p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Simple</p>
          <p className="mt-3 text-base leading-relaxed text-text-primary">
            {term.simpleDefinition ?? <span className="text-text-muted">—</span>}
          </p>
        </section>
        <section className="rounded-card border border-card-border bg-card p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Pro</p>
          <p className="mt-3 text-base leading-relaxed text-text-primary">
            {term.proDefinition ?? <span className="text-text-muted">—</span>}
          </p>
        </section>
      </div>

      {term.relatedTerms && term.relatedTerms.length > 0 ? (
        <section className="mt-12 border-t border-card-border pt-8">
          <h2 className="text-2xl">Related terms</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {term.relatedTerms.map((rel) => (
              <li key={rel.slug}>
                <Link
                  href={`/knowledge/${rel.slug}`}
                  className="inline-flex items-center rounded-pill border border-card-border bg-card px-3 py-1.5 text-sm text-text-primary hover:shadow-card"
                >
                  {rel.term}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="mt-12 text-xs text-text-muted">
        IndiaFundSearch.com is an educational platform. Definitions are general and may not reflect every regulatory or tax-treatment edge case. For advice, consult a SEBI-registered advisor.
      </p>
    </div>
  )
}

async function getTerm(slug: string): Promise<GlossaryTermDetail | null> {
  try {
    return await client.fetch<GlossaryTermDetail | null>(
      glossaryTermBySlugQuery,
      { slug },
      { next: { tags: ['glossaryTerm'] } },
    )
  } catch (error) {
    console.error('GlossaryTermPage: Sanity fetch failed', error)
    return null
  }
}
