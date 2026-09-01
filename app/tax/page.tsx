import type { Metadata } from 'next'
import Link from 'next/link'
import { TaxTables } from '@/components/tax/TaxTables'
import { JsonLd } from '@/components/shared/JsonLd'
import { Disclosure } from '@/components/shared/Disclosure'
import { SHEETS } from '@/lib/constants'
import { pageMeta, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Taxation of PMS, AIF, SIF & GIFT City — FY 2026–27',
  description:
    'How every Indian alternative investment structure is taxed in FY 2026–27 — PMS, AIF Cat I/II/III, SIF, REITs, debt MF, GIFT City funds. Resident and NRI schedules, post-Budget 2026.',
  path: '/tax',
})

const TAX_FAQ = [
  {
    q: 'How is PMS taxed in India?',
    a: 'A PMS holds shares directly in your own demat account. So gains are taxed exactly as if you had bought the shares yourself. Every trade the manager makes lands in your ledger that year. Listed equity: 20% under 12 months, 12.5% beyond, with ₹1.25 lakh of gains exempt each year.',
  },
  {
    q: 'How is an AIF taxed?',
    a: 'It depends on the category. Cat I and Cat II are pass-through: income is taxed in your hands, as if you held the underlying yourself. Cat III is usually taxed inside the fund at the maximum marginal rate, so what reaches you is already post-tax. The mechanics vary by scheme.',
  },
  {
    q: 'Do NRIs pay tax differently on these structures?',
    a: 'Often yes. Tax is deducted at source, and a treaty may reduce the rate, so both the effective rate and the filing differ from a resident’s. GIFT City structures can be materially cleaner for non-residents. It is fund-specific and residency-specific, so confirm yours with your CA.',
  },
  {
    q: 'What changed for buybacks and STT in Budget 2026?',
    a: 'Two things. Budget 2026 restored capital-gains treatment on buybacks for shareholders, but added a separate buyback tax that catches promoters. And it raised STT across equity derivatives from 1 April 2026. Your own position turns on your facts, so confirm it with your CA.',
  },
]

