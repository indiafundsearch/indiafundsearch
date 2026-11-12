'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { whatsappHref } from '@/lib/constants'
import { TrackedContactLink } from '@/components/analytics/TrackedContactLink'

/**
 * Hub pages that used to end without any route to the Fit Finder or the desk.
 * Templates that already close with their own call to action are left alone.
 */
const SHOWN_ON = ['/tax', '/gift-city', '/gift-city/outbound', '/nri', '/us-tax', '/uk-tax', '/learn']

export function NextStep() {
  const pathname = usePathname()
  if (!SHOWN_ON.includes(pathname)) return null

  return (
    <section className="mx-auto max-w-[1180px] px-[22px] -mt-8 mb-4" aria-label="Next step">
      <div className="plot-card px-8 py-8 flex items-center justify-between gap-6 flex-wrap max-sm:px-5">
        <span className="corner corner-tl" /><span className="corner corner-tr" />
        <span className="corner corner-bl" /><span className="corner corner-br" />
        <div>
          <p className="font-sans font-bold text-[20px]">Not sure which structure fits you?</p>
          <p className="font-serif italic text-[15.5px] text-slate mt-1 max-w-[520px]">
            Seven questions, about 90 seconds, no email needed to see your shortlist.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Link
            href="/fit-finder"
            className="font-sans text-[14px] font-medium tracking-[0.08em] uppercase px-6 py-3 rounded-[3px] bg-ink text-white-warm border-[1.5px] border-ink hover:bg-bronze hover:border-bronze transition-colors"
          >
            Find your fit →
          </Link>
          <TrackedContactLink
            channel="whatsapp"
            placement="next_step"
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[14px] font-medium tracking-[0.08em] uppercase px-6 py-3 rounded-[3px] border-[1.5px] border-ink text-ink hover:bg-paper transition-colors"
          >
            Talk to the desk
          </TrackedContactLink>
        </div>
      </div>
    </section>
  )
}
