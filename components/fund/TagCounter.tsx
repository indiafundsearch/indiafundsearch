import { cn } from '@/lib/utils'

type Props = {
  tags: string[]
  className?: string
}

/**
 * Small "+N" pill that, on hover/focus, reveals the additional tags
 * collapsed behind it. Renders nothing when there are zero extras.
 */
export function TagCounter({ tags, className }: Props) {
  if (tags.length === 0) return null

  return (
    <span
      className={cn('group relative inline-flex', className)}
      tabIndex={0}
      role="button"
      aria-label={`${tags.length} more tag${tags.length === 1 ? '' : 's'}: ${tags.join(', ')}`}
    >
      <span
        className={cn(
          'rounded-pill border border-card-border/60 bg-card/0 px-2 py-0.5 text-[10px] font-semibold text-card transition-colors',
          'group-hover:border-gold group-focus-visible:border-gold',
        )}
      >
        +{tags.length}
      </span>
      <span
        className={cn(
          'pointer-events-none absolute left-1/2 top-full z-10 mt-2 hidden min-w-max -translate-x-1/2 rounded-md border border-card-border bg-card px-2.5 py-1.5 text-[11px] text-text-primary shadow-card-hover',
          'group-hover:block group-focus-visible:block',
        )}
      >
        {tags.join(' · ')}
      </span>
    </span>
  )
}
