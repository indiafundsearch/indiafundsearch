import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AnswerPage } from '@/components/learn/AnswerPage'
import { answerBySlug } from '@/lib/content/answers'
import { pageMeta } from '@/lib/seo'

const SLUG = 'form-10f-for-nri'
const answer = answerBySlug(SLUG)

export const metadata: Metadata = answer
  ? pageMeta({
      title: answer.metaTitle,
      description: answer.metaDescription,
      path: `/learn/${SLUG}`,
      ogTitle: answer.question,
    })
  : {}

export default function Page() {
  const a = answerBySlug(SLUG)
  if (!a) notFound()
  return <AnswerPage answer={a} />
}
