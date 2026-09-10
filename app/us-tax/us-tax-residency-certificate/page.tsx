import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AnswerPage } from '@/components/learn/AnswerPage'
import { usTaxBySlug } from '@/lib/content/usTax'
import { pageMeta } from '@/lib/seo'
import { TrcSteps } from '@/components/eeat/TrcSteps'

const SLUG = 'us-tax-residency-certificate'
const answer = usTaxBySlug(SLUG)

export const metadata: Metadata = answer
  ? pageMeta({
      title: answer.metaTitle,
      description: answer.metaDescription,
      path: `/us-tax/${SLUG}`,
      ogTitle: answer.question,
      dynamicOg: true,
      // Aimed at one market (Appendix A, Task A.7).
      languages: { 'en-US': `/us-tax/${SLUG}`, 'x-default': `/us-tax/${SLUG}` },
    })
  : {}

export default function Page() {
  const a = usTaxBySlug(SLUG)
  if (!a) notFound()
  return (
    <AnswerPage
      answer={a}
      basePath="/us-tax"
      hubLabel="US tax for NRIs"
      hubHref="/us-tax"
      marketNote="For US taxpayers — green card holders and anyone meeting the substantial presence test"
    >
      <TrcSteps current={2} />
    </AnswerPage>
  )
}
