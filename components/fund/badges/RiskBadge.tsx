import { cn } from '@/lib/utils'

type Props = {
  level?: string
  showLabel?: boolean
  className?: string
}

/**
 * Risk pill keyed off the 6-level ladder (Low → Very High). Color
 * follows risk severity. `showLabel=false` renders just the dot — useful
 * inside dense lists.
 */
export function RiskBadge({ level, showLabel = true, className }: Props) {
  if (!level) return null
  const tone = toneFor(level)
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
        tone.bg,
        tone.text,
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-pill', tone.dot)} aria-hidden />
      {showLabel ? `${level} risk` : null}
    </span>
  )
}

function toneFor(level: string): { bg: string; text: string; dot: string } {
  switch (level) {
    case 'Low':
    case 'Low-Medium':
      return { bg: 'bg-success/10', text: 'text-success', dot: 'bg-success' }
    case 'Medium':
      return { bg: 'bg-gold/10', text: 'text-gold', dot: 'bg-gold' }
    case 'Medium-High':
      return { bg: 'bg-warning/10', text: 'text-warning', dot: 'bg-warning' }
    case 'High':
    case 'Very High':
      return { bg: 'bg-error/10', text: 'text-error', dot: 'bg-error' }
    default:
      return { bg: 'bg-text-primary/5', text: 'text-text-muted', dot: 'bg-text-muted' }
  }
}
