'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  HORIZON_NAMES,
  OBJECTIVE_NAMES,
  scoreFit,
  type FitAnswers,
} from '@/lib/utils/fitScoring'

interface FitResultsProps {
  answers: FitAnswers
  onReset: () => void
}

type GateState = 'idle' | 'sending' | 'sent' | 'error'

/** Free on-screen shortlist + gated "full blueprint" email capture. */
export function FitResults({ answers, onReset }: FitResultsProps) {
  const ranked = scoreFit(answers)
  const max = ranked.length ? ranked[0].score : 1
  const top = ranked.slice(0, 6)
  const nri = answers.res === 'nri'

  const [gate, setGate] = useState<GateState>('idle')
  const [form, setForm] = useState({ email: '', phone: '', city: '' })

  const shortlist = top.map((r) => ({
    name: r.product.name,
    badge: r.product.badge,
    fitIndex: Math.max(42, Math.round((r.score / max) * 100)),
  }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGate('sending')
    try {
      const res = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'Fit Finder',
          email: form.email,
          phone: form.phone || undefined,
          city: form.city || undefined,
          fitObjective: OBJECTIVE_NAMES[answers.obj],
          fitHorizon: `${HORIZON_NAMES[answers.hz]} horizon`,
          fitShortlist: shortlist,
        }),
      })
      setGate(res.ok ? 'sent' : 'error')
    } catch {
      setGate('error')
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="max-w-[760px] mx-auto">
      {/* Summary */}
      <div className="bg-ink text-white-warm px-[30px] py-[26px] border-l-4 border-signal mb-[22px] max-sm:px-5">
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-bronze-soft">Your shortlist</div>
        <h2 className="font-sans text-xl font-bold mt-2">
          Built for {OBJECTIVE_NAMES[answers.obj]}, {HORIZON_NAMES[answers.hz]} horizon
          {nri ? ', NRI structuring' : ''}.
        </h2>
        <p className="text-[16px] text-[#c7d6ce] mt-2">
          Not a recommendation — a shortlist of structures whose shape fits your answers. The real
          conversation starts here.
        </p>
      </div>

      {/* Result cards */}
      {top.map((r, i) => {
        const pct = Math.max(42, Math.round((r.score / max) * 100))
        return (
          <motion.div
            key={r.product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.07 }}
            className="bg-white-warm border border-line shadow-plot px-7 py-6 mb-4 flex gap-[22px] items-start max-sm:flex-col max-sm:gap-3 max-sm:px-4"
          >
            <div className="shrink-0 w-[72px] text-center border-[1.5px] border-signal px-1 pt-2.5 pb-2">
              <b className="font-sans text-[22px] font-bold text-bronze block">{pct}</b>
              <span className="font-mono text-[8.5px] tracking-[0.14em] uppercase text-slate">Fit index</span>
            </div>
            <div className="flex-1">
              <h3 className="font-sans text-[19px] font-bold flex items-center gap-2.5 flex-wrap">
                {r.product.name}
                <span className="font-mono text-[9.5px] tracking-[0.1em] uppercase bg-ink text-white-warm px-2 py-[3px] rounded-[2px]">
                  {r.product.badge}
                </span>
              </h3>
              <div className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-bronze mt-0.5">
                {r.product.tag} · {r.product.ret.split('·')[0].trim()} · min {r.product.min.split('(')[0].trim()}
              </div>
              {r.why.length > 0 && (
                <ul className="mt-2">
                  {r.why.map((w) => (
                    <li key={w} className="relative py-1 pl-[22px] text-[14.5px] text-ink-soft before:content-[''] before:absolute before:left-0.5 before:top-3 before:w-2.5 before:h-[1.5px] before:bg-bronze-soft">
                      {w}
                    </li>
                  ))}
                </ul>
              )}
              {nri && r.product.nriNote && (
                <p className="font-mono text-[11px] text-alert border-l-2 border-alert pl-2.5 mt-2.5">
                  NRI · {r.product.nriNote}
                </p>
              )}
              <Link
                href={`/learn/${r.product.slug}`}
                className="inline-block mt-3 font-sans text-[12.5px] font-medium tracking-[0.06em] uppercase text-bronze border-b-[1.5px] border-bronze-soft"
              >
                Read the full specification →
              </Link>
            </div>
          </motion.div>
        )
      })}

      {/* Gated blueprint */}
      <div className="plot-card px-8 py-8 mt-8 max-sm:px-4">
        <span className="corner corner-tl" /><span className="corner corner-tr" />
        <span className="corner corner-bl" /><span className="corner corner-br" />
        {gate === 'sent' ? (
          <div className="text-center py-4">
            <p className="font-sans text-xl font-bold">✓ Blueprint on its way.</p>
            <p className="font-serif italic text-[15.5px] text-slate mt-2">
              Check your inbox — and the desk will reach out within one working day.
            </p>
          </div>
        ) : (
          <>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze mb-1.5">
              The full blueprint
            </div>
            <p className="font-sans text-[19px] font-bold">
              Get this shortlist as a personalised blueprint — plus the questions to ask before committing.
            </p>
            <form onSubmit={submit} className="grid gap-3 sm:grid-cols-[1.4fr_1fr_1fr_auto] mt-5">
              <input
                type="email"
                required
                placeholder="Email*"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="px-3.5 py-3 border border-line rounded-[3px] bg-paper font-sans text-[15px] focus:outline-2 focus:outline-bronze-soft"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="px-3.5 py-3 border border-line rounded-[3px] bg-paper font-sans text-[15px] focus:outline-2 focus:outline-bronze-soft"
              />
              <input
                type="text"
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                className="px-3.5 py-3 border border-line rounded-[3px] bg-paper font-sans text-[15px] focus:outline-2 focus:outline-bronze-soft"
              />
              <button
                type="submit"
                disabled={gate === 'sending'}
                className="font-sans text-[13px] font-medium tracking-[0.08em] uppercase px-5 py-3 rounded-[3px] bg-ink text-white-warm border-[1.5px] border-ink hover:bg-bronze hover:border-bronze transition-colors disabled:opacity-50"
              >
                {gate === 'sending' ? 'Sending…' : 'Send it →'}
              </button>
            </form>
            {gate === 'error' && (
              <p className="font-mono text-[11.5px] text-alert mt-2">Something went wrong — please try again.</p>
            )}
            <p className="font-mono text-[10px] tracking-[0.06em] uppercase text-slate mt-3">
              No spam · One follow-up from the desk · That&apos;s it
            </p>
          </>
        )}
      </div>

      <div className="flex justify-between mt-6 flex-wrap gap-3">
        <button
          type="button"
          onClick={onReset}
          className="font-sans text-[14px] font-medium tracking-[0.08em] uppercase px-6 py-3 rounded-[3px] border-[1.5px] border-ink text-ink hover:bg-paper-2 transition-colors"
        >
          ↺ Start over
        </button>
        <Link
          href="/learn"
          className="font-sans text-[14px] font-medium tracking-[0.08em] uppercase px-6 py-3 rounded-[3px] border-[1.5px] border-ink bg-ink text-white-warm hover:bg-bronze hover:border-bronze transition-colors"
        >
          Explore all materials →
        </Link>
      </div>

      <p className="font-serif italic text-[13.5px] text-slate mt-6 border-t border-line pt-4 leading-[1.55]">
        This shortlist is generated from your seven answers as an educational starting point — it is
        not investment advice, a recommendation, or an assurance of suitability or returns. Minimums
        reflect SEBI category thresholds. Indicative ranges are house-view orientations, not
        forecasts. Any actual allocation follows a full suitability discussion, documentation, and
        confirmation of tax treatment with your CA.
      </p>
    </motion.div>
  )
}
