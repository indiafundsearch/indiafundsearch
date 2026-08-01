import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticlePage } from '@/components/learn/ArticlePage'
import { articleBySlug } from '@/lib/content/articles'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'What is an AIF? Alternative Investment Funds in India, explained',
  description:
    'What is an Alternative Investment Fund (AIF)? Plain-English guide to AIFs in India — the ₹1 Cr minimum, Categories I/II/III, what they can invest in, liquidity and taxation.',
  path: '/learn/what-is-aif',
  ogTitle: 'What is an AIF?',
})

export default function Page() {
  const article = articleBySlug('what-is-aif')
  if (!article) notFound()
  return <ArticlePage article={article} />
}
