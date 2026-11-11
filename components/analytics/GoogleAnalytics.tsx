'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import {
  CONSENT_EVENT,
  GA_ID,
  OPEN_CONSENT_EVENT,
  readConsent,
  sanitizeUrl,
  trackPageView,
  writeConsent,
  type Consent,
} from '@/lib/analytics/ga'

/**
 * Consent banner + GA4 loader.
 *
 * - No measurement ID: renders nothing at all. No banner, no script.
 * - ID set, no choice yet: the banner shows; gtag.js is NOT requested.
 * - Accept: gtag.js loads and page views start.
 * - Reject: nothing loads. The choice is remembered for 180 days and can be
 *   changed from "Cookie settings" in the footer.
 */
export function GoogleAnalytics() {
  if (!GA_ID) return null
  return <ConsentedAnalytics />
}

function ConsentedAnalytics() {
  const pathname = usePathname()
  // 'pending' until localStorage has been read on the client.
  const [consent, setConsent] = useState<Consent | 'pending'>('pending')
  const [bannerOpen, setBannerOpen] = useState(false)
  const [ready, setReady] = useState(false)
  const lastTracked = useRef<string | null>(null)
  const previousUrl = useRef('')

  useEffect(() => {
    const stored = readConsent()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(stored)
    setBannerOpen(stored === 'unset')
    const onChange = (e: Event) => setConsent((e as CustomEvent<Consent>).detail)
    const onOpen = () => setBannerOpen(true)
    window.addEventListener(CONSENT_EVENT, onChange)
    window.addEventListener(OPEN_CONSENT_EVENT, onOpen)
    return () => {
      window.removeEventListener(CONSENT_EVENT, onChange)
      window.removeEventListener(OPEN_CONSENT_EVENT, onOpen)
    }
  }, [])

  // Exactly one page_view per path. `send_page_view` is off in the config, so
  // this is the only source; the ref stops a re-render or a dev double-effect
  // from sending a second one.
  useEffect(() => {
    if (consent !== 'granted' || !ready) return
    if (lastTracked.current === pathname) return
    lastTracked.current = pathname
    trackPageView(previousUrl.current)
    previousUrl.current = sanitizeUrl(window.location.href)
  }, [consent, ready, pathname])

  const onStudio = pathname.startsWith('/studio')
  const choose = (value: 'granted' | 'denied') => {
    writeConsent(value)
    setBannerOpen(false)
  }

  return (
    <>
      {consent === 'granted' && (
        <>
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  analytics_storage: 'granted',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
gtag('js', new Date());
gtag('config', '${GA_ID}', {
  send_page_view: false,
  allow_google_signals: false,
  allow_ad_personalization_signals: false
});`}
          </Script>
          <Script
            id="ga4-lib"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
            onReady={() => setReady(true)}
          />
        </>
      )}

      {bannerOpen && !onStudio && (
        <div
          role="dialog"
          aria-label="Analytics cookies"
          className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 max-sm:px-2 max-sm:pb-2"
        >
          <div className="mx-auto max-w-[760px] bg-white-warm border border-ink shadow-plot px-6 py-5 max-sm:px-4">
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-bronze mb-1.5">
              Analytics cookies
            </p>
            <p className="text-[15px] text-ink-soft leading-[1.5]">
              May we use Google Analytics to count visits and see which pages help? It sets
              cookies on your device. We never send it your name, email, phone number or anything
              you type into a form. Nothing loads unless you accept.{' '}
              <Link href="/privacy" className="text-bronze border-b border-bronze-soft">
                Privacy policy
              </Link>
            </p>
            <div className="mt-4 flex gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => choose('denied')}
                className="font-sans text-[13px] font-medium tracking-[0.08em] uppercase px-5 py-2.5 rounded-[3px] border-[1.5px] border-ink text-ink bg-white-warm hover:bg-paper transition-colors"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => choose('granted')}
                className="font-sans text-[13px] font-medium tracking-[0.08em] uppercase px-5 py-2.5 rounded-[3px] border-[1.5px] border-ink text-ink bg-white-warm hover:bg-paper transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
