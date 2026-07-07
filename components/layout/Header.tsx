'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS, SITE } from '@/lib/constants'
import { Logo } from '@/components/shared/Logo'

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white-warm border-b-2 border-ink">
      {/* Title block */}
      <div className="mx-auto max-w-[1180px] px-[22px] flex items-stretch">
        <Link
          href="/"
          className="flex items-center gap-3.5 py-3 pr-5 border-r border-line shrink-0"
          onClick={() => setOpen(false)}
        >
          <Logo size={34} />
          <span className="hidden sm:block font-mono text-[10px] tracking-[0.08em] uppercase text-slate leading-[1.3] border-l border-line pl-3.5">
            {SITE.initiative}
            <br />
            {SITE.tagline}
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-0">
          <div className="hidden md:block font-mono text-[10.5px] tracking-[0.06em] uppercase text-slate leading-[1.5] px-[18px] border-l border-line py-2.5">
            Drawing set
            <b className="block text-ink text-[12px] normal-case">FY 2026–27 · R1</b>
          </div>
          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden ml-3 my-auto flex h-10 w-10 items-center justify-center border-[1.5px] border-ink rounded-[3px] font-mono text-[13px]"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Sheet nav — desktop */}
      <nav className="hidden lg:block border-t border-line" aria-label="Primary">
        <div className="mx-auto max-w-[1180px] px-[22px] flex">
          {NAV_LINKS.map((l) => {
            const active = isActive(pathname, l.href)
            const highlight = 'highlight' in l && l.highlight
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`font-sans text-[13px] font-medium tracking-[0.09em] uppercase px-4 py-[15px] border-b-[3px] whitespace-nowrap flex items-center gap-2 transition-colors ${
                  active
                    ? 'text-ink border-signal'
                    : 'text-slate border-transparent hover:text-ink'
                }`}
              >
                <span className={`font-mono text-[10px] font-semibold ${highlight ? 'text-signal' : 'text-bronze'}`}>
                  {l.no}
                </span>
                {l.label}
                {highlight && (
                  <span className="font-mono text-[8.5px] tracking-[0.1em] bg-signal text-ink px-1.5 py-0.5 rounded-[2px]">
                    NEW
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Sheet nav — mobile drawer */}
      {open && (
        <nav className="lg:hidden border-t border-line bg-white-warm" aria-label="Primary">
          {NAV_LINKS.map((l) => {
            const active = isActive(pathname, l.href)
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-[22px] py-3.5 border-b border-line-soft font-sans text-[15px] font-medium tracking-[0.06em] uppercase ${
                  active ? 'text-ink bg-bronze-wash' : 'text-slate'
                }`}
              >
                <span className="font-mono text-[10px] font-semibold text-bronze">{l.no}</span>
                {l.label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
