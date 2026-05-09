import Link from 'next/link'
import { ArrowRight, Calculator, ClipboardCheck, ListChecks, ScanLine, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { TrustStrip } from '@/components/shared/TrustStrip'

export const metadata = {
  title: 'Tools — Fee X-Ray, Scorecard, Diagnostic, FD Visualiser',
  description:
    'Five free, ungated tools to make Indian alternatives easier to read. Fee X-Ray, Scorecard, Diagnostic, FD Visualiser, Pathfinder. No login, no commissions.',
}

type Tool = {
  eyebrow: string
  title: string
  blurb: string
  cta: string
  href: string
  icon: LucideIcon
  meta: string
}

const TOOLS: Tool[] = [
  {
    eyebrow: 'Lead tool',
    title: 'Fee X-Ray',
    blurb:
      'See exactly what a fund\'s fees actually cost over 10 years. Management + performance + GST + brokerage proxy + custody — all in.',
    cta: 'Open Fee X-Ray',
    href: '/tools/fee-x-ray',
    icon: ScanLine,
    meta: '3 panels · animated · no login',
  },
  {
    eyebrow: '20-criteria check',
    title: 'Scorecard',
    blurb:
      'Score any PMS or AIF on 20 criteria across manager, performance, fees, operations, and fit. Output: strengths, watch areas, red flags.',
    cta: 'Open Scorecard',
    href: '/tools/scorecard',
    icon: ClipboardCheck,
    meta: '5 dimensions · radar chart · share-ready',
  },
  {
    eyebrow: 'Readiness check',
    title: 'Diagnostic',
    blurb:
      'Twelve questions, four verdicts. Includes a "Not Yet" verdict — this is the most useful answer for ~40% of investors.',
    cta: 'Take the Diagnostic',
    href: '/diagnostic',
    icon: ListChecks,
    meta: '12 questions · 4 verdicts · 3 minutes',
  },
  {
    eyebrow: 'FD reality check',
    title: 'FD Visualiser',
    blurb:
      'Watch ₹1 Cr in a fixed deposit erode under tax + inflation over 10 years. Compare against debt MF, balanced PMS, equity PMS.',
    cta: 'Open FD Visualiser',
    href: '/#fd-visualiser',
    icon: Calculator,
    meta: 'Animated · screenshot-friendly · the homepage hero',
  },
  {
    eyebrow: 'Three-question wizard',
    title: 'Pathfinder',
    blurb:
      'Surplus, goal, lock-in tolerance — answer three questions and we narrow the universe to the products worth reading about first.',
    cta: 'Run Pathfinder',
    href: '/knowledge#pathfinder',
    icon: Sparkles,
    meta: '3 questions · narrows the wealth ladder',
  },
]

export default function ToolsIndexPage() {
  return (
    <div className="container-grid pt-12 pb-20 md:pt-20">
      <header className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-widest text-gold">Tools</p>
        <h1 className="mt-2">Five tools for the homework you should do anyway.</h1>
        <p className="mt-4 max-w-prose text-lg text-text-muted">
          We don&rsquo;t recommend funds. We give you the calculators, scorers, and decision aids the rest of the industry charges for or hides. All free. All ungated.
        </p>
        <div className="mt-5">
          <TrustStrip variant="inline" />
        </div>
      </header>

      <ul className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool) => (
          <li key={tool.title}>
            <Link
              href={tool.href}
              className="group flex h-full flex-col rounded-card border border-card-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover md:p-7"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-card bg-gold/10 text-gold">
                <tool.icon size={18} aria-hidden />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-gold">{tool.eyebrow}</p>
              <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-text-primary md:text-2xl">
                {tool.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">{tool.blurb}</p>
              <p className="mt-4 text-xs text-text-muted">{tool.meta}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-text-primary group-hover:text-gold">
                {tool.cta}
                <ArrowRight size={14} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-16 max-w-prose text-xs text-text-muted">
        IndiaFundSearch.com is an educational platform. We do not distribute or sell any financial products. For investment advice, consult a SEBI-registered advisor.
      </p>
    </div>
  )
}
