import type { Metadata } from 'next'
import Link from 'next/link'
import { DISCLOSURE, SITE } from '@/lib/constants'
import { PRIMARY_AUTHOR } from '@/lib/content/authors'
import { pageMeta, personJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/shared/JsonLd'

export const metadata: Metadata = pageMeta({
  title: 'About Beyond: The Desk Behind the Map',
  description:
    'Who is behind IndiaFundSearch: Yash Jhaveri, the Beyond desk in Vadodara, a lineage that starts in 1992, and why the site is built to say "not yet".',
  path: '/about',
  ogTitle: 'About IndiaFundSearch',
})

/**
 * Deliberately short. The bio detail lives on /about/yash-jhaveri; this page
 * is the answer to one question — who is this, and why should I read them —
 * in the time it takes to decide whether to keep reading.
 */
const FACTS: [string, string][] = [
  ['Est.', '1992'],
  ['Base', 'Vadodara, Gujarat'],
  ['Structures', '13 · SEBI & IFSCA regulated'],
  ['Model', 'Distribution · not advisory'],
]

const IDEAS: { h: string; p: string }[] = [
  {
    h: 'Most portfolios hold nine things and one return driver.',
    p: 'Everything in them is paid by the same source: Indian corporate earnings. There are at least six ways a portfolio can get paid. When one stalls, the others are under no obligation to stall with it.',
  },
  {
    h: 'Most people can name two. There are thirteen.',
    p: 'Thirteen SEBI- and IFSCA-regulated ways to invest beyond a mutual fund. Twelve years across the table from families with serious money, and the same thing happens: they own two. Nobody showed them the other eleven. So we built the map.',
  },
  {
    h: 'The answer is sometimes “not yet”.',
    p: 'A site that never says so is a brochure. The Fit Finder is built to tell you when nothing here fits, and the desk says it across the table too.',
  },
]

export default function AboutPage() {
  const a = PRIMARY_AUTHOR
  const initials = a.name.split(' ').map((w) => w[0]).join('')

  return (
    <article className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <JsonLd
        data={[
          personJsonLd(),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />

      <header className="max-w-[860px]">
        <div className="eyebrow mb-3.5">About · A Beyond Initiative</div>
        <h1 className="font-sans font-bold text-[clamp(30px,4.5vw,44px)] tracking-[-0.01em] leading-[1.08]">
          Architecture, not salesmanship.
        </h1>
        <p className="font-serif italic text-[20px] text-ink-soft border-l-[3px] border-signal pl-4 mt-5 max-w-[720px]">
          Helping local and global Indians move beyond retail products. Built on Jhaveri
          Securities Ltd, est. 1992.
        </p>
      </header>

      {/* At a glance */}
      <div className="flex flex-wrap border border-line bg-white-warm mt-9 max-w-[860px]">
        {FACTS.map(([label, value]) => (
          <div
            key={label}
            className="flex-1 min-w-[150px] px-4 py-3.5 border-r border-line last:border-r-0 max-sm:min-w-[45%] max-sm:border-b"
          >
            <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-slate block mb-[3px]">{label}</span>
            <b className="font-sans text-[14.5px] font-semibold">{value}</b>
          </div>
        ))}
      </div>

      {/* The person */}
      <div className="grid gap-8 md:grid-cols-[auto_1fr] items-start mt-12 max-w-[860px]">
        <span
          aria-hidden
          className="w-24 h-24 rounded-full border border-line bg-white-warm grid place-items-center font-mono text-[22px] tracking-[0.06em] text-bronze"
        >
          {a.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={a.image} alt="" className="w-full h-full rounded-full object-cover" />
          ) : (
            initials
          )}
        </span>
        <div>
          <p className="font-sans font-bold text-[22px] leading-tight">
            <Link href={`/about/${a.slug}`} className="hover:text-bronze transition-colors">
              {a.name}
            </Link>
          </p>
          <p className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-slate mt-1.5">
            {a.role} · The University of Manchester
          </p>
          <p className="text-[16.5px] text-ink-soft mt-3 max-w-[640px]">
            Ten years at Jhaveri Securities distributing across the full spectrum. Since 2023,
            Beyond: PMS, AIF, SIF and GIFT City for resident families, promoters and NRIs in the
            US, the UK and the Gulf. He writes every page on this site himself.
          </p>
          <Link
            href={`/about/${a.slug}`}
            className="inline-block mt-3 font-sans text-[12.5px] font-medium tracking-[0.06em] uppercase text-bronze border-b-[1.5px] border-bronze-soft"
          >
            Full bio and what he has written →
          </Link>
        </div>
      </div>

      {/* Three ideas */}
      <div className="dim my-12 max-w-[860px]"><span>Three ideas the site is built on</span></div>
      <div className="grid gap-4 md:grid-cols-3 max-w-[1180px]">
        {IDEAS.map((x) => (
          <div key={x.h} className="plot-card px-6 py-6">
            <h2 className="font-sans font-bold text-[18px] leading-snug">{x.h}</h2>
            <p className="text-[15px] text-ink-soft mt-3">{x.p}</p>
          </div>
        ))}
      </div>
      <p className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-bronze mt-6">
        Same risk, more returns. Less risk, same returns. — Not a promise. Arithmetic.
      </p>

      {/* How we are paid */}
      <div className="mt-12 bg-white-warm border border-line border-l-4 border-l-teal px-6 py-5 max-w-[860px]">
        <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-teal mb-2">How we are paid</h2>
        <p className="text-[15.5px] text-ink-soft">{DISCLOSURE.commission}</p>
      </div>

      {/* Entity */}
      <p className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-slate leading-relaxed mt-8 max-w-[860px]">
        {SITE.legalEntity} · CIN {SITE.cin}
        {a.arn && <> · AMFI ARN {a.arn}</>}
        <br />
        {SITE.registeredAddress}
      </p>

      {/* One CTA */}
      <div className="mt-12 plot-card px-8 py-8 flex items-center justify-between gap-6 flex-wrap max-w-[860px] max-sm:px-5">
        <div>
          <p className="font-sans font-bold text-[20px]">Start with what fits, not with a product.</p>
          <p className="font-serif italic text-[15.5px] text-slate mt-1">
            Seven questions. About 90 seconds. Sometimes the answer is “not yet”.
          </p>
        </div>
        <Link
          href="/fit-finder"
          className="font-sans text-[14px] font-medium tracking-[0.08em] uppercase px-6 py-3 rounded-[3px] bg-ink text-white-warm border-[1.5px] border-ink hover:bg-bronze hover:border-bronze transition-colors"
        >
          Run the Fit Finder →
        </Link>
      </div>

      <p className="font-serif italic text-[13.5px] text-slate mt-12 border-t border-line pt-5 max-w-[860px]">
        {DISCLOSURE.education} · {SITE.name} · {SITE.initiative}
      </p>
    </article>
  )
}
