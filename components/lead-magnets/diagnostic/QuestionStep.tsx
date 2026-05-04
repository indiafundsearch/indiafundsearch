'use client'

import { motion } from 'framer-motion'
import type { Question } from '@/lib/utils/diagnosticScoring'
import { cn } from '@/lib/utils'

type Props = {
  question: Question
  index: number
  total: number
  selected: string | undefined
  onAnswer: (value: string) => void
  onBack?: () => void
}

export function QuestionStep({ question, index, total, selected, onAnswer, onBack }: Props) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="rounded-card border border-card-border bg-card p-6 shadow-card md:p-8"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-widest text-text-muted">
          Question {index + 1} of {total}
        </p>
        {onBack && index > 0 ? (
          <button
            type="button"
            onClick={onBack}
            className="text-xs text-text-muted hover:text-text-primary"
          >
            ← Previous
          </button>
        ) : null}
      </div>

      <h2 className="mt-3 text-2xl font-semibold leading-snug text-text-primary md:text-3xl">
        {question.prompt}
      </h2>
      {question.helper ? (
        <p className="mt-2 text-sm text-text-muted">{question.helper}</p>
      ) : null}

      <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
        {question.options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onAnswer(option.value)}
            aria-pressed={selected === option.value}
            className={cn(
              'rounded-card border px-4 py-3 text-left text-sm transition-shadow',
              'hover:shadow-card-hover focus:outline-none focus:ring-2 focus:ring-gold',
              selected === option.value
                ? 'border-text-primary bg-text-primary text-white'
                : 'border-card-border bg-card text-text-primary',
            )}
          >
            <span className="font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  )
}

export function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.min(100, Math.round((current / total) * 100))
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs text-text-muted">
        <span className="font-medium uppercase tracking-widest">Diagnostic</span>
        <span className="tabular-nums">{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-pill bg-card-border">
        <motion.div
          className="h-full rounded-pill bg-text-primary"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
