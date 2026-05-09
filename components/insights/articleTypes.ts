export type ArticleCategory =
  | 'Market Commentary'
  | 'Education'
  | 'Fund Analysis'
  | 'Regulation'
  | 'Ask the Manager'

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  'Market Commentary',
  'Education',
  'Fund Analysis',
  'Regulation',
  'Ask the Manager',
]

export type ArticleSummary = {
  _id: string
  title: string
  slug: string
  author?: string
  publishedAt?: string
  category?: ArticleCategory
  seoDescription?: string
  featuredImage?: { asset?: { _ref?: string }; alt?: string }
}

export type ArticleDetail = ArticleSummary & {
  body?: unknown[] // Portable Text blocks
  seoTitle?: string
}
