import { FDVisualiser } from '@/components/lead-magnets/FDVisualiser'
import { FundPreviewRow } from '@/components/fund/FundPreviewRow'
import { CTACard } from '@/components/shared/CTACard'
import { TrustStrip } from '@/components/shared/TrustStrip'
import { FadeInOnScroll } from '@/components/shared/FadeInOnScroll'
import { KnowledgeCentreSection } from '@/components/home/KnowledgeCentreSection'
import { UniverseSection } from '@/components/home/UniverseSection'
import { InsightsSection } from '@/components/home/InsightsSection'

export default function HomePage() {
  return (
    <>
      <FDVisualiser />

      <FadeInOnScroll>
        <FundPreviewRow />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <KnowledgeCentreSection />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <UniverseSection />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <InsightsSection />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <section className="container-grid pb-16 md:pb-24">
          <CTACard
            badge="✦ Free Assessment"
            headline="Should you even look at PMS or AIF?"
            subtext="Most people aren't ready. Find out in 3 minutes."
            ctaLabel="Take the Diagnostic →"
            ctaHref="/diagnostic"
            microcopy="12 questions · 4 verdicts · No sales pitch"
          />
        </section>
      </FadeInOnScroll>

      <FadeInOnScroll>
        <section className="container-grid pb-20">
          <TrustStrip />
        </section>
      </FadeInOnScroll>
    </>
  )
}
