'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Props = {
  /** Plain string OR an array of nodes (mix copy + emphasis spans). */
  children: React.ReactNode
  /** Stagger between words (s). Default 40ms. */
  stagger?: number
  /** Delay before first word starts (s). */
  delay?: number
  /** Duration of each word's reveal (s). */
  duration?: number
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

const easeOutQuint = [0.16, 1, 0.3, 1] as const

/**
 * Splits the inner text into words and animates each with a short
 * blur + lift stagger on mount. Mirrors Atomic Capital's SplitText
 * + ScrollTrigger reveal but at component-mount instead of on-scroll
 * so it always lands above the fold.
 */
export function HeroWordReveal({
  children,
  stagger = 0.04,
  delay = 0.05,
  duration = 0.6,
  className,
  as = 'h1',
}: Props) {
  const Component = motion[as]
  const words = splitToWords(children)

  return (
    <Component
      className={cn(className)}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration,
            delay: delay + i * stagger,
            ease: easeOutQuint,
          }}
          className="inline-block whitespace-pre-wrap"
        >
          {word}
        </motion.span>
      ))}
    </Component>
  )
}

/**
 * Walks the children tree, splits any text node into individual words
 * (preserving trailing whitespace), and leaves React nodes intact as
 * single units. Returns a flat array of strings / nodes ready to wrap
 * in motion.span.
 */
function splitToWords(node: React.ReactNode): React.ReactNode[] {
  const out: React.ReactNode[] = []

  const visit = (n: React.ReactNode) => {
    if (n == null || typeof n === 'boolean') return
    if (typeof n === 'string' || typeof n === 'number') {
      const text = String(n)
      // Capture words plus their trailing whitespace so the layout breaks naturally.
      const matches = text.match(/\S+\s*|\s+/g) ?? []
      matches.forEach((m) => out.push(m))
      return
    }
    if (Array.isArray(n)) {
      n.forEach(visit)
      return
    }
    // Non-string node — keep as single word unit (e.g. <br/>, <em>...</em>).
    out.push(n)
  }

  visit(node)
  return out
}
