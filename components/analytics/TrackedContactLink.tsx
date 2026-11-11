'use client'

import { trackEvent, type AnalyticsEvent } from '@/lib/analytics/ga'

type ContactParams = Extract<AnalyticsEvent, { name: 'contact_click' }>['params']

/**
 * An ordinary link that also records `contact_click`. The event carries the
 * channel and where the link sat, never the link's URL. A click shows
 * interest. It does not show that a message was sent or a call took place.
 */
export function TrackedContactLink({
  channel,
  placement,
  children,
  ...anchor
}: ContactParams & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...anchor}
      onClick={(e) => {
        anchor.onClick?.(e)
        trackEvent({ name: 'contact_click', params: { channel, placement } })
      }}
    >
      {children}
    </a>
  )
}
