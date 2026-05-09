import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { articlesIndexQuery } from '@/lib/sanity/queries'

type Article = {
  _id: string
  title: string
  slug: string
  publishedAt: string
  category?: string
  seoDescription?: string
}

/**
 * Industry headline numbers shown below the insights grid. Aspirational
 * platform-tier numbers — kept in this file so they are easy to bump as
 * coverage grows. Not derived from the seeded Sanity dataset.
 */
const INDUSTRY_STATS = [
  { label: 'Total funds listed', value: '2,361' },
  { label: 'SEBI-registered PMS', value: '504' },
  { label: 'SEBI-registered AIFs', value: '1,857' },
  { label: 'Industry AUM', value: '₹42L Cr+' },
] as const

export async function InsightsSection() {
  let articles: Article[] = []
  try {
    const data = await client.fetch<Article[]>(articlesIndexQuery, {}, {
      next: { revalidate: 600, tags: ['article'] },
    })
    articles = data?.slice(0, 5) ?? []
  } catch (error) {
    console.error('InsightsSection: Sanity fetch failed', error)
  }

  return (
    <section className="container-grid py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-gold">Insights</p>
          <h2 className="mt-2 max-w-2xl">Fund intelligence, weekly.</h2>
        </div>
        <Link
          href="/insights"
          className="inline-flex items-center gap-1 text-sm font-medium text-text-primary hover:text-gold"
        >
          All insights
          <ArrowRight size={14} aria-hidden />
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="mt-8 rounded-card border border-dashed border-card-border bg-card p-8 text-center text-sm text-text-muted">
          New insights are publishing soon.
        </div>
      ) : (
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <li key={article._id}>
              <Link
                href={`/insights/${article.slug}`}
                className="group flex h-full flex-col rounded-card border border-card-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover"
              >
                <div className="flex items-center gap-2 text-xs">
                  {article.category ? (
                    <span className="inline-flex items-center rounded-pill bg-gold/10 px-2.5 py-1 font-medium text-gold">
                      {article.category}
                    </span>
                  ) : null}
                  <time
                    dateTime={article.publishedAt}
                    className="text-text-muted"
                  >
                    {formatDate(article.publishedAt)}
                  </time>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-text-primary group-hover:text-gold md:text-xl">
                  {article.title}
                </h3>
                {article.seoDescription ? (
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-muted">
                    {article.seoDescription}
                  </p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-12 grid grid-cols-2 gap-6 rounded-card border border-card-border bg-card px-6 py-8 shadow-card md:mt-16 md:grid-cols-4 md:gap-4 md:px-10 md:py-10">
        {INDUSTRY_STATS.map((stat) => (
          <div key={stat.label}>
            <dt className="text-xs uppercase tracking-wide text-text-muted md:order-2 md:mt-2">
              {stat.label}
            </dt>
            <dd className="text-3xl font-semibold tabular-nums text-text-primary md:order-1 md:text-4xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
