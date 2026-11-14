import type { Metadata } from 'next'
import Link from 'next/link'
import { CORRIDORS } from '@/lib/content/corridors'
import { NRI_SPOKES } from '@/lib/content/hubs'
import { HubSpokes } from '@/components/eeat/HubSpokes'
import { SHEETS } from '@/lib/constants'
import { pageMeta, breadcrumbJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/shared/JsonLd'
import { FadeInOnScroll } from '@/components/shared/FadeInOnScroll'
import { AuthorByline } from '@/components/eeat/AuthorByline'
import { DisclosureLine } from '@/components/shared/DisclosureLine'
import { Disclosure } from '@/components/shared/Disclosure'
import { OpenHashDetails } from '@/components/shared/OpenHashDetails'
import { Sources } from '@/components/eeat/Sources'
import { INDIA_COMMON } from '@/lib/content/corridorsShared'

export const metadata: Metadata = pageMeta({
  title: "NRI Investing in India: Country-by-Country Tax Guides",
  description:
    "How Indian mutual funds and shares are taxed for NRIs in the US, Canada, UK, Singapore, Hong Kong, UAE, Saudi Arabia, Qatar, Oman, Kuwait and Bahrain.",
  path: '/nri',
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
          The same fund, eleven countries,
          <br />
          <em className="font-serif italic font-medium text-bronze">eleven different answers.</em>
        </h1>
        <p className="font-serif text-[19px] text-ink-soft max-w-[62ch] mt-4">
          Indian regulation barely distinguishes between one non-resident investor and another. Your
          country of residence does. The same fund can be a sensible holding in Dubai, a reporting
          headache in London and a real tax trap in New Jersey. Nothing on the factsheet tells you
          which.
        </p>
        <p className="text-[17px] text-ink-soft max-w-[62ch] mt-4">
          These guides start from where you file your taxes. Each covers the rules for shares and
          for mutual funds, the filings you owe, and the mistakes that cost money. Where the law is
          unsettled, or we could not read the source ourselves, we say so.
        </p>
        <AuthorByline className="mt-6" reviewed="November 2026" regulatoryAsAt="November 2026" />
      </section>

      <section className="mx-auto max-w-[1180px] px-[22px] mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CORRIDORS.map((c, i) => (
          <FadeInOnScroll key={c.slug} delay={(i % 3) * 0.1}>
            <Link
              href={`/nri/${c.slug}`}
              className="plot-card block p-8 h-full group hover:shadow-plot-hover transition-shadow max-sm:p-5"
            >
              <span className="corner corner-tl" /><span className="corner corner-tr" />
              <span className="corner corner-bl" /><span className="corner corner-br" />
              <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-signal-ink font-semibold">
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
              p: 'Portfolio management regulations carry no residency condition, and the AIF regulations expressly permit foreign and non-resident investors. If a house declines you, that is its commercial decision, usually driven by your country\'s rules, not India\'s.',
            },
            {
              h: 'The structure decides the tax',
              p: 'A managed account holding shares in your name and a fund issuing you units are treated very differently in most of these countries, sometimes as capital gain versus income. Ask this first.',
            },
            {
              h: 'Indian law changed underneath everyone',
              p: 'India replaced its entire income tax statute on 1 April 2026. Pages quoting the old section numbers quote a repealed Act, so we describe Indian rules by what they do and cite numbers only where they are stable.',
            },
          ].map((b) => (
            <div key={b.h}>
              <h2 className="font-mono text-[12px] tracking-[0.2em] uppercase text-bronze mb-2.5">{b.h}</h2>
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

        <div className="mt-16 max-w-[720px]">
          <div className="dim mb-6"><span>India&apos;s side, the same wherever you live</span></div>
          <OpenHashDetails slugs={INDIA_COMMON.map((item) => item.id)} />
          <div className="grid gap-3">
            {INDIA_COMMON.map((item) => (
              <Disclosure
                key={item.id}
                id={item.id}
                title={
                  <h2 className="font-sans font-semibold text-[17.5px] leading-snug text-ink">
                    {item.qa.q}
                  </h2>
                }
              >
                {item.qa.a.map((para, i) => (
                  <p
                    key={para.slice(0, 40)}
                    className={`text-[16.5px] text-ink-soft leading-[1.62] ${i > 0 ? 'mt-3' : ''}`}
                  >
                    {para.replace(/<\/?b>/g, '')}
                  </p>
                ))}
                {item.qa.sources && <Sources sources={item.qa.sources} compact />}
              </Disclosure>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <HubSpokes links={NRI_SPOKES} heading="Straight answers for NRIs" />
        </div>

        <DisclosureLine />
      </FadeInOnScroll>
    </div>
  )
}
