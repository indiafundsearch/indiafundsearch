'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

type Props = {
  /** Final value to animate to. */
  to: number
  /** Animation duration in seconds. Default 1.4. */
  duration?: number
  /** Decimal places to round/format to. */
  decimals?: number
  /** Locale for thousand-separators. Default Indian (1,00,000) format. */
  locale?: string
  /** Optional prefix (e.g. "₹"). */
  prefix?: string
  /** Optional suffix (e.g. "%", "Cr"). */
  suffix?: string
  className?: string
}

/**
 * Animates a number from 0 → `to` once it scrolls into view. Uses an
 * easeOutCubic ramp so it snaps quickly then settles.
 */
export function CountUp({
  to,
  duration = 1.4,
  decimals = 0,
  locale = 'en-IN',
  prefix = '',
  suffix = '',
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    let raf: number

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(to * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])

  const formatted = value.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
