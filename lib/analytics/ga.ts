/**
 * Google Analytics 4 — the only place in the codebase that talks to gtag.
 *
 * Three rules, enforced here rather than left to each caller:
 *
 * 1. NOTHING LOADS without a measurement ID in NEXT_PUBLIC_GA_MEASUREMENT_ID
 *    and an explicit "Accept" from the visitor. Reject, or no answer, means
 *    no script, no cookie, no request.
 * 2. EVENTS ARE ALLOWLISTED. `trackEvent` only accepts the names and
 *    parameters typed below. There is no free-form parameter, so a form value
 *    (name, email, phone, city, amounts, free text) cannot be sent by mistake.
 * 3. URLS ARE SANITISED. Every page URL and referrer sent to GA4 is rebuilt
 *    as origin + path, plus the three UTM labels we set ourselves. Any other
 *    query parameter is dropped before it leaves the browser.
 *
 * See ANALYTICS.md for what each event means and what it does not prove.
 */

const RAW_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? ''

/** Empty string when unset or malformed — every caller treats that as "off". */
export const GA_ID = /^G-[A-Z0-9]{4,20}$/.test(RAW_ID) ? RAW_ID : ''

// ─────────────────────────────────────────────────────────────── consent ──

export type Consent = 'granted' | 'denied' | 'unset'

const CONSENT_KEY = 'ifs_analytics_consent_v1'
const CONSENT_DAYS = 180
export const CONSENT_EVENT = 'ifs:analytics-consent'
export const OPEN_CONSENT_EVENT = 'ifs:open-analytics-consent'

export function readConsent(): Consent {
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return 'unset'
    const { v, t } = JSON.parse(raw) as { v?: string; t?: number }
    if (typeof t !== 'number' || Date.now() - t > CONSENT_DAYS * 86_400_000) return 'unset'
    return v === 'granted' || v === 'denied' ? v : 'unset'
  } catch {
    return 'unset'
  }
}

export function writeConsent(value: 'granted' | 'denied') {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ v: value, t: Date.now() }))
  } catch {
    /* storage blocked: the banner will ask again next visit */
  }
  if (value === 'denied') disableAndClear()
  else if (GA_ID) (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = false
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }))
}

/** Withdrawal: stop gtag for this page and remove the cookies it set. */
function disableAndClear() {
  if (!GA_ID) return
  ;(window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true
  const host = location.hostname
  const domains = [host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`]
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim()
    if (!name.startsWith('_ga')) continue
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`
    }
    document.cookie = `${name}=; Max-Age=0; path=/`
  }
}

// ────────────────────────────────────────────────────────── sanitising ──

/** The only query parameters that survive. They are labels we put on our own
 *  links, not information about the visitor. */
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign'] as const

/** origin + path, plus allowlisted UTM labels reduced to [a-z0-9._-]. */
export function sanitizeUrl(input: string): string {
  let url: URL
  try {
    url = new URL(input, location.origin)
  } catch {
    return ''
  }
  const kept = new URLSearchParams()
  for (const key of UTM_KEYS) {
    const value = url.searchParams.get(key)
    if (!value) continue
    const clean = value.toLowerCase().replace(/[^a-z0-9._-]/g, '').slice(0, 60)
    if (clean) kept.set(key, clean)
  }
  const query = kept.toString()
  return `${url.origin}${url.pathname}${query ? `?${query}` : ''}`
}

/** A referrer is only ever origin + path. No query string, no fragment. */
export function sanitizeReferrer(input: string): string {
  if (!input) return ''
  try {
    const url = new URL(input)
    return `${url.origin}${url.pathname}`
  } catch {
    return ''
  }
}

// ───────────────────────────────────────────────────────────── events ──

/**
 * The complete event vocabulary. Adding an event means adding it here, with
 * its exact parameters, and documenting it in ANALYTICS.md.
 *
 * A click is not a submission, and a submission is not a client:
 *   contact_click                   interest shown — NOT proof of contact
 *   blueprint_form_submit_success   server confirmed the Fit Finder lead saved
 *   enquiry_form_submit_success     server confirmed another enquiry saved
 *   gift_gate_verify_success        server confirmed the GIFT City email code
 * Qualified lead, meeting and funded client are tracked offline, never here.
 */
export type AnalyticsEvent =
  | { name: 'fit_finder_start' }
  | { name: 'fit_finder_step'; params: { step_number: number } }
  | { name: 'fit_finder_complete' }
  | { name: 'blueprint_form_submit_success' }
  | {
      name: 'enquiry_form_submit_success'
      params: { form_name: 'contact' | 'gift_enquiry' | 'corridor_access' }
    }
  | { name: 'gift_gate_verify_success' }
  | {
      name: 'contact_click'
      params: {
        channel: 'whatsapp' | 'email' | 'booking'
        placement: 'footer' | 'contact_page' | 'nri_page' | 'sticky_bar' | 'next_step'
      }
    }

type Gtag = (...args: unknown[]) => void

function gtag(): Gtag | null {
  const fn = (window as unknown as { gtag?: Gtag }).gtag
  return typeof fn === 'function' ? fn : null
}

/** Sends nothing unless an ID is configured, consent is granted and gtag has
 *  been initialised. Events before consent are dropped, not queued. */
export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === 'undefined' || !GA_ID) return
  if (readConsent() !== 'granted') return
  const send = gtag()
  if (!send) return
  send('event', event.name, 'params' in event ? event.params : {})
}

/** One page_view, with a sanitised location and referrer. */
export function trackPageView(previousUrl: string) {
  const send = gtag()
  if (!send || !GA_ID) return
  const location_ = sanitizeUrl(window.location.href)
  const referrer = previousUrl || sanitizeReferrer(document.referrer)
  // `set` persists, so GA4's own later events on this page (scroll,
  // engagement) carry the sanitised URL too, not the raw one.
  send('set', { page_location: location_, page_referrer: referrer, page_title: document.title })
  send('event', 'page_view', {
    page_location: location_,
    page_referrer: referrer,
    page_title: document.title,
  })
}
