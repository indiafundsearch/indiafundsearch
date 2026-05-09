'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type LeadSource =
  | 'Fee X-Ray'
  | 'Diagnostic'
  | 'Scorecard'
  | 'FD Visualiser'
  | 'Translator Pathfinder'
  | 'Newsletter'

type Props = {
  open: boolean
  onClose: () => void
  source: LeadSource
  /** Additional fields merged into the leadCapture Sanity document. */
  payload?: Record<string, unknown>
  /** Modal headline. */
  headline?: string
  /** Modal subtext. */
  subtext?: string
  /** Phone + city default visible; pass false to hide them entirely. */
  collectExtras?: boolean
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function EmailCaptureModal({
  open,
  onClose,
  source,
  payload,
  headline = 'Email this to yourself',
  subtext = 'We\'ll send a clean copy you can save, screenshot, or share. No spam — one email, then nothing else unless you ask.',
  collectExtras = true,
}: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const dialogRef = useRef<HTMLDivElement | null>(null)

  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  // ESC closes when not submitting.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && status !== 'submitting') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, status, onClose])

  // Reset form when modal closes (after a beat so success message isn't visible mid-fade).
  useEffect(() => {
    if (open) return
    const timer = setTimeout(() => {
      setStatus('idle')
      setErrorMessage(null)
      setEmail('')
      setPhone('')
      setCity('')
    }, 200)
    return () => clearTimeout(timer)
  }, [open])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.includes('@')) {
      setStatus('error')
      setErrorMessage('Enter a valid email.')
      return
    }
    setStatus('submitting')
    setErrorMessage(null)
    try {
      const response = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source,
          email,
          phone: phone || undefined,
          city: city || undefined,
          ...(payload ?? {}),
        }),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Could not send. Try again in a moment.')
      }
      setStatus('success')
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong.')
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="email-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="email-modal-title"
          ref={dialogRef}
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close dialog"
            onClick={() => status !== 'submitting' && onClose()}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            className="relative z-10 w-full max-w-md rounded-card border border-card-border bg-card p-6 shadow-card-hover md:p-8"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => status !== 'submitting' && onClose()}
              className="absolute right-2 top-2 inline-flex h-10 w-10 items-center justify-center rounded-button text-text-muted hover:bg-black/5"
            >
              <X size={18} />
            </button>

            {status === 'success' ? (
              <SuccessState onClose={onClose} />
            ) : (
              <Form
                headline={headline}
                subtext={subtext}
                email={email}
                phone={phone}
                city={city}
                collectExtras={collectExtras}
                status={status}
                errorMessage={errorMessage}
                onEmailChange={setEmail}
                onPhoneChange={setPhone}
                onCityChange={setCity}
                onSubmit={handleSubmit}
              />
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function Form({
  headline,
  subtext,
  email,
  phone,
  city,
  collectExtras,
  status,
  errorMessage,
  onEmailChange,
  onPhoneChange,
  onCityChange,
  onSubmit,
}: {
  headline: string
  subtext: string
  email: string
  phone: string
  city: string
  collectExtras: boolean
  status: Status
  errorMessage: string | null
  onEmailChange: (next: string) => void
  onPhoneChange: (next: string) => void
  onCityChange: (next: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) {
  const submitting = status === 'submitting'
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h3 id="email-modal-title" className="text-2xl font-semibold text-text-primary">
          {headline}
        </h3>
        <p className="mt-2 text-sm text-text-muted">{subtext}</p>
      </div>

      <Field label="Email" required>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          autoComplete="email"
          placeholder="you@example.com"
          disabled={submitting}
          className="w-full rounded-button border border-card-border bg-card px-3 py-2 text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-gold disabled:opacity-60"
        />
      </Field>

      {collectExtras ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone (optional)">
            <input
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(event) => onPhoneChange(event.target.value)}
              autoComplete="tel"
              placeholder="+91 …"
              disabled={submitting}
              className="w-full rounded-button border border-card-border bg-card px-3 py-2 text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-gold disabled:opacity-60"
            />
          </Field>
          <Field label="City (optional)">
            <input
              type="text"
              value={city}
              onChange={(event) => onCityChange(event.target.value)}
              autoComplete="address-level2"
              placeholder="Mumbai, Vadodara…"
              disabled={submitting}
              className="w-full rounded-button border border-card-border bg-card px-3 py-2 text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-gold disabled:opacity-60"
            />
          </Field>
        </div>
      ) : null}

      {status === 'error' && errorMessage ? (
        <p className="rounded-button bg-error/10 px-3 py-2 text-sm text-error" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="flex items-center justify-between gap-3 pt-2">
        <p className="text-xs text-text-muted">No marketing list. One email, then silence.</p>
        <button
          type="submit"
          disabled={submitting}
          className={cn(
            'inline-flex items-center gap-2 rounded-button bg-text-primary px-5 py-2.5 text-sm font-medium text-white shadow-card transition-all hover:opacity-90 hover:shadow-card-hover disabled:opacity-60',
          )}
        >
          {submitting ? 'Sending…' : 'Send →'}
        </button>
      </div>
    </form>
  )
}

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <div className="text-center">
      <span aria-hidden className="inline-flex h-12 w-12 items-center justify-center rounded-pill bg-gold/15 text-gold">
        <CheckCircle2 size={24} />
      </span>
      <h3 className="mt-4 text-2xl font-semibold text-text-primary">Sent — check your inbox.</h3>
      <p className="mt-2 text-sm text-text-muted">
        If it isn&rsquo;t there in a minute, peek in spam. We&rsquo;ll never share your email.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-6 inline-flex items-center justify-center rounded-button bg-text-primary px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
      >
        Close
      </button>
    </div>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
        {label}
        {required ? <span className="ml-1 text-error">*</span> : null}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  )
}
