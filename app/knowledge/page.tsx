import { client } from '@/lib/sanity/client'
import { allGlossaryTermsQuery } from '@/lib/sanity/queries'
import { Translator } from '@/components/lead-magnets/Translator'
import type { GlossaryTerm } from '@/components/knowledge/glossaryTypes'

export const metadata = {
  title: 'Learn — PMS, AIF, SIF, GIFT City explained',
  description:
    'Free, ungated glossary, product map, and 3-question Pathfinder for India\'s alternatives — PMS, AIF, SIF, and GIFT City. The Morningstar of Indian alternatives.',
}

export const revalidate = 600

export default async function KnowledgePage() {
  let terms: GlossaryTerm[] = []
  try {
    terms = await client.fetch<GlossaryTerm[]>(allGlossaryTermsQuery, {}, {
      next: { tags: ['glossaryTerm'] },
    })
  } catch (error) {
    console.error('KnowledgePage: Sanity fetch failed', error)
  }

  return (
    <div className="container-grid pt-12 pb-20 md:pt-20">
      <header className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-widest text-gold">
          Learn
        </p>
        <h1 className="mt-2">Translator: every term, every product, no jargon.</h1>
        <p className="mt-4 max-w-prose text-lg text-text-muted">
          Search any investment term. Map the entire Indian wealth ladder. Or answer three questions to see which products are even worth reading about.
        </p>
        <p className="mt-3 text-sm text-text-muted">
          ✦ No login required · ✦ No distributor commissions · ✦ 100% education-first
        </p>
      </header>

      <div className="mt-12 md:mt-16">
        <Translator terms={terms} />
      </div>
    </div>
  )
}
