import type { Metadata } from 'next'
import Link from 'next/link'
import { DISCLOSURE } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'
import { AuthorByline } from '@/components/eeat/AuthorByline'

// Routed through pageMeta so canonical / og tags are right when this is
// published. Previously a bare Metadata object, so it emitted no canonical.
export const metadata: Metadata = pageMeta({
  title: "US and Canadian NRIs: PFIC, FATCA and FBAR",
  description:
    "Why a US or Canadian passport changes pooled-fund investing: PFIC exposure, the QEF and mark-to-market problem, and the reporting you owe anyway.",
  path: '/learn/us-nri-pfic',
  ogTitle: 'US & Canadian NRIs',
  // Published September 2026. Figures are the set verified for the /us-tax
  // cluster; per-fund positions are deliberately not stated.
})

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze mb-2.5 mt-10 flex items-center gap-2.5 after:content-[''] after:h-px after:flex-1 after:bg-line-soft">
      {children}
    </h2>
  )
}

export default function UsNriPficPage() {
  return (
    <article className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <nav className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-slate mb-8" aria-label="Breadcrumb">
        <Link href="/learn" className="hover:text-ink">Learn</Link>
        <span className="mx-2">/</span>
        <span className="text-bronze">US & Canadian NRIs</span>
      </nav>

      <header className="mb-8 max-w-[820px]">
        <div className="eyebrow mb-3.5">Before you invest — US &amp; Canadian persons</div>
        <h1 className="font-sans font-bold text-[clamp(28px,4.2vw,42px)] tracking-[-0.01em] leading-[1.08]">
          A US or Canadian passport changes everything.
        </h1>
        <p className="font-serif text-[19px] text-ink-soft mt-4">
          Most GIFT City and pooled Indian funds are built for NRIs and foreign investors{' '}
          <em className="text-bronze italic">who are not US persons</em>. If you hold a US or
          Canadian passport or a green card, the same fund that works well for other NRIs can be{' '}
          <b>actively punitive</b> for you. Simply subscribing can create reporting duties back
          home. Read this before you shortlist anything.
        </p>
        <AuthorByline
          className="mt-6"
          published="August 2026"
          reviewed="September 2026"
          regulatoryAsAt="September 2026"
        />
      </header>

      <div className="bg-white-warm border border-line border-l-4 border-l-alert px-6 py-5 max-w-[820px] text-[15px] text-ink-soft">
        <b className="font-sans">Who this is for:</b> US citizens, US green-card holders and US tax
        residents; and Canadian residents. If any of these describe you (or a joint holder), the
        rules below apply <b>regardless of where the fund sits</b>, including inside GIFT IFSC.
      </div>

      {/* PFIC */}
      <H>What a PFIC is</H>
      <div className="max-w-[820px] space-y-3 text-[16.5px] text-ink-soft">
        <p>
          A <b>Passive Foreign Investment Company (PFIC)</b> is a US tax classification. Broadly,
          any non-US pooled vehicle whose income or assets are mostly passive is a PFIC. Passive
          means interest, dividends and capital gains. <b>Most non-US mutual funds, AIFs and pooled
          structures are PFICs.</b>
        </p>
        <p>
          The default treatment is harsh. Under the excess distribution regime, gains are taxed at
          the highest ordinary rates, with an interest charge for every year you held the fund. That
          often erases the return advantage entirely. It is one of the least favourable regimes in
          the US code, and it is aimed at exactly the kind of fund on a typical GIFT shelf.
        </p>
      </div>

      {/* Why pooled funds trigger it */}
      <H>Why a pooled non-US fund triggers it</H>
      <div className="max-w-[820px] space-y-3 text-[16.5px] text-ink-soft">
        <p>
          Hold <b>units of a pooled fund</b>, whether a mutual fund, most AIFs or a feeder, and you
          own a slice of a foreign corporation holding passive assets. That is the textbook PFIC.
          Hold securities <b>directly in your own name</b>, as in a PMS or managed account, or
          through a partnership that is transparent for US tax, and the analysis can be different.
          Structure is everything here, and it has to be confirmed fund by fund.
        </p>
      </div>

      {/* QEF / MTM */}
      <H>The QEF / mark-to-market election problem</H>
      <div className="max-w-[820px] space-y-3 text-[16.5px] text-ink-soft">
        <p>
          Two elections can soften PFIC treatment: <b>QEF</b>, the qualified electing fund route,
          and <b>mark-to-market</b>. QEF only works if the fund gives you an annual <b>PFIC Annual
          Information Statement</b>. Many Indian and GIFT funds do not produce one. Without it the
          election is unavailable, and you are back in the punitive default.
        </p>
        <p>
          In practice, few Indian or GIFT City funds issue the statement, so QEF is rarely on the
          table. Mark-to-market needs the fund to be regularly traded on a qualifying exchange, which
          a private placement is not. The filing burden is the part people underestimate:{' '}
          <b>one Form 8621 per fund, per year</b>, and a year you did not file does not close.
          Whether a given fund supports either election is a question for that fund&apos;s documents
          and your US CPA or Enrolled Agent, not for a factsheet.{' '}
          <Link href="/us-tax/pfic-annual-information-statement" className="text-bronze border-b border-bronze-soft">
            What the statement is, and what to ask →
          </Link>
        </p>
      </div>

      {/* FATCA / FBAR */}
      <H>FATCA and FBAR — the reporting you owe anyway</H>
      <div className="max-w-[820px] space-y-3 text-[16.5px] text-ink-soft">
        <p>
          Separate from how the fund is taxed, US persons must <b>report</b> foreign financial
          assets: <b>FBAR (FinCEN Form 114)</b> for foreign accounts over the threshold, and{' '}
          <b>FATCA (Form 8938)</b> with your US return. GIFT funds accepting US money will also ask
          for US tax documentation (W-9) and may decline US persons precisely to avoid FATCA
          obligations of their own. Non-reporting carries heavy penalties — this applies even where
          the investment itself is modest.
        </p>
        <ul className="space-y-1.5">
          {[
            'FBAR: foreign accounts together exceeding $10,000 at any point in the year. Filed with FinCEN, separately from your return.',
            'Form 8938: $50,000 at year end or $75,000 at any time if single and living in the US; $100,000 and $150,000 filing jointly; higher thresholds if you live abroad.',
            'Form 8621: one per PFIC, per year. A narrow exception applies while your PFIC holdings stay under $25,000 in aggregate, or $50,000 filing jointly, and is lost in any year you sell, receive a distribution or make an election.',
          ].map((x) => (
            <li key={x} className="relative pl-[22px] before:content-[''] before:absolute before:left-0.5 before:top-[13px] before:w-2.5 before:h-[1.5px] before:bg-bronze-soft">
              {x}
            </li>
          ))}
        </ul>
        <p>
          The three stack. They are cumulative, not alternatives.{' '}
          <b>Canadian residents:</b> Canada has its own foreign-asset reporting and its own rules for
          offshore funds. We do not state Canadian thresholds or positions on this site; confirm
          them with a Canadian CPA before you subscribe to anything.
        </p>
      </div>

      {/* Reg S */}
      <H>Reg S — why many funds simply say no</H>
      <div className="max-w-[820px] space-y-3 text-[16.5px] text-ink-soft">
        <p>
          Many GIFT and offshore funds are offered under <b>Regulation S</b>, a US securities-law
          safe harbour for offerings made <b>outside the United States to non-US persons</b>.
          Accepting a US person can break the Reg S exemption for the whole fund, so most managers
          simply <b>exclude US persons</b> at onboarding. That is why a fund can be perfect for one
          NRI and closed to another.
        </p>
      </div>

      {/* Which structures avoid it */}
      <H>Which structures can work for US persons</H>
      <div className="max-w-[820px] space-y-3 text-[16.5px] text-ink-soft">
        <p>
          There are routes that can be workable, typically those giving <b>direct ownership</b> or
          US-transparent treatment rather than opaque pooled units:
        </p>
        <ul className="space-y-1.5">
          {[
            'PMS / managed accounts — you hold the securities directly, so there is no PFIC "fund" wrapper',
            'Partnership-structured GIFT Cat III vehicles that are transparent for US tax (fact-specific)',
          ].map((x) => (
            <li key={x} className="relative pl-[22px] before:content-[''] before:absolute before:left-0.5 before:top-[13px] before:w-2.5 before:h-[1.5px] before:bg-bronze-soft">
              {x}
            </li>
          ))}
        </ul>
        <p>
          Several funds on the inbound GIFT City shelf do accept US persons, and the shelf marks
          which, as confirmed with each house. Acceptance is not the same as suitability: a fund
          that takes your subscription can still be a PFIC on your return. Whether a particular
          vehicle is US-transparent, and whether it issues the statement a QEF election needs, is a
          legal conclusion about that fund. We do not state it here.{' '}
          <Link href="/gift-city/inbound" className="text-bronze border-b border-bronze-soft">
            See the shelf (eligibility-gated) →
          </Link>
        </p>
      </div>

      {/* CTA */}
      <div className="mt-12 plot-card px-8 py-8 max-w-[820px] max-sm:px-5">
        <p className="font-sans font-bold text-[20px]">Hold a US or Canadian passport?</p>
        <p className="font-serif text-[16px] text-ink-soft mt-2">
          Tell the desk before you shortlist anything — we map your specific position with
          US-qualified counsel first, so you never subscribe into a PFIC by accident.
        </p>
        <Link
          href="/contact"
          className="inline-block mt-5 font-sans text-[14px] font-medium tracking-[0.08em] uppercase px-6 py-3 rounded-[3px] bg-ink text-white-warm border-[1.5px] border-ink hover:bg-bronze hover:border-bronze transition-colors"
        >
          Talk to the desk first →
        </Link>
      </div>

      <p className="font-serif italic text-[13.5px] text-slate mt-10 border-t border-line pt-5 max-w-[820px]">
        This page is a plain-English orientation, not US, Canadian or Indian tax advice. US and
        Canadian tax positions are fact-specific and are confirmed with qualified counsel before any
        investment. {DISCLOSURE.education}
      </p>
    </article>
  )
}
