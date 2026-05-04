import { client } from '@/lib/sanity/client'
import { relatedFundsQuery } from '@/lib/sanity/queries'
import { FundCard } from './FundCard'
import type { FundCardData } from './fundDisplay'

type Props = {
  category?: string
  excludeId: string
}

export async function RelatedFunds({ category, excludeId }: Props) {
  if (!category) return null

  let related: FundCardData[] = []
  try {
    related = await client.fetch<FundCardData[]>(
      relatedFundsQuery,
      { category, excludeId },
      { next: { revalidate: 300, tags: ['fund'] } },
    )
  } catch (error) {
    console.error('RelatedFunds: Sanity fetch failed', error)
  }

  if (related.length === 0) return null

  return (
    <section className="mt-16 border-t border-card-border pt-12">
      <h2 className="text-2xl">Related funds</h2>
      <p className="mt-2 max-w-prose text-sm text-text-muted">
        Other strategies in the same category. Education first — compare before you commit.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((fund) => (
          <FundCard key={fund._id} fund={fund} />
        ))}
      </div>
    </section>
  )
}
