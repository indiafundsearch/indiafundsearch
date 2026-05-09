import { CTACard } from '@/components/shared/CTACard'
import { TrustStrip } from '@/components/shared/TrustStrip'

export const metadata = {
  title: 'About — IndiaFundSearch & Beyond Wealth',
  description:
    'IndiaFundSearch is the education-first platform for India\'s alternatives, built by Beyond Wealth. We don\'t distribute. We educate. When you\'re ready, we advise.',
}

export default function AboutPage() {
  return (
    <div className="container-prose pt-12 pb-20 md:pt-20">
      <header>
        <p className="text-sm font-medium uppercase tracking-widest text-gold">About</p>
        <h1 className="mt-2">We don&rsquo;t distribute. We educate. When you&rsquo;re ready, we advise.</h1>
        <p className="mt-5 text-lg text-text-muted">
          IndiaFundSearch is run by Beyond Wealth — a wealth advisory practice based in Vadodara. The site is the product we wish existed when our clients first asked about PMS, AIF, and GIFT City. So we built it.
        </p>
        <div className="mt-6">
          <TrustStrip variant="inline" />
        </div>
      </header>

      <section className="mt-14 space-y-5">
        <h2 className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
          Why education-first?
        </h2>
        <p className="text-base leading-relaxed text-text-primary">
          India&rsquo;s alternatives market is growing faster than its investor literacy. PMS AUM is up 28% year-on-year. AIF commitments are at a record. GIFT City has crossed its first ₹10,000 Cr mark for NRI-targeted funds. Most investors who allocate are working from glossy decks and word-of-mouth.
        </p>
        <p className="text-base leading-relaxed text-text-primary">
          That&rsquo;s the gap. We don&rsquo;t fill it by selling products — distributors do that, and they earn commissions for it. We fill it by writing tools that explain, model, and compare without ever placing you with a fund.
        </p>
      </section>

      <section className="mt-14 space-y-5">
        <h2 className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
          What we promise
        </h2>
        <ul className="space-y-3 text-base leading-relaxed text-text-primary">
          <li className="flex gap-3">
            <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-pill bg-gold" />
            <span>
              <strong>No distribution, ever.</strong> IndiaFundSearch will never broker, transact, or earn commissions on a fund. The day we do, this whole thing collapses.
            </span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-pill bg-gold" />
            <span>
              <strong>No login walls.</strong> The Knowledge Centre is free and ungated. The Diagnostic, Fee X-Ray, Scorecard, and FD Visualiser run without an account.
            </span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-pill bg-gold" />
            <span>
              <strong>The Diagnostic includes a &ldquo;Not Yet&rdquo; verdict.</strong> If you aren&rsquo;t ready for PMS or AIF, the tool will say so. No distributor would replicate this — it&rsquo;s our most important feature.
            </span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-pill bg-gold" />
            <span>
              <strong>Plain-English by default.</strong> Toggle Pro mode in the header for technical depth. Both modes are written by humans, not AI auto-summary.
            </span>
          </li>
        </ul>
      </section>

      <section className="mt-14 space-y-5">
        <h2 className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
          When does Beyond Wealth come in?
        </h2>
        <p className="text-base leading-relaxed text-text-primary">
          We advise as a fee-only practice when an investor decides they want a real conversation. That&rsquo;s a separate engagement and unrelated to your usage of this site. The site stays free and uncompromised either way.
        </p>
        <p className="text-base leading-relaxed text-text-primary">
          If you&rsquo;re curious whether you&rsquo;re even ready for PMS or AIF, take the Diagnostic first. The 12-question assessment is honest about which 30%–40% of users should not be looking at alternatives yet.
        </p>
      </section>

      <section className="mt-16">
        <CTACard
          badge="✦ Free Assessment"
          headline="Are you ready?"
          subtext="Three minutes. Twelve questions. Four verdicts. One of them is &ldquo;Not Yet&rdquo; — and that might be the most useful answer you get all month."
          ctaLabel="Take the Diagnostic →"
          ctaHref="/diagnostic"
          microcopy="No login. No commissions. No sales pitch."
        />
      </section>

      <p className="mt-12 text-xs text-text-muted">
        IndiaFundSearch.com is an educational platform. We do not distribute or sell any financial products. For investment advice, consult a SEBI-registered advisor.
      </p>
    </div>
  )
}
