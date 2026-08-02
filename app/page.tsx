import type { Metadata } from 'next'
import Link from 'next/link'
import { SpectrumExplorer } from '@/components/spectrum/SpectrumExplorer'
import { FadeInOnScroll } from '@/components/shared/FadeInOnScroll'
import { ARTICLES, articleHref } from '@/lib/content/articles'
import { SHEETS } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'IndiaFundSearch — Every SEBI-Regulated Alternative Investment in India, Mapped',
  absoluteTitle: true,
  description:
    'An interactive map of every SEBI-regulated alternative in India — PMS, AIF, SIF, REITs, private credit, GIFT City — by risk, liquidity, outcome and objective. Education-first, no login.',
  path: '/',
  ogTitle: 'Every SEBI-Regulated Alternative in India, Mapped',
})

export default function HomePage() {
  const featured = ARTICLES.slice(0, 3)

  return (
    <div className="pb-4">
      {/* ============ HERO / SHEET 01 ============ */}
      <section className="mx-auto max-w-[1180px] px-[22px] pt-14 pb-20 max-sm:pt-9">
        <div className="mb-10">
          <div className="eyebrow mb-3.5">Sheet {SHEETS.spectrum.no} — Site Plan</div>
          <h1 className="font-sans font-bold text-[clamp(32px,5vw,52px)] tracking-[-0.01em] leading-[1.06] max-w-[820px]">
            Every alternative in Indian investing.
            <br />
            <em className="font-serif italic font-medium text-bronze">Drawn to scale.</em>
          </h1>
          <p className="font-serif text-[19px] text-ink-soft max-w-[700px] mt-4">
            Three ways to read the same landscape: <em className="text-bronze italic">position</em>{' '}
            (risk against liquidity), <em className="text-bronze italic">outcome</em> (what ₹1 Cr
            becomes against the FD path), and <em className="text-bronze italic">objective</em>{' '}
            (which structure does which job). Tap any block or bubble to inspect it.
          </p>
        </div>

        <SpectrumExplorer />
      </section>

      {/* ============ GIFT CITY PROMO BAND ============ */}
      <FadeInOnScroll as="section" className="bg-ink text-white-warm">
        <div className="mx-auto max-w-[1180px] px-[22px] py-16 grid gap-10 lg:grid-cols-[1.3fr_1fr] items-center">
          <div>
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-signal mb-3.5">
              Now on the shelf — GIFT City
            </div>
            <h2 className="font-sans font-bold text-[clamp(26px,3.6vw,38px)] tracking-[-0.01em] leading-[1.1]">
              The second passport for capital.
            </h2>
            <p className="font-serif text-[18px] text-[#c7d6ce] mt-4 max-w-[560px]">
              India built an international financial centre so overseas money could reach Indian
              strategies — and Indian money could reach the world — without the old friction. We
              currently curate <b className="text-white-warm">inbound</b> funds for NRIs and{' '}
              <b className="text-white-warm">outbound</b> USD routes for residents.
            </p>
            <div className="flex gap-3 flex-wrap mt-7">
              <Link
                href="/gift-city/inbound"
                className="font-sans text-[14px] font-medium tracking-[0.08em] uppercase px-6 py-3 rounded-[3px] bg-signal text-ink hover:bg-bronze-soft transition-colors"
              >
                Inbound — Into India →
              </Link>
              <Link
                href="/gift-city/outbound"
                className="font-sans text-[14px] font-medium tracking-[0.08em] uppercase px-6 py-3 rounded-[3px] border-[1.5px] border-white-warm/40 text-white-warm hover:border-white-warm transition-colors"
              >
                Outbound — Go Global →
              </Link>
            </div>
          </div>
          <div className="relative border border-white-warm/20 p-6 font-mono text-[12px] leading-[2] text-[#c7d6ce]">
            <span className="corner corner-tl" />
            <span className="corner corner-tr" />
            <span className="corner corner-bl" />
            <span className="corner corner-br" />
            <p className="text-signal tracking-[0.18em] uppercase text-[10px] mb-3">Plot notes</p>
            CURRENCY — US DOLLAR
            <br />
            REGULATOR — IFSCA (GIFT IFSC)
            <br />
            INBOUND — NRI CAPITAL → INDIAN STRATEGIES
            <br />
            OUTBOUND — RESIDENT LRS → GLOBAL MARKETS
            <br />
            TAX — OFTEN THE CLEANEST NRI ROUTE*
            <br />
            <span className="text-[10px] opacity-70">* FUND-SPECIFIC — VERIFY WITH YOUR CA</span>
          </div>
        </div>
      </FadeInOnScroll>

      {/* ============ FUNDAMENTALS TEASER ============ */}
      <section className="mx-auto max-w-[1180px] px-[22px] py-20">
        <FadeInOnScroll>
          <div className="eyebrow mb-3.5">Sheet {SHEETS.fundamentals.no} — First Principles</div>
          <h2 className="font-sans font-bold text-[clamp(26px,3.6vw,38px)] tracking-[-0.01em]">
            Start with the fundamentals.
          </h2>
          <p className="font-serif text-[18px] text-ink-soft max-w-[640px] mt-3">
            Short reads that make everything else obvious — written the way we would explain it
            across a table.{' '}
            <em className="text-bronze italic">No jargon survives past the first sentence.</em>
          </p>
        </FadeInOnScroll>

        <div className="grid gap-4 md:grid-cols-3 mt-9">
          {featured.map((a, i) => (
            <FadeInOnScroll key={a.slug} delay={i * 0.08}>
              <Link
                href={articleHref(a.slug)}
                className="plot-card block p-6 h-full hover:shadow-plot-hover transition-shadow group"
              >
                <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-bronze font-semibold">
                  {a.no} · {a.min}
                </div>
                <h3 className="font-sans text-xl font-bold mt-2 group-hover:text-bronze transition-colors">
                  {a.title}
                </h3>
                <p className="font-serif italic text-[15px] text-slate mt-1">{a.sub}</p>
              </Link>
            </FadeInOnScroll>
          ))}
        </div>

        <FadeInOnScroll delay={0.2} className="mt-6">
          <Link
            href="/learn"
            className="font-sans text-[13px] font-medium tracking-[0.06em] uppercase text-bronze border-b-[1.5px] border-bronze-soft hover:text-ink transition-colors"
          >
            All fundamentals + the thirteen materials →
          </Link>
        </FadeInOnScroll>
      </section>

      {/* ============ FIT FINDER CTA ============ */}
      <FadeInOnScroll as="section" className="mx-auto max-w-[1180px] px-[22px] pb-20">
        <div className="plot-card px-10 py-12 text-center max-sm:px-5">
          <span className="corner corner-tl" />
          <span className="corner corner-tr" />
          <span className="corner corner-bl" />
          <span className="corner corner-br" />
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-bronze mb-3">
            Sheet {SHEETS.fitFinder.no} — Load Calculation
          </div>
          <h2 className="font-sans font-bold text-[clamp(24px,3.2vw,34px)] tracking-[-0.01em]">
            Seven questions. A shortlist, not a sales pitch.
          </h2>
          <p className="font-serif text-[17px] text-ink-soft max-w-[560px] mx-auto mt-3">
            An architect asks what the building is <em className="italic">for</em> before drawing
            it. Answer seven questions — the tool narrows thirteen structures to the few worth a
            serious conversation.
          </p>
          <Link
            href="/fit-finder"
            className="inline-block mt-7 font-sans text-[14px] font-medium tracking-[0.08em] uppercase px-7 py-3 rounded-[3px] bg-ink text-white-warm border-[1.5px] border-ink hover:bg-bronze hover:border-bronze transition-colors"
          >
            Run the Fit Finder →
          </Link>
          <p className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-slate mt-4">
            No login · Results on screen · 3 minutes
          </p>
        </div>
      </FadeInOnScroll>
    </div>
  )
}
