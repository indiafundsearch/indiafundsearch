import type { Metadata } from 'next'
import Link from 'next/link'
import { GiftGate } from '@/components/gift/GiftGate'
import { INBOUND_GROUP_ORDER } from '@/lib/gift/data'
import { GIFT_SHELF } from '@/lib/constants'
import { UsPersonWarning } from '@/components/shared/UsPersonWarning'
import { CORRIDORS } from '@/lib/content/corridors'
import { DisclosureLine } from '@/components/shared/DisclosureLine'
import { pageMeta } from '@/lib/seo'

// Named private-placement shelf — keep it out of the index (P0-5).
export const metadata: Metadata = pageMeta({
  title: 'GIFT City inbound funds — NRI investing into India (USD)',
  description:
    'How NRIs and foreign investors access Indian strategies through GIFT City in US dollars. Eligibility-gated reference shelf.',
  path: '/gift-city/inbound',
  noindex: true,
})

export default function GiftInboundPage() {
  return (
    <div className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <nav className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-slate mb-8" aria-label="Breadcrumb">
        <Link href="/gift-city" className="hover:text-ink">GIFT City</Link>
        <span className="mx-2">/</span>
        <span className="text-bronze">Route A — Inbound</span>
      </nav>

      <header className="mb-10 max-w-[780px]">
        <div className="eyebrow mb-3.5">Route A — Overseas Capital → Indian Strategies</div>
        <h1 className="font-sans font-bold text-[clamp(30px,4.5vw,44px)] tracking-[-0.01em] leading-[1.08]">
          Into India, in dollars.
        </h1>
        <p className="font-serif text-[19px] text-ink-soft mt-3.5">
          A GIFT City inbound fund runs an Indian strategy — the same PMS or AIF logic used onshore
          — but is housed inside the GIFT IFSC, where it accepts{' '}
          <b>US dollars from overseas investors</b> under the IFSCA regulator. No Indian bank
          account, no currency conversion, no resident-style tax filings.{' '}
          <em className="text-bronze italic">
            For NRIs, frequently the cleanest route into Indian strategies.
          </em>{' '}
          Below is the desk&apos;s working repository, organised by the role each fund plays.
        </p>
      </header>

      <UsPersonWarning className="mb-8 max-w-[860px]" />

      {/* Corridor gate. The shelf below is the same for everyone; the tax
          outcome is not. Someone filing in New Jersey and someone filing in
          Dubai should not read this list the same way, so the question comes
          before the funds rather than after them. */}
      <section className="mb-10 bg-ink text-white-warm px-8 py-7 relative max-w-[860px] max-sm:px-5">
        <span className="corner corner-tl" /><span className="corner corner-tr" />
        <span className="corner corner-bl" /><span className="corner corner-br" />
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-signal font-semibold">
          Before you read the shelf
        </div>
        <h2 className="font-sans text-[clamp(20px,2.6vw,26px)] font-bold mt-2 leading-[1.15] max-w-[620px]">
          Where you file your taxes changes what these funds are worth to you.
        </h2>
        <p className="font-serif text-[16px] text-[#c7d6ce] mt-2.5 max-w-[660px]">
          India&rsquo;s IFSC exemptions were written for investors who are taxed nowhere else. If
          your own country taxes you anyway, an Indian exemption can quietly leave you worse off,
          not better. Same fund, three different answers.
        </p>
        <div className="grid gap-3 sm:grid-cols-3 mt-6">
          {CORRIDORS.map((c) => (
            <Link
              key={c.slug}
              href={`/nri/${c.slug}`}
              className="block border border-[rgba(252,251,248,0.25)] px-4 py-3.5 hover:bg-[rgba(252,251,248,0.08)] hover:border-signal transition-colors group"
            >
              <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[#9db5aa]">
                <span className="mr-1.5 text-[12px]" aria-hidden="true">{c.flag}</span>
                Corridor {c.code}
              </span>
              <span className="font-sans text-[16px] font-bold block mt-1 group-hover:text-signal transition-colors">
                NRIs in {c.label}
              </span>
              <span className="font-serif text-[13.5px] text-[#c7d6ce] block mt-1.5 leading-snug">
                {c.hook}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <GiftGate direction="inbound" curatedAsOf={GIFT_SHELF.curatedAsOf} groupOrder={INBOUND_GROUP_ORDER} />

      <div className="mt-12 bg-white-warm border border-line border-l-4 border-l-teal px-6 py-5 text-[15px] text-ink-soft max-w-[860px]">
        <b className="font-sans">Eligibility, in one line —</b> inbound GIFT funds are built for
        NRIs, OCIs and foreign investors; resident Indians generally access these strategies through
        the domestic (onshore) versions instead.{' '}
        <Link href="/fit-finder" className="text-bronze font-sans font-medium">
          Not sure which side you&apos;re on? Run the Fit Finder →
        </Link>
      </div>

      <DisclosureLine />
    </div>
  )
}
