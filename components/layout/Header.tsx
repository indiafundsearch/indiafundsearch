'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS, SITE } from '@/lib/constants'
import { Logo } from '@/components/shared/Logo'

type NavLink = (typeof NAV_LINKS)[number]

function matches(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

function isActive(pathname: string, link: NavLink): boolean {
  if ('children' in link) return link.children.some((c) => matches(pathname, c.href))
  return matches(pathname, link.href)
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
          <span className="hidden sm:block font-mono text-[12px] tracking-[0.08em] uppercase text-slate leading-[1.3] border-l border-line pl-3.5">
            {SITE.initiative}
            <br />
            {SITE.tagline}
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-0">
          <Link
            href="/fit-finder"
            className="hidden lg:inline-flex items-center mr-[18px] font-sans text-[13px] font-medium tracking-[0.08em] uppercase px-4 py-2.5 rounded-[3px] bg-ink text-white-warm border-[1.5px] border-ink hover:bg-bronze hover:border-bronze transition-colors"
          >
            Find your fit →
          </Link>
          <div className="hidden md:block font-mono text-[12px] tracking-[0.06em] uppercase text-slate leading-[1.5] px-[18px] border-l border-line py-2.5">
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
            const active = isActive(pathname, l)
            const highlight = 'highlight' in l && l.highlight
            const children = 'children' in l ? l.children : null
            const link = (
              <Link
                key={l.href}
                href={l.href}
                aria-haspopup={children ? 'true' : undefined}
                className={`font-sans text-[13px] font-medium tracking-[0.09em] uppercase px-4 py-[15px] border-b-[3px] whitespace-nowrap flex items-center gap-2 transition-colors ${
                  active
                    ? 'text-ink border-signal'
                    : 'text-slate border-transparent hover:text-ink'
                }`}
              >
                <span className={`font-mono text-[12px] font-semibold ${highlight ? 'text-signal-ink' : 'text-bronze'}`}>
                  {l.no}
                </span>
                {l.label}
                {highlight && (
                  <span className="font-mono text-[10.5px] tracking-[0.1em] bg-signal text-ink px-1.5 py-0.5 rounded-[2px]">
                    NEW
                  </span>
                )}
              </Link>
            )
            if (!children) return link
            // Opens on hover and on keyboard focus. The parent stays a real
            // link, so a tap or a click still goes somewhere.
            return (
              <div key={l.href} className="relative group">
                {link}
                <div className="absolute left-0 top-full hidden group-hover:block group-focus-within:block bg-white-warm border border-ink shadow-plot min-w-[280px] z-50">
                  {children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block px-4 py-3 border-b border-line-soft last:border-b-0 hover:bg-bronze-wash"
                    >
                      <span className="font-sans text-[14px] font-semibold text-ink block">{c.label}</span>
                      <span className="font-serif text-[13.5px] text-slate">{c.note}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </nav>

      {/* Sheet nav — mobile drawer */}
      {open && (
        <nav className="lg:hidden border-t border-line bg-white-warm" aria-label="Primary">
          {NAV_LINKS.flatMap((l): { href: string; label: string; no: string; active: boolean }[] =>
            'children' in l
              ? l.children.map((c) => ({ href: c.href, label: c.label, no: l.no, active: matches(pathname, c.href) }))
              : [{ href: l.href, label: l.label, no: l.no, active: isActive(pathname, l) }],
          ).map((l) => {
            const active = l.active
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-[22px] py-3.5 border-b border-line-soft font-sans text-[15px] font-medium tracking-[0.06em] uppercase ${
                  active ? 'text-ink bg-bronze-wash' : 'text-slate'
                }`}
              >
                <span className="font-mono text-[12px] font-semibold text-bronze">{l.no}</span>
                {l.label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
