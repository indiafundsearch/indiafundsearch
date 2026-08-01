'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { GATE, SITE } from '@/lib/constants'
import { GateForm } from './GateForm'

const STORAGE_KEY = 'ifs_gate_verified_v1'

function isVerified(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    const { t } = JSON.parse(raw) as { t: number }
    return Date.now() - t < GATE.verifiedDays * 24 * 60 * 60 * 1000
  } catch {
    return false
  }
}

export function markVerified() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ t: Date.now() }))
  } catch {
    // storage blocked — gate will reappear next visit; acceptable
  }
}

/**
 * Lead gate — after GATE.delaySeconds of *visible* on-page time, an
 * OTP-verified registration wall appears. Exempt: /studio (always),
 * /learn when GATE.mode === 'soft'. Verified devices skip for
 * GATE.verifiedDays.
 */
export function LeadGate() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(false)
  const secondsVisible = useRef(0)

  const gated = GATE.gatedPaths.some((p) => pathname.startsWith(p))
  const exempt =
    !GATE.enabled ||
    !gated ||
    GATE.exemptPaths.some((p) => pathname.startsWith(p))

  // Count only seconds the tab is actually visible, across route changes.
  useEffect(() => {
    if (exempt || done || open) return
    if (isVerified()) {
      setDone(true)
      return
    }
    const tick = setInterval(() => {
      if (document.visibilityState === 'visible') {
        secondsVisible.current += 1
        if (secondsVisible.current >= GATE.delaySeconds) setOpen(true)
      }
    }, 1000)
    return () => clearInterval(tick)
  }, [exempt, done, open])

  // Lock body scroll while the gate is up.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (exempt || done) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center overflow-y-auto bg-[rgba(1,53,40,0.55)] backdrop-blur-[6px] px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Continue reading ${SITE.name}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05, ease: 'easeOut' }}
            className="plot-card w-full max-w-[520px] px-8 py-8 max-sm:px-5"
          >
            <span className="corner corner-tl" />
            <span className="corner corner-tr" />
            <span className="corner corner-bl" />
            <span className="corner corner-br" />
            <GateForm
              onVerified={() => {
                markVerified()
                setOpen(false)
                setDone(true)
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
