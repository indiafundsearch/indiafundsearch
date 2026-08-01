import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticlePage } from '@/components/learn/ArticlePage'
import { articleBySlug } from '@/lib/content/articles'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'PMS vs AIF — which is right for you? Key differences explained',
  description:
    'PMS vs AIF: a plain-English comparison for Indian investors — direct ownership vs pooled units, ₹50 L vs ₹1 Cr minimums, transparency, liquidity, taxation, and which job each tool does.',
  path: '/learn/pms-vs-aif',
  ogTitle: 'PMS vs AIF',
})

export default function Page() {
  const article = articleBySlug('pms-vs-aif')
  if (!article) notFound()
  return <ArticlePage article={article} />
}
