import Link from 'next/link'
import { NAV_LINKS } from '@/lib/constants'
import { SimpleProToggle } from '@/components/shared/SimpleProToggle'
import { MobileNav } from './MobileNav'

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-card-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container-grid flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-text-primary hover:opacity-80"
        >
          IndiaFundSearch
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-button px-3 py-2 text-sm font-medium text-text-muted hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <SimpleProToggle />
        </div>

        <MobileNav />
      </div>
    </header>
  )
}
