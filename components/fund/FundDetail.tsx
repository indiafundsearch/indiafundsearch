import Link from 'next/link'
import { CalculatorIcon, ClipboardCheck } from 'lucide-react'
import { CategoryBadge } from './CategoryBadge'
import { StrategyDescription } from './StrategyDescription'
import { feeHeadlineFor, formatPercent, type FundDetailData } from './fundDisplay'
import { formatINR, formatIndianNumber } from '@/lib/utils/formatCurrency'
import { cn } from '@/lib/utils'

type Props = { fund: FundDetailData }

export function FundDetail({ fund }: Props) {
  return (
    <article>
      <Header fund={fund} />
      <Strategy fund={fund} />
      <Returns fund={fund} />
      <Fees fund={fund} />
      <Manager fund={fund} />
      <Scorecard fund={fund} />
      <Disclaimer />
    </article>
  )
}

function Header({ fund }: Props) {
  return (
    <header className="border-b border-card-border pb-8">
      <Link
        href="/explore"
        className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-text-muted hover:text-text-primary"
      >
        ← All funds
      </Link>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <CategoryBadge
          category={fund.category}
          simpleCategoryName={fund.simpleCategoryName}
          size="md"
        />
        {fund.status && fund.status !== 'Active' ? (
          <span className="inline-flex items-center rounded-pill bg-error/10 px-3 py-1.5 text-xs font-medium text-error">
            {fund.status}
          </span>
        ) : null}
      </div>
      <h1 className="mt-3 max-w-3xl">{fund.name}</h1>
      {fund.provider ? (
        <p className="mt-2 text-lg text-text-muted">{fund.provider}</p>
      ) : null}
      <MetaStrip fund={fund} />
    </header>
  )
}

function MetaStrip({ fund }: Props) {
  const items = [
    fund.sebiRegistration ? { label: 'SEBI registration', value: fund.sebiRegistration } : null,
    fund.benchmark ? { label: 'Benchmark', value: fund.benchmark } : null,
    fund.inceptionDate
      ? {
          label: 'Inception',
          value: new Date(fund.inceptionDate).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
          }),
        }
      : null,
    fund.minInvestment
      ? { label: 'Min. investment', value: formatINR(fund.minInvestment, { compact: true }) }
      : null,
    fund.aum ? { label: 'AUM', value: `₹${formatIndianNumber(fund.aum)} Cr` } : null,
  ].filter((x): x is { label: string; value: string } => x !== null)

  if (items.length === 0) return null

  return (
    <dl className="mt-6 grid grid-cols-2 gap-4 text-sm md:grid-cols-5">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-xs uppercase tracking-wide text-text-muted">{item.label}</dt>
          <dd className="mt-1 font-medium text-text-primary">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function Strategy({ fund }: Props) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl">Strategy</h2>
      <div className="mt-4">
        <StrategyDescription simple={fund.simpleDescription} pro={fund.proDescription} />
      </div>
      <p className="mt-3 text-xs text-text-muted">
        Toggle Simple/Pro in the header to switch between plain-English and technical descriptions.
      </p>
    </section>
  )
}

