'use client'

import { useState, type FormEvent } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  fundOptions: string[]
  initialFund?: string
  onSubmit: (fundName: string) => void
}

export function PmsSelector({ fundOptions, initialFund, onSubmit }: Props) {
  const [mode, setMode] = useState<'pick' | 'other'>(initialFund && !fundOptions.includes(initialFund) ? 'other' : 'pick')
  const [picked, setPicked] = useState<string>(
    initialFund && fundOptions.includes(initialFund) ? initialFund : (fundOptions[0] ?? ''),
  )
  const [custom, setCustom] = useState<string>(
    initialFund && !fundOptions.includes(initialFund) ? initialFund : '',
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = mode === 'pick' ? picked : custom.trim()
    if (!value) return
    onSubmit(value)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-card border border-card-border bg-card p-5 shadow-card md:p-7"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-gold">Step 1 of 2</p>
      <h2 className="mt-1 text-2xl font-semibold text-text-primary md:text-3xl">
        Which PMS are you scoring?
      </h2>
      <p className="mt-2 max-w-prose text-sm text-text-muted">
        Pick from funds we already have data on, or type any other name.
      </p>

      <div className="mt-6 inline-flex rounded-pill border border-card-border bg-background p-1 text-sm shadow-card">
        <ModeButton active={mode === 'pick'} onClick={() => setMode('pick')}>
          Pick from list
        </ModeButton>
        <ModeButton active={mode === 'other'} onClick={() => setMode('other')}>
          Other (custom)
        </ModeButton>
      </div>

      <div className="mt-5">
        {mode === 'pick' ? (
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Fund name
            </span>
            <select
              value={picked}
              onChange={(event) => setPicked(event.target.value)}
              className="mt-1 w-full rounded-button border border-card-border bg-card px-3 py-2 text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-gold"
            >
              {fundOptions.length === 0 ? (
                <option value="">No funds in CMS yet — type your own below</option>
              ) : (
                fundOptions.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))
              )}
            </select>
          </label>
        ) : (
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Type the fund name
            </span>
            <input
              type="text"
              value={custom}
              onChange={(event) => setCustom(event.target.value)}
              autoFocus
              placeholder="e.g. Marcellus Consistent Compounders"
              className="mt-1 w-full rounded-button border border-card-border bg-card px-3 py-2 text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </label>
        )}
      </div>

      <button
        type="submit"
        disabled={mode === 'pick' ? !picked : !custom.trim()}
        className="mt-6 inline-flex items-center gap-2 rounded-button bg-text-primary px-5 py-2.5 text-sm font-medium text-white shadow-card hover:opacity-90 hover:shadow-card-hover disabled:opacity-60"
      >
        Start scoring →
      </button>
    </form>
  )
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'rounded-pill px-3 py-1 font-medium transition-colors',
        active ? 'bg-text-primary text-white' : 'text-text-muted hover:text-text-primary',
      )}
    >
      {children}
    </button>
  )
}
