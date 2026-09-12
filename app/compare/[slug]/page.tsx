import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { COMPARE_PAGES, compareBySlug } from '@/lib/content/compare'
import { ComparePage } from '@/components/compare/ComparePage'
import { pageMeta } from '@/lib/seo'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return COMPARE_PAGES.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = compareBySlug(slug)
  if (!page) return {}
  return pageMeta({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/compare/${page.slug}`,
    ogTitle: page.title,
    dynamicOg: true,
  })
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const page = compareBySlug(slug)
  if (!page) notFound()
  return <ComparePage page={page} />
}
