import { groq } from 'next-sanity'

export const allFundNamesQuery = groq`
  *[_type == "fund" && status == "Active" && defined(name)] | order(name asc) {
    "name": name
  }
`

export const allFundSlugsQuery = groq`
  *[_type == "fund" && status == "Active" && defined(slug.current)] {
    "slug": slug.current
  }
`

export const allFundsQuery = groq`
  *[_type == "fund"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    provider,
    category,
    subcategory,
    simpleDescription,
    proDescription,
    simpleCategoryName,
    fees,
    returns,
    minInvestment,
    aum,
    sebiRegistration,
    fundManager,
    inceptionDate,
    status
  }
`

export const fundBySlugQuery = groq`
  *[_type == "fund" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    provider,
    category,
    subcategory,
    simpleDescription,
    proDescription,
    simpleCategoryName,
    fees,
    returns,
    minInvestment,
    aum,
    fundManager,
    fundManagerBio,
    benchmark,
    sebiRegistration,
    inceptionDate,
    status
  }
`

export const fundsByCategoryQuery = groq`
  *[_type == "fund" && status == "Active" && category == $category] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    provider,
    category,
    subcategory,
    simpleCategoryName,
    fees,
    returns,
    minInvestment,
    sebiRegistration
  }
`

export const relatedFundsQuery = groq`
  *[_type == "fund" && status == "Active" && category == $category && _id != $excludeId] | order(name asc) [0...3] {
    _id,
    name,
    "slug": slug.current,
    provider,
    category,
    simpleCategoryName,
    returns,
    minInvestment
  }
`

export const allGlossaryTermsQuery = groq`
  *[_type == "glossaryTerm"] | order(term asc) {
    _id,
    term,
    "slug": slug.current,
    simpleDefinition,
    proDefinition,
    whyItMatters,
    relatedProducts
  }
`

export const glossaryTermBySlugQuery = groq`
  *[_type == "glossaryTerm" && slug.current == $slug][0] {
    _id,
    term,
    "slug": slug.current,
    simpleDefinition,
    proDefinition,
    whyItMatters,
    relatedProducts,
    "relatedTerms": relatedTerms[]->{ term, "slug": slug.current }
  }
`

export const allArticleSlugsQuery = groq`
  *[_type == "article" && defined(slug.current) && defined(publishedAt)] {
    "slug": slug.current
  }
`

export const allGlossarySlugsQuery = groq`
  *[_type == "glossaryTerm" && defined(slug.current)] {
    "slug": slug.current
  }
`

export const articlesIndexQuery = groq`
  *[_type == "article" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    author,
    publishedAt,
    category,
    seoDescription,
    featuredImage
  }
`

// Learn page: evergreen fundamentals, ordered for educational progression.
// Body included so we can compute section count and reading time without
// a second round-trip.
export const learnArticlesQuery = groq`
  *[_type == "article" && category == "Education" && defined(publishedAt)] | order(publishedAt asc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    category,
    seoDescription,
    body
  }
`

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    author,
    publishedAt,
    category,
    body,
    featuredImage,
    seoTitle,
    seoDescription
  }
`
