import type { Metadata } from 'next'
import Link from 'next/link'
import { DISCLOSURE } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'

// Routed through pageMeta so canonical / og tags are right when this is
// published. Previously a bare Metadata object, so it emitted no canonical.
export const metadata: Metadata = pageMeta({
  title: 'US & Canadian NRIs — PFIC, FATCA, FBAR & Reg S',
  description:
    'Why a US or Canadian passport changes GIFT City and pooled-fund investing materially: PFIC exposure, the QEF / mark-to-market problem, FATCA and FBAR reporting, and Reg S eligibility.',
  path: '/learn/us-nri-pfic',
  ogTitle: 'US & Canadian NRIs',
  // Draft: fund-specific positions are being finalised with US-qualified tax
  // counsel. Keep out of the index until the [COPY NEEDED] blocks are approved.
  noindex: true,
})

/** Visible, honest placeholder for content pending professional review. */
function CopyNeeded({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-bronze-wash border border-dashed border-bronze-soft px-4 py-3 my-3">
      <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-bronze font-semibold block mb-1">
        In review with US-qualified tax counsel
      </span>
      <span className="font-serif italic text-[14px] text-ink-soft">{children}</span>
    </div>
  )
}

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
          Most GIFT City and pooled Indian fund structures are built for NRIs, OCIs and foreign
          investors <em className="text-bronze italic">who are not US persons</em>. If you hold a US
          or Canadian passport or green card, the same fund that is efficient for other NRIs can be{' '}
          <b>actively punitive</b>, and simply subscribing can create reporting obligations back
          home. Read this before you shortlist anything.
        </p>
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
          A <b>Passive Foreign Investment Company (PFIC)</b> is a US tax classification. Broadly, a
          non-US pooled vehicle whose income or assets are mostly passive (interest, dividends,
          capital gains) is a PFIC in the eyes of the US IRS. <b>Most non-US mutual funds, AIFs and
          pooled structures are PFICs.</b>
        </p>
        <p>
          The US taxes PFICs harshly by default: under the &ldquo;excess distribution&rdquo; regime,
          gains can be taxed at the highest ordinary rates with an interest charge for each year you
          held the fund, often erasing the return advantage entirely. It is one of the least
          favourable regimes in the US code, and it is aimed squarely at exactly the kind of pooled
          non-US fund on a typical GIFT shelf.
        </p>
      </div>

      {/* Why pooled funds trigger it */}
      <H>Why a pooled non-US fund triggers it</H>
      <div className="max-w-[820px] space-y-3 text-[16.5px] text-ink-soft">
        <p>
          When you hold <b>units of a pooled fund</b> (a mutual fund, most AIFs, a feeder), you own
          a slice of a foreign corporation that holds passive assets — the textbook PFIC. When you
          hold securities <b>directly in your own name</b> (as in a PMS / managed account, or a
          partnership-structured vehicle that is transparent for US tax), the PFIC analysis can be
          different. Structure is everything, and it must be confirmed per fund.
        </p>
      </div>

      {/* QEF / MTM */}
      <H>The QEF / mark-to-market election problem</H>
      <div className="max-w-[820px] space-y-3 text-[16.5px] text-ink-soft">
        <p>
          US investors can sometimes soften PFIC treatment by electing <b>QEF (Qualified Electing
          Fund)</b> or <b>mark-to-market</b> treatment. But QEF only works if the fund provides an
          annual <b>PFIC Annual Information Statement</b> — many Indian/GIFT funds do not. Without it,
          the election is unavailable and you are back in the punitive default regime.
        </p>
        <CopyNeeded>
          [COPY NEEDED]. Fund-by-fund: which shelf funds provide a PFIC Annual Information Statement
          (QEF-eligible), which support mark-to-market, and the practical filing burden (Form 8621
          per fund, per year). Do not state per-fund positions until confirmed with US counsel.
        </CopyNeeded>
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
        <CopyNeeded>
          [COPY NEEDED]. Exact thresholds and the filing checklist for FBAR / Form 8938 / Form 8621,
          and the Canadian equivalents (T1135 foreign-income verification, PFIC-parallel rules). Do
          not publish specific thresholds or positions without review.
        </CopyNeeded>
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
        <CopyNeeded>
          [COPY NEEDED]. The specific shelf products (if any) that are open to US persons and the
          basis for each (PMS direct ownership, partnership transparency, QEF availability). This is
          a legal conclusion per fund — confirm with US-qualified counsel before naming any.
        </CopyNeeded>
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
