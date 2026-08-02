import type { ReactNode } from 'react'

/**
 * Collapsible section built on native <details>/<summary>.
 *
 * Deliberately NOT the framer-motion pattern used elsewhere. A motion accordion
 * only mounts its body when open, so the text exists solely in the RSC script
 * payload — invisible to Google's text extraction and to answer-engine crawlers,
 * which strip <script> before parsing. Native <details> keeps the body in the
 * rendered DOM whether open or shut, so it stays indexable and citable while
 * still collapsing visually. It also works with no JavaScript and is keyboard
 * and screen-reader accessible for free.
 *
 * `title` may be a heading element — the HTML spec allows <summary> to contain
 * a single h1–h6 — which is how the question-shaped H2s survive collapsing.
 */
export function Disclosure({
  title,
  children,
  id,
  meta,
  defaultOpen = false,
  className = '',
}: {
  title: ReactNode
  children: ReactNode
  id?: string
  /** small right-aligned note, e.g. "3 min read" */
  meta?: string
  defaultOpen?: boolean
  className?: string
}) {
  return (
    <details
      id={id}
      open={defaultOpen}
      className={`group bg-white-warm border border-line shadow-plot scroll-mt-32 ${className}`}
    >
      <summary className="flex items-center gap-4 px-6 py-4.5 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-paper-2 transition-colors max-sm:px-4">
        <span className="flex-1 min-w-0">{title}</span>
        {meta && (
          <span className="font-mono text-[10.5px] text-slate whitespace-nowrap max-sm:hidden">
            {meta}
          </span>
        )}
        <span
          aria-hidden
          className="font-sans text-lg text-slate shrink-0 transition-transform duration-250 group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="border-t border-line px-7 py-6 max-sm:px-4">{children}</div>
    </details>
  )
}
