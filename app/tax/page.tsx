import type { Metadata } from 'next'
import { TaxTables } from '@/components/tax/TaxTables'
import { JsonLd } from '@/components/shared/JsonLd'
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
    a: 'A PMS holds shares directly in your own demat account, so gains are taxed exactly like buying shares yourself — the manager’s churn creates capital gains in your ledger each year. Listed equity: STCG 20% under 12 months, LTCG 12.5% beyond 12 months (₹1.25 L exempt per year).',
  },
  {
    q: 'How is an AIF taxed?',
    a: 'It depends on the category. Cat I and Cat II AIFs are pass-through — income is taxed in your hands as if you held the underlying. Cat III AIFs are typically taxed at the fund level at the maximum marginal rate (scheme-specific), and you receive a post-tax NAV.',
  },
  {
    q: 'Do NRIs pay tax differently on these structures?',
    a: 'Often yes — TDS is deducted at source and treaty relief may apply, so the effective rate and filing differ from a resident’s. GIFT City (IFSC) structures can be materially cleaner for non-residents. Treatment is fund- and residency-specific; confirm with your CA.',
  },
  {
    q: 'What changed for buybacks and STT in Budget 2026?',
    a: 'Budget 2026 restored capital-gains treatment on buybacks for shareholders but added a separate additional buyback tax capturing promoters; and it raised STT across equity derivatives (futures and options), effective 1 Apr 2026. Confirm the exact figures against the final Finance Bill and your CA.',
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
          Post-tax return is the only return that reaches you. Union Budget 2026 left the headline
          capital-gains rates unchanged, but changed two things that matter to this audience —
          buyback taxation and securities transaction tax (both below).{' '}
          <em className="text-bronze italic">Always confirm with your Chartered Accountant before acting.</em>
        </p>
      </div>

      <TaxTables />

      <div className="bg-white-warm border border-line border-l-4 border-l-teal px-6 py-5 mt-[22px] text-[15px] text-ink-soft">
        <b className="font-sans">Recent changes worth knowing —</b>
        <ul className="mt-2 space-y-1">
          {[
            <><b>Budget 2026 — LTCG:</b> headline rates unchanged at 12.5%.</>,
            <><b>Budget 2026 — buyback (buybacks on/after 1 Apr 2026):</b> capital-gains treatment is restored for shareholders (reversing the Oct 2024 deemed-dividend regime) — <b>but a separate additional buyback tax now applies</b>, and it captures <b>promoters</b> as well as shareholders above the prescribed holding threshold. See the Promoters note below. <span className="text-alert">[Figures/threshold per Budget 2026 — confirm against the final Finance Bill 2026 and your CA before relying on them.]</span></>,
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
          Budget 2026 restored capital-gains treatment on buybacks for shareholders, but it did{' '}
          <b>not</b> make buybacks tax-neutral for promoters. A separate <b>additional buyback tax</b>{' '}
          applies to persons classified as <b>promoters</b> — and to shareholders above the prescribed
          holding threshold — producing an effective rate materially higher than the headline 12.5%,
          reported around <b>~22% for corporate promoters</b> and <b>~30% for non-corporate
          promoters</b>, for buybacks on or after <b>1 Apr 2026</b>.
        </p>
        <p className="mt-2 font-serif italic text-[13.5px] text-slate">
          These figures follow Budget 2026 as summarised for this audience; the exact rate, the
          promoter definition and the holding threshold must be confirmed against the final Finance
          Bill 2026 text and your Chartered Accountant before you act. If a family business buyback is
          on the table, this is a conversation to have <em>before</em> the resolution, not after.
        </p>
      </div>

      {/* P1-8 — STT impact on hedged strategies */}
      <div id="stt-hedged" className="scroll-mt-28 bg-ink text-white-warm px-6 py-6 mt-[22px] max-w-[860px]">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal mb-2">
          What the 2026 STT hike does to hedged strategies
        </div>
        <p className="text-[15.5px] text-[#c7d6ce]">
          Securities transaction tax is charged on <b className="text-white-warm">every trade</b>, so
          its cost scales with turnover. Directional, low-churn portfolios barely feel a rate change.
          But <b className="text-white-warm">hedged strategies trade constantly</b> — a market-neutral
          book runs matched long and short legs and re-balances them; a long-short SIF rolls index
          futures and options to manage its hedge. From <b className="text-white-warm">1 Apr 2026</b>,
          futures STT rose 0.02% → 0.05% and options-premium STT 0.10% → 0.15%, so the transaction-cost
          base of exactly these strategies stepped up — a permanent drag that comes straight out of the
          spread they are trying to harvest.
        </p>
        <p className="text-[14.5px] text-[#9db5aa] mt-3">
          The takeaway is not &ldquo;avoid them&rdquo; — it is that the <b className="text-white-warm">net</b>{' '}
          (after-STT, after-fee) spread is what matters, and it just got thinner. Ask any Cat III
          market-neutral or long-short manager how the April 2026 STT change moved their gross-to-net.
        </p>
        <div className="flex gap-4 flex-wrap mt-4 font-sans text-[13px] font-medium tracking-[0.06em] uppercase">
          <a href="/learn/market-neutral-funds" className="text-signal border-b-[1.5px] border-signal/50 hover:border-signal">
            Market-Neutral Funds →
          </a>
          <a href="/learn/long-short-sif" className="text-signal border-b-[1.5px] border-signal/50 hover:border-signal">
            Long-Short SIFs →
          </a>
        </div>
      </div>

      <div className="bg-white-warm border border-line border-l-4 border-l-alert px-6 py-5 mt-[22px] text-[15px] text-ink-soft">
        <b className="font-sans">This schedule is a simplified summary.</b> Actual liability depends
        on residency, treaty position, income mix, and the specific structure of each fund. The tax
        impact of any switch — including exit loads and crystallised gains on the way out — is
        disclosed and discussed before any transaction. Please verify with your Chartered
        Accountant.
      </div>

      {/* FAQ (P3-27 — matches the FAQPage schema below) */}
      <div className="mt-16">
        <div className="dim mb-8"><span>Frequently asked</span></div>
        <div className="space-y-5 max-w-[820px]">
          {TAX_FAQ.map((f) => (
            <div key={f.q}>
              <h2 className="font-sans font-bold text-[18px]">{f.q}</h2>
              <p className="font-serif text-[16px] text-ink-soft mt-1.5">{f.a}</p>
            </div>
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
