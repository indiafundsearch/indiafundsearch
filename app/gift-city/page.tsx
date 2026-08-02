import type { Metadata } from 'next'
import Link from 'next/link'
import { FadeInOnScroll } from '@/components/shared/FadeInOnScroll'
import { UsPersonWarning } from '@/components/shared/UsPersonWarning'
import { CORRIDORS } from '@/lib/content/corridors'
import { JsonLd } from '@/components/shared/JsonLd'
import { SHEETS } from '@/lib/constants'
import { pageMeta, breadcrumbJsonLd } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'GIFT City investments — inbound & outbound, explained',
  description:
    'GIFT City (GIFT IFSC) explained in plain English: inbound USD funds for NRIs investing into Indian strategies, and outbound LRS-route products for residents going global.',
  path: '/gift-city',
})

const ROUTES = [
  {
    href: '/gift-city/inbound',
    no: 'Route A',
    title: 'Inbound — Into India',
    who: 'For NRIs, OCIs & foreign investors',
    bullets: [
      ['Invest in US dollars', 'no NRE/NRO bank account needed'],
      ['Full repatriation', 'capital and gains move freely, no FEMA friction'],
      ['No Indian tax filing', 'most IFSC funds handle tax at the fund level'],
      ['Indian strategies, offshore wrapper', 'concentrated equity, market-neutral, private credit'],
      ['One relationship', 'dollar statements, single point of contact'],
    ],
    chips: ['USD SUBSCRIPTION', 'IFSCA REGULATED', 'NRI-FIRST TAX TREATMENT'],
  },
  {
    href: '/gift-city/outbound',
    no: 'Route B',
    title: 'Outbound — Go Global',
    who: 'For resident Indians via LRS',
    bullets: [
      ['A currency hedge that pays', 'dollar assets against long-run rupee depreciation'],
      ['Themes India doesn’t list', 'GenAI & semis, Greater China, EM ex-India, global macro'],
      ['Multi-geography allocation', 'US, Europe & emerging markets in one sleeve'],
      ['LRS route', 'US $2,50,000 per person per year'],
      ['Indian paperwork, familiar KYC', 'no foreign brokerage account to maintain'],
    ],
    chips: ['LRS ROUTE', 'DOLLAR ASSETS', 'INDIAN PAPERWORK'],
  },
] as const

export default function GiftCityPage() {
  return (
    <div className="pb-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'GIFT City', path: '/gift-city' },
        ])}
      />
      {/* Hero */}
      <section className="mx-auto max-w-[1180px] px-[22px] pt-14 max-sm:pt-9">
        <div className="eyebrow mb-3.5">Sheet {SHEETS.giftCity.no} — The Second Passport for Capital</div>
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
        <UsPersonWarning className="mt-7 max-w-[720px]" />
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
              <ul className="mt-4 space-y-0.5">
                {r.bullets.map(([lead, rest]) => (
                  <li
                    key={lead}
                    className="relative py-1.5 pl-[22px] text-[15.5px] leading-snug before:content-[''] before:absolute before:left-0.5 before:top-[14px] before:w-2.5 before:h-[1.5px] before:bg-signal"
                  >
                    <b className="font-sans font-semibold text-ink">{lead}</b>
                    <span className="font-serif text-ink-soft"> — {rest}</span>
                  </li>
                ))}
              </ul>
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

      {/* Corridor guides — surfaced high, because residence changes the answer
          more than the fund choice does. */}
      <FadeInOnScroll as="section" className="mx-auto max-w-[1180px] px-[22px] mt-14">
        <div className="bg-ink text-white-warm px-9 py-9 relative max-sm:px-5">
          <span className="corner corner-tl" /><span className="corner corner-tr" />
          <span className="corner corner-bl" /><span className="corner corner-br" />
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-signal font-semibold">
            Start here — where are you tax-resident?
          </div>
          <h2 className="font-sans text-[clamp(23px,3vw,30px)] font-bold mt-2.5 max-w-[760px] leading-[1.15]">
            The same GIFT City fund is treated three different ways.
          </h2>
          <p className="font-serif text-[17px] text-[#c7d6ce] mt-3 max-w-[720px]">
            India&rsquo;s exemptions are designed for investors taxed nowhere else. Whether that
            helps you — or quietly costs you — depends on the country you file in, not on the fund.
            Read your corridor before you read the shelf.
          </p>
          <div className="grid gap-3 sm:grid-cols-3 mt-7">
            {CORRIDORS.map((c) => (
              <Link
                key={c.slug}
                href={`/nri/${c.slug}`}
                className="block border border-[rgba(252,251,248,0.25)] px-5 py-4 hover:bg-[rgba(252,251,248,0.08)] hover:border-signal transition-colors group"
              >
                <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[#9db5aa]">
                  <span className="mr-1.5 text-[12px]" aria-hidden="true">{c.flag}</span>
                  Corridor {c.code}
                </span>
                <span className="font-sans text-[17px] font-bold block mt-1 group-hover:text-signal transition-colors">
                  NRIs in {c.label}
                </span>
                <span className="font-serif text-[14px] text-[#c7d6ce] block mt-1.5 leading-snug">
                  {c.facts[0][1]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </FadeInOnScroll>

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
