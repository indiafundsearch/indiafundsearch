import Link from 'next/link'
import { ArrowRight, ClipboardCheck, MessageCircle } from 'lucide-react'

type Level1 = { label: string; href: string }
type Level2 = { label: string; href: string; subtext?: string; microcopy?: string }
type Level3 = { headline: string; subtext?: string; ctaLabel: string; ctaHref: string; microcopy?: string }

type Props = {
  level1: Level1
  level2: Level2
  level3: Level3
}

/**
 * Three-rung CTA ladder for fund-detail-style pages.
 *
 * Rungs escalate in commitment level: a soft glossary link, a medium
 * scorecard card, and a strong "talk to an advisor" card. The visual
 * weight matches the commitment — Level 3 carries the gold accent the
 * rest of the design system reserves for the highest-intent surfaces.
 */
export function CTALadder({ level1, level2, level3 }: Props) {
  return (
    <div className="mt-12 space-y-5">
      <Link
        href={level1.href}
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
      >
        {level1.label}
        <ArrowRight
          size={14}
          aria-hidden
          className="transition-transform group-hover:translate-x-0.5"
        />
      </Link>

      <section className="rounded-card border border-card-border bg-card p-6 shadow-card md:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              20-criteria check
            </p>
            <h3 className="mt-2 text-xl font-semibold text-text-primary md:text-2xl">
              {level2.label}
            </h3>
            {level2.subtext ? (
              <p className="mt-1.5 max-w-prose text-sm text-text-muted">{level2.subtext}</p>
            ) : null}
          </div>
          <Link
            href={level2.href}
            className="inline-flex items-center gap-2 rounded-button border border-text-primary bg-card px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-text-primary hover:text-white"
          >
            <ClipboardCheck size={16} aria-hidden />
            Open scorecard
          </Link>
        </div>
        {level2.microcopy ? (
          <p className="mt-4 text-xs text-text-muted">{level2.microcopy}</p>
        ) : null}
      </section>

      <section className="rounded-card border border-card-border border-l-4 border-l-gold bg-card p-6 shadow-card md:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">When you&rsquo;re ready</p>
        <h3 className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
          {level3.headline}
        </h3>
        {level3.subtext ? (
          <p className="mt-3 max-w-prose text-base text-text-muted">{level3.subtext}</p>
        ) : null}
        <Link
          href={level3.ctaHref}
          className="mt-6 inline-flex items-center gap-2 rounded-button bg-text-primary px-5 py-3 text-sm font-medium text-white shadow-card transition-all hover:opacity-90 hover:shadow-card-hover"
        >
          <MessageCircle size={16} aria-hidden />
          {level3.ctaLabel}
        </Link>
        {level3.microcopy ? (
          <p className="mt-5 text-sm text-text-muted">{level3.microcopy}</p>
        ) : null}
      </section>
    </div>
  )
}
