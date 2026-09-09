import type { Metadata } from 'next'
import { FitFinder } from '@/components/fit/FitFinder'
import { FIT_FINDER, SHEETS } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: "Fit Finder: Which Investment Structure Suits You",
  description:
    "Seven questions narrow thirteen SEBI-regulated structures to a personal shortlist. Free, on screen, no login, and it says when the answer is none of them.",
  path: '/fit-finder',
})

export default function FitFinderPage() {
  return (
    <div className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <div className="mb-10 text-center max-w-[760px] mx-auto">
        <div className="eyebrow mb-3.5 justify-center before:content-[''] before:h-px before:flex-1 before:bg-line before:max-w-[120px]">
          Sheet {SHEETS.fitFinder.no} — Load Calculation
        </div>
        <h1 className="font-sans font-bold text-[clamp(30px,4.5vw,44px)] tracking-[-0.01em] leading-[1.08]">
          Seven questions. A shortlist, not a sales pitch.
        </h1>
        <p className="font-serif text-[19px] text-ink-soft mt-3.5">
          An architect asks what the building is <em className="text-bronze italic">for</em> before
          drawing it. Answer seven questions and the tool narrows thirteen structures down to the
          few worth a serious conversation.
        </p>
        <p className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-slate mt-4">
          About {FIT_FINDER.durationShort} · No email needed to see your shortlist
        </p>
      </div>

      <FitFinder />
    </div>
  )
}
