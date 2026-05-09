import { cn } from '@/lib/utils'

type Props = {
  status?: string
  className?: string
}

/**
 * Status pill with a leading colored dot. Active=green, Upcoming=amber,
 * Closed=red. Anything else falls through to a muted variant.
 */
export function StatusBadge({ status, className }: Props) {
  if (!status) return null
  const tone = toneFor(status)
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
      {status}
    </span>
  )
}

function toneFor(status: string): { bg: string; text: string; dot: string } {
  switch (status) {
    case 'Active':
      return { bg: 'bg-success/10', text: 'text-success', dot: 'bg-success' }
    case 'Upcoming':
      return { bg: 'bg-warning/10', text: 'text-warning', dot: 'bg-warning' }
    case 'Closed':
      return { bg: 'bg-error/10', text: 'text-error', dot: 'bg-error' }
    default:
      return { bg: 'bg-text-primary/5', text: 'text-text-muted', dot: 'bg-text-muted' }
  }
}
