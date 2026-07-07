'use client'

import { useState } from 'react'
import { SITE } from '@/lib/constants'

type Step = 'details' | 'otp'

interface GateFormProps {
  onVerified: () => void
}

const inputCls =
  'w-full px-3.5 py-3 border border-line rounded-[3px] bg-paper font-sans text-[15px] text-ink focus:outline-2 focus:outline-bronze-soft'

/** Two-step registration: details → 6-digit email OTP. */
export function GateForm({ onVerified }: GateFormProps) {
  const [step, setStep] = useState<Step>('details')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', location: '' })
  const [token, setToken] = useState('')
  const [code, setCode] = useState('')

  const sendCode = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const res = await fetch('/api/gate/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = (await res.json()) as { token?: string; error?: string; devCode?: string }
      if (!res.ok || !data.token) {
        setError(data.error ?? 'Could not send the code — try again.')
        return
      }
      setToken(data.token)
      if (data.devCode) setCode(data.devCode)
      setStep('otp')
    } catch {
      setError('Network hiccup — try again.')
    } finally {
      setBusy(false)
    }
  }

  const verify = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const res = await fetch('/api/gate/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, code, token }),
      })
      const data = (await res.json()) as { ok?: boolean; error?: string }
      if (!res.ok || !data.ok) {
        setError(data.error ?? 'Incorrect or expired code.')
        return
      }
      onVerified()
    } catch {
      setError('Network hiccup — try again.')
    } finally {
      setBusy(false)
    }
  }

  if (step === 'otp') {
    return (
      <form onSubmit={verify}>
        <div className="eyebrow mb-3">One last step</div>
        <h2 className="font-sans font-bold text-[24px] leading-tight">Check your inbox.</h2>
        <p className="font-serif text-[15.5px] text-ink-soft mt-2">
          We sent a 6-digit code to <b className="text-ink">{form.email}</b>. Enter it to keep
          reading.
        </p>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{6}"
          maxLength={6}
          required
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
          placeholder="······"
          aria-label="6-digit verification code"
          className="mt-5 w-full text-center font-mono text-[32px] tracking-[0.5em] px-3.5 py-3 border border-line rounded-[3px] bg-paper focus:outline-2 focus:outline-bronze-soft"
        />
        {error && <p className="font-mono text-[11.5px] text-alert mt-2">{error}</p>}
        <button
          type="submit"
          disabled={busy || code.length !== 6}
          className="mt-4 w-full font-sans text-[14px] font-medium tracking-[0.08em] uppercase px-6 py-3.5 rounded-[3px] bg-ink text-white-warm border-[1.5px] border-ink hover:bg-bronze hover:border-bronze transition-colors disabled:opacity-40"
        >
          {busy ? 'Verifying…' : 'Verify & continue →'}
        </button>
        <div className="flex justify-between mt-4 font-sans text-[12.5px]">
          <button type="button" onClick={() => setStep('details')} className="text-slate hover:text-ink underline underline-offset-2">
            ← Change details
          </button>
          <button type="button" onClick={() => sendCode()} disabled={busy} className="text-bronze hover:text-ink underline underline-offset-2 disabled:opacity-40">
            Resend code
          </button>
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={sendCode}>
      <div className="eyebrow mb-3">Before you go further</div>
      <h2 className="font-sans font-bold text-[24px] leading-tight">
        Keep reading {SITE.name} — free, always.
      </h2>
      <p className="font-serif text-[15.5px] text-ink-soft mt-2">
        Tell us who&apos;s reading and verify your email once. No spam — at most one thoughtful
        note from the desk.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 mt-5">
        <div className="sm:col-span-2">
          <label htmlFor="g-name" className="font-mono text-[10px] tracking-[0.14em] uppercase text-slate block mb-1.5">
            Name <span className="text-alert">*</span>
          </label>
          <input id="g-name" type="text" required autoComplete="name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="g-email" className="font-mono text-[10px] tracking-[0.14em] uppercase text-slate block mb-1.5">
            Email <span className="text-alert">*</span>
          </label>
          <input id="g-email" type="email" required autoComplete="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={inputCls} />
        </div>
        <div>
          <label htmlFor="g-phone" className="font-mono text-[10px] tracking-[0.14em] uppercase text-slate block mb-1.5">
            Phone <span className="text-alert">*</span>
          </label>
          <input id="g-phone" type="tel" required autoComplete="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className={inputCls} />
        </div>
        <div>
          <label htmlFor="g-loc" className="font-mono text-[10px] tracking-[0.14em] uppercase text-slate block mb-1.5">
            City / Country <span className="text-alert">*</span>
          </label>
          <input id="g-loc" type="text" required autoComplete="address-level2" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} className={inputCls} />
        </div>
      </div>
      {error && <p className="font-mono text-[11.5px] text-alert mt-3">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="mt-5 w-full font-sans text-[14px] font-medium tracking-[0.08em] uppercase px-6 py-3.5 rounded-[3px] bg-ink text-white-warm border-[1.5px] border-ink hover:bg-bronze hover:border-bronze transition-colors disabled:opacity-40"
      >
        {busy ? 'Sending code…' : 'Email me a code →'}
      </button>
      <p className="font-mono text-[9.5px] tracking-[0.08em] uppercase text-slate mt-3 text-center">
        One-time verification · {`Stays valid on this device`}
      </p>
    </form>
  )
}
