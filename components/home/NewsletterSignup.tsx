'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim() || !email.includes('@')) {
      setError('Enter a valid email.')
      setStatus('error')
      return
    }
    setStatus('submitting')
    setError(null)
    try {
      const res = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'Newsletter' }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(data?.error ?? 'Could not subscribe right now.')
      }
      setStatus('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  return (
    <section className="container-grid py-16 md:py-24">
      <div className="overflow-hidden rounded-card border border-card-border border-l-4 border-l-gold bg-card p-6 shadow-card md:grid md:grid-cols-[1.1fr_1fr] md:items-center md:gap-10 md:p-10">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-gold">Signal alerts</p>
          <h2 className="mt-2 max-w-xl">
            Know when a fund&rsquo;s signals change.
          </h2>
          <p className="mt-3 max-w-prose text-base text-text-muted md:text-lg">
            We watch SEBI filings, manager moves, AUM swings, and fee changes on every fund you score. Plus a Friday digest of what actually moved Indian alternatives this week.
          </p>
          <p className="mt-3 text-xs text-text-muted">
            No spam. Unsubscribe in one click. Education-first, never sponsored.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          aria-label="Subscribe to alerts"
          className="mt-6 flex w-full flex-col gap-3 md:mt-0"
        >
          {status === 'success' ? (
            <SuccessState />
          ) : (
            <>
              <label className="flex flex-col gap-2 text-sm font-medium text-text-primary md:flex-row md:items-center md:gap-2">
                <span className="sr-only md:not-sr-only md:shrink-0">Email</span>
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === 'error') {
                      setStatus('idle')
                      setError(null)
                    }
                  }}
                  placeholder="you@example.com"
                  disabled={status === 'submitting'}
                  className={cn(
                    'flex-1 rounded-button border border-card-border bg-background px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold/40',
                    status === 'error' && 'border-error focus:ring-error/30',
                  )}
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center justify-center gap-1.5 rounded-button bg-text-primary px-5 py-3 text-sm font-medium text-white shadow-card transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
                  {status !== 'submitting' ? <ArrowRight size={14} aria-hidden /> : null}
                </button>
              </label>
              {error ? (
                <p role="alert" className="text-xs text-error">
                  {error}
                </p>
              ) : (
                <p className="text-xs text-text-muted">
                  Friday digest. No daily noise. Average 2 emails / month.
                </p>
              )}
            </>
          )}
        </form>
      </div>
    </section>
  )
}

function SuccessState() {
  return (
    <div className="flex items-start gap-3 rounded-card border border-success/30 bg-success/10 p-4 text-sm text-success">
      <CheckCircle2 size={18} aria-hidden className="mt-0.5 shrink-0" />
      <div>
        <p className="font-semibold">You&rsquo;re on the list.</p>
        <p className="mt-1 text-text-muted">
          We sent a note to your inbox. The Friday digest will land at the end of this week.
        </p>
      </div>
    </div>
  )
}
