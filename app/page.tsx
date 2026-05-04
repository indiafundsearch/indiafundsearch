import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="container-grid py-20 md:py-28">
      <p className="text-sm font-medium uppercase tracking-widest text-gold">
        Phase 1 — Foundation
      </p>
      <h1 className="mt-4 max-w-3xl">
        IndiaFundSearch — the Morningstar of Indian alternatives.
      </h1>
      <p className="mt-6 max-w-prose text-lg text-text-muted">
        Education-first discovery for PMS, AIF, SIF, and GIFT City investments.
        Where the product is understanding, not placement.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/explore"
          className="rounded-button bg-text-primary px-5 py-3 text-sm font-medium text-white hover:opacity-90"
        >
          Explore funds →
        </Link>
        <Link
          href="/knowledge"
          className="rounded-button border border-card-border bg-card px-5 py-3 text-sm font-medium text-text-primary hover:shadow-card"
        >
          Knowledge Centre
        </Link>
      </div>
      <p className="mt-16 text-sm text-text-muted">
        The full homepage (FD Visualiser hero · fund preview · Diagnostic CTA) ships in Phase 2.
      </p>
    </div>
  )
}
