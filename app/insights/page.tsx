import { client } from '@/lib/sanity/client'
import { articlesIndexQuery } from '@/lib/sanity/queries'
import { InsightsClient } from '@/components/insights/InsightsClient'
import type { ArticleSummary } from '@/components/insights/articleTypes'

export const metadata = {
  title: 'Insights — market commentary, education, fund analysis, regulation',
  description:
    'Long-form essays on PMS, AIF, SIF, and GIFT City investing in India. Education-first, never sponsored, never gated.',
}

export const revalidate = 600

export default async function InsightsPage() {
  let articles: ArticleSummary[] = []
  try {
    articles = await client.fetch<ArticleSummary[]>(articlesIndexQuery, {}, {
      next: { tags: ['article'] },
    })
  } catch (error) {
    console.error('InsightsPage: Sanity fetch failed', error)
  }

  return (
    <div className="container-grid pt-12 pb-20 md:pt-20">
      <header className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-widest text-gold">Insights</p>
        <h1 className="mt-2">Long-form thinking on Indian alternatives.</h1>
        <p className="mt-4 max-w-prose text-lg text-text-muted">
          Market commentary, fund analysis, regulatory shifts, and the occasional explainer. Never sponsored. Never gated.
        </p>
      </header>

      <div className="mt-12">
        <InsightsClient articles={articles} />
      </div>
    </div>
  )
}
