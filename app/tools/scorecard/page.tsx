import { Suspense } from 'react'
import { Scorecard } from '@/components/lead-magnets/Scorecard'
import { TrustStrip } from '@/components/shared/TrustStrip'
import { client } from '@/lib/sanity/client'
import { allFundNamesQuery } from '@/lib/sanity/queries'

export const metadata = {
  title: 'Scorecard — score any PMS on 20 criteria',
  description:
    'Walk through 20 criteria across manager quality, performance integrity, fee fairness, operations, and suitability fit. Spot strengths, watch areas, and red flags before you commit.',
}

export const revalidate = 600

async function fetchFundNames(): Promise<string[]> {
  try {
    const rows = await client.fetch<{ name: string }[]>(allFundNamesQuery, undefined, {
      next: { tags: ['fund'] },
    })
    return rows.map((r) => r.name).filter(Boolean)
  } catch (error) {
    console.error('ScorecardPage: Sanity fetch failed', error)
    return []
  }
}

export default async function ScorecardPage() {
  const fundOptions = await fetchFundNames()

  return (
    <div className="container-grid pt-12 pb-20 md:pt-16">
      <header className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-widest text-gold">Scorecard</p>
        <h1 className="mt-2">Score any PMS on 20 criteria.</h1>
        <p className="mt-4 max-w-prose text-lg text-text-muted">
          Five dimensions, four criteria each. You score 1–5 based on what the fund has actually disclosed (not what they claim). The output highlights strengths, watch areas, and the red flags that should stop a meeting cold.
        </p>
        <p className="mt-3 text-sm text-text-muted">
          5 dimensions · 20 criteria · No sales pitch
        </p>
        <div className="mt-5">
          <TrustStrip variant="inline" />
        </div>
      </header>

      <div className="mt-10 md:mt-12">
        <Suspense
          fallback={
            <div className="rounded-card border border-card-border bg-card p-10 text-center text-sm text-text-muted">
              Loading scorecard…
            </div>
          }
        >
          <Scorecard fundOptions={fundOptions} />
        </Suspense>
      </div>
    </div>
  )
}
