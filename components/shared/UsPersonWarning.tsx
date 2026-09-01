import Link from 'next/link'

/**
 * US/Canada-person warning banner (P1-10). Most GIFT structures do not accept
 * US persons, and a pooled non-US fund can be a PFIC with punitive US tax plus
 * FATCA and FBAR reporting.
 *
 * Points at /nri/us, the live corridor guide. It used to link to
 * /learn/us-nri-pfic, which is still a noindexed draft carrying [COPY NEEDED]
 * blocks pending US counsel — sending a worried reader to a page with holes in
 * it was the wrong call once a finished page existed.
 */
export function UsPersonWarning({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/nri/us"
      className={`block border border-alert/40 border-l-4 border-l-alert bg-white-warm px-5 py-4 hover:bg-paper transition-colors group ${className}`}
    >
      <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-alert font-semibold block mb-1">
        Do you file taxes in the US or Canada?
      </span>
      <span className="font-sans text-[14.5px] font-semibold text-ink">
        This changes the answer completely. Read the US corridor guide first{' '}
        <span className="text-alert group-hover:underline">→</span>
      </span>
    </Link>
  )
}
