import { cn } from '@/lib/utils'

type Props = {
  label: string
  variant?: 'neutral' | 'gold' | 'dark'
  className?: string
}

/**
 * Generic rounded chip for fund attributes (NRI, USD, Lock-up, IFSCA…).
 * The `tags` field on the fund schema is open-ended so editors can add
 * new chips without a code change.
 *
 * `dark` variant is intended for the dark header band on FundCard.
 */
export function Tag({ label, variant = 'neutral', className }: Props) {
  const tone =
    variant === 'gold'
      ? 'bg-gold/10 text-gold'
      : variant === 'dark'
        ? 'border border-card/20 text-card/80'
        : 'bg-text-primary/5 text-text-muted'
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide',
        tone,
        className,
      )}
    >
      {label}
    </span>
  )
}
