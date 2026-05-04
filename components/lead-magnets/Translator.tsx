import { GlossaryBrowser } from '@/components/knowledge/GlossaryBrowser'
import { ProductMap } from '@/components/knowledge/ProductMap'
import { Pathfinder } from '@/components/knowledge/Pathfinder'
import type { GlossaryTerm } from '@/components/knowledge/glossaryTypes'

type Props = {
  terms: GlossaryTerm[]
}

/**
 * Translator IS the Knowledge Centre. Composes the four sub-tools:
 *   - Search bar (inside GlossaryBrowser)
 *   - Product Map (FD → GIFT City wealth ladder)
 *   - Pathfinder (3-question wizard)
 *   - A-Z Glossary
 *
 * Always ungated — this is the SEO engine.
 */
export function Translator({ terms }: Props) {
  return (
    <div className="space-y-16 md:space-y-24">
      <section>
        <SectionHeader
          eyebrow="Map"
          title="Where every Indian product fits."
          description="The wealth ladder from Fixed Deposits to GIFT City. Click a node to learn what it is, who it suits, and the minimum ticket."
        />
        <div className="mt-8">
          <ProductMap />
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Pathfinder"
          title="Which one is for me?"
          description="Three questions. We don't recommend a fund — we narrow the universe so you know what to read about first."
        />
        <div className="mt-8">
          <Pathfinder />
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Glossary"
          title="Search any investment term."
          description="Each term comes with a Simple definition and a Pro definition — toggle in the header. Most terms link to a dedicated page so the open-web can find them."
        />
        <div className="mt-8">
          <GlossaryBrowser terms={terms} />
        </div>
      </section>
    </div>
  )
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <header className="max-w-3xl">
      <p className="text-xs font-medium uppercase tracking-widest text-gold">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-base text-text-muted">{description}</p>
    </header>
  )
}
