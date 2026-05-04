import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { allFundsQuery } from '@/lib/sanity/queries'
import { FundCard, type FundCardData } from './FundCard'

export async function FundPreviewRow() {
  let funds: FundCardData[] = []
  try {
    const data = await client.fetch<FundCardData[]>(allFundsQuery, {}, {
      next: { revalidate: 300, tags: ['fund'] },
    })
    funds = data?.slice(0, 6) ?? []
  } catch (error) {
    console.error('FundPreviewRow: Sanity fetch failed', error)
  }

  return (
    <section className="container-grid py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="max-w-2xl">Explore What Your Surplus Could Earn</h2>
          <p className="mt-3 max-w-prose text-base text-text-muted">
            A handful of strategies investors are evaluating right now. Education first — no recommendation, no commission.
          </p>
        </div>
        <Link
          href="/explore"
          className="text-sm font-medium text-text-primary hover:text-gold"
        >
          Explore all →
        </Link>
      </div>

      {funds.length === 0 ? (
        <div className="mt-10 rounded-card border border-dashed border-card-border bg-card p-8 text-center text-sm text-text-muted">
          No funds yet. Add one in <Link href="/studio" className="underline hover:text-text-primary">/studio</Link>.
        </div>
      ) : (
        <div className="mt-8 -mx-6 overflow-x-auto pb-2 md:-mx-12 md:px-6">
          <div className="flex gap-4 px-6 md:px-12">
            {funds.map((fund) => (
              <FundCard key={fund._id} fund={fund} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
