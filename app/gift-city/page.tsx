import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { fundsByCategoryQuery } from '@/lib/sanity/queries'
import { FundCard } from '@/components/fund/FundCard'
import type { FundCardData } from '@/components/fund/fundDisplay'
import { FlowToggle } from '@/components/gift-city/FlowToggle'
import { GIFT_CITY } from '@/lib/giftCity'

export const metadata = {
  title: 'GIFT City IFSC — onshore, foreign-currency investing',
  description:
    "India's first International Financial Services Centre. USD-denominated AIFs, MFs, PMS, FDs and exchange access for NRIs investing into India and residents going global. Tax structure, eligibility, and the products available — explained end-to-end.",
}

export default async function GiftCityPage() {
  const funds = await fetchGiftCityFunds()

  return (
    <div className="container-grid pt-12 pb-20 md:pt-20">
      <Hero />
      <GapsSection />
      <section className="mt-20 md:mt-28">
        <FlowToggle />
      </section>
      <NriCostSection />
      <EligibilitySection />
      <OptionsSection />
      <TaxBenefitsSection />
      <ScenariosSection />
      <LrsSection />
      {funds.length > 0 ? <FeaturedFunds funds={funds} /> : null}
      <BeyondCta />
      <p className="mt-12 max-w-prose text-xs text-text-muted">
        IndiaFundSearch is an educational platform. NRI tax and FEMA rules are personal to your
        status. Consult a SEBI-registered advisor and a cross-border tax professional before acting.
      </p>
    </div>
  )
}

async function fetchGiftCityFunds(): Promise<FundCardData[]> {
  try {
    return await client.fetch<FundCardData[]>(
      fundsByCategoryQuery,
      { category: 'GIFT City' },
      { next: { tags: ['fund'], revalidate: 300 } },
    )
  } catch (err) {
    console.error('gift-city: Sanity fetch failed', err)
    return []
  }
}

// ----------------------------------------------------------------------

function Hero() {
  const { hero, chips, marketStats } = GIFT_CITY

  return (
    <section className="max-w-5xl">
      <p className="text-sm font-medium uppercase tracking-widest text-gold">{hero.eyebrow}</p>
      <h1 className="mt-3 text-balance">
        {hero.title}{' '}
        <span className="italic text-gold">{hero.titleAccent}</span>
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-muted md:text-lg">
        {hero.sub}
      </p>

      <div className="mt-7 flex flex-wrap gap-2">
        {chips.map((c) => (
          <span
            key={c.k}
            className="inline-flex items-baseline gap-1.5 rounded-md border border-card-border bg-card px-3 py-1.5 text-xs text-text-muted"
          >
            <span className="font-semibold text-text-primary">{c.k}</span>
            <span aria-hidden className="text-card-border">·</span>
            <span>{c.v}</span>
          </span>
        ))}
      </div>

      <dl className="mt-10 grid divide-x divide-card-border overflow-hidden rounded-card border border-card-border bg-card md:grid-cols-4">
        {marketStats.map((s) => (
          <div key={s.l} className="p-6 md:p-7">
            <dt className="sr-only">{s.l}</dt>
            <dd className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
              {s.v}
            </dd>
            <p className="mt-2 text-xs leading-relaxed text-text-muted">{s.l}</p>
          </div>
        ))}
      </dl>
    </section>
  )
}

