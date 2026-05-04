import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity/client'
import {
  allArticleSlugsQuery,
  articleBySlugQuery,
} from '@/lib/sanity/queries'
import { PortableTextBody } from '@/components/insights/PortableTextBody'
import type { ArticleDetail } from '@/components/insights/articleTypes'
import { urlFor } from '@/lib/sanity/imageUrl'

type Props = { params: Promise<{ slug: string }> }

export const revalidate = 600

export async function generateStaticParams() {
  try {
    const rows = await client.fetch<{ slug: string }[]>(allArticleSlugsQuery)
    return rows.filter((r) => r.slug).map((r) => ({ slug: r.slug }))
  } catch (error) {
    console.error('generateStaticParams (article): Sanity fetch failed', error)
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: 'Article not found' }

  const title = article.seoTitle ?? article.title
  const description = article.seoDescription ?? `${article.title} on IndiaFundSearch.`
  return {
    title,
    description,
    openGraph: { title, description, type: 'article', publishedTime: article.publishedAt },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()

  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  const heroUrl = article.featuredImage?.asset?._ref
    ? urlFor(article.featuredImage).width(1600).height(900).fit('crop').auto('format').url()
    : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    datePublished: article.publishedAt,
    author: article.author ? { '@type': 'Person', name: article.author } : undefined,
    description: article.seoDescription,
    image: heroUrl,
  }

  return (
    <article className="container-prose pt-12 pb-20 md:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-6 text-sm">
        <Link
          href="/insights"
          className="inline-flex items-center text-xs font-medium uppercase tracking-widest text-text-muted hover:text-text-primary"
        >
          ← Insights
        </Link>
      </div>

      <header>
        {article.category ? (
          <p className="text-xs font-medium uppercase tracking-widest text-gold">
            {article.category}
          </p>
        ) : null}
        <h1 className="mt-2">{article.title}</h1>
        <p className="mt-4 text-sm text-text-muted">
          {date}
          {date && article.author ? ' · ' : ''}
          {article.author}
        </p>
      </header>

      {heroUrl ? (
        <figure className="mt-8 overflow-hidden rounded-card border border-card-border">
          <Image
            src={heroUrl}
            alt={article.featuredImage?.alt ?? article.title}
            width={1600}
            height={900}
            className="h-auto w-full"
            priority
          />
        </figure>
      ) : null}

      <div className="mt-2">
        <PortableTextBody value={article.body ?? []} />
      </div>

      <p className="mt-12 border-t border-card-border pt-6 text-xs text-text-muted">
        IndiaFundSearch.com is an educational platform. We do not distribute or sell any financial products. For investment advice, consult a SEBI-registered advisor.
      </p>
    </article>
  )
}

async function getArticle(slug: string): Promise<ArticleDetail | null> {
  try {
    return await client.fetch<ArticleDetail | null>(
      articleBySlugQuery,
      { slug },
      { next: { tags: ['article'] } },
    )
  } catch (error) {
    console.error('ArticlePage: Sanity fetch failed', error)
    return null
  }
}
