import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AnswerPage } from '@/components/learn/AnswerPage'
import { giftCityBySlug } from '@/lib/content/giftCity'
import { pageMeta } from '@/lib/seo'

const SLUG = 'eligibility'
const answer = giftCityBySlug(SLUG)

export const metadata: Metadata = answer
  ? pageMeta({
      title: answer.metaTitle,
      description: answer.metaDescription,
      path: `/gift-city/${SLUG}`,
      ogTitle: answer.question,
      dynamicOg: true,
    })
  : {}

export default function Page() {
  const a = giftCityBySlug(SLUG)
  if (!a) notFound()
  return (
    <AnswerPage
      answer={a}
      basePath="/gift-city"
      hubLabel="GIFT City"
      hubHref="/gift-city"
      marketNote="For NRIs, foreign investors and resident Indians weighing GIFT City"
    />
  )
}
