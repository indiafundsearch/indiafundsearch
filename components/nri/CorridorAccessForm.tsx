'use client'

import { useState } from 'react'

type State = 'idle' | 'sending' | 'sent' | 'error'

/**
 * The corridor lead magnet. Which houses actually onboard investors from a
 * given country is desk knowledge that no public source tracks — so rather
 * than publish a table that goes stale, we hand it over on request and keep
 * the lead. Everything else on the corridor pages stays ungated.
 */
export function CorridorAccessForm({ country, label }: { country: string; label: string }) {
  const [state, setState] = useState<State>('idle')
  const [form, setForm] = useState({ email: '', phone: '' })

  if (state === 'sent') {
    return (
      <div className="plot-card px-8 py-9 text-center max-sm:px-5">
        <span className="corner corner-tl" /><span className="corner corner-tr" />
        <span className="corner corner-bl" /><span className="corner corner-br" />
        <p className="font-sans text-xl font-bold">✓ Request logged.</p>
        <p className="font-serif italic text-[15.5px] text-slate mt-2 max-w-[520px] mx-auto">
          The desk checks the current empanelments before sending anything — expect the {label} list
          within one working day, minimums included.
        </p>
      </div>
    )
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('sending')
    try {
      const res = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'Corridor Access List',
          email: form.email,
          phone: form.phone || undefined,
          interest: label,
        }),
      })
      setState(res.ok ? 'sent' : 'error')
    } catch {
      setState('error')
    }
  }

  const inputCls =
    'w-full px-3.5 py-3 border border-line rounded-[3px] bg-paper font-sans text-[15px] text-ink focus:outline-2 focus:outline-bronze-soft'

  return (
    <form onSubmit={submit} className="plot-card px-8 py-8 max-sm:px-5">
      <span className="corner corner-tl" /><span className="corner corner-tr" />
      <span className="corner corner-bl" /><span className="corner corner-br" />
      <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-signal font-semibold block mb-2">
        Ask the desk
      </span>
      <p className="font-sans font-bold text-[19px] leading-snug">
        Get the current list of houses open to investors in {country}.
      </p>
      <p className="font-serif text-[15.5px] text-ink-soft mt-2 max-w-[600px]">
        We check it against our own empanelments before we send it — including the minimums and
        which route each house accepts. No public source tracks this, and it changes month to month.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 mt-5">
        <div>
          <label
            htmlFor="ca-email"
            className="font-mono text-[10px] tracking-[0.14em] uppercase text-slate block mb-1.5"
          >
            Email <span className="text-alert">*</span>
          </label>
          <input
            id="ca-email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputCls}
          />
        </div>
        <div>
          <label
            htmlFor="ca-phone"
            className="font-mono text-[10px] tracking-[0.14em] uppercase text-slate block mb-1.5"
          >
            Phone / WhatsApp
          </label>
          <input
            id="ca-phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className={inputCls}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={state === 'sending'}
        className="mt-5 font-sans text-[14px] font-medium tracking-[0.08em] uppercase px-7 py-3 rounded-[3px] bg-ink text-white-warm border-[1.5px] border-ink hover:bg-bronze hover:border-bronze transition-colors disabled:opacity-50"
      >
        {state === 'sending' ? 'Sending…' : 'Send me the list →'}
      </button>
      {state === 'error' && (
        <p className="font-mono text-[11.5px] text-alert mt-2">
          Something went wrong — please try again, or use WhatsApp.
        </p>
      )}
      <p className="font-mono text-[10px] tracking-[0.06em] uppercase text-slate mt-3">
        One email. No newsletter, no drip sequence.
      </p>
    </form>
  )
}
