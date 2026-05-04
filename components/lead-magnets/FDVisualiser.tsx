'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import {
  buildTracks,
  HORIZON_YEARS,
  realValueAfter,
  type TaxBracket,
} from '@/lib/utils/fdCalculations'
import { formatINR } from '@/lib/utils/formatCurrency'
import { cn } from '@/lib/utils'

const FD_AMOUNTS = [
  { label: '₹25 L', value: 25_00_000 },
  { label: '₹50 L', value: 50_00_000 },
  { label: '₹1 Cr', value: 1_00_00_000 },
  { label: '₹2 Cr', value: 2_00_00_000 },
] as const

const TAX_BRACKETS: { label: string; value: TaxBracket }[] = [
  { label: '20%', value: 0.2 },
  { label: '30%', value: 0.3 },
]

export function FDVisualiser() {
  const [amount, setAmount] = useState<number>(1_00_00_000)
  const [bracket, setBracket] = useState<TaxBracket>(0.3)
  const [revealed, setRevealed] = useState(false)

  const realValue = realValueAfter(amount, 0.07, bracket)
  const tracks = buildTracks(bracket).map((t) => ({
    ...t,
    finalReal: realValueAfter(amount, t.grossRate, t.taxRate),
  }))

  const handleShow = () => setRevealed(true)
  const handleReset = () => setRevealed(false)

  // Reset reveal when inputs change.
  useEffect(() => {
    setRevealed(false)
  }, [amount, bracket])

  return (
    <section className="container-grid pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="max-w-3xl">
        <h1>Your ₹1 Crore FD isn't growing. It's quietly shrinking.</h1>
        <p className="mt-5 max-w-prose text-lg text-text-muted">
          Pick your numbers. We'll show you what {HORIZON_YEARS} years of inflation and tax actually do to a fixed deposit — and what the alternatives look like.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-end gap-4">
        <Field label="FD Amount">
          <Select
            value={String(amount)}
            onChange={(v) => setAmount(Number(v))}
            options={FD_AMOUNTS.map((opt) => ({ value: String(opt.value), label: opt.label }))}
          />
        </Field>
        <Field label="Tax Bracket">
          <Select
            value={String(bracket)}
            onChange={(v) => setBracket(Number(v) as TaxBracket)}
            options={TAX_BRACKETS.map((opt) => ({ value: String(opt.value), label: opt.label }))}
          />
        </Field>
        <button
          type="button"
          onClick={handleShow}
          className={cn(
            'inline-flex items-center justify-center rounded-button bg-gold px-5 py-3 text-sm font-medium text-white shadow-card transition-all',
            'hover:opacity-90 hover:shadow-card-hover',
          )}
        >
          Show Me →
        </button>
      </div>

      {revealed ? (
        <ResultPanel amount={amount} bracket={bracket} realValue={realValue} tracks={tracks} onReset={handleReset} />
      ) : (
        <p className="mt-8 max-w-prose text-sm text-text-muted">
          Calculations use a 7% gross FD rate, 5.5% inflation, and your selected tax slab. Real value = post-tax compounded for {HORIZON_YEARS} years, then deflated by inflation.
        </p>
      )}
    </section>
  )
}

type TrackRow = ReturnType<typeof buildTracks>[number] & { finalReal: number }

function ResultPanel({
  amount,
  bracket,
  realValue,
  tracks,
  onReset,
}: {
  amount: number
  bracket: TaxBracket
  realValue: number
  tracks: TrackRow[]
  onReset: () => void
}) {
  const erosion = amount - realValue
  const isShrinking = realValue < amount

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mt-10"
    >
      <div className="rounded-card border border-card-border bg-card p-6 shadow-card md:p-10">
        <p className="text-sm font-medium uppercase tracking-widest text-text-muted">
          Real value after {HORIZON_YEARS} years
        </p>
        <AnimatedAmount value={realValue} />
        <p
          className={cn(
            'mt-3 text-base',
            isShrinking ? 'text-error' : 'text-text-muted',
          )}
        >
          {isShrinking ? (
            <>
              You'd lose <strong>{formatINR(erosion)}</strong> in real purchasing power on{' '}
              <strong>{formatINR(amount)}</strong>.
            </>
          ) : (
            <>
              You'd net just <strong>{formatINR(realValue - amount)}</strong> in real purchasing power on{' '}
              <strong>{formatINR(amount)}</strong> — barely keeping pace with inflation.
            </>
          )}
        </p>

        <ComparisonTable amount={amount} tracks={tracks} bracketLabel={`${(bracket * 100).toFixed(0)}% slab`} />

        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-card-border pt-6">
          <button
            type="button"
            disabled
            title="Email capture lands in Phase 3"
            className="rounded-button border border-card-border bg-card px-4 py-2 text-sm font-medium text-text-muted opacity-60"
          >
            Email this to yourself →
          </button>
          <button
            type="button"
            onClick={onReset}
            className="text-sm text-text-muted hover:text-text-primary"
          >
            ← Try different numbers
          </button>
        </div>

        <p className="mt-6 text-xs text-text-muted">
          Calculations are estimates based on inputs provided. Actual returns vary by fund, market, and tax treatment. Consult a SEBI-registered advisor before investing.
        </p>
      </div>
    </motion.div>
  )
}

function ComparisonTable({
  amount,
  tracks,
  bracketLabel,
}: {
  amount: number
  tracks: TrackRow[]
  bracketLabel: string
}) {
  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-card-border text-text-muted">
            <th scope="col" className="py-3 pr-4 font-medium">Track</th>
            <th scope="col" className="py-3 pr-4 font-medium">Gross CAGR</th>
            <th scope="col" className="py-3 pr-4 font-medium">Tax</th>
            <th scope="col" className="py-3 pr-4 text-right font-medium">
              Real value · {HORIZON_YEARS}y
            </th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track) => {
            const isLoss = track.finalReal < amount
            return (
              <tr key={track.key} className="border-b border-card-border/60 last:border-0">
                <td className="py-3 pr-4 font-medium text-text-primary">{track.label}</td>
                <td className="py-3 pr-4 tabular-nums text-text-primary">
                  {(track.grossRate * 100).toFixed(1)}%
                </td>
                <td className="py-3 pr-4 text-text-muted">{track.taxNote}</td>
                <td
                  className={cn(
                    'py-3 pr-4 text-right tabular-nums font-medium',
                    isLoss ? 'text-error' : 'text-text-primary',
                  )}
                >
                  {formatINR(track.finalReal)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <p className="mt-3 text-xs text-text-muted">
        Real value = post-tax compounded over {HORIZON_YEARS} years, deflated by 5.5% inflation. FD &amp; Debt MF taxed at {bracketLabel}; PMS taxed at 12.5% LTCG.
      </p>
    </div>
  )
}

function AnimatedAmount({ value }: { value: number }) {
  const motionValue = useMotionValue(0)
  const display = useTransform(motionValue, (latest) => formatINR(latest))

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 1.4, ease: 'easeOut' })
    return controls.stop
  }, [motionValue, value])

  return (
    <motion.p className="mt-2 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
      {display}
    </motion.p>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-sm text-text-muted">
      <span>{label}</span>
      {children}
    </label>
  )
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (next: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="rounded-button border border-card-border bg-card px-3 py-2 text-base font-medium text-text-primary shadow-card focus:outline-none focus:ring-2 focus:ring-gold"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
