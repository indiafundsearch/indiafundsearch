import Link from 'next/link'
import { PRIMARY_AUTHOR, type Author } from '@/lib/content/authors'

/**
 * Author + currency block for YMYL pages (Phase 2, Tasks 2.1 and 2.3).
 *
 * Carries four signals Google looks for on financial content: a named author,
 * a credential, a link to a bio page, and when the page was last checked.
 * `regulatoryAsAt` appears only where the page states a regulatory position.
 *
 * The ARN line renders only when `author.arn` is set. It is null until the
 * owner supplies it, and an empty credential is worse than none.
 */
export function AuthorByline({
  author = PRIMARY_AUTHOR,
  published,
  reviewed,
  regulatoryAsAt,
  className = '',
}: {
  author?: Author
  published?: string
  reviewed: string
  regulatoryAsAt?: string
  className?: string
}) {
  const initials = author.name
    .split(' ')
    .map((w) => w[0])
    .join('')

  return (
    <div className={`flex items-start gap-3.5 ${className}`}>
      <span
        aria-hidden
        className="shrink-0 w-10 h-10 rounded-full border border-line bg-white-warm grid place-items-center font-mono text-[12px] tracking-[0.06em] text-bronze"
      >
        {author.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={author.image} alt="" className="w-full h-full rounded-full object-cover" />
        ) : (
          initials
        )}
      </span>
      <div className="min-w-0">
        <p className="font-sans text-[13.5px] text-ink">
          By{' '}
          <Link
            href={`/about/${author.slug}`}
            className="font-semibold text-bronze border-b border-bronze-soft hover:text-ink"
          >
            {author.name}
          </Link>
          <span className="text-slate">, {author.role}</span>
        </p>
        <p className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-slate mt-1 leading-relaxed">
          {author.credential}
          {author.arn && <> · ARN {author.arn}</>}
          <br />
          {published && <>Published {published} · </>}
          Last reviewed {reviewed}
          {regulatoryAsAt && <> · Regulatory position as at {regulatoryAsAt}</>}
        </p>
      </div>
    </div>
  )
}
