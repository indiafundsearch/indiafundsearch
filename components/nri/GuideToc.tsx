'use client'

import { useEffect, useState } from 'react'

export interface TocSection {
  id: string
  label: string
}

/**
 * "On this page" for the long country guides: a sticky side list on desktop
 * that marks the current section, and a fold-out box on phones. The owner
 * chose this over a sticky strip and a static contents box (November 2026).
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

export function GuideToc({ sections }: { sections: TocSection[] }) {
  const active = useActiveSection(sections.map((s) => s.id))

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
