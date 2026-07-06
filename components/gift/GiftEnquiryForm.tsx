'use client'

import { useState } from 'react'
import type { GiftProduct } from '@/lib/gift/data'

type State = 'idle' | 'sending' | 'sent' | 'error'

/** Inline enquiry capture on an expanded GIFT product card. */
export function GiftEnquiryForm({ product }: { product: GiftProduct }) {
  const [state, setState] = useState<State>('idle')
  const [form, setForm] = useState({ email: '', phone: '' })

  if (state === 'sent') {
    return (
      <div className="bg-bronze-wash border border-bronze-soft px-4 py-3.5 mt-4">
        <p className="font-sans font-semibold text-[15px]">✓ Enquiry logged.</p>
        <p className="font-serif italic text-[13.5px] text-slate mt-0.5">
          The desk replies within one working day — including if this product is wrong for you.
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
          source: 'GIFT City Enquiry',
          email: form.email,
          phone: form.phone || undefined,
          giftProduct: product.name,
          giftDirection: product.direction === 'inbound' ? 'Inbound — Into India' : 'Outbound — Global',
        }),
      })
      setState(res.ok ? 'sent' : 'error')
    } catch {
      setState('error')
    }
  }

  return (
    <form onSubmit={submit} className="mt-4 border-t border-line-soft pt-4">
      <p className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-bronze mb-2.5">
        Ask the desk about this product
      </p>
      <div className="grid gap-2 sm:grid-cols-[1.4fr_1fr_auto]">
        <input
          type="email"
          required
          placeholder="Email*"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="px-3 py-2.5 border border-line rounded-[3px] bg-paper font-sans text-[14px] focus:outline-2 focus:outline-bronze-soft"
        />
        <input
          type="tel"
          placeholder="Phone / WhatsApp"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className="px-3 py-2.5 border border-line rounded-[3px] bg-paper font-sans text-[14px] focus:outline-2 focus:outline-bronze-soft"
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          className="font-sans text-[12px] font-medium tracking-[0.08em] uppercase px-4 py-2.5 rounded-[3px] bg-ink text-white-warm hover:bg-bronze transition-colors disabled:opacity-50"
        >
          {state === 'sending' ? 'Sending…' : 'Enquire →'}
        </button>
      </div>
      {state === 'error' && (
        <p className="font-mono text-[11px] text-alert mt-1.5">Something went wrong — please try again.</p>
      )}
    </form>
  )
}
