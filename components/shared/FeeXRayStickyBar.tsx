'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calculator, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'ifs:feeXRayBarDismissed'

type Props = {
  href?: string
}

/**
 * Sticky bottom prompt on /explore. Per CLAUDE.md spec the destination is the
 * Fee X-Ray Calculator (Phase 3); for now it links to /explore (no-op) and
 * shows a small "soon" hint. Dismissal is remembered for the session.
 */
export function FeeXRayStickyBar({ href = '#fee-x-ray-soon' }: Props) {
  const [dismissed, setDismissed] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(STORAGE_KEY)
      if (stored === '1') setDismissed(true)
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  if (!hydrated || dismissed) return null

  const dismiss = () => {
    setDismissed(true)
    try {
      window.sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore
    }
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 px-4 pb-4 md:px-6 md:pb-6">
      <div className="container-grid !px-0">
        <div
          className={cn(
            'mx-auto flex w-full max-w-3xl items-center gap-3 rounded-card border border-card-border bg-card px-4 py-3 shadow-card-hover',
            'md:px-5',
          )}
        >
          <span aria-hidden className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-button bg-gold/10 text-gold">
            <Calculator size={18} />
          </span>
          <p className="flex-1 text-sm text-text-primary">
            Comparing options? See what you'll actually pay.
          </p>
          <Link
            href={href}
            className="rounded-button bg-text-primary px-4 py-2 text-xs font-medium text-white hover:opacity-90"
          >
            Fee X-Ray →
          </Link>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={dismiss}
            className="inline-flex h-8 w-8 items-center justify-center rounded-button text-text-muted hover:bg-black/5"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
