'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { Mail, RefreshCcw } from 'lucide-react'
import {
  calculateFees,
  FEE_PRESETS,
  type FeePresetKey,
  type FeeStructure,
} from '@/lib/utils/calculateFees'
import { FeeXRayInputs } from './fee-x-ray/FeeXRayInputs'
import { FeeDragChart } from './fee-x-ray/FeeDragChart'
import { FeeWaterfall } from './fee-x-ray/FeeWaterfall'
import { EmailCaptureModal } from '@/components/shared/EmailCaptureModal'

const DEFAULT_FEES: FeeStructure = { ...FEE_PRESETS.hybrid }

export function FeeXRay() {
  const params = useSearchParams()

  const initial = useMemo(() => readPrefill(params), [params])
  const [amount, setAmount] = useState<number>(initial.amount ?? 5_000_000)
  const [grossCAGR, setGrossCAGR] = useState<number>(15)
  const [years, setYears] = useState<number>(10)
  const [preset, setPreset] = useState<FeePresetKey | 'custom'>(initial.preset ?? 'hybrid')
  const [fees, setFees] = useState<FeeStructure>(initial.fees ?? DEFAULT_FEES)
  const [emailOpen, setEmailOpen] = useState(false)
  const fundLabel = initial.fund

  const result = useMemo(
    () => calculateFees({ amount, grossCAGR, years, fees }),
    [amount, grossCAGR, years, fees],
  )

  const reset = () => {
    setAmount(5_000_000)
    setGrossCAGR(15)
    setYears(10)
    setPreset('hybrid')
    setFees({ ...FEE_PRESETS.hybrid })
  }

  return (
    <div className="space-y-8">
      {fundLabel ? (
        <div className="rounded-card border border-card-border border-l-4 border-l-gold bg-card p-4 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Pre-filled</p>
          <p className="mt-1 text-sm text-text-primary">
            Fee structure auto-loaded from <strong>{fundLabel}</strong>. Adjust amount and horizon, or override fees by switching to Custom.
          </p>
        </div>
      ) : null}

      <FeeXRayInputs
        amount={amount}
        grossCAGR={grossCAGR}
        years={years}
        preset={preset}
        fees={fees}
        onAmountChange={setAmount}
        onGrossCAGRChange={setGrossCAGR}
        onYearsChange={setYears}
        onPresetChange={setPreset}
        onFeesChange={(next) => {
          setFees(next)
          setPreset('custom')
        }}
      />

      <FeeDragChart data={result.timeSeries} totalFees={result.summary.totalFees} years={years} />

      <BreakevenAlphaPanel
        breakevenAlpha={result.summary.breakevenAlpha}
        netCAGR={result.summary.netCAGR}
        grossCAGR={grossCAGR / 100}
      />

      <FeeWaterfall buckets={result.waterfall} totalFees={result.summary.totalFees} />

      <div className="flex flex-wrap items-center gap-3 border-t border-card-border pt-6">
        <button
          type="button"
          onClick={() => setEmailOpen(true)}
          className="inline-flex items-center gap-2 rounded-button bg-text-primary px-4 py-2 text-sm font-medium text-white shadow-card hover:opacity-90 hover:shadow-card-hover"
        >
          <Mail size={16} aria-hidden />
          Email this analysis to yourself →
        </button>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-button text-sm text-text-muted hover:text-text-primary"
        >
          <RefreshCcw size={14} aria-hidden />
          Reset to Hybrid preset
        </button>
      </div>

      <p className="text-xs text-text-muted">
        Calculations are estimates based on inputs provided. Actual fees vary by fund and structure. The brokerage proxy (0.5% of AUM) and custody / audit flat (₹25,000/year) are illustrative — verify with the provider's disclosure document.
      </p>

      <EmailCaptureModal
        open={emailOpen}
        onClose={() => setEmailOpen(false)}
        source="Fee X-Ray"
        headline="Email your Fee X-Ray analysis"
        subtext="A clean copy of your inputs and the headline numbers — straight to your inbox."
        payload={{
          fundLabel,
          feeXRayInputs: {
            amount,
            feeType: preset,
            expectedReturn: grossCAGR,
            timeHorizon: years,
            totalFees: result.summary.totalFees,
            breakevenAlpha: result.summary.breakevenAlpha,
          },
        }}
      />
    </div>
  )
}

function BreakevenAlphaPanel({
  breakevenAlpha,
  netCAGR,
  grossCAGR,
}: {
  breakevenAlpha: number
  netCAGR: number
  grossCAGR: number
}) {
  return (
    <div className="rounded-card border border-card-border bg-card p-5 shadow-card md:p-7">
      <p className="text-xs font-semibold uppercase tracking-widest text-gold">Breakeven Alpha</p>
      <h3 className="mt-1 text-xl font-semibold text-text-primary">
        Just to cover fees, your manager needs to deliver…
      </h3>
      <AnimatedPercent value={breakevenAlpha * 100} />
      <p className="mt-2 text-sm text-text-muted">
        …of <strong>annual alpha</strong> over the index. Gross {(grossCAGR * 100).toFixed(1)}% becomes net {(netCAGR * 100).toFixed(1)}% after fees — anything less than the breakeven gap and you would have done better in a low-cost index ETF.
      </p>
    </div>
  )
}

function AnimatedPercent({ value }: { value: number }) {
  const motionValue = useMotionValue(0)
  const display = useTransform(motionValue, (latest) => `${latest.toFixed(2)}%`)

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 1, ease: 'easeOut' })
    return controls.stop
  }, [motionValue, value])

  return (
    <motion.p className="mt-3 text-5xl font-semibold tracking-tight text-text-primary md:text-6xl">
      {display}
    </motion.p>
  )
}

function readPrefill(params: URLSearchParams): {
  amount?: number
  preset?: 'custom'
  fees?: FeeStructure
  fund?: string
} {
  const mgmt = num(params.get('mgmt'))
  const perf = num(params.get('perf'))
  const hurdle = num(params.get('hurdle'))
  const exit = num(params.get('exit'))
  const amount = num(params.get('amount'))
  const fund = params.get('fund') ?? undefined

  const hasFees = mgmt != null || perf != null || hurdle != null || exit != null
  if (!hasFees && amount == null) return { fund }

  return {
    amount: amount ?? undefined,
    preset: hasFees ? 'custom' : undefined,
    fees: hasFees
      ? {
          managementFee: mgmt ?? DEFAULT_FEES.managementFee,
          performanceFee: perf ?? DEFAULT_FEES.performanceFee,
          hurdleRate: hurdle ?? DEFAULT_FEES.hurdleRate,
          exitLoad: exit ?? DEFAULT_FEES.exitLoad,
        }
      : undefined,
    fund,
  }
}

function num(raw: string | null): number | null {
  if (raw == null) return null
  const parsed = Number(raw)
  return Number.isFinite(parsed) ? parsed : null
}
