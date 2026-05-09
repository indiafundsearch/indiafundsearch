'use client'

import { motion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  /** Vertical offset in px (default 60). */
  y?: number
  /** Animation delay in seconds. */
  delay?: number
  /** Animation duration in seconds (default 0.7). */
  duration?: number
  /** Re-trigger on each scroll-in. Defaults to once. */
  once?: boolean
  /** Bottom margin for IntersectionObserver — negative pulls the trigger earlier. */
  rootMargin?: string
  className?: string
  /** Stagger children that are themselves <motion.*> with `variants={fadeUpItem}`. */
  staggerChildren?: number
  as?: 'div' | 'section' | 'header' | 'article' | 'aside'
}

const easeOutQuint = [0.16, 1, 0.3, 1] as const

/**
 * Wraps children in a viewport-triggered fade-up — modeled on Atomic
 * Capital's `gsap.batch + data-fade` pattern but built with Framer Motion
 * so we keep the existing dependency footprint.
 */
export function FadeUp({
  children,
  y = 60,
  delay = 0,
  duration = 0.7,
  once = true,
  rootMargin = '-80px',
  staggerChildren,
  className,
  as = 'div',
}: Props) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: easeOutQuint,
        ...(staggerChildren ? { staggerChildren } : {}),
      },
    },
  }

  const Component = motion[as]

  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: rootMargin }}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </Component>
  )
}

/** Pair with `<FadeUp staggerChildren={0.08}>` and apply to immediate children that should stagger. */
export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutQuint } },
}
