'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { FIT_QUESTIONS } from '@/lib/content/fitFinder'
import type { FitAnswers } from '@/lib/utils/fitScoring'
import { FitResults } from './FitResults'

type PartialAnswers = Partial<FitAnswers>
type Progress = { step: number; answers: PartialAnswers; restored: boolean }

const STORAGE_KEY = 'ifs-fit-progress'
/** Long enough for the selected state to register, short enough not to feel laggy. */
const ADVANCE_MS = 260

/** Seven questions → shortlist. Selecting an answer advances on its own. */
export function FitFinder() {
  const [{ step, answers, restored }, setProgress] = useState<Progress>({
    step: 0,
    answers: {},
    restored: false,
  })
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const done = step >= FIT_QUESTIONS.length

  // Restore an in-progress run so a stray refresh doesn't cost six answers.
  // This has to happen after mount rather than in a lazy initialiser: the
  // server has no sessionStorage, so seeding state from it during render would
  // make the first client render disagree with the server's and break
  // hydration. One setState keeps it to a single extra render.
  useEffect(() => {
    let saved: Partial<Progress> | null = null
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (raw) saved = JSON.parse(raw) as Partial<Progress>
    } catch {
      /* corrupt or unavailable storage is not worth failing the tool over */
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress({
      step: typeof saved?.step === 'number' ? Math.min(saved.step, FIT_QUESTIONS.length) : 0,
      answers: saved?.answers ?? {},
      restored: true,
    })
  }, [])

  useEffect(() => {
    if (!restored) return
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step, answers }))
    } catch {
      /* ignore */
    }
  }, [step, answers, restored])

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const goTo = useCallback((next: number) => {
    setProgress((p) => ({ ...p, step: Math.max(0, next) }))
  }, [])

  const reset = () => {
    if (timer.current) clearTimeout(timer.current)
    setProgress({ step: 0, answers: {}, restored: true })
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }

  const q = done ? null : FIT_QUESTIONS[step]
  const current = q ? answers[q.k as keyof FitAnswers] : undefined

  const pick = useCallback(
    (value: string | number | boolean) => {
      if (!q || timer.current) return
      setProgress((p) => ({ ...p, answers: { ...p.answers, [q.k]: value } }))
      timer.current = setTimeout(() => {
        timer.current = null
        setProgress((p) => ({ ...p, step: p.step + 1 }))
      }, ADVANCE_MS)
    },
    [q],
  )

  // Number keys select; left arrow / backspace steps back.
  useEffect(() => {
    if (done || !q) return
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const n = Number(e.key)
      if (n >= 1 && n <= q.opts.length) {
        e.preventDefault()
        pick(q.opts[n - 1][0])
        return
      }
      if ((e.key === 'ArrowLeft' || e.key === 'Backspace') && step > 0) {
        e.preventDefault()
        goTo(step - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [done, q, step, pick, goTo])

  if (done) return <FitResults answers={answers as FitAnswers} onReset={reset} />
  if (!q) return null


  return (
    <div className="max-w-[760px] mx-auto">
      {/* Progress — completed steps are clickable, so changing an early answer
          doesn't mean pressing Back five times. */}
      <div className="flex items-center gap-3 mb-7">
        <div
          className="flex gap-1.5 flex-1"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={FIT_QUESTIONS.length}
          aria-label={`Question ${step + 1} of ${FIT_QUESTIONS.length}`}
        >
          {FIT_QUESTIONS.map((qq, i) => {
            const reachable = i < step
            return (
              <button
                key={qq.k + i}
                type="button"
                disabled={!reachable}
                onClick={() => goTo(i)}
                aria-label={reachable ? `Back to question ${i + 1}` : undefined}
                className={`flex-1 h-[3px] rounded-[2px] transition-colors duration-300 ${
                  i < step
                    ? 'bg-ink cursor-pointer hover:bg-bronze'
                    : i === step
                      ? 'bg-bronze'
                      : 'bg-line'
                }`}
              />
            )
          })}
        </div>
        <span className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-slate whitespace-nowrap">
          {step + 1} / {FIT_QUESTIONS.length}
        </span>
      </div>

      {/* Keyed on step so React swaps the card immediately; the entrance is a
          CSS animation rather than an AnimatePresence exit/enter pair, which
          would add ~half a second before the next question could be read. */}
      <div key={step} className="plot-card question-in px-11 py-10 max-sm:px-5 max-sm:py-7">
          <h2 className="font-sans font-bold text-[clamp(21px,3vw,27px)] leading-[1.25] mb-2">{q.q}</h2>
          <p className="font-serif italic text-[16px] text-slate mb-6">{q.why}</p>

          <div className="grid gap-2.5">
            {q.opts.map((o, i) => {
              const selected = current !== undefined && String(current) === String(o[0])
              return (
                <button
                  key={String(o[0])}
                  type="button"
                  onClick={() => pick(o[0])}
                  aria-pressed={selected}
                  className={`text-left rounded-plot pl-3.5 pr-[18px] py-[15px] font-sans text-[16px] font-medium flex items-center gap-3 border transition-all ${
                    selected
                      ? 'border-bronze bg-bronze-wash'
                      : 'border-line bg-paper hover:border-bronze hover:bg-bronze-wash'
                  }`}
                >
                  <span
                    aria-hidden
                    className={`font-mono text-[10px] w-5 h-5 shrink-0 rounded-[3px] grid place-items-center border transition-colors max-sm:hidden ${
                      selected ? 'border-bronze text-bronze' : 'border-line text-slate'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="flex-1">{o[1]}</span>
                  {o[2] && (
                    <small className="font-mono text-[10.5px] text-slate font-normal tracking-[0.04em] text-right">
                      {o[2]}
                    </small>
                  )}
                </button>
              )
            })}
          </div>

          <div className="flex items-center justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              disabled={step === 0}
              className="font-mono text-[11px] tracking-[0.12em] uppercase text-slate hover:text-ink disabled:opacity-0 disabled:pointer-events-none transition-colors"
            >
              ← Back
            </button>
            <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-slate max-sm:hidden">
              Press 1–{q.opts.length} to answer
            </span>
          </div>
      </div>
    </div>
  )
}
