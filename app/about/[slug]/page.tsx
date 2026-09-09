import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AUTHORS, authorBySlug } from '@/lib/content/authors'
import { ANSWERS } from '@/lib/content/answers'
import { CORRIDORS } from '@/lib/content/corridors'
import { SITE } from '@/lib/constants'
import { pageMeta, breadcrumbJsonLd, authorJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/shared/JsonLd'
import { DisclosureLine } from '@/components/shared/DisclosureLine'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return AUTHORS.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const a = authorBySlug(slug)
  if (!a) return {}
  return pageMeta({
    title: `${a.name}: ${a.role}, Beyond`,
    description: `${a.name} writes the education on IndiaFundSearch. Background, credentials, areas of expertise, and the articles authored on this site.`,
    path: `/about/${a.slug}`,
    ogTitle: a.name,
  })
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params
  const a = authorBySlug(slug)
  if (!a) notFound()

  const written = [
    ...CORRIDORS.map((c) => ({ label: `NRIs in ${c.label}`, href: `/nri/${c.slug}` })),
    ...ANSWERS.map((x) => ({ label: x.question, href: `/learn/${x.slug}` })),
  ]

  return (
    <article className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <JsonLd
        data={[
          authorJsonLd(a),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: a.name, path: `/about/${a.slug}` },
          ]),
        ]}
      />

      <nav className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-slate mb-8" aria-label="Breadcrumb">
        <Link href="/about" className="hover:text-ink">About</Link>
        <span className="mx-2">/</span>
        <span className="text-bronze">{a.name}</span>
      </nav>

      <header className="max-w-[820px]">
        <div className="eyebrow mb-3.5">{a.role}</div>
        <h1 className="font-sans font-bold text-[clamp(30px,4.5vw,44px)] tracking-[-0.01em] leading-[1.08]">
          {a.name}
        </h1>
        <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-slate mt-3">
          {a.credential}
          {a.arn && <> · ARN {a.arn}</>}
        </p>
        {!a.arn && (
          <p className="font-mono text-[10.5px] text-slate mt-1">
            {/* TODO: VERIFY — AMFI ARN not present in the repo. Line renders once supplied. */}
          </p>
        )}
      </header>

      <div className="max-w-[820px] mt-8 space-y-4">
        {a.bio.map((para) => (
          <p key={para.slice(0, 40)} className="text-[17.5px] text-ink-soft leading-[1.62]">
            {para}
          </p>
        ))}
      </div>

      <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze mt-12 mb-3">
        Areas of expertise
      </h2>
      <ul className="max-w-[820px]">
        {a.expertise.map((e) => (
          <li
            key={e}
            className="relative py-1.5 pl-[22px] text-[16.5px] text-ink-soft before:content-[''] before:absolute before:left-0.5 before:top-[15px] before:w-2.5 before:h-[1.5px] before:bg-bronze-soft"
          >
            {e}
          </li>
        ))}
      </ul>

      <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze mt-12 mb-3">
        Where to find {a.name.split(' ')[0]}
      </h2>
      <p className="text-[16.5px] text-ink-soft max-w-[820px]">
        <a
          href={a.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-bronze border-b border-bronze-soft hover:text-ink"
        >
          LinkedIn
        </a>
        {' · '}
        <Link href="/contact" className="text-bronze border-b border-bronze-soft hover:text-ink">
          Talk to the desk
        </Link>
        {' · '}
        {SITE.city}, {SITE.state}
      </p>

      <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze mt-12 mb-4">
        Written on this site
      </h2>
      <div className="grid gap-2.5 sm:grid-cols-2 max-w-[880px]">
        {written.map((w) => (
          <Link
            key={w.href}
            href={w.href}
            className="plot-card px-4 py-3 hover:shadow-plot-hover transition-shadow group"
          >
            <span className="font-sans text-[14.5px] font-medium group-hover:text-bronze transition-colors">
              {w.label}
            </span>
          </Link>
        ))}
      </div>

      <DisclosureLine />
    </article>
  )
}
