export type RelatedProduct = 'PMS' | 'AIF' | 'GIFT City' | 'All'

export type GlossaryTerm = {
  _id: string
  term: string
  slug: string
  simpleDefinition?: string
  proDefinition?: string
  whyItMatters?: string
  relatedProducts?: RelatedProduct[]
}

export type GlossaryTermDetail = GlossaryTerm & {
  relatedTerms?: { term: string; slug: string }[]
}
