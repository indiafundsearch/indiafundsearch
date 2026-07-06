import type { Metadata } from 'next'
import { FitFinder } from '@/components/fit/FitFinder'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Fit Finder — which alternative investment fits you?',
  description:
    'Seven questions narrow thirteen SEBI-regulated structures — PMS, AIF, SIF, REITs, private credit, GIFT City — to a personal shortlist. Free, on screen, no login.',
  alternates: { canonical: `${SITE.url}/fit-finder` },
}

export default function FitFinderPage() {
  return (
    <div className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <div className="mb-10 text-center max-w-[760px] mx-auto">
        <div className="eyebrow mb-3.5 justify-center before:content-[''] before:h-px before:flex-1 before:bg-line before:max-w-[120px]">
          Sheet 04 — Load Calculation
        </div>
        <h1 className="font-sans font-bold text-[clamp(30px,4.5vw,44px)] tracking-[-0.01em] leading-[1.08]">
          Seven questions. A shortlist, not a sales pitch.
        </h1>
        <p className="font-serif text-[19px] text-ink-soft mt-3.5">
          An architect asks what the building is <em className="text-bronze italic">for</em> before
          drawing it. Answer seven questions — the tool narrows thirteen structures down to the few
          worth a serious conversation.
        </p>
      </div>

      <FitFinder />
    </div>
  )
}
