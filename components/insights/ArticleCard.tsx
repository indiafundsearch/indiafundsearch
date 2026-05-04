import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/imageUrl'
import { cn } from '@/lib/utils'
import type { ArticleSummary } from './articleTypes'

type Props = {
  article: ArticleSummary
  className?: string
}

export function ArticleCard({ article, className }: Props) {
  const date = article.publishedAt ? formatDate(article.publishedAt) : null
  const imageUrl = article.featuredImage?.asset?._ref
    ? urlFor(article.featuredImage).width(720).height(420).fit('crop').auto('format').url()
    : null

  return (
    <Link
      href={`/insights/${article.slug}`}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-card border border-card-border bg-card shadow-card transition-shadow hover:shadow-card-hover',
        className,
      )}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-background">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={article.featuredImage?.alt ?? article.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-text-primary/5 to-gold/10" />
        )}
        {article.category ? (
          <span className="absolute left-3 top-3 inline-flex items-center rounded-pill bg-card/90 px-2.5 py-1 text-xs font-medium text-text-primary shadow-card">
            {article.category}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug text-text-primary group-hover:text-gold">
          {article.title}
        </h3>
        {article.seoDescription ? (
          <p className="mt-2 line-clamp-3 text-sm text-text-muted">{article.seoDescription}</p>
        ) : null}
        <div className="mt-auto pt-4 text-xs text-text-muted">
          {date}
          {date && article.author ? ' · ' : ''}
          {article.author}
        </div>
      </div>
    </Link>
  )
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return ''
  }
}
