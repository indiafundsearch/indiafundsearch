'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { SimpleProToggle } from '@/components/shared/SimpleProToggle'
import { cn } from '@/lib/utils'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-button text-text-primary hover:bg-black/5"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div
        className={cn(
          'md:hidden fixed inset-0 z-40 bg-background transition-opacity',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        aria-hidden={!open}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <span className="text-lg font-semibold tracking-tight">IndiaFundSearch</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-button hover:bg-black/5"
          >
            <X size={22} />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-6 pt-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-button px-3 py-3 text-lg text-text-primary hover:bg-black/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="px-6 pt-8">
          <SimpleProToggle />
        </div>
      </div>
    </>
  )
}
