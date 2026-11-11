'use client'

import { GA_ID, OPEN_CONSENT_EVENT } from '@/lib/analytics/ga'

/** Reopens the analytics banner so a visitor can change their mind either way.
 *  Renders nothing while analytics is not configured. */
export function CookieSettingsLink({ className }: { className?: string }) {
  if (!GA_ID) return null
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className={className}
    >
      Cookie settings
    </button>
  )
}
