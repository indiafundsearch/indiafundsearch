import Link from 'next/link'
import { AUTHOR } from '@/lib/seo'

/**
 * Author + reviewed-by line for YMYL content (P3-26). Names a real author,
 * links to /about, and states the review. Keeps E-E-A-T signals on every
 * educational page.
 */
export function Byline({ reviewed = 'July 2026' }: { reviewed?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10.5px] tracking-[0.08em] uppercase text-slate">
      <span>
        By{' '}
        <Link href="/contact" className="text-bronze hover:text-ink border-b border-bronze-soft">
          {AUTHOR.name}
        </Link>
      </span>
      <span className="text-line">·</span>
      <span>Reviewed by the IndiaFundSearch desk</span>
      <span className="text-line">·</span>
      <span>Last reviewed {reviewed}</span>
    </div>
  )
}
