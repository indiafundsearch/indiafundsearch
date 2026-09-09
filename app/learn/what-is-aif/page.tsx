import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticlePage } from '@/components/learn/ArticlePage'
import { articleBySlug } from '@/lib/content/articles'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: "What Is an AIF? Alternative Investment Funds India",
  description:
    "How AIFs work in India: the ₹1 crore minimum, Categories I, II and III, what each can invest in, liquidity, and the tax split between the categories.",
  path: '/learn/what-is-aif',
  ogTitle: 'What is an AIF?',
})

export default function Page() {
  const article = articleBySlug('what-is-aif')
  if (!article) notFound()
  return <ArticlePage article={article} />
}
