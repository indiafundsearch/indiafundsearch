import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticlePage } from '@/components/learn/ArticlePage'
import { articleBySlug } from '@/lib/content/articles'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: "What Is PMS? Portfolio Management Services in India",
  description:
    "How a PMS works in India: shares held directly in your own demat, the ₹50 lakh SEBI minimum, typical fees, taxation, and how it differs from a mutual fund.",
  path: '/learn/what-is-pms',
  ogTitle: 'What is PMS?',
})

export default function Page() {
  const article = articleBySlug('what-is-pms')
  if (!article) notFound()
  return <ArticlePage article={article} />
}
