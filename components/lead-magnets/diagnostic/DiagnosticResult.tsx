'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { Mail, RefreshCcw } from 'lucide-react'
import {
  DIMENSION_LABELS,
  type DiagnosticResult as DiagnosticResultData,
  type Dimension,
} from '@/lib/utils/diagnosticScoring'
import { DiagnosticRadar } from './DiagnosticRadar'
import { EmailCaptureModal } from '@/components/shared/EmailCaptureModal'
import { cn } from '@/lib/utils'

type Props = {
  result: DiagnosticResultData
  onReset: () => void
}

const TONE_STYLES: Record<DiagnosticResultData['verdict']['tone'], string> = {
  caution: 'border-l-error',
  progress: 'border-l-gold',
  ready: 'border-l-text-primary',
  advanced: 'border-l-gold',
}

export function DiagnosticResult({ result, onReset }: Props) {
  const { verdict, score, dimensionScores, weakestDimensions } = result
  const [emailOpen, setEmailOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div
        className={cn(
          'rounded-card border border-card-border border-l-4 bg-card p-6 shadow-card md:p-10',
          TONE_STYLES[verdict.tone],
        )}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">
            Verdict {verdict.key}
          </p>
          <ScoreBadge score={score} />
        </div>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-text-primary md:text-4xl">
          {verdict.headline}
        </h2>
        <p className="mt-3 max-w-prose text-lg text-text-muted">{verdict.subhead}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="rounded-card border border-card-border bg-card p-5 shadow-card md:p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
            Dimension breakdown
          </p>
          <DiagnosticRadar scores={dimensionScores} />
          <DimensionLegend
            scores={dimensionScores}
            highlight={verdict.key === 'B' ? weakestDimensions : []}
          />
        </div>

        <div className="rounded-card border border-card-border bg-card p-5 shadow-card md:p-7">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
            What this means
          </p>
          <p className="mt-2 max-w-prose text-base text-text-primary">{verdict.body}</p>
          <ul className="mt-5 space-y-3">
            {verdict.bullets.map((bullet, index) => (
              <li key={index} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-pill bg-gold"
                />
                <span className="text-sm leading-relaxed text-text-primary">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-card-border pt-6">
        <button
          type="button"
          onClick={() => setEmailOpen(true)}
          className="inline-flex items-center gap-2 rounded-button bg-text-primary px-4 py-2 text-sm font-medium text-white shadow-card hover:opacity-90 hover:shadow-card-hover"
        >
          <Mail size={16} aria-hidden />
          Download full report →
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-button text-sm text-text-muted hover:text-text-primary"
        >
          <RefreshCcw size={14} aria-hidden />
          Re-take the Diagnostic
        </button>
      </div>

      <p className="text-xs text-text-muted">
        This assessment is for educational purposes only and does not constitute financial advice. Consult a SEBI-registered advisor before acting on it.
      </p>

      <EmailCaptureModal
        open={emailOpen}
        onClose={() => setEmailOpen(false)}
        source="Diagnostic"
        headline="Email your Diagnostic verdict"
        subtext="Phone and city help us tailor the report — both are optional."
        payload={{
          diagnosticVerdict: verdict.headline,
          diagnosticScore: score,
        }}
      />
    </div>
  )
}

function ScoreBadge({ score }: { score: number }) {
  const motionValue = useMotionValue(0)
  const display = useTransform(motionValue, (v) => Math.round(v).toString())

  useEffect(() => {
    const controls = animate(motionValue, score, { duration: 1, ease: 'easeOut' })
    return controls.stop
  }, [motionValue, score])

  return (
    <div className="text-right">
      <p className="text-xs uppercase tracking-widest text-text-muted">Readiness</p>
      <p className="text-4xl font-semibold tabular-nums text-text-primary">
        <motion.span>{display}</motion.span>
        <span className="text-base font-medium text-text-muted">/100</span>
      </p>
    </div>
  )
}

function DimensionLegend({
  scores,
  highlight,
}: {
  scores: Record<Dimension, number>
  highlight: Dimension[]
}) {
  return (
    <ul className="mt-5 space-y-2">
      {(Object.keys(DIMENSION_LABELS) as Dimension[]).map((dimension) => {
        const isWeak = highlight.includes(dimension)
        return (
          <li
            key={dimension}
            className={cn(
              'flex items-center justify-between rounded-button px-3 py-2 text-sm',
              isWeak
                ? 'bg-gold/10 text-text-primary ring-1 ring-gold/40'
                : 'text-text-primary',
            )}
          >
            <span>
              {DIMENSION_LABELS[dimension]}
              {isWeak ? <span className="ml-2 text-xs text-gold">Focus here</span> : null}
            </span>
            <span className="tabular-nums font-medium">{scores[dimension]}/100</span>
          </li>
        )
      })}
    </ul>
  )
}
