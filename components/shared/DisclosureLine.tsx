import Link from 'next/link'
import { DISCLOSURE } from '@/lib/constants'

/**
 * The single-line disclosure that closes a content page, replacing the two
 * full paragraphs that used to sit at the foot of every route. Full text at
 * /disclosures.
 *
 * `extra` carries anything page-specific worth saying in place — e.g. the
 * corridor pages' note that cross-border positions need local advice.
 */
export function DisclosureLine({ extra, className = '' }: { extra?: string; className?: string }) {
  return (
    <p
      className={`font-mono text-[11px] tracking-[0.04em] text-slate mt-12 border-t border-line pt-4 max-w-[820px] ${className}`}
    >
      {DISCLOSURE.short}
      {extra ? ` ${extra}` : ''}{' '}
      <Link href="/disclosures" className="text-bronze border-b border-bronze-soft hover:text-ink">
        Full disclosures
      </Link>
    </p>
  )
}
