import Link from 'next/link'
import { FOOTER_DISCLAIMER, NAV_LINKS } from '@/lib/constants'
import { TrustStrip } from '@/components/shared/TrustStrip'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-card-border bg-background">
      <div className="container-grid py-12">
        <TrustStrip />

        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-base font-semibold text-text-primary">IndiaFundSearch</p>
            <p className="mt-2 max-w-prose text-sm text-text-muted">
              The Morningstar of Indian alternatives — where the product is understanding, not placement.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-muted hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-10 border-t border-card-border pt-6 text-xs text-text-muted">
          {FOOTER_DISCLAIMER}
        </p>
        <p className="mt-2 text-xs text-text-muted">
          © {new Date().getFullYear()} IndiaFundSearch. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
