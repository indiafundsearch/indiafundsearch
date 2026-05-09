import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type Card = {
  number: string
  title: string
  teaser: string
  minutes: number
  href: string
}

const CARDS: Card[] = [
  {
    number: '01',
    title: 'What is PMS?',
    teaser: 'Like hiring a personal chef for your investments.',
    minutes: 6,
    href: '/insights/what-is-pms',
  },
  {
    number: '02',
    title: 'What is AIF?',
    teaser: 'The VIP section of investing — decoded.',
    minutes: 8,
    href: '/insights/what-is-aif',
  },
  {
    number: '03',
    title: 'PMS vs AIF',
    teaser: 'Different tools for different jobs.',
    minutes: 6,
    href: '/insights/pms-vs-aif',
  },
  {
    number: '04',
    title: 'GIFT City for NRIs',
    teaser: 'India built a financial centre for overseas Indians.',
    minutes: 9,
    href: '/gift-city',
  },
  {
    number: '05',
    title: 'AIF Categories Decoded',
    teaser: 'Cat I, II, III — each completely different.',
    minutes: 7,
    href: '/insights/aif-categories-decoded',
  },
]

export function LearnSection() {
  return (
    <section className="container-grid py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-gold">Learn</p>
          <h2 className="mt-2 max-w-2xl">Start with the fundamentals.</h2>
        </div>
        <Link
          href="/knowledge"
          className="inline-flex items-center gap-1 text-sm font-medium text-text-primary hover:text-gold"
        >
          See all guides
          <ArrowRight size={14} aria-hidden />
        </Link>
      </div>

      <div className="mt-8 -mx-6 overflow-x-auto pb-2 md:mx-0 md:overflow-visible">
        <ul className="flex gap-4 px-6 md:grid md:grid-cols-5 md:gap-5 md:px-0">
          {CARDS.map((card) => (
            <li
              key={card.number}
              className="w-[260px] shrink-0 md:w-auto"
            >
              <Link
                href={card.href}
                className="group flex h-full flex-col rounded-card border border-card-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                  Article {card.number}
                </p>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-text-primary md:text-xl">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{card.teaser}</p>
                <div className="mt-auto flex items-end justify-between pt-6">
                  <span className="text-xs text-text-muted">{card.minutes} min read</span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-text-primary group-hover:text-gold">
                    Read
                    <ArrowRight
                      size={14}
                      aria-hidden
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
