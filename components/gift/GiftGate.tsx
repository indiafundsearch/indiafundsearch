'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { GiftRepositoryTable } from './GiftRepositoryTable'
import { ContactForm } from '@/components/contact/ContactForm'
import type { GiftProduct, GiftDirection } from '@/lib/gift/data'

interface GiftGateProps {
  direction: GiftDirection
  curatedAsOf: string
  groupOrder: readonly string[]
}

const DECLARATIONS: Record<GiftDirection, string> = {
  inbound: 'I confirm I am an NRI, OCI or foreign investor.',
  outbound: 'I confirm I am a resident Indian investing under the LRS.',
}

/**
 * Eligibility gate for the named fund shelves. The tables are private-
 * placement / restricted-scheme references, so they must NOT appear in the
 * crawlable HTML: the fund data is fetched from /api/gift only after the
 * visitor self-declares eligibility. Consent is held in sessionStorage only
 * (no cookie, no PII), so it does not persist across sessions.
 */
export function GiftGate({ direction, curatedAsOf, groupOrder }: GiftGateProps) {
  const storageKey = `ifs_gift_gate_${direction}`
  const [accepted, setAccepted] = useState(false)
  const [checked, setChecked] = useState(false)
  const [products, setProducts] = useState<GiftProduct[] | null>(null)
  const [error, setError] = useState(false)

  // Restore consent for this tab session only.
  useEffect(() => {
    if (sessionStorage.getItem(storageKey) === '1') setAccepted(true)
  }, [storageKey])

  // Fetch the shelf only once eligibility is accepted.
  useEffect(() => {
    if (!accepted || products) return
    let live = true
    fetch(`/api/gift?direction=${direction}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('fetch failed'))))
      .then((d: { products: GiftProduct[] }) => {
        if (live) setProducts(d.products)
      })
      .catch(() => live && setError(true))
    return () => {
      live = false
    }
  }, [accepted, products, direction])

  const accept = () => {
    if (!checked) return
    try {
      sessionStorage.setItem(storageKey, '1')
    } catch {
      /* private mode — consent just won't persist across reloads */
    }
    setAccepted(true)
  }

  if (accepted) {
    if (error) {
      return (
        <p className="font-mono text-[12px] text-alert border border-alert/40 bg-white-warm px-4 py-3">
          Couldn&apos;t load the shelf. Please refresh, or{' '}
          <Link href="/contact" className="underline">talk to the desk</Link>.
        </p>
      )
    }
    if (!products) {
      return (
        <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-slate py-8">
          Loading the shelf…
        </p>
      )
    }
    return <GiftRepositoryTable products={products} curatedAsOf={curatedAsOf} groupOrder={groupOrder} />
  }

  return (
    <div className="plot-card px-8 py-8 max-sm:px-5 relative">
      <span className="corner corner-tl" /><span className="corner corner-tr" />
      <span className="corner corner-bl" /><span className="corner corner-br" />

      <div className="eyebrow mb-3">Access notice — eligible investors</div>
      <h2 className="font-sans font-bold text-[22px] leading-tight">
        This shelf is a reference for eligible investors.
      </h2>
      <p className="font-serif text-[16px] text-ink-soft mt-3 max-w-[720px]">
        The funds below are private-placement and restricted-scheme instruments (IFSCA / SEBI). This
        list is shown for reference only — it is <b>not an offer, solicitation or recommendation</b>,
        and nothing here is investment advice. Access route, domicile and minimums are confirmed
        against each fund&apos;s PPM at onboarding. Please confirm your eligibility to continue.
      </p>

      <label className="flex items-start gap-3 mt-6 cursor-pointer select-none max-w-[720px]">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="mt-1 h-4 w-4 accent-[var(--color-ink)] shrink-0"
        />
        <span className="font-sans text-[15px] text-ink">{DECLARATIONS[direction]}</span>
      </label>

      <button
        type="button"
        onClick={accept}
        disabled={!checked}
        className="mt-5 font-sans text-[14px] font-medium tracking-[0.08em] uppercase px-7 py-3 rounded-[3px] bg-ink text-white-warm border-[1.5px] border-ink hover:bg-bronze hover:border-bronze transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        View the shelf →
      </button>

      <div className="dim my-9"><span>Or start a conversation with the desk</span></div>
      <ContactForm />
    </div>
  )
}
