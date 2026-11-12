'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { whatsappHref } from '@/lib/constants'
import { TrackedContactLink } from '@/components/analytics/TrackedContactLink'

/** Pages where the bar would compete with the page's own primary action. */
const HIDDEN_ON = ['/fit-finder', '/contact', '/studio', '/privacy', '/disclosures']

/**
 * Phone-only action bar. Long guides put the first call to action several
 * screens down; this keeps the two next steps within reach once the reader has
 * scrolled past the opening screen. It stays out of the way before that.
 */
export function MobileActionBar() {
  const pathname = usePathname()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null

  return (
    <div
      aria-hidden={!shown}
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 bg-white-warm border-t-2 border-ink transition-transform duration-300 ${
        shown ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex">
        <Link
          href="/fit-finder"
          tabIndex={shown ? 0 : -1}
          className="flex-1 text-center font-sans text-[13px] font-medium tracking-[0.08em] uppercase py-3.5 bg-ink text-white-warm"
        >
          Find your fit
        </Link>
        <TrackedContactLink
          channel="whatsapp"
          placement="sticky_bar"
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={shown ? 0 : -1}
          className="flex-1 text-center font-sans text-[13px] font-medium tracking-[0.08em] uppercase py-3.5 text-ink border-l border-line"
        >
          WhatsApp the desk
        </TrackedContactLink>
      </div>
    </div>
  )
}
