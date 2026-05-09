'use client'

import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  /** Loop duration in seconds. Lower is faster. Default 50. */
  speed?: number
  /** Direction of travel. */
  direction?: 'left' | 'right'
  /** Pause on hover. */
  pauseOnHover?: boolean
  /** Optional gradient fade on the edges. */
  fade?: boolean
  className?: string
}

/**
 * Continuous-loop horizontal marquee — pure CSS, no JS animation loop.
 * Renders the children twice and translates the track by 50%, which
 * produces a seamless loop because the second copy lines up with where
 * the first started.
 */
export function Marquee({
  children,
  speed = 50,
  direction = 'left',
  pauseOnHover = false,
  fade = true,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'group relative w-full overflow-hidden',
        fade ? 'mask-fade-x' : '',
        className,
      )}
    >
      <div
        className={cn(
          'flex w-max items-center',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
        )}
        style={{
          animation: `marquee-x ${speed}s linear infinite`,
          animationDirection: direction === 'left' ? 'normal' : 'reverse',
        }}
      >
        <div className="flex shrink-0 items-center" aria-hidden={false}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