function Returns({ fund }: Props) {
  const periods: { label: string; value?: number }[] = [
    { label: '1 year', value: fund.returns?.oneYear },
    { label: '3 year', value: fund.returns?.threeYear },
    { label: '5 year', value: fund.returns?.fiveYear },
    { label: 'Since inception', value: fund.returns?.sinceInception },
  ]
  return (
    <section className="mt-12">
      <h2 className="text-2xl">Returns (CAGR)</h2>
      <dl className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        {periods.map((p) => (
          <div key={p.label} className="rounded-card border border-card-border bg-card p-5 shadow-card">
            <dt className="text-xs uppercase tracking-wide text-text-muted">{p.label}</dt>
            <dd className="mt-2 text-2xl font-semibold tabular-nums text-text-primary">
              {formatPercent(p.value)}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs text-text-muted">
        Past performance does not guarantee future results. Data sourced from SEBI public disclosures and provider factsheets.
      </p>
    </section>
  )
}

function Fees({ fund }: Props) {
  const lines = [
    { label: 'Management fee', value: fund.fees?.managementFee, suffix: '%' },
    { label: 'Performance fee', value: fund.fees?.performanceFee, suffix: '%' },
    { label: 'Hurdle rate', value: fund.fees?.hurdleRate, suffix: '%' },
    { label: 'Exit load', value: fund.fees?.exitLoad, suffix: '%' },
  ]
  const headline = feeHeadlineFor(fund.fees)
  const xrayHref = buildFeeXRayHref(fund)
  return (
    <section className="mt-12 rounded-card border border-card-border bg-card p-6 shadow-card md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl">Fee structure</h2>
          <p className="mt-1 text-sm text-text-muted">Headline: <span className="font-medium text-text-primary">{headline}</span></p>
        </div>
        <Link
          href={xrayHref}
          className="inline-flex items-center gap-2 rounded-button bg-text-primary px-4 py-2 text-sm font-medium text-white shadow-card hover:opacity-90 hover:shadow-card-hover"
        >
          <CalculatorIcon size={16} aria-hidden />
          Calculate your real cost →
        </Link>
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {lines.map((line) => (
          <div key={line.label}>
            <dt className="text-xs uppercase tracking-wide text-text-muted">{line.label}</dt>
            <dd className={cn('mt-1 text-base font-semibold tabular-nums', line.value ? 'text-text-primary' : 'text-text-muted')}>
              {line.value != null ? `${line.value}${line.suffix}` : '—'}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs text-text-muted">
        Calculations in the Fee X-Ray will be estimates based on inputs provided. Actual fees may vary. Consult the PMS provider's disclosure document.
      </p>
    </section>
  )
}

function Manager({ fund }: Props) {
  if (!fund.fundManager && !fund.fundManagerBio) return null
  return (
    <section className="mt-12">
      <h2 className="text-2xl">Fund manager</h2>
      {fund.fundManager ? (
        <p className="mt-3 text-lg font-medium text-text-primary">{fund.fundManager}</p>
      ) : null}
      {fund.fundManagerBio ? (
        <p className="mt-2 max-w-prose text-base leading-relaxed text-text-muted">
          {fund.fundManagerBio}
        </p>
      ) : null}
    </section>
  )
}

function Scorecard({ fund }: Props) {
  const href = `/tools/scorecard?fund=${encodeURIComponent(fund.name)}`
  return (
    <section className="mt-12 rounded-card border border-card-border border-l-4 border-l-gold bg-card p-6 shadow-card md:p-8">
      <span className="inline-flex items-center rounded-pill bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
        20-criteria check
      </span>
      <h2 className="mt-3 text-2xl">Score {fund.name} before you commit.</h2>
      <p className="mt-2 max-w-prose text-base text-text-muted">
        Walk through 20 criteria across manager quality, performance integrity, fee fairness, operational robustness, and suitability fit.
      </p>
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-2 rounded-button bg-text-primary px-5 py-3 text-sm font-medium text-white shadow-card hover:opacity-90 hover:shadow-card-hover"
      >
        <ClipboardCheck size={16} aria-hidden />
        Open the Scorecard →
      </Link>
      <p className="mt-3 text-xs text-text-muted">5 dimensions · 4 criteria each · No sales pitch</p>
    </section>
  )
}

function buildFeeXRayHref(fund: FundDetailData): string {
  const params = new URLSearchParams()
  if (fund.fees?.managementFee != null) params.set('mgmt', String(fund.fees.managementFee))
  if (fund.fees?.performanceFee != null) params.set('perf', String(fund.fees.performanceFee))
  if (fund.fees?.hurdleRate != null) params.set('hurdle', String(fund.fees.hurdleRate))
  if (fund.fees?.exitLoad != null) params.set('exit', String(fund.fees.exitLoad))
  if (fund.minInvestment != null) params.set('amount', String(fund.minInvestment))
  if (fund.name) params.set('fund', fund.name)
  const query = params.toString()
  return query ? `/tools/fee-x-ray?${query}` : '/tools/fee-x-ray'
}

function Disclaimer() {
  return (
    <p className="mt-12 border-t border-card-border pt-6 text-xs text-text-muted">
      IndiaFundSearch.com is an educational platform. We do not distribute or sell any financial products. All figures are sourced from public disclosures and may be incomplete or stale — verify directly with the provider before investing. For advice, consult a SEBI-registered advisor.
    </p>
  )
}
