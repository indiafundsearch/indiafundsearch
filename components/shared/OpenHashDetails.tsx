'use client'

import { useEffect } from 'react'

/**
 * Opens the <details> element named by the URL hash and scrolls to it, so
 * /learn#what-is-pms still lands the reader on an opened article.
 *
 * Kept as a tiny client island rather than making the whole accordion a client
 * component — the panels themselves stay server-rendered so their text is in
 * the DOM for crawlers.
 */
export function OpenHashDetails({ slugs }: { slugs: string[] }) {
  // Stable primitive dep — `slugs` is a fresh array on every parent render.
  const key = slugs.join(',')

  useEffect(() => {
    const allowed = key.split(',')
    const open = (scroll: boolean) => {
      const slug = window.location.hash.replace('#', '')
      if (!slug || !allowed.includes(slug)) return
      const el = document.getElementById(slug)
      if (!(el instanceof HTMLDetailsElement)) return
      el.open = true
      if (scroll) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    // Run synchronously, NOT inside requestAnimationFrame: rAF is paused in
    // background tabs, so a link opened in a new tab would never expand.
    open(true)

    const onHashChange = () => open(true)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [key])

  return null
}
