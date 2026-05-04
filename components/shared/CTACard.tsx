import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  badge?: string
  headline: string
  subtext?: string
  ctaLabel: string
  ctaHref: string
  microcopy?: string
  className?: string
  /** Children render after the CTA, before microcopy. */
  children?: ReactNode
}

export function CTACard({
  badge,
  headline,
  subtext,
  ctaLabel,
  ctaHref,
  microcopy,
  className,
  children,
}: Props) {
  return (
    <div
      className={cn(
        'relative rounded-card border border-card-border bg-card p-6 shadow-card md:p-10',
        // Subtle gold left border per spec.
        'border-l-4 border-l-gold',
        className,
      )}
    >
      {badge ? (
        <span className="inline-flex w-fit items-center rounded-pill bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
          {badge}
        </span>
      ) : null}

      <h2 className="mt-4 max-w-2xl">{headline}</h2>
      {subtext ? <p className="mt-3 max-w-prose text-base text-text-muted">{subtext}</p> : null}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Link
          href={ctaHref}
          className="inline-flex items-center justify-center rounded-button bg-text-primary px-5 py-3 text-sm font-medium text-white shadow-card transition-all hover:opacity-90 hover:shadow-card-hover"
        >
          {ctaLabel}
        </Link>
        {children}
      </div>

      {microcopy ? <p className="mt-5 text-sm text-text-muted">{microcopy}</p> : null}
    </div>
  )
}
