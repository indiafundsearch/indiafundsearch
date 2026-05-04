'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { Mail, RefreshCcw, AlertTriangle, Eye, Sparkles } from 'lucide-react'
import {
  type ScorecardCriterion,
  type ScorecardResult as ScorecardResultData,
  type Verdict,
} from '@/lib/utils/scorecardLogic'
import { ScorecardRadar } from './ScorecardRadar'
import { EmailCaptureModal } from '@/components/shared/EmailCaptureModal'

type Props = {
  result: ScorecardResultData
  fundName: string
  onReset: () => void
}

export function ScorecardResult({ result, fundName, onReset }: Props) {
  const [emailOpen, setEmailOpen] = useState(false)

  return (
    <div className="space-y-8">
      <header className="rounded-card border border-card-border border-l-4 border-l-gold bg-card p-6 shadow-card md:p-10">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">
            Scorecard for
          </p>
          <ScoreBadge score={result.overallScore} />
        </div>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-text-primary md:text-4xl">
          {fundName}
        </h2>
        <p className="mt-3 max-w-prose text-sm text-text-muted">
          You scored {result.overallScore}/100 across 20 criteria. Strengths, watch areas, and red flags below — focus the conversation with your advisor on the red-flag items first.
        </p>
      </header>

      <section className="rounded-card border border-card-border bg-card p-5 shadow-card md:p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
          Dimension breakdown
        </p>
        <ScorecardRadar scores={result.dimensionScores} />
      </section>

      <div className="grid gap-6 md:grid-cols-3">
        <Bucket
          verdict="strength"
          icon={<Sparkles size={16} aria-hidden />}
          title="Strengths"
          empty="None scored 4 or above. Probe whether your scoring was harsh or whether the fund truly has nothing standout."
          items={result.buckets.strength}
        />
        <Bucket
          verdict="watch"
          icon={<Eye size={16} aria-hidden />}
          title="Watch areas"
          empty="No 3-rated criteria — the picture is clean."
          items={result.buckets.watch}
        />
        <Bucket
          verdict="redflag"
          icon={<AlertTriangle size={16} aria-hidden />}
          title="Red flags"
          empty="No items rated 1 or 2 — solid across the board."
          items={result.buckets.redflag}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-card-border pt-6">
        <button
          type="button"
          onClick={() => setEmailOpen(true)}
          className="inline-flex items-center gap-2 rounded-button bg-text-primary px-4 py-2 text-sm font-medium text-white shadow-card hover:opacity-90 hover:shadow-card-hover"
        >
          <Mail size={16} aria-hidden />
          Save and compare with another PMS →
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-button text-sm text-text-muted hover:text-text-primary"
        >
          <RefreshCcw size={14} aria-hidden />
          Score another fund
        </button>
      </div>

      <p className="text-xs text-text-muted">
        Scoring is your judgement — IndiaFundSearch does not assert these numbers. Use the verdict to focus questions for your advisor or for the fund directly.
      </p>

      <EmailCaptureModal
        open={emailOpen}
        onClose={() => setEmailOpen(false)}
        source="Scorecard"
        headline={`Save your scorecard for ${fundName}`}
        subtext="A clean copy lands in your inbox so you can compare side-by-side with the next PMS you score."
        payload={{
          scorecardPMS: fundName,
          scorecardOverall: result.overallScore,
          scorecardDimensions: result.dimensionScores,
        }}
      />
    </div>
  )
}

function Bucket({
  verdict,
  icon,
  title,
  empty,
  items,
}: {
  verdict: Verdict
  icon: React.ReactNode
  title: string
  empty: string
  items: ScorecardCriterion[]
}) {
  const accent =
    verdict === 'strength'
      ? 'text-gold'
      : verdict === 'watch'
        ? 'text-text-muted'
        : 'text-error'
  return (
    <section className="rounded-card border border-card-border bg-card p-5 shadow-card">
      <div className={`flex items-center gap-2 ${accent}`}>
        {icon}
        <p className="text-xs font-semibold uppercase tracking-widest">{title}</p>
        <span className="ml-auto text-xs tabular-nums text-text-muted">{items.length}</span>
      </div>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-text-muted">{empty}</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map((criterion) => (
            <li key={criterion.key} className="text-sm leading-relaxed text-text-primary">
              {criterion.label}
            </li>
          ))}
        </ul>
      )}
    </section>
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
      <p className="text-xs uppercase tracking-widest text-text-muted">Overall</p>
      <motion.p className="text-4xl font-semibold tabular-nums text-text-primary">
        {display}
        <span className="text-base font-medium text-text-muted">/100</span>
      </motion.p>
    </div>
  )
}
