import Link from 'next/link'
import { ArrowRight, ClipboardCheck, ListChecks, ScanLine } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Tool = {
  eyebrow: string
  title: string
  blurb: string
  href: string
  icon: LucideIcon
}

const TOOLS: Tool[] = [
  {
    eyebrow: 'Fee math',
    title: 'Run a Fee X-Ray',
    blurb: 'See what a fund actually costs over 10 years — every layer, not the headline.',
    href: '/tools/fee-x-ray',
    icon: ScanLine,
  },
  {
    eyebrow: '20-criteria check',
    title: 'Score a fund',
    blurb: 'Walk a PMS or AIF through 20 criteria across manager, performance, fees, ops, fit.',
    href: '/tools/scorecard',
    icon: ClipboardCheck,
  },
  {
    eyebrow: 'Readiness check',
    title: 'Take the Diagnostic',
    blurb: 'Twelve questions, four verdicts. Includes "Not Yet" — the most useful answer for many.',
    href: '/diagnostic',
    icon: ListChecks,
  },
]

export function TryAToolStrip() {
  return (
    <section className="container-grid pb-12 pt-2 md:pb-16">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-gold">Try a tool</p>
          <h2 className="mt-2 max-w-2xl">Three minutes is enough to do real homework.</h2>
        </div>
        <Link
          href="/tools"
          className="inline-flex items-center gap-1 text-sm font-medium text-text-primary hover:text-gold"
        >
          See all tools
          <ArrowRight size={14} aria-hidden />
        </Link>
      </div>

      <ul className="mt-8 grid gap-5 md:grid-cols-3">
        {TOOLS.map((tool) => (
          <li key={tool.title}>
            <Link
              href={tool.href}
              className="group flex h-full flex-col rounded-card border border-card-border bg-card p-5 shadow-card transition-all hover:shadow-card-hover md:p-6"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-card bg-gold/10 text-gold">
                <tool.icon size={16} aria-hidden />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-gold">{tool.eyebrow}</p>
              <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-text-primary md:text-xl">
                {tool.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{tool.blurb}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-text-primary group-hover:text-gold">
                Open
                <ArrowRight
                  size={14}
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
