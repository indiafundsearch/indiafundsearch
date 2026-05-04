'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import {
  calculateDiagnostic,
  QUESTIONS,
  type AnswerMap,
} from '@/lib/utils/diagnosticScoring'
import { ProgressBar, QuestionStep } from './diagnostic/QuestionStep'
import { DiagnosticResult } from './diagnostic/DiagnosticResult'

type Stage = { kind: 'question'; index: number } | { kind: 'result' }

export function Diagnostic() {
  const [answers, setAnswers] = useState<AnswerMap>({})
  const [stage, setStage] = useState<Stage>({ kind: 'question', index: 0 })

  const handleAnswer = (value: string) => {
    if (stage.kind !== 'question') return
    const question = QUESTIONS[stage.index]
    const next: AnswerMap = { ...answers, [question.id]: value }
    setAnswers(next)
    if (stage.index + 1 >= QUESTIONS.length) {
      setStage({ kind: 'result' })
    } else {
      setStage({ kind: 'question', index: stage.index + 1 })
    }
  }

  const handleBack = () => {
    if (stage.kind !== 'question' || stage.index === 0) return
    setStage({ kind: 'question', index: stage.index - 1 })
  }

  const reset = () => {
    setAnswers({})
    setStage({ kind: 'question', index: 0 })
  }

  if (stage.kind === 'result') {
    const result = calculateDiagnostic(answers)
    if (!result) {
      // Should not happen — defensive fallback only.
      return (
        <div className="rounded-card border border-card-border bg-card p-6 text-sm text-text-muted">
          Couldn't compute your result. Try again.
        </div>
      )
    }
    return <DiagnosticResult result={result} onReset={reset} />
  }

  const question = QUESTIONS[stage.index]
  return (
    <div className="space-y-6">
      <ProgressBar current={stage.index + 1} total={QUESTIONS.length} />
      <AnimatePresence mode="wait">
        <QuestionStep
          key={question.id}
          question={question}
          index={stage.index}
          total={QUESTIONS.length}
          selected={answers[question.id]}
          onAnswer={handleAnswer}
          onBack={handleBack}
        />
      </AnimatePresence>
    </div>
  )
}
