import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Not on this drawing set',
  robots: { index: false, follow: true },
}

/**
 * House-style 404. A dead link is the one moment a visitor is most likely to
 * leave, so this page is short, on brand, and gives three doors out. The
 * layout's header and footer still wrap it.
 */
export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1180px] px-[22px] pt-20 pb-28 max-sm:pt-12">
      <div className="eyebrow mb-3.5">Sheet 404 — Not on this drawing set</div>
      <h1 className="font-sans font-bold text-[clamp(30px,4.5vw,44px)] tracking-[-0.01em] leading-[1.08] max-w-[820px]">
        That page is not here.
      </h1>
      <p className="font-serif italic text-[19px] text-ink-soft mt-4 max-w-[640px]">
        The link may be old, or the address mistyped. Everything on the site is one of these three
        doors away.
      </p>

      <div className="grid gap-4 sm:grid-cols-3 mt-10 max-w-[900px]">
        {[
          { href: '/learn', label: 'The thirteen structures', note: 'PMS, AIF, SIF, GIFT City and the rest, explained' },
          { href: '/fit-finder', label: 'Run the Fit Finder', note: 'Seven questions. About 90 seconds' },
          { href: '/nri', label: 'NRI corridors', note: 'US, UK and UAE, starting from where you file' },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="plot-card px-5 py-5 hover:shadow-plot-hover transition-shadow group">
            <span className="font-sans text-[16px] font-semibold block group-hover:text-bronze transition-colors">
              {l.label} →
            </span>
            <span className="font-serif text-[14px] text-slate block mt-1.5">{l.note}</span>
          </Link>
        ))}
      </div>

      <p className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-slate mt-10">
        Or{' '}
        <Link href="/" className="text-bronze border-b border-bronze-soft hover:text-ink">
          back to the site plan
        </Link>
        {' · '}
        <Link href="/contact" className="text-bronze border-b border-bronze-soft hover:text-ink">
          talk to the desk
        </Link>
      </p>
    </div>
  )
}
