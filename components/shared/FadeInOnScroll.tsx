'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

// Atomic-style fade-up — matches the gsap.batch + data-fade pattern
// (y: 60 → 0, blurred-out → sharp, opacity 0 → 1, easeOutQuint).
const easeOutQuint = [0.16, 1, 0.3, 1] as const

const variants: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutQuint },
  },
}

type Props = {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section'
}

export function FadeInOnScroll({ children, delay = 0, className, as = 'div' }: Props) {
  const MotionEl = as === 'section' ? motion.section : motion.div
  return (
    <MotionEl
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionEl>
  )
}
