'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, MinusCircle, AlertCircle } from 'lucide-react'
import {
  evaluateNri,
  NRI_PRODUCTS,
  type Country,
  type FemaStatus,
  type NriAnswer,
  type Repatriation,
  type Verdict,
} from '@/lib/utils/nriPathfinder'
import { cn } from '@/lib/utils'

type Step = 'country' | 'fema' | 'repat' | 'result'
const ORDER: Step[] = ['country', 'fema', 'repat', 'result']

const COUNTRY_OPTIONS: { value: Country; label: string }[] = [
  { value: 'US', label: 'United States / Canada' },
  { value: 'UK_EU', label: 'UK / Europe' },
  { value: 'GCC', label: 'GCC (UAE, Saudi, Qatar…)' },
  { value: 'SG_HK', label: 'Singapore / Hong Kong' },
  { value: 'OTHER', label: 'Elsewhere' },
]

const FEMA_OPTIONS: { value: FemaStatus; label: string; hint: string }[] = [
  { value: 'NRI', label: 'NRI', hint: 'Non-Resident Indian' },
  { value: 'OCI', label: 'OCI', hint: 'Overseas Citizen of India' },
  { value: 'RNOR', label: 'RNOR', hint: 'Resident but Not Ordinarily Resident' },
  { value: 'RESIDENT', label: 'Resident', hint: 'I have moved back / never left' },
]

const REPAT_OPTIONS: { value: Repatriation; label: string; hint: string }[] = [
  { value: 'full', label: 'Full repatriation required', hint: 'Funds must move freely back overseas' },
  { value: 'partial', label: 'Partial — comfortable with some lock', hint: 'NRO route is fine for some of it' },
  { value: 'none', label: 'No repatriation needed', hint: 'Happy keeping it onshore' },
]

export function NriPathfinder() {
  const [step, setStep] = useState<Step>('country')
  const [answer, setAnswer] = useState<Partial<NriAnswer>>({})

  const stepIndex = ORDER.indexOf(step)
  const verdicts = isComplete(answer) ? evaluateNri(answer) : undefined

  const reset = () => {
    setAnswer({})
    setStep('country')
  }

  return (
    <div className="rounded-card border border-card-border bg-card p-5 shadow-card md:p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-gold">NRI Pathfinder</p>
          <h3 className="mt-1 text-xl font-semibold text-text-primary">
            What fits your NRI status?
          </h3>
        </div>
        <Progress current={stepIndex} total={ORDER.length - 1} />
      </div>

      <AnimatePresence mode="wait">
        {step === 'country' && (
          <Question
            key="country"
            label="Where do you live now?"
            options={COUNTRY_OPTIONS}
            onPick={(value) => {
              setAnswer((prev) => ({ ...prev, country: value }))
              setStep('fema')
            }}
          />
        )}
        {step === 'fema' && (
          <Question
            key="fema"
            label="What is your FEMA / tax-residency status?"
            options={FEMA_OPTIONS}
            renderHint
            onPick={(value) => {
              setAnswer((prev) => ({ ...prev, fema: value }))
              setStep('repat')
            }}
          />
        )}
        {step === 'repat' && (
          <Question
            key="repat"
            label="What are your repatriation needs?"
            options={REPAT_OPTIONS}
            renderHint
            onPick={(value) => {
              setAnswer((prev) => ({ ...prev, repatriation: value }))
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
              Products ranked by fit. Talk to a SEBI-registered advisor before deciding.
            </p>
            <ul className="mt-4 space-y-3">
              {NRI_PRODUCTS.map((product) => (
                <ProductRow
                  key={product.key}
                  label={product.label}
                  summary={product.summary}
                  verdict={verdicts[product.key]}
                />
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-card-border pt-5">
              <button
                type="button"
                onClick={reset}
                className="rounded-button border border-card-border bg-card px-4 py-2 text-sm font-medium text-text-primary hover:shadow-card"
              >
                ← Try different answers
              </button>
              <p className="text-xs text-text-muted">
                NRI tax / FEMA rules are personal to your situation. This is direction, not advice.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function isComplete(a: Partial<NriAnswer>): a is NriAnswer {
  return Boolean(a.country && a.fema && a.repatriation)
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

const VERDICT_STYLE: Record<Verdict, { tone: string; icon: React.ReactNode; pill: string }> = {
  fit: {
    tone: 'border-l-gold ring-1 ring-gold/30',
    icon: <CheckCircle2 size={16} className="text-gold" aria-hidden />,
    pill: 'Fits',
  },
  partial: {
    tone: 'border-l-text-muted',
    icon: <MinusCircle size={16} className="text-text-muted" aria-hidden />,
    pill: 'Partial',
  },
  'not-fit': {
    tone: 'border-l-error opacity-60',
    icon: <AlertCircle size={16} className="text-error" aria-hidden />,
    pill: 'Not for you',
  },
}

function ProductRow({
  label,
  summary,
  verdict,
}: {
  label: string
  summary: string
  verdict: Verdict
}) {
  const meta = VERDICT_STYLE[verdict]
  return (
    <li
      className={cn(
        'rounded-card border border-card-border border-l-4 bg-card p-4 shadow-card',
        meta.tone,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          {meta.icon}
          <div>
            <p className="text-base font-semibold text-text-primary">{label}</p>
            <p className="mt-1 text-sm text-text-muted">{summary}</p>
          </div>
        </div>
        <span className="inline-flex items-center rounded-pill bg-text-primary/5 px-2.5 py-1 text-xs font-medium text-text-primary">
          {meta.pill}
        </span>
      </div>
    </li>
  )
}
