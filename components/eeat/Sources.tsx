/**
 * Source citation block (Phase 2, Task 2.4).
 *
 * The load-bearing element of the whole strategy: it is what makes a page
 * citable by a journalist or an answer engine, and it is the thing no
 * competitor writing generic explainers bothers to do.
 *
 * Every entry names the issuing body and links to the primary document, never
 * to a secondary summary. `documentNumber` and `date` are optional because not
 * every source has them, but where a regulation or circular number exists it
 * should be here.
 */
export interface SourceRef {
  label: string
  url: string
  issuer?: string
  documentNumber?: string
  date?: string
}

export function Sources({
  sources,
  heading = 'Sources',
  className = '',
  compact = false,
}: {
  sources: SourceRef[]
  heading?: string
  className?: string
  /** Inline variant for use inside an answer block, rather than page-foot. */
  compact?: boolean
}) {
  if (!sources.length) return null
  return (
    <section
      className={`max-w-[860px] ${compact ? 'mt-4 border-t border-line-soft pt-3' : 'mt-12 border-t border-line pt-5'} ${className}`}
    >
      <h2
        className={`font-mono uppercase text-bronze mb-3 ${compact ? 'text-[9.5px] tracking-[0.18em] text-slate' : 'text-[10px] tracking-[0.2em]'}`}
      >
        {heading}
      </h2>
      <ol className="space-y-2.5">
        {sources.map((s, i) => (
          <li key={s.url + i} className="text-[14px] leading-snug flex gap-2.5">
            <span className="font-mono text-[11px] text-slate shrink-0 pt-[3px]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-bronze hover:text-ink border-b border-bronze-soft/60"
              >
                {s.label}
              </a>
              {(s.issuer || s.documentNumber || s.date) && (
                <span className="text-slate block font-mono text-[10.5px] tracking-[0.04em] mt-0.5">
                  {[s.issuer, s.documentNumber, s.date].filter(Boolean).join(' · ')}
                </span>
              )}
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}