export default function TaxPage() {
  return (
    <div className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <div className="mb-10">
        <div className="eyebrow mb-3.5">Sheet {SHEETS.tax.no} — Compliance Schedule</div>
        <h1 className="font-sans font-bold text-[clamp(30px,4.5vw,44px)] tracking-[-0.01em] leading-[1.08] max-w-[800px]">
          How each structure is taxed. FY 2026–27.
        </h1>
        <p className="font-serif text-[19px] text-ink-soft max-w-[700px] mt-3.5">
          The post-tax number is the only one that actually reaches you. Union Budget 2026 left the
          headline capital-gains rates alone but changed two things that matter here: buyback
          taxation and securities transaction tax. Both are covered below.{' '}
          <em className="text-bronze italic">Always confirm with your Chartered Accountant before acting.</em>
        </p>
      </div>

      <TaxTables />

      <div className="bg-white-warm border border-line border-l-4 border-l-teal px-6 py-5 mt-[22px] text-[15px] text-ink-soft">
        <b className="font-sans">Recent changes worth knowing —</b>
        <ul className="mt-2 space-y-1">
          {[
            <><b>Budget 2026 — LTCG:</b> headline rates unchanged at 12.5%.</>,
            <><b>Budget 2026 — buyback (buybacks on/after 1 Apr 2026):</b> capital-gains treatment is restored for shareholders (reversing the Oct 2024 deemed-dividend regime) — <b>but a separate additional buyback tax now applies</b>, and it captures <b>promoters</b> as well as shareholders above the prescribed holding threshold. See the Promoters note below.</>,
            <><b>Budget 2026 — STT (from 1 Apr 2026):</b> transaction tax raised across equity <b>derivatives</b>, not just commodities — futures 0.02% → 0.05%, options premium 0.10% → 0.15% (and exercise to 0.15%). This lands hardest on high-turnover hedged strategies — see the note below.</>,
            <><b>Since July 2024:</b> uniform 12.5% LTCG across asset classes (no indexation); listed assets turn long-term at 12 months, unlisted at 24 months; equity STCG at 20%.</>,
            <><b>Debt mutual funds</b> purchased after 1 Apr 2023 are taxed at slab rate irrespective of holding period.</>,
            <><b>FDs, corporate bonds/deposits and Debt PMS</b> in this framework are treated at slab rate throughout — <b>no long-term capital-gains concession</b> is assumed on the debt sleeve.</>,
            <>Surcharge and 4% cess apply over and above the rates shown. Surcharge on LTCG/equity STCG is capped at 15%.</>,
          ].map((item, i) => (
            <li key={i} className="relative pl-[18px] before:content-['—'] before:absolute before:left-0 before:text-teal">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* P1-7 — dedicated Promoters note */}
      <div className="bg-white-warm border border-line border-l-4 border-l-bronze px-6 py-5 mt-[22px] text-[15px] text-ink-soft max-w-[860px]">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze mb-2">
          Promoters — the buyback carve-out
        </div>
        <p>
          Budget 2026 restored capital-gains treatment on buybacks for shareholders. It did{' '}
          <b>not</b> make them tax-neutral for promoters. A separate <b>additional buyback tax</b>{' '}
          applies to persons classified as <b>promoters</b>, and to shareholders above the prescribed
          holding threshold. The effective rate lands well above the headline 12.5%: reported at
          around <b>22% for corporate promoters</b> and <b>30% for non-corporate promoters</b>, on
          buybacks from <b>1 Apr 2026</b>.
        </p>
        <p className="mt-2 font-serif italic text-[13.5px] text-slate">
          Three things turn on your own facts: the applicable rate, whether you meet the promoter
          definition, and the holding threshold. Confirm all three with your Chartered Accountant.
          If a family business buyback is on the table, have that conversation{' '}
          <em>before</em> the resolution, not after.
        </p>
      </div>

      {/* P1-8 — STT impact on hedged strategies */}
      <div id="stt-hedged" className="scroll-mt-28 bg-ink text-white-warm px-6 py-6 mt-[22px] max-w-[860px]">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal mb-2">
          What the 2026 STT hike does to hedged strategies
        </div>
        <p className="text-[15.5px] text-[#c7d6ce]">
          Securities transaction tax is charged on <b className="text-white-warm">every trade</b>. So
          its cost scales with turnover. A directional, low-churn portfolio barely feels a rate change.
          But <b className="text-white-warm">hedged strategies trade constantly</b>. A market-neutral
          book runs matched long and short legs and rebalances them. A long-short SIF rolls index
          futures and options to hold its hedge. From <b className="text-white-warm">1 Apr 2026</b>,
          futures STT rose 0.02% to 0.05%, and options-premium STT 0.10% to 0.15%. The transaction-cost
          base of exactly these strategies stepped up. That is a permanent drag, taken straight out of
          the spread they are trying to harvest.
        </p>
        <p className="text-[14.5px] text-[#9db5aa] mt-3">
          The takeaway is not &ldquo;avoid them&rdquo;. It is that the{' '}
          <b className="text-white-warm">net</b> spread, after STT and after fees, is what matters,
          and it just got thinner. Ask any Cat III market-neutral or long-short manager how the April
          2026 change moved their gross-to-net.
        </p>
        <div className="flex gap-4 flex-wrap mt-4 font-sans text-[13px] font-medium tracking-[0.06em] uppercase">
          <Link
            href="/learn/market-neutral-funds"
            className="text-bronze-soft border-b-[1.5px] border-bronze-soft/50 hover:border-bronze-soft"
          >
            Market-Neutral Funds →
          </Link>
          <Link
            href="/learn/long-short-sif"
            className="text-bronze-soft border-b-[1.5px] border-bronze-soft/50 hover:border-bronze-soft"
          >
            Long-Short SIFs →
          </Link>
        </div>
      </div>

      <div className="bg-white-warm border border-line border-l-4 border-l-alert px-6 py-5 mt-[22px] text-[15px] text-ink-soft">
        <b className="font-sans">This schedule is a simplified summary.</b> Actual liability depends
        on residency, treaty position, income mix, and the specific structure of each fund. The tax
        impact of any switch, including exit loads and crystallised gains on the way out — is
        disclosed and discussed before any transaction. Please verify with your Chartered
        Accountant.
      </div>

      {/* FAQ (P3-27 — matches the FAQPage schema below) */}
      <div className="mt-16">
        <div className="dim mb-8"><span>Frequently asked</span></div>
        <div className="grid gap-3 max-w-[820px]">
          {TAX_FAQ.map((f, i) => (
            <Disclosure
              key={f.q}
              defaultOpen={i === 0}
              title={
                <h2 className="font-sans font-semibold text-[17.5px] leading-snug text-ink">{f.q}</h2>
              }
            >
              <p className="font-serif text-[16.5px] text-ink-soft leading-[1.6]">{f.a}</p>
            </Disclosure>
          ))}
        </div>
      </div>

      <JsonLd
        data={[
          faqJsonLd(TAX_FAQ),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Taxation', path: '/tax' },
          ]),
        ]}
      />
    </div>
  )
}
