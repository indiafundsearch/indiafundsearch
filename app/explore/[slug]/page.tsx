import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity/client'
import {
  allFundSlugsQuery,
  fundBySlugQuery,
} from '@/lib/sanity/queries'
import { FundDetail } from '@/components/fund/FundDetail'
import { RelatedFunds } from '@/components/fund/RelatedFunds'
import type { FundDetailData } from '@/components/fund/fundDisplay'

type Props = { params: Promise<{ slug: string }> }

export const revalidate = 300

export async function generateStaticParams() {
  try {
    const rows = await client.fetch<{ slug: string }[]>(allFundSlugsQuery)
    return rows.filter((r) => r.slug).map((r) => ({ slug: r.slug }))
  } catch (error) {
    console.error('generateStaticParams: Sanity fetch failed', error)
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const fund = await getFund(slug)
  if (!fund) return { title: 'Fund not found' }

  const title = fund.provider ? `${fund.name} — ${fund.provider}` : fund.name
  const description =
    fund.simpleDescription ??
    fund.proDescription ??
    `Education-first overview of ${fund.name} on IndiaFundSearch.`

  return { title, description, openGraph: { title, description } }
}

export default async function FundDetailPage({ params }: Props) {
  const { slug } = await params
  const fund = await getFund(slug)
  if (!fund) notFound()

  return (
    <div className="container-grid pt-12 pb-20 md:pt-16">
      <FundDetail fund={fund} />
      <RelatedFunds category={fund.category} excludeId={fund._id} />
    </div>
  )
}

async function getFund(slug: string): Promise<FundDetailData | null> {
  try {
    const fund = await client.fetch<FundDetailData | null>(
      fundBySlugQuery,
      { slug },
      { next: { tags: ['fund'] } },
    )
    return fund
  } catch (error) {
    console.error('FundDetailPage: Sanity fetch failed', error)
    return null
  }
}
