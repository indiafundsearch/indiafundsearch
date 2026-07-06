'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FIT_QUESTIONS } from '@/lib/content/fitFinder'
import type { FitAnswers } from '@/lib/utils/fitScoring'
import { FitResults } from './FitResults'

type PartialAnswers = Partial<FitAnswers>

/** Seven questions → shortlist. One question per screen, progress on top. */
export function FitFinder() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<PartialAnswers>({})
  const done = step >= FIT_QUESTIONS.length

  const reset = () => {
    setStep(0)
    setAnswers({})
  }

  if (done) {
    return <FitResults answers={answers as FitAnswers} onReset={reset} />
  }

  const q = FIT_QUESTIONS[step]
  const current = answers[q.k as keyof FitAnswers]

  const pick = (value: string | number | boolean) => {
    setAnswers((prev) => ({ ...prev, [q.k]: value }))
  }

  return (
    <div className="max-w-[760px] mx-auto">
      {/* Progress */}
      <div className="flex gap-1.5 mb-8" role="progressbar" aria-valuenow={step} aria-valuemax={FIT_QUESTIONS.length}>
        {FIT_QUESTIONS.map((_, i) => (
          <i
            key={i}
            className={`flex-1 h-[3px] rounded-[2px] transition-colors duration-300 ${i < step ? 'bg-signal' : 'bg-line'}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="plot-card px-11 py-10 max-sm:px-5 max-sm:py-7"
        >
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-bronze mb-2.5">
            Question {step + 1} / {FIT_QUESTIONS.length}
          </div>
          <h2 className="font-sans font-bold text-[clamp(21px,3vw,27px)] leading-[1.25] mb-2">{q.q}</h2>
          <p className="font-serif italic text-[16px] text-slate mb-6">{q.why}</p>

          <div className="grid gap-2.5">
            {q.opts.map((o) => {
              const selected = current !== undefined && String(current) === String(o[0])
              return (
                <button
                  key={String(o[0])}
                  type="button"
                  onClick={() => pick(o[0])}
                  aria-pressed={selected}
                  className={`text-left rounded-plot px-[18px] py-[15px] font-sans text-[16px] font-medium flex justify-between items-center gap-3 border transition-all ${
                    selected
                      ? 'border-signal bg-bronze-wash shadow-[inset_0_0_0_1px_var(--color-signal)]'
                      : 'border-line bg-paper hover:border-signal hover:bg-bronze-wash'
                  }`}
                >
                  <span>{o[1]}</span>
                  {o[2] && <small className="font-mono text-[10.5px] text-slate font-normal tracking-[0.04em]">{o[2]}</small>}
                </button>
              )
            })}
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="font-sans text-[14px] font-medium tracking-[0.08em] uppercase px-6 py-3 rounded-[3px] border-[1.5px] border-ink text-ink disabled:opacity-35 disabled:cursor-not-allowed hover:bg-paper-2 transition-colors"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => current !== undefined && setStep((s) => s + 1)}
              disabled={current === undefined}
              className="font-sans text-[14px] font-medium tracking-[0.08em] uppercase px-6 py-3 rounded-[3px] border-[1.5px] border-ink bg-ink text-white-warm disabled:opacity-35 disabled:cursor-not-allowed hover:bg-bronze hover:border-bronze transition-colors"
            >
              {step === FIT_QUESTIONS.length - 1 ? 'See shortlist →' : 'Next →'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
