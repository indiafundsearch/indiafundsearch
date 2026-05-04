'use client'

import { motion } from 'framer-motion'
import {
  FD_GROSS,
  HORIZON_YEARS,
  INFLATION,
  grossValueAfter,
  netOfTaxValueAfter,
  realValueAfter,
  type TaxBracket,
} from '@/lib/utils/fdCalculations'
import { formatINR } from '@/lib/utils/formatCurrency'
import { cn } from '@/lib/utils'

type Props = {
  principal: number
  taxBracket: TaxBracket
}

type Stage = {
  key: string
  label: string
  caption: string
  amount: number
  /** Width (0–1) relative to the bar's max value. */
  ratio: number
  /** Brand tone applied to the bar fill + label. */
  tone: 'neutral' | 'subtle' | 'erosion' | 'real'
}

/**
 * Animated 4-bar visualization that conveys the spec'd "₹1Cr bar shrinking
 * as tax and inflation layers are stripped away" insight.
 *
 * Layer 1 — Principal (where you started)
 * Layer 2 — Gross at 10y (the FD interest grew it)
 * Layer 3 — Net of tax at 10y (slab tax stripped)
 * Layer 4 — Real value at 10y (inflation stripped — usually below Layer 1)
 *
 * Bars animate sequentially with stagger; a reference line at the principal
 * width makes the "below where you started" verdict visible.
 */
export function FDErosionBar({ principal, taxBracket }: Props) {
  const gross = grossValueAfter(principal, FD_GROSS, HORIZON_YEARS)
  const netOfTax = netOfTaxValueAfter(principal, FD_GROSS, taxBracket, HORIZON_YEARS)
  const real = realValueAfter(principal, FD_GROSS, taxBracket, INFLATION, HORIZON_YEARS)

  const max = Math.max(principal, gross, netOfTax, real)
  const principalRatio = principal / max
  const isShrinking = real < principal

  const stages: Stage[] = [
    {
      key: 'principal',
      label: 'Today',
      caption: 'What you started with',
      amount: principal,
      ratio: principal / max,
      tone: 'neutral',
    },
    {
      key: 'gross',
      label: `Year ${HORIZON_YEARS} · gross`,
      caption: `+ ${(FD_GROSS * 100).toFixed(1)}% compounded for ${HORIZON_YEARS} years`,
      amount: gross,
      ratio: gross / max,
      tone: 'subtle',
    },
    {
      key: 'netoftax',
      label: `Year ${HORIZON_YEARS} · net of tax`,
      caption: `− ${(taxBracket * 100).toFixed(0)}% slab tax on FD interest`,
      amount: netOfTax,
      ratio: netOfTax / max,
      tone: 'erosion',
    },
    {
      key: 'real',
      label: `Year ${HORIZON_YEARS} · real`,
      caption: `− ${(INFLATION * 100).toFixed(1)}% inflation deflation`,
      amount: real,
      ratio: real / max,
      tone: isShrinking ? 'real' : 'subtle',
    },
  ]

  return (
    <div>
      <div className="relative space-y-4 pr-2">
        {stages.map((stage, index) => (
          <Row key={stage.key} stage={stage} index={index} />
        ))}

        {/* Reference line at principal width — shows the "starting capital" benchmark. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 hidden md:block"
          style={{ left: `calc(${principalRatio * 100}% - 1px)` }}
        >
          <div className="h-full w-px border-r border-dashed border-text-muted/50" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className="inline-block h-2 w-3 rounded-pill bg-text-primary" />
          Today / nominal
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block h-2 w-3 rounded-pill"
            style={{ background: '#c0392b' }}
          />
          Real value (post-tax, post-inflation)
        </span>
        <span className="hidden md:inline-flex items-center gap-2">
          <span aria-hidden className="inline-block h-2 w-3 border-r border-dashed border-text-muted/70" />
          Starting capital
        </span>
      </div>
    </div>
  )
}

function Row({ stage, index }: { stage: Stage; index: number }) {
  const fill =
    stage.tone === 'real'
      ? '#c0392b'
      : stage.tone === 'erosion'
        ? '#5b6068'
        : stage.tone === 'neutral'
          ? '#1d1d1f'
          : '#86868b'

  return (
    <div className="grid gap-1">
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-medium text-text-primary">{stage.label}</span>
        <span className="tabular-nums text-text-muted">{stage.caption}</span>
      </div>
      <div className="relative h-7 w-full overflow-hidden rounded-pill bg-background">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${stage.ratio * 100}%` }}
          transition={{
            duration: 0.7,
            delay: 0.25 + index * 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className={cn('h-full rounded-pill')}
          style={{ background: fill }}
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.55 + index * 0.4 }}
          className="absolute inset-y-0 right-3 inline-flex items-center text-sm font-semibold tabular-nums text-text-primary"
        >
          {formatINR(stage.amount)}
        </motion.span>
      </div>
    </div>
  )
}
