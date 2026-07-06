'use client'

import { useState } from 'react'

type State = 'idle' | 'sending' | 'sent' | 'error'

const INTERESTS = [
  'GIFT City — Inbound (NRI)',
  'GIFT City — Outbound (Global)',
  'PMS / AIF / SIF',
  'Not sure yet — general conversation',
]

export function ContactForm() {
  const [state, setState] = useState<State>('idle')
  const [form, setForm] = useState({ email: '', phone: '', city: '', interest: INTERESTS[3], message: '' })

  if (state === 'sent') {
    return (
      <div className="plot-card px-8 py-10 text-center">
        <p className="font-sans text-xl font-bold">✓ With the desk.</p>
        <p className="font-serif italic text-[15.5px] text-slate mt-2">
          A human reads this next — expect a reply within one working day.
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
          source: 'Contact',
          email: form.email,
          phone: form.phone || undefined,
          city: form.city || undefined,
          interest: form.interest,
          message: form.message || undefined,
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
    <form onSubmit={submit} className="plot-card px-8 py-8 max-sm:px-4">
      <span className="corner corner-tl" /><span className="corner corner-tr" />
      <span className="corner corner-bl" /><span className="corner corner-br" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-email" className="font-mono text-[10px] tracking-[0.14em] uppercase text-slate block mb-1.5">
            Email <span className="text-alert">*</span>
          </label>
          <input id="c-email" type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={inputCls} />
        </div>
        <div>
          <label htmlFor="c-phone" className="font-mono text-[10px] tracking-[0.14em] uppercase text-slate block mb-1.5">
            Phone / WhatsApp
          </label>
          <input id="c-phone" type="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className={inputCls} />
        </div>
        <div>
          <label htmlFor="c-city" className="font-mono text-[10px] tracking-[0.14em] uppercase text-slate block mb-1.5">
            City
          </label>
          <input id="c-city" type="text" value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} className={inputCls} />
        </div>
        <div>
          <label htmlFor="c-interest" className="font-mono text-[10px] tracking-[0.14em] uppercase text-slate block mb-1.5">
            What brings you here
          </label>
          <select id="c-interest" value={form.interest} onChange={(e) => setForm((f) => ({ ...f, interest: e.target.value }))} className={inputCls}>
            {INTERESTS.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-msg" className="font-mono text-[10px] tracking-[0.14em] uppercase text-slate block mb-1.5">
            Anything specific?
          </label>
          <textarea id="c-msg" rows={4} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} className={inputCls} />
        </div>
      </div>
      <button
        type="submit"
        disabled={state === 'sending'}
        className="mt-5 font-sans text-[14px] font-medium tracking-[0.08em] uppercase px-7 py-3 rounded-[3px] bg-ink text-white-warm border-[1.5px] border-ink hover:bg-bronze hover:border-bronze transition-colors disabled:opacity-50"
      >
        {state === 'sending' ? 'Sending…' : 'Send to the desk →'}
      </button>
      {state === 'error' && (
        <p className="font-mono text-[11.5px] text-alert mt-2">Something went wrong — please try again, or use WhatsApp.</p>
      )}
    </form>
  )
}
