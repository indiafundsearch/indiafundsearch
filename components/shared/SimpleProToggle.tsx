'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { MODE_STORAGE_KEY, type Mode } from '@/lib/constants'
import { cn } from '@/lib/utils'

type ModeContextValue = {
  mode: Mode
  setMode: (next: Mode) => void
}

const ModeContext = createContext<ModeContextValue | null>(null)

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>('simple')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(MODE_STORAGE_KEY)
      if (stored === 'simple' || stored === 'pro') {
        setModeState(stored)
      }
    } catch {
      // ignore — fall back to default 'simple'
    }
    setHydrated(true)
  }, [])

  const setMode = (next: Mode) => {
    setModeState(next)
    try {
      window.localStorage.setItem(MODE_STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      <div data-mode={mode} data-mode-hydrated={hydrated}>
        {children}
      </div>
    </ModeContext.Provider>
  )
}

export function useMode() {
  const ctx = useContext(ModeContext)
  if (!ctx) throw new Error('useMode must be used within <ModeProvider />')
  return ctx
}

export function SimpleProToggle({ className }: { className?: string }) {
  const { mode, setMode } = useMode()

  return (
    <div
      role="group"
      aria-label="Language complexity"
      className={cn(
        'inline-flex items-center rounded-pill border border-card-border bg-card p-1 text-sm shadow-card',
        className,
      )}
    >
      <ToggleButton active={mode === 'simple'} onClick={() => setMode('simple')}>
        Simple
      </ToggleButton>
      <ToggleButton active={mode === 'pro'} onClick={() => setMode('pro')}>
        Pro
      </ToggleButton>
    </div>
  )
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-pill px-3 py-1 font-medium transition-colors',
        active
          ? 'bg-text-primary text-white'
          : 'text-text-muted hover:text-text-primary',
      )}
    >
      {children}
    </button>
  )
}
