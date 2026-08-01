import Link from 'next/link'

/**
 * US/Canada-person warning banner (P1-10). Most GIFT structures do not accept
 * US persons, and a pooled non-US fund can be a PFIC with punitive US tax +
 * FATCA/FBAR reporting. This links to the dedicated explainer. Placed on
 * /gift-city, /gift-city/inbound, and every /learn "If you are an NRI" block.
 */
export function UsPersonWarning({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/learn/us-nri-pfic"
      className={`block border border-alert/40 border-l-4 border-l-alert bg-white-warm px-5 py-4 hover:bg-paper transition-colors group ${className}`}
    >
      <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-alert font-semibold block mb-1">
        US / Canada passport?
      </span>
      <span className="font-sans text-[14.5px] font-semibold text-ink">
        Holding a US or Canadian passport changes this materially — read this first{' '}
        <span className="text-alert group-hover:underline">→</span>
      </span>
    </Link>
  )
}