function GapsSection() {
  return (
    <section className="mt-20 md:mt-28">
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <div className="md:sticky md:top-28 md:self-start">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">Why it exists</p>
          <h2 className="mt-3">Five gaps in India&rsquo;s financial architecture. One IFSC.</h2>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-text-muted">
            For decades, Indian HNIs routed global investments through Singapore, Mauritius and
            Dubai — for tax efficiency and regulatory flexibility. The result was a steady outflow
            of AUM. GIFT City IFSC is India&rsquo;s onshore answer.
          </p>
        </div>
        <ul className="space-y-3">
          {GIFT_CITY.gaps.map((g, i) => (
            <li
              key={g.gap}
              className="grid grid-cols-[24px_1fr] gap-5 rounded-card border border-card-border bg-card p-6 shadow-card"
            >
              <span className="mt-0.5 text-xs font-semibold tabular-nums tracking-widest text-gold">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="text-sm leading-relaxed text-text-muted line-through decoration-text-muted/40">
                  {g.gap}
                </p>
                <p className="mt-2.5 text-base font-medium leading-relaxed text-text-primary">
                  {g.solves}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function NriCostSection() {
  return (
    <section className="mt-20 rounded-card bg-text-primary p-8 text-card md:mt-28 md:p-14">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">
        The cost of NOT using GIFT City
      </p>
      <h2 className="mt-4 max-w-3xl text-card text-balance">
        For NRIs, the difference isn&rsquo;t performance.{' '}
        <span className="text-gold">It&rsquo;s structure.</span>
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-card/70 md:text-base">
        A UAE-based NRI earning USD 45,000 in gains keeps USD 45,000 via GIFT IFSC. Through
        mainland India MF, after TDS, ITR compliance and repatriation costs, the same NRI
        might net USD 35,000-38,000.
      </p>

      <div className="mt-9 overflow-hidden rounded-card border border-card/10 bg-card/[0.04]">
        <div className="grid grid-cols-1 gap-2 px-5 py-4 text-[11px] font-semibold uppercase tracking-widest text-card/60 md:grid-cols-[1.4fr_1.3fr_1.3fr] md:gap-4 md:px-6">
          <span>Cost item</span>
          <span className="hidden md:inline">Mainland India MF</span>
          <span className="hidden text-gold md:inline">GIFT City IFSC</span>
        </div>
        <ul className="divide-y divide-card/10">
          {GIFT_CITY.nriCost.map((r) => (
            <li
              key={r.row}
              className="grid grid-cols-1 gap-2 px-5 py-4 text-sm md:grid-cols-[1.4fr_1.3fr_1.3fr] md:gap-4 md:px-6"
            >
              <span className="font-medium text-card">{r.row}</span>
              <span className="leading-relaxed text-error">
                <span className="md:hidden text-[10px] font-semibold uppercase tracking-widest text-card/50">
                  Mainland · </span>{r.mainland}
              </span>
              <span className="font-medium leading-relaxed text-success">
                <span className="md:hidden text-[10px] font-semibold uppercase tracking-widest text-card/50">
                  GIFT · </span>{r.gift}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function EligibilitySection() {
  return (
    <section className="mt-20 md:mt-28">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">Who can invest</p>
      <h2 className="mt-3">Four investor categories. Different rules for each.</h2>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {GIFT_CITY.eligibility.map((e) => (
          <li
            key={e.tier}
            className="rounded-card border border-card-border bg-card p-7 shadow-card md:p-8"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-gold">
                {e.tier}
              </span>
              <span aria-hidden className="h-px flex-1 bg-card-border" />
            </div>
            <p className="text-xl font-semibold leading-tight tracking-tight text-text-primary md:text-2xl">
              {e.who}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">{e.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

function OptionsSection() {
  return (
    <section className="mt-20 md:mt-28">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">
        What you can invest in
      </p>
      <h2 className="mt-3">The full product menu at GIFT IFSC.</h2>
      <ul className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {GIFT_CITY.options.map((o) => {
          const flowTone =
            o.flow === 'Outbound'
              ? 'border-[#0066cc]/30 text-[#0066cc]'
              : o.flow === 'Both'
                ? 'border-gold/40 text-gold'
                : 'border-success/40 text-success'
          return (
            <li
              key={o.name}
              className="flex flex-col gap-3 rounded-card border border-card-border bg-card p-5 shadow-card"
            >
              <span
                className={`inline-flex w-fit items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${flowTone}`}
              >
                {o.flow}
              </span>
              <p className="text-base font-semibold leading-snug text-text-primary">{o.name}</p>
              <p className="text-sm leading-relaxed text-text-muted">{o.detail}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function TaxBenefitsSection() {
  return (
    <section className="mt-20 md:mt-28">
      <div className="grid gap-12 md:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">
            Tax benefits
          </p>
          <h2 className="mt-3">
            One of the most comprehensive sets of exemptions in any Indian structure.
          </h2>
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-text-muted">
            Tax treatment differs by investor category and product. Here&rsquo;s the master table.
            Specific outcomes depend on your residency, holding period, and scheme structure —
            always engage a qualified tax advisor.
          </p>
        </div>
        <ul className="overflow-hidden rounded-card border border-card-border bg-card shadow-card">
          {GIFT_CITY.taxBenefits.map((r, i, arr) => (
            <li
              key={r.row}
              className={`grid grid-cols-1 gap-2 px-5 py-4 text-sm md:grid-cols-[1.3fr_1fr] md:gap-5 md:px-6 ${
                i < arr.length - 1 ? 'border-b border-card-border' : ''
              }`}
            >
              <span className="leading-relaxed text-text-primary">{r.row}</span>
              <span className="font-medium leading-relaxed text-success">{r.val}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ScenariosSection() {
  return (
    <section className="mt-16 md:mt-20">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">Tax in practice</p>
      <h2 className="mt-3">Three scenarios.</h2>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {GIFT_CITY.scenarios.map((s) => (
          <li
            key={s.tag}
            className="flex flex-col gap-4 rounded-card border border-card-border bg-card p-7 shadow-card md:p-8"
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">
              Scenario · {s.tag}
            </p>
            <p className="text-lg font-semibold leading-snug tracking-tight text-text-primary">
              {s.title}
            </p>
            <p className="border-b border-card-border pb-4 text-sm leading-relaxed text-text-muted">
              {s.setup}
            </p>
            <ul className="flex flex-col gap-3">
              {s.rows.map(([k, v]) => (
                <li key={k}>
                  <p className="text-[11px] font-medium uppercase tracking-widest text-text-muted">
                    {k}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-text-primary">{v}</p>
                </li>
              ))}
            </ul>
            <p className="mt-auto rounded-md bg-gold/10 px-4 py-3 text-sm font-medium leading-relaxed text-text-primary">
              {s.outcome}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

function LrsSection() {
  return (
    <section className="mt-20 md:mt-28">
      <div className="grid gap-12 md:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">For residents</p>
          <h2 className="mt-3">The LRS playbook.</h2>
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-text-muted">
            Resident Indians use the RBI Liberalised Remittance Scheme (LRS) to fund outbound
            GIFT City investments. Every advisor — and every investor — should know these by heart.
          </p>
        </div>
        <ul className="overflow-hidden rounded-card border border-card-border bg-card shadow-card">
          {GIFT_CITY.lrs.map((r, i, arr) => (
            <li
              key={r.k}
              className={`grid grid-cols-1 gap-2 px-5 py-4 text-sm md:grid-cols-[1fr_1.5fr] md:gap-5 md:px-6 ${
                i < arr.length - 1 ? 'border-b border-card-border' : ''
              }`}
            >
              <span className="text-[11px] font-semibold uppercase tracking-widest text-text-muted">
                {r.k}
              </span>
              <span className="leading-relaxed text-text-primary">{r.v}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function FeaturedFunds({ funds }: { funds: FundCardData[] }) {
  const featured = funds.slice(0, 4)
  return (
    <section className="mt-20 md:mt-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">
            GIFT City funds
          </p>
          <h2 className="mt-3">Curated funds in our universe.</h2>
        </div>
        <Link
          href="/explore?cat=GIFT+City"
          className="text-sm font-medium text-text-primary hover:text-gold"
        >
          See all GIFT City funds →
        </Link>
      </div>
      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {featured.map((f) => (
          <FundCard key={f._id} fund={f} variant="detailed" />
        ))}
      </div>
    </section>
  )
}

function BeyondCta() {
  return (
    <section className="mt-20 rounded-card border border-card-border border-l-4 border-l-gold bg-card p-8 shadow-card md:mt-24 md:p-12">
      <span className="inline-flex items-center rounded-pill bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold">
        Beyond Wealth
      </span>
      <h2 className="mt-4">Does GIFT City fit your situation?</h2>
      <p className="mt-3 max-w-prose text-base text-text-muted">
        The structure is simple. The choice between inbound, outbound, AIF, MF, or PMS — and
        which manager — is where it gets specific. A 15-minute conversation usually clarifies it.
      </p>
      <Link
        href="/about"
        className="mt-6 inline-flex items-center gap-2 rounded-button bg-text-primary px-5 py-3 text-sm font-medium text-card shadow-card transition-colors hover:bg-gold"
      >
        About Beyond Wealth →
      </Link>
    </section>
  )
}
