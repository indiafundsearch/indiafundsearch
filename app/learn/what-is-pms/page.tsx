import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticlePage } from '@/components/learn/ArticlePage'
import { articleBySlug } from '@/lib/content/articles'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'What is PMS? Portfolio Management Services in India, explained',
  description:
    'What is a Portfolio Management Service (PMS)? Plain-English guide to how PMS works in India — direct demat ownership, the ₹50 L minimum, fees, taxation and how it differs from a mutual fund.',
  path: '/learn/what-is-pms',
  ogTitle: 'What is PMS?',
})

export default function Page() {
  const article = articleBySlug('what-is-pms')
  if (!article) notFound()
  return <ArticlePage article={article} />
}
