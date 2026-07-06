'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Article } from '@/lib/content/types'

interface ArticleAccordionProps {
  articles: Article[]
}

/** Expandable fundamentals reads — deep-linkable via #slug. */
export function ArticleAccordion({ articles }: ArticleAccordionProps) {
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  // Open the article referenced by the URL hash (e.g. /learn#what-is-pms)
  useEffect(() => {
    const slug = window.location.hash.replace('#', '')
    if (!slug || !articles.some((a) => a.slug === slug)) return
    const frame = requestAnimationFrame(() => {
      setOpenSlug(slug)
      document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [articles])

  return (
    <div className="grid gap-4">
      {articles.map((a) => {
        const open = openSlug === a.slug
        return (
          <div key={a.slug} id={a.slug} className="bg-white-warm border border-line shadow-plot overflow-hidden scroll-mt-32">
            <button
              type="button"
              onClick={() => setOpenSlug(open ? null : a.slug)}
              aria-expanded={open}
              className="w-full flex items-center gap-4.5 px-6 py-5 text-left hover:bg-paper-2 transition-colors max-sm:px-4"
            >
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-bronze font-semibold w-[78px] shrink-0 max-sm:hidden">
                {a.no}
              </span>
              <span className="flex-1">
                <span className="font-sans text-xl font-bold block max-sm:text-lg">{a.title}</span>
                <span className="font-serif italic text-[15px] text-slate">{a.sub}</span>
              </span>
              <span className="font-mono text-[10.5px] text-slate whitespace-nowrap max-sm:hidden">{a.min}</span>
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="font-sans text-lg text-slate"
                aria-hidden
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div
                    className="article-body border-t border-line px-7 py-7 max-sm:px-4"
                    // In-house authored content from lib/content — not user input
                    dangerouslySetInnerHTML={{ __html: a.bodyHtml }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
