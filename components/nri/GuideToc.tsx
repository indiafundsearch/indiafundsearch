'use client'

import { useEffect, useState } from 'react'

export interface TocSection {
  id: string
  label: string
}

export type TocVariant = 'rail' | 'chips' | 'card'

/**
 * "On this page" for the long country guides. Three presentations of the same
 * list, chosen at build time while the owner picks one:
 *   rail  — a sticky side list on desktop, a fold-out box on phones
 *   chips — a strip of jump links that sticks under the header
 *   card  — a plain numbered box near the top, nothing sticky
 */
function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join(',')

  useEffect(() => {
    const list = key.split(',')
    const onScroll = () => {
      // The section whose top most recently passed under the header.
      let current: string | null = null
      for (const id of list) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < 220) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [key])

  return active
}

export function GuideToc({ sections, variant }: { sections: TocSection[]; variant: TocVariant }) {
  const active = useActiveSection(sections.map((s) => s.id))

  if (variant === 'card') {
    return (
      <nav aria-label="On this page" className="mt-9 bg-white-warm border border-line px-6 py-5 max-w-[720px] max-sm:px-4">
        <p className="font-mono text-[12px] tracking-[0.18em] uppercase text-bronze mb-3">On this page</p>
        <ol className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
          {sections.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="flex gap-3 py-1.5 font-sans text-[15px] font-medium text-ink hover:text-bronze">
                <span className="font-mono text-[12px] text-bronze pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                {s.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    )
  }

  if (variant === 'chips') {
    return (
      <nav
        aria-label="On this page"
        className="sticky top-[66px] lg:top-[111px] z-30 -mx-[22px] px-[22px] mt-8 bg-paper/95 backdrop-blur border-y border-line"
      >
        <ul className="flex gap-2 overflow-x-auto py-2.5 [scrollbar-width:none]">
          {sections.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? 'true' : undefined}
                className={`block font-sans text-[13px] font-medium tracking-[0.04em] px-3.5 py-2 rounded-[3px] border transition-colors ${
                  active === s.id ? 'bg-ink text-white-warm border-ink' : 'bg-white-warm text-ink border-line hover:border-bronze'
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  // rail
  return (
    <>
      {/* Phones and tablets: a fold-out box. */}
      <details className="lg:hidden mt-8 bg-white-warm border border-line">
        <summary className="px-5 py-3.5 cursor-pointer list-none [&::-webkit-details-marker]:hidden flex items-center justify-between font-mono text-[12px] tracking-[0.18em] uppercase text-bronze">
          On this page
          <span aria-hidden className="text-ink">+</span>
        </summary>
        <ol className="px-5 pb-4">
          {sections.map((s) => (
            <li key={s.id} className="border-t border-line-soft">
              <a href={`#${s.id}`} className="block py-2.5 font-sans text-[15px] font-medium text-ink">{s.label}</a>
            </li>
          ))}
        </ol>
      </details>
      {/* Desktop: sticks beside the text and marks where you are. */}
      <nav aria-label="On this page" className="hidden lg:block sticky top-[140px] self-start col-start-2 row-start-1 row-span-full">
        <p className="font-mono text-[12px] tracking-[0.18em] uppercase text-bronze mb-3">On this page</p>
        <ol className="border-l border-line">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? 'true' : undefined}
                className={`block -ml-px pl-4 py-2 border-l-2 font-sans text-[14px] leading-snug transition-colors ${
                  active === s.id ? 'border-signal text-ink font-semibold' : 'border-transparent text-slate hover:text-ink'
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
