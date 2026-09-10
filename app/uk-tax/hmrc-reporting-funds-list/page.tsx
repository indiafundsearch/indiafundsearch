import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AnswerPage } from '@/components/learn/AnswerPage'
import { ukTaxBySlug } from '@/lib/content/ukTax'
import { pageMeta } from '@/lib/seo'
import { HmrcFundTable } from '@/components/learn/HmrcFundTable'

const SLUG = 'hmrc-reporting-funds-list'
const answer = ukTaxBySlug(SLUG)

export const metadata: Metadata = answer
  ? pageMeta({
      title: answer.metaTitle,
      description: answer.metaDescription,
      path: `/uk-tax/${SLUG}`,
      ogTitle: answer.question,
      dynamicOg: true,
      languages: { 'en-GB': `/uk-tax/${SLUG}`, 'x-default': `/uk-tax/${SLUG}` },
    })
  : {}

export default function Page() {
  const a = ukTaxBySlug(SLUG)
  if (!a) notFound()
  return (
    <AnswerPage
      answer={a}
      basePath="/uk-tax"
      hubLabel="UK tax for NRIs"
      hubHref="/uk-tax"
      marketNote="If you are UK-resident and hold Indian funds"
    >
      <HmrcFundTable />
    </AnswerPage>
  )
}
