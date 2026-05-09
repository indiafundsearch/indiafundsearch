'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type Stage = {
  /** Multiplier of ₹1 Cr — e.g. 1.5 means ₹1.5 Cr. */
  multiple: number
  label: string
  detail: string
  /** Bar fill — 0..1. */
  fill: number
  /** Stage tint for the bar. */
  tone: string
}

const STAGES: Stage[] = [
  {
    multiple: 1.0,
    label: 'You start with ₹1 Cr',
    detail: 'And then you have to choose where it sleeps.',
    fill: 0,
    tone: 'rgba(134,134,139,0.7)',
  },
  {
    multiple: 1.5,
    label: 'In an FD over 10 years',
    detail: '6% gross, taxed at 30% slab → ₹1.5 Cr (pre-inflation).',
    fill: 0.16,
    tone: '#86868b',
  },
  {
    multiple: 1.95,
    label: 'In a Debt MF over 10 years',
    detail: '~7% net of tax. A modest step up.',
    fill: 0.32,
    tone: '#5b6470',
  },
  {
    multiple: 2.55,
    label: 'In a Balanced PMS / Multi-Asset',
    detail: '~10% net. Equity exposure with cushioning.',
    fill: 0.55,
    tone: '#1a7f4d',
  },
  {
    multiple: 3.5,
    label: 'In an Equity PMS over 10 years',
    detail: '~13% net. The same rupee, looked after differently.',
    fill: 1,
    tone: '#b8960c',
  },
]

/**
 * Pinned scroll-driven sequence — borrowed from Atomic Capital's
 * "10×" graph pin. Scrolling scrubs through STAGES; each stage
 * cross-fades the headline + detail and animates a number + bar.
 */
export function PinnedWealthStory() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const numberRef = useRef<HTMLSpanElement | null>(null)
  const barRef = useRef<HTMLDivElement | null>(null)
  const labelRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // For users who opt out, snap to the final stage so they get the message without motion.
      const last = STAGES[STAGES.length - 1]
      if (numberRef.current) numberRef.current.textContent = `₹${last.multiple.toFixed(2)} Cr`
      if (barRef.current) {
        barRef.current.style.width = `${last.fill * 100}%`
        barRef.current.style.background = last.tone
      }
      labelRefs.current.forEach((el, i) => {
        if (!el) return
        el.style.opacity = i === STAGES.length - 1 ? '1' : '0'
      })
      return
    }

    const ctx = gsap.context(() => {
      // Each stage occupies an equal slice of the scroll. Scrub interpolates between them.
      const stageCount = STAGES.length
      const segment = 1 / (stageCount - 1)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '+=320%', // 3.2 viewport heights of scroll while pinned
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      })

      // Animate the multiplier number through each stage in sequence.
      const counter = { value: STAGES[0].multiple }
      STAGES.forEach((stage, i) => {
        if (i === 0) return
        tl.to(
          counter,
          {
            value: stage.multiple,
            duration: 1,
            ease: 'none',
            onUpdate: () => {
              if (numberRef.current) {
                numberRef.current.textContent = `₹${counter.value.toFixed(2)} Cr`
              }
            },
          },
          (i - 1) * segment * stageCount,
        )
      })

      // Bar fill + tone cycles per stage.
      STAGES.forEach((stage, i) => {
        if (i === 0) return
        tl.to(
          barRef.current,
          {
            width: `${stage.fill * 100}%`,
            background: stage.tone,
            duration: 1,
            ease: 'none',
          },
          (i - 1) * segment * stageCount,
        )
      })

      // Label cross-fades.
      STAGES.forEach((_, i) => {
        const el = labelRefs.current[i]
        if (!el) return
        // Fade in at this stage's start, fade out at the next stage's start.
        const inAt = i === 0 ? 0 : (i - 1) * segment * stageCount + 0.5
        const outAt =
          i === STAGES.length - 1 ? stageCount : i * segment * stageCount + 0.5
        tl.to(el, { opacity: 1, duration: 0.4, ease: 'power1.out' }, inAt)
        if (i < STAGES.length - 1) {
          tl.to(el, { opacity: 0, duration: 0.4, ease: 'power1.in' }, outAt - 0.4)
        }
      })
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={wrapperRef}
      className="relative overflow-hidden bg-text-primary text-card"
      style={{ height: '100vh' }}
    >
      <div className="container-grid relative flex h-full flex-col justify-center py-16 md:py-24">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">
          What ₹1 Cr becomes
        </p>

        <div className="mt-6 flex flex-col gap-6 md:mt-10 md:gap-10">
          <span
            ref={numberRef}
            className="text-5xl font-semibold tabular-nums text-gold md:text-7xl lg:text-8xl"
          >
            ₹1.00 Cr
          </span>

          <div className="relative h-[3px] w-full max-w-3xl rounded-pill bg-card/15">
            <div
              ref={barRef}
              className="absolute inset-y-0 left-0 rounded-pill"
              style={{ width: '0%', background: 'rgba(134,134,139,0.7)' }}
            />
          </div>

          <div className="relative h-24 max-w-2xl md:h-28">
            {STAGES.map((stage, i) => (
              <div
                key={stage.label}
                ref={(el) => {
                  if (el) labelRefs.current[i] = el
                }}
                className="absolute inset-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <p className="text-xl font-semibold leading-snug text-card md:text-3xl">
                  {stage.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-card/70 md:text-base">
                  {stage.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-auto pt-10 text-[11px] uppercase tracking-widest text-card/40">
          Scroll ↓ to keep going
        </p>
      </div>
    </section>
  )
}
