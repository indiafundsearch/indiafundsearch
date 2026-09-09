import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticlePage } from '@/components/learn/ArticlePage'
import { articleBySlug } from '@/lib/content/articles'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: "PMS vs AIF: Ownership, Tax and Liquidity Compared",
  description:
    "Direct ownership against pooled units, ₹50 lakh against ₹1 crore, and the tax difference that decides it. Which structure does which job, and when.",
  path: '/learn/pms-vs-aif',
  ogTitle: 'PMS vs AIF',
})

export default function Page() {
  const article = articleBySlug('pms-vs-aif')
  if (!article) notFound()
  return <ArticlePage article={article} />
}
