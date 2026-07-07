import type { Metadata } from 'next'
import Link from 'next/link'
import { FadeInOnScroll } from '@/components/shared/FadeInOnScroll'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'GIFT City investments — inbound & outbound, explained',
  description:
    'GIFT City (GIFT IFSC) explained in plain English: inbound USD funds for NRIs investing into Indian strategies, and outbound LRS-route products for residents going global. Curated shelf by Beyond.',
  alternates: { canonical: `${SITE.url}/gift-city` },
}

const ROUTES = [
  {
    href: '/gift-city/inbound',
    no: 'Route A',
    title: 'Inbound — Into India',
    who: 'For NRIs, OCIs & foreign investors',
    text: 'Indian strategies — concentrated equity, market-neutral, private credit — housed inside GIFT IFSC so you can subscribe in US dollars. No Indian bank account, no resident-style filings, often the cleanest tax route into India.',
    chips: ['USD SUBSCRIPTION', 'IFSCA REGULATED', 'NRI-FIRST TAX TREATMENT'],
  },
  {
    href: '/gift-city/outbound',
    no: 'Route B',
    title: 'Outbound — Go Global',
    who: 'For resident Indians via LRS',
    text: 'Global equity, US tech, USD income — reached through the RBI’s LRS route (US $250,000 per person per year) with GIFT-domiciled structures that cut the paperwork of direct overseas accounts.',
    chips: ['LRS ROUTE', 'DOLLAR ASSETS', 'INDIAN PAPERWORK'],
  },
] as const

export default function GiftCityPage() {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="mx-auto max-w-[1180px] px-[22px] pt-14 max-sm:pt-9">
        <div className="eyebrow mb-3.5">Sheet 06 — The Second Passport for Capital</div>
        <h1 className="font-sans font-bold text-[clamp(30px,4.5vw,48px)] tracking-[-0.01em] leading-[1.06] max-w-[860px]">
          GIFT City. Legally India.
          <br />
          <em className="font-serif italic font-medium text-bronze">Financially, the world.</em>
        </h1>
        <p className="font-serif text-[19px] text-ink-soft max-w-[720px] mt-4">
          <b>GIFT City (Gujarat International Finance Tec-City)</b> is a special jurisdiction —
          legally inside India, but operating in <b>US dollars</b> under its own regulator (IFSCA).
          Money can flow <em className="text-bronze italic">in</em> from overseas investors and{' '}
          <em className="text-bronze italic">out</em> to global markets — both without the old
          friction. We currently curate products on both routes.
        </p>
      </section>

      {/* Two routes */}
      <section className="mx-auto max-w-[1180px] px-[22px] mt-12 grid gap-6 lg:grid-cols-2">
        {ROUTES.map((r, i) => (
          <FadeInOnScroll key={r.href} delay={i * 0.1}>
            <Link href={r.href} className="plot-card block p-8 h-full group hover:shadow-plot-hover transition-shadow max-sm:p-5">
              <span className="corner corner-tl" /><span className="corner corner-tr" />
              <span className="corner corner-bl" /><span className="corner corner-br" />
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-signal font-semibold">{r.no}</div>
              <h2 className="font-sans text-[26px] font-bold mt-2 group-hover:text-bronze transition-colors">
                {r.title}
              </h2>
              <p className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-slate mt-1">{r.who}</p>
              <p className="font-serif text-[16.5px] text-ink-soft mt-4">{r.text}</p>
              <div className="flex gap-2 flex-wrap mt-5 font-mono text-[9.5px] tracking-[0.08em]">
                {r.chips.map((c) => (
                  <span key={c} className="border border-bronze-soft text-bronze bg-bronze-wash px-2 py-1 rounded-[2px]">
                    {c}
                  </span>
                ))}
              </div>
              <span className="inline-block mt-6 font-sans text-[13px] font-medium tracking-[0.08em] uppercase text-bronze border-b-[1.5px] border-bronze-soft">
                See the shelf →
              </span>
            </Link>
          </FadeInOnScroll>
        ))}
      </section>

      {/* Why GIFT exists — condensed education */}
      <FadeInOnScroll as="section" className="mx-auto max-w-[1180px] px-[22px] mt-16">
        <div className="dim mb-10"><span>Why this jurisdiction exists</span></div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              h: 'The old friction',
              p: 'Investing across borders used to mean NRE/NRO mazes, currency conversion, TDS surprises and resident-style filings — enough friction that most capital simply stayed put.',
            },
            {
              h: 'The GIFT answer',
              p: 'Funds domiciled in GIFT IFSC operate in US dollars under IFSCA. Overseas money reaches Indian strategies — and Indian money reaches global markets — inside one clean, regulated wrapper.',
            },
            {
              h: 'The honest caveat',
              p: 'Tax treatment is fund-specific and residency-specific. Every GIFT decision here ends with one conversation with your CA — but it starts from a far simpler place than the old maze.',
            },
          ].map((b) => (
            <div key={b.h}>
              <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze mb-2.5">{b.h}</h3>
              <p className="font-serif text-[16.5px] text-ink-soft">{b.p}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex gap-5 flex-wrap">
          <Link href="/learn#gift-city-for-nris" className="font-sans text-[13px] font-medium tracking-[0.06em] uppercase text-bronze border-b-[1.5px] border-bronze-soft">
            Read: GIFT City for NRIs →
          </Link>
          <Link href="/learn#gift-city-outbound" className="font-sans text-[13px] font-medium tracking-[0.06em] uppercase text-bronze border-b-[1.5px] border-bronze-soft">
            Read: GIFT City Outbound →
          </Link>
          <Link href="/learn/gift-city-global-usd" className="font-sans text-[13px] font-medium tracking-[0.06em] uppercase text-bronze border-b-[1.5px] border-bronze-soft">
            The full material specification →
          </Link>
          <Link href="/tax" className="font-sans text-[13px] font-medium tracking-[0.06em] uppercase text-bronze border-b-[1.5px] border-bronze-soft">
            Tax schedule (Resident / NRI) →
          </Link>
        </div>
      </FadeInOnScroll>
    </div>
  )
}
