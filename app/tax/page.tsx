import type { Metadata } from 'next'
import { TaxTables } from '@/components/tax/TaxTables'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Taxation of PMS, AIF, SIF & GIFT City — FY 2026–27',
  description:
    'How every Indian alternative investment structure is taxed in FY 2026–27 — PMS, AIF Cat I/II/III, SIF, REITs, debt MF, GIFT City funds. Resident and NRI schedules, post-Budget 2026.',
  alternates: { canonical: `${SITE.url}/tax` },
}

export default function TaxPage() {
  return (
    <div className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <div className="mb-10">
        <div className="eyebrow mb-3.5">Sheet 05 — Compliance Schedule</div>
        <h1 className="font-sans font-bold text-[clamp(30px,4.5vw,44px)] tracking-[-0.01em] leading-[1.08] max-w-[800px]">
          How each structure is taxed. FY 2026–27.
        </h1>
        <p className="font-serif text-[19px] text-ink-soft max-w-[700px] mt-3.5">
          Post-tax return is the only return that reaches you. Union Budget 2026 left the
          capital-gains framework unchanged — the schedule below reflects the law as it stands.{' '}
          <em className="text-bronze italic">Always confirm with your Chartered Accountant before acting.</em>
        </p>
      </div>

      <TaxTables />

      <div className="bg-white-warm border border-line border-l-4 border-l-teal px-6 py-5 mt-[22px] text-[15px] text-ink-soft">
        <b className="font-sans">Recent changes worth knowing —</b>
        <ul className="mt-2 space-y-1">
          {[
            <><b>Budget 2026 (Feb 2026):</b> LTCG rates unchanged at 12.5%. Buyback proceeds are now taxed as capital gains for all shareholder categories. STT on commodity futures raised to 0.05%.</>,
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

      <div className="bg-white-warm border border-line border-l-4 border-l-alert px-6 py-5 mt-[22px] text-[15px] text-ink-soft">
        <b className="font-sans">This schedule is a simplified summary.</b> Actual liability depends
        on residency, treaty position, income mix, and the specific structure of each fund. The tax
        impact of any switch — including exit loads and crystallised gains on the way out — is
        disclosed and discussed before any transaction. Please verify with your Chartered
        Accountant.
      </div>
    </div>
  )
}
