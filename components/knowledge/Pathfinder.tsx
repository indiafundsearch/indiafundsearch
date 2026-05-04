'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductMap } from './ProductMap'
import {
  evaluatePathfinder,
  type Goal,
  type Lockin,
  type PathfinderAnswer,
  type Surplus,
} from '@/lib/utils/pathfinder'
import { cn } from '@/lib/utils'

const SURPLUS_OPTIONS: { value: Surplus; label: string }[] = [
  { value: 'under-10', label: 'Under ₹10 L' },
  { value: '10-25', label: '₹10–25 L' },
  { value: '25-50', label: '₹25–50 L' },
  { value: '50-100', label: '₹50 L–1 Cr' },
  { value: '100-plus', label: '₹1 Cr+' },
]

const GOAL_OPTIONS: { value: Goal; label: string; hint: string }[] = [
  { value: 'preservation', label: 'Capital preservation', hint: 'Don\'t lose what I have' },
  { value: 'income', label: 'Regular income', hint: 'Predictable cash flow' },
  { value: 'growth', label: 'Compounding growth', hint: 'Beat inflation comfortably' },
  { value: 'inflation', label: 'Inflation hedge', hint: 'Real return after tax' },
  { value: 'upside', label: 'Asymmetric upside', hint: 'Large win, accept large risk' },
]

const LOCKIN_OPTIONS: { value: Lockin; label: string }[] = [
  { value: 'short', label: 'Under 1 year' },
  { value: 'medium', label: '1–3 years' },
  { value: 'long', label: '3–7 years' },
  { value: 'very-long', label: '7 years+' },
]

type Step = 'surplus' | 'goal' | 'lockin' | 'result'
const STEP_ORDER: Step[] = ['surplus', 'goal', 'lockin', 'result']

export function Pathfinder() {
  const [step, setStep] = useState<Step>('surplus')
  const [answer, setAnswer] = useState<Partial<PathfinderAnswer>>({})

  const stepIndex = STEP_ORDER.indexOf(step)
  const verdicts = isComplete(answer) ? evaluatePathfinder(answer) : undefined

  const reset = () => {
    setAnswer({})
    setStep('surplus')
  }

  return (
    <div className="rounded-card border border-card-border bg-card p-5 shadow-card md:p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-gold">Pathfinder</p>
          <h3 className="mt-1 text-xl font-semibold text-text-primary">Which one is for me?</h3>
        </div>
        <Progress current={stepIndex} total={STEP_ORDER.length - 1} />
      </div>

      <AnimatePresence mode="wait">
        {step === 'surplus' && (
          <Question
            key="surplus"
            label="What is your investable surplus?"
            options={SURPLUS_OPTIONS}
            onPick={(value) => {
              setAnswer((prev) => ({ ...prev, surplus: value }))
              setStep('goal')
            }}
          />
        )}
        {step === 'goal' && (
          <Question
            key="goal"
            label="What is your primary goal?"
            options={GOAL_OPTIONS}
            renderHint
            onPick={(value) => {
              setAnswer((prev) => ({ ...prev, goal: value }))
              setStep('lockin')
            }}
          />
        )}
        {step === 'lockin' && (
          <Question
            key="lockin"
            label="How long can you lock the money in?"
            options={LOCKIN_OPTIONS}
            onPick={(value) => {
              setAnswer((prev) => ({ ...prev, lockin: value }))
              setStep('result')
            }}
          />
        )}
        {step === 'result' && verdicts && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <p className="text-sm text-text-muted">
              Highlighted products fit your inputs. Greyed-out products probably don't — yet.
            </p>
            <div className="mt-5">
              <ProductMap highlight={verdicts} />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-card-border pt-5">
              <button
                type="button"
                onClick={reset}
                className="rounded-button border border-card-border bg-card px-4 py-2 text-sm font-medium text-text-primary hover:shadow-card"
              >
                ← Try different answers
              </button>
              <p className="text-xs text-text-muted">
                Education only — not advice. Consult a SEBI-registered advisor before deciding.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function isComplete(a: Partial<PathfinderAnswer>): a is PathfinderAnswer {
  return Boolean(a.surplus && a.goal && a.lockin)
}

function Progress({ current, total }: { current: number; total: number }) {
  if (current >= total) return null
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          aria-hidden
          className={cn(
            'h-1.5 w-6 rounded-pill',
            index <= current ? 'bg-text-primary' : 'bg-card-border',
          )}
        />
      ))}
    </div>
  )
}

type QuestionProps<V extends string> = {
  label: string
  options: { value: V; label: string; hint?: string }[]
  renderHint?: boolean
  onPick: (value: V) => void
}

function Question<V extends string>({ label, options, renderHint, onPick }: QuestionProps<V>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="mt-6"
    >
      <p className="text-base font-medium text-text-primary">{label}</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onPick(option.value)}
            className="flex flex-col items-start rounded-card border border-card-border bg-card px-4 py-3 text-left text-sm text-text-primary transition-shadow hover:shadow-card-hover focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <span className="font-medium">{option.label}</span>
            {renderHint && option.hint ? (
              <span className="mt-0.5 text-xs text-text-muted">{option.hint}</span>
            ) : null}
          </button>
        ))}
      </div>
    </motion.div>
  )
}
