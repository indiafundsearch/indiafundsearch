import { TRUST_STRIP_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
  variant?: 'default' | 'inline'
}

export function TrustStrip({ className, variant = 'default' }: Props) {
  return (
    <ul
      aria-label="Trust commitments"
      className={cn(
        'flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-muted',
        variant === 'default' ? 'justify-center' : 'justify-start',
        className,
      )}
    >
      {TRUST_STRIP_ITEMS.map((item) => (
        <li key={item} className="inline-flex items-center gap-2">
          <span aria-hidden className="text-gold">✦</span>
          {item}
        </li>
      ))}
    </ul>
  )
}
