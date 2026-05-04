import { client } from '@/lib/sanity/client'
import { allFundsQuery } from '@/lib/sanity/queries'
import { ExploreClient } from '@/components/fund/ExploreClient'
import type { FundCardData } from '@/components/fund/fundDisplay'
import { FeeXRayStickyBar } from '@/components/shared/FeeXRayStickyBar'

export const metadata = {
  title: 'Explore PMS, AIF, SIF & GIFT City funds',
  description:
    'Browse PMS, AIF, SIF, and GIFT City funds in India. Filter by category and subcategory. Education-first — no commissions, no login.',
}

// Cache 5 minutes; tag invalidated when the Sanity webhook fires.
export const revalidate = 300

export default async function ExplorePage() {
  let funds: FundCardData[] = []
  try {
    funds = await client.fetch<FundCardData[]>(allFundsQuery, undefined, {
      next: { tags: ['fund'] },
    })
  } catch (error) {
    console.error('ExplorePage: Sanity fetch failed', error)
  }

  return (
    <>
      <div className="container-grid pt-12 pb-32 md:pt-20 md:pb-40">
        <header className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-gold">
            Explore
          </p>
          <h1 className="mt-2">PMS, AIF, SIF & GIFT City — all in one place.</h1>
          <p className="mt-4 max-w-prose text-lg text-text-muted">
            We don't recommend, we don't distribute. We help you understand what's out there so you can ask the right questions.
          </p>
        </header>

        <div className="mt-10">
          <ExploreClient funds={funds} />
        </div>

        <p className="mt-12 text-xs text-text-muted">
          Past performance does not guarantee future results. Data sourced from SEBI public disclosures and provider factsheets — verify with the provider before making any investment decision.
        </p>
      </div>

      <FeeXRayStickyBar />
    </>
  )
}
