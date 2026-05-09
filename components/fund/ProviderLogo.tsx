import Image from 'next/image'
import { cn } from '@/lib/utils'

type Props = {
  /** URL to a square provider logo from Sanity. Falls back to monogram. */
  src?: string | null
  /** Provider name — used for the monogram fallback and alt text. */
  provider?: string | null
  /** Edge length in pixels. */
  size?: number
  className?: string
}

export function ProviderLogo({ src, provider, size = 56, className }: Props) {
  const monogram = monogramFor(provider)

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-card',
        className,
      )}
      style={{ width: size, height: size }}
      aria-label={provider ? `${provider} logo` : 'Provider logo'}
    >
      {src ? (
        <Image
          src={src}
          alt={provider ? `${provider} logo` : ''}
          width={size}
          height={size}
          className="h-full w-full object-contain p-1"
        />
      ) : (
        <span
          className="select-none font-semibold tracking-tight text-text-primary"
          style={{ fontSize: Math.max(13, Math.round(size * 0.36)) }}
        >
          {monogram}
        </span>
      )}
    </div>
  )
}

/**
 * Two-letter monogram derived from the provider name.
 * Examples: "Blackstone" → "BL", "Motilal Oswal" → "MO",
 * "360 ONE" → "36", "ASK" → "AS".
 */
function monogramFor(provider?: string | null): string {
  if (!provider) return '·'
  const cleaned = provider.replace(/[^\p{L}\p{N}\s]/gu, ' ').trim()
  if (!cleaned) return '·'
  const words = cleaned.split(/\s+/).filter(Boolean)
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }
  return (words[0][0] + words[1][0]).toUpperCase()
}
