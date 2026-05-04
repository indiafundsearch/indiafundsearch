'use client'

import { FEE_PRESETS, type FeePresetKey, type FeeStructure } from '@/lib/utils/calculateFees'
import { formatINR } from '@/lib/utils/formatCurrency'
import { cn } from '@/lib/utils'

const PRESET_KEYS: (FeePresetKey | 'custom')[] = ['fixed', 'hybrid', 'performance', 'custom']

type Props = {
  amount: number
  grossCAGR: number
  years: number
  preset: FeePresetKey | 'custom'
  fees: FeeStructure
  onAmountChange: (next: number) => void
  onGrossCAGRChange: (next: number) => void
  onYearsChange: (next: number) => void
  onPresetChange: (next: FeePresetKey | 'custom') => void
  onFeesChange: (next: FeeStructure) => void
}

export function FeeXRayInputs({
  amount,
  grossCAGR,
  years,
  preset,
  fees,
  onAmountChange,
  onGrossCAGRChange,
  onYearsChange,
  onPresetChange,
  onFeesChange,
}: Props) {
  return (
    <div className="space-y-6 rounded-card border border-card-border bg-card p-5 shadow-card md:p-6">
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-text-muted">
          Investment amount
        </label>
        <div className="mt-1 flex items-baseline gap-3">
          <span className="text-2xl font-semibold tabular-nums text-text-primary md:text-3xl">
            {formatINR(amount)}
          </span>
          <span className="text-sm text-text-muted">{formatINR(amount, { compact: true })}</span>
        </div>
        <input
          type="range"
          min={2_500_000}
          max={50_000_000}
          step={500_000}
          value={amount}
          onChange={(event) => onAmountChange(Number(event.target.value))}
          aria-label="Investment amount"
          className="mt-3 w-full accent-gold"
        />
        <div className="mt-1 flex justify-between text-xs text-text-muted">
          <span>₹25 L</span>
          <span>₹5 Cr</span>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SliderField
          label="Expected gross CAGR"
          value={grossCAGR}
          min={8}
          max={25}
          step={0.5}
          suffix="%"
          onChange={onGrossCAGRChange}
        />
        <SliderField
          label="Time horizon"
          value={years}
          min={3}
          max={15}
          step={1}
          suffix={` ${years === 1 ? 'year' : 'years'}`}
          showValue={String(years)}
          onChange={onYearsChange}
        />
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-text-muted">
          Fee structure
        </label>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {PRESET_KEYS.map((key) => {
            const presetData = key === 'custom' ? null : FEE_PRESETS[key]
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  onPresetChange(key)
                  if (presetData) onFeesChange({ ...presetData })
                }}
                aria-pressed={preset === key}
                className={cn(
                  'rounded-card border p-3 text-left transition-shadow hover:shadow-card',
                  preset === key
                    ? 'border-text-primary bg-text-primary text-white'
                    : 'border-card-border bg-card text-text-primary',
                )}
              >
                <p className="text-sm font-semibold">
                  {key === 'custom' ? 'Custom' : presetData!.label}
                </p>
                <p className={cn('mt-1 text-xs', preset === key ? 'opacity-80' : 'text-text-muted')}>
                  {key === 'custom' ? 'Enter your own values' : presetData!.description}
                </p>
              </button>
            )
          })}
        </div>

        {preset === 'custom' ? (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <NumberField
              label="Mgmt %"
              value={fees.managementFee}
              onChange={(v) => onFeesChange({ ...fees, managementFee: v })}
            />
            <NumberField
              label="Perf %"
              value={fees.performanceFee}
              onChange={(v) => onFeesChange({ ...fees, performanceFee: v })}
            />
            <NumberField
              label="Hurdle %"
              value={fees.hurdleRate}
              onChange={(v) => onFeesChange({ ...fees, hurdleRate: v })}
            />
            <NumberField
              label="Exit %"
              value={fees.exitLoad}
              onChange={(v) => onFeesChange({ ...fees, exitLoad: v })}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  suffix,
  showValue,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  suffix?: string
  showValue?: string
  onChange: (next: number) => void
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-text-muted">
        {label}
      </label>
      <p className="mt-1 text-2xl font-semibold tabular-nums text-text-primary">
        {showValue ?? value}
        {suffix}
      </p>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={label}
        className="mt-3 w-full accent-gold"
      />
    </div>
  )
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (next: number) => void
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
        {label}
      </span>
      <input
        type="number"
        min={0}
        step={0.1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-1 w-full rounded-button border border-card-border bg-card px-3 py-2 text-base font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-gold"
      />
    </label>
  )
}
