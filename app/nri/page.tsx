import type { Metadata } from 'next'
import Link from 'next/link'
import { CORRIDORS } from '@/lib/content/corridors'
import { SHEETS } from '@/lib/constants'
import { pageMeta, breadcrumbJsonLd, nriHreflang } from '@/lib/seo'
import { JsonLd } from '@/components/shared/JsonLd'
import { FadeInOnScroll } from '@/components/shared/FadeInOnScroll'
import { Byline } from '@/components/shared/Byline'
import { DisclosureLine } from '@/components/shared/DisclosureLine'

export const metadata: Metadata = pageMeta({
  title: 'NRI investing by corridor — US, UAE and UK',
  description:
    'Where you are tax-resident changes which Indian structures make sense — not just the paperwork. Corridor guides for NRIs and OCIs in the United States, the UAE and the United Kingdom, covering PMS, AIFs and GIFT City.',
  path: '/nri',
  languages: nriHreflang(),
})

export default function NriHubPage() {
  return (
    <div className="pb-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'NRI Corridors', path: '/nri' },
        ])}
      />

      <section className="mx-auto max-w-[1180px] px-[22px] pt-14 max-sm:pt-9">
        <div className="eyebrow mb-3.5">Sheet {SHEETS.nri.no} — Corridors</div>
        <h1 className="font-sans font-bold text-[clamp(30px,4.5vw,48px)] tracking-[-0.01em] leading-[1.06] max-w-[880px]">
          The same fund, three countries,
          <br />
          <em className="font-serif italic font-medium text-bronze">three different answers.</em>
        </h1>
        <p className="font-serif text-[19px] text-ink-soft max-w-[760px] mt-4">
          Indian regulation barely distinguishes between non-resident investors. Your country of
          residence does. The same Indian fund can be a sensible holding in Dubai, a reporting
          headache in London and a genuine tax trap in New Jersey — and nothing on the fund
          factsheet tells you which.
        </p>
        <p className="text-[17px] text-ink-soft max-w-[760px] mt-4">
          These three guides start from your tax residence rather than from the product shelf. Each
          one is written against the primary sources that actually govern you — the IRS, HMRC, the
          UAE Federal Tax Authority — and each says plainly where the law is unsettled rather than
          rounding it to a confident answer.
        </p>
        <div className="mt-6">
          <Byline reviewed="August 2026" />
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-[22px] mt-12 grid gap-6 lg:grid-cols-3">
        {CORRIDORS.map((c, i) => (
          <FadeInOnScroll key={c.slug} delay={i * 0.1}>
            <Link
              href={`/nri/${c.slug}`}
              className="plot-card block p-8 h-full group hover:shadow-plot-hover transition-shadow max-sm:p-5"
            >
              <span className="corner corner-tl" /><span className="corner corner-tr" />
              <span className="corner corner-bl" /><span className="corner corner-br" />
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-signal font-semibold">
                <span className="mr-2 text-[13px]" aria-hidden="true">{c.flag}</span>
                Corridor {c.code}
              </div>
              <h2 className="font-sans text-[24px] font-bold mt-2 group-hover:text-bronze transition-colors">
                NRIs in {c.label}
              </h2>
              <p className="font-serif italic text-[16px] text-ink-soft mt-3 leading-snug">{c.hook}</p>
              <ul className="mt-5 space-y-0.5">
                {c.facts.slice(0, 3).map(([label, value]) => (
                  <li
                    key={label}
                    className="relative py-1.5 pl-[22px] text-[14.5px] leading-snug before:content-[''] before:absolute before:left-0.5 before:top-[13px] before:w-2.5 before:h-[1.5px] before:bg-bronze-soft"
                  >
                    <b className="font-sans font-semibold text-ink">{label}</b>
                    <span className="font-serif text-ink-soft"> — {value}</span>
                  </li>
                ))}
              </ul>
              <span className="inline-block mt-6 font-sans text-[13px] font-medium tracking-[0.08em] uppercase text-bronze border-b-[1.5px] border-bronze-soft">
                Read the {c.code} guide →
              </span>
            </Link>
          </FadeInOnScroll>
        ))}
      </section>

      <FadeInOnScroll as="section" className="mx-auto max-w-[1180px] px-[22px] mt-16">
        <div className="dim mb-10"><span>What is the same everywhere</span></div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              h: 'India does not restrict you',
              p: 'Portfolio management regulations carry no residency condition at all, and the AIF regulations expressly permit foreign and non-resident investors. Where a house declines you, that is its own commercial decision — usually driven by your country\'s rules, not India\'s.',
            },
            {
              h: 'The structure decides the tax',
              p: 'A managed account holding shares in your own name and a fund issuing you units are treated very differently in all three corridors — sometimes as the difference between a capital gain and income. It is the first question to ask, not the last.',
            },
            {
              h: 'Indian law changed underneath everyone',
              p: 'India replaced its entire income tax statute on 1 April 2026. Any page quoting the old section numbers is quoting a repealed Act, so we describe Indian rules by what they do and cite numbers only where they are stable.',
            },
          ].map((b) => (
            <div key={b.h}>
              <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze mb-2.5">{b.h}</h2>
              <p className="font-serif text-[16.5px] text-ink-soft">{b.p}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex gap-5 flex-wrap">
          <Link href="/gift-city" className="font-sans text-[13px] font-medium tracking-[0.06em] uppercase text-bronze border-b-[1.5px] border-bronze-soft">
            The GIFT City shelf →
          </Link>
          <Link href="/tax" className="font-sans text-[13px] font-medium tracking-[0.06em] uppercase text-bronze border-b-[1.5px] border-bronze-soft">
            Tax schedule (Resident / NRI) →
          </Link>
          <Link href="/learn" className="font-sans text-[13px] font-medium tracking-[0.06em] uppercase text-bronze border-b-[1.5px] border-bronze-soft">
            All thirteen structures →
          </Link>
        </div>

        <DisclosureLine />
      </FadeInOnScroll>
    </div>
  )
}
