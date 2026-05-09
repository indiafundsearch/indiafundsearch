import { client } from '@/lib/sanity/client'
import { allGlossaryTermsQuery, learnArticlesQuery } from '@/lib/sanity/queries'
import { Translator } from '@/components/lead-magnets/Translator'
import { LearnArticlesGrid, type LearnArticle } from '@/components/learn/LearnArticlesGrid'
import type { GlossaryTerm } from '@/components/knowledge/glossaryTypes'

export const metadata = {
  title: 'Learn — PMS, AIF, SIF, GIFT City explained',
  description:
    'Evergreen guides to PMS, AIF, SIF, and GIFT City. Plus a free, ungated glossary, product map, and 3-question Pathfinder. The Morningstar of Indian alternatives.',
}

export const revalidate = 600

export default async function KnowledgePage() {
  const [terms, articles] = await Promise.all([
    fetchGlossary(),
    fetchLearnArticles(),
  ])

  return (
    <div className="container-grid pt-12 pb-20 md:pt-20">
      <header className="max-w-4xl">
        <p className="text-sm font-medium uppercase tracking-widest text-gold">Learn</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          Learn the fundamentals.{' '}
          <span className="font-semibold italic text-gold">Then form a view.</span>
        </h1>
        <p className="mt-5 max-w-prose text-lg text-text-muted">
          Evergreen guides covering the products, the categories, and the regulation. Written for thinking investors — every analogy is a real one, every number is verifiable.
        </p>
        <p className="mt-3 text-sm text-text-muted">
          ✦ No login required · ✦ No distributor commissions · ✦ 100% education-first
        </p>
      </header>

      <div className="mt-12 md:mt-14">
        <LearnArticlesGrid articles={articles} />
      </div>

      <hr className="mt-20 border-card-border md:mt-28" />

      <div className="mt-16 md:mt-20">
        <Translator terms={terms} />
      </div>
    </div>
  )
}

async function fetchGlossary(): Promise<GlossaryTerm[]> {
  try {
    return await client.fetch<GlossaryTerm[]>(allGlossaryTermsQuery, {}, {
      next: { tags: ['glossaryTerm'] },
    })
  } catch (error) {
    console.error('KnowledgePage: glossary fetch failed', error)
    return []
  }
}

async function fetchLearnArticles(): Promise<LearnArticle[]> {
  try {
    return await client.fetch<LearnArticle[]>(learnArticlesQuery, {}, {
      next: { tags: ['article'] },
    })
  } catch (error) {
    console.error('KnowledgePage: learn articles fetch failed', error)
    return []
  }
}
