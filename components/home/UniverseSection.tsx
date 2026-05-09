import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type SubLine = { label: string; count: number }

type Category = {
  title: string
  totalCount: number
  description: string
  subLines: SubLine[]
  ctaLabel: string
  href: string
}

/**
 * Universe section copy. Headline counts are platform-tier aspirational
 * numbers; per-row counts are illustrative bucket sizes. Updated by hand
 * — they are not derived from the seeded Sanity dataset.
 */
const CATEGORIES: Category[] = [
  {
    title: 'Managed Portfolios',
    totalCount: 504,
    description: 'Stocks bought directly in your demat. ₹50L+ minimum.',
    subLines: [
      { label: 'Stock Portfolios', count: 11 },
      { label: 'Lending & Bond Portfolios', count: 2 },
      { label: 'Balanced Portfolios', count: 1 },
    ],
    ctaLabel: 'Explore Managed Portfolios',
    href: '/explore?cat=PMS',
  },
  {
    title: 'Alternative Funds',
    totalCount: 1857,
    description: 'Pooled vehicles for VC, PE, credit, real estate, hedge funds.',
    subLines: [
      { label: 'Startup Investing', count: 1 },
      { label: 'Private Company Investing', count: 1 },
      { label: 'Private Lending', count: 1 },
      { label: 'Real Estate & Infra Funds', count: 2 },
      { label: 'Pre-IPO Investing', count: 1 },
      { label: 'Hedge Funds', count: 2 },
    ],
    ctaLabel: 'Explore Alternative Funds',
    href: '/explore?cat=AIF',
  },
  {
    title: 'NRI & Global Access',
    totalCount: 95,
    description: 'USD-denominated funds. NRIs into India. Indians going global.',
    subLines: [
      { label: 'NRI India Access (USD)', count: 1 },
      { label: 'Global Market Access', count: 1 },
    ],
    ctaLabel: 'Explore NRI & Global Access',
    href: '/gift-city',
  },
]

export function UniverseSection() {
  return (
    <section className="container-grid py-16 md:py-24">
      <header>
        <p className="text-sm font-medium uppercase tracking-widest text-gold">The universe</p>
        <h2 className="mt-2 max-w-2xl">Three categories. One platform.</h2>
        <p className="mt-3 max-w-prose text-base text-text-muted">
          Every fund here is SEBI- or IFSCA-registered. Every category, mapped to plain English.
        </p>
      </header>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {CATEGORIES.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="group flex flex-col rounded-card border border-card-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover md:p-7"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-xl font-semibold tracking-tight text-text-primary group-hover:text-gold md:text-2xl">
                {category.title}
              </h3>
              <span className="text-2xl font-semibold tabular-nums text-gold md:text-3xl">
                {category.totalCount.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{category.description}</p>

            <ul className="mt-5 divide-y divide-card-border border-y border-card-border">
              {category.subLines.map((line) => (
                <li
                  key={line.label}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <span className="text-text-primary">{line.label}</span>
                  <span className="tabular-nums text-text-muted">{line.count} listed</span>
                </li>
              ))}
            </ul>

            <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-text-primary group-hover:text-gold">
              {category.ctaLabel}
              <ArrowRight
                size={14}
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
