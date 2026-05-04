'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
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
