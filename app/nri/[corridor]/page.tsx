import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CORRIDORS, corridorBySlug } from '@/lib/content/corridors'
import type { Corridor, Source } from '@/lib/content/types'
import { DISCLOSURE, SHEETS, whatsappHref } from '@/lib/constants'
import { pageMeta, articleJsonLd, breadcrumbJsonLd, faqJsonLd, nriHreflang } from '@/lib/seo'
import { JsonLd } from '@/components/shared/JsonLd'
import { Byline } from '@/components/shared/Byline'
import { UsPersonWarning } from '@/components/shared/UsPersonWarning'
import { CorridorSwitcher } from '@/components/nri/CorridorSwitcher'
import { CorridorAccessForm } from '@/components/nri/CorridorAccessForm'

interface PageProps {
  params: Promise<{ corridor: string }>
}

export function generateStaticParams() {
  return CORRIDORS.map((c) => ({ corridor: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { corridor } = await params
  const c = corridorBySlug(corridor)
  if (!c) return {}
  return pageMeta({
    title: c.metaTitle,
    description: c.metaDescription,
    path: `/nri/${c.slug}`,
    ogTitle: `NRIs in ${c.label}`,
    // Each corridor is the real regional variant for its locale — this is what
    // finally makes the site's hreflang set mean something (P3-29).
    languages: nriHreflang(),
  })
}

function H({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="font-sans font-bold text-[clamp(20px,2.4vw,25px)] tracking-[-0.01em] leading-[1.2] mt-11 mb-3 scroll-mt-24"
    >
      {children}
    </h2>
  )
}

function SourceList({ sources, label = 'Sources' }: { sources: Source[]; label?: string }) {
  return (
    <div className="mt-4 border-t border-line-soft pt-3">
      <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-slate block mb-1.5">{label}</span>
      <ul className="space-y-1">
        {sources.map((s) => (
          <li key={s.url} className="text-[13.5px] leading-snug">
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bronze hover:text-ink border-b border-bronze-soft/60"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default async function CorridorPage({ params }: PageProps) {
  const { corridor } = await params
  const c = corridorBySlug(corridor)
  if (!c) notFound()

  return (
    <article className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <JsonLd
        data={[
          articleJsonLd({
            title: c.metaTitle,
            description: c.metaDescription,
            path: `/nri/${c.slug}`,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'NRI Corridors', path: '/nri' },
            { name: c.label, path: `/nri/${c.slug}` },
          ]),
          // Mirrors the visible Q&A headings exactly — nothing lives in JSON-LD
          // that a reader (or an answer engine reading rendered HTML) can't see.
          faqJsonLd(c.qas.map((qa) => ({ q: qa.q, a: qa.a.join(' ') }))),
        ]}
      />

      <nav className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-slate mb-8" aria-label="Breadcrumb">
        <Link href="/nri" className="hover:text-ink">Sheet {SHEETS.nri.no} — Corridors</Link>
        <span className="mx-2">/</span>
        <span className="text-bronze">{c.label}</span>
      </nav>

      <header>
        <div className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-bronze mb-2">
          <span className="mr-2 text-[13px]" aria-hidden="true">{c.flag}</span>
          Corridor {c.code} — for NRIs &amp; OCIs in {c.country}
        </div>
        <h1 className="font-sans font-bold text-[clamp(30px,4.5vw,44px)] tracking-[-0.01em] leading-[1.08] max-w-[900px]">
          {c.title}
        </h1>

        {/* Answer capsule — self-contained, deliberately link-free. */}
        <div className="mt-6 plot-card px-6 py-5 max-w-[820px] max-sm:px-5">
          <span className="corner corner-tl" /><span className="corner corner-tr" />
          <span className="corner corner-bl" /><span className="corner corner-br" />
          <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-signal font-semibold block mb-2">
            The short answer
          </span>
          <p className="font-sans text-[17.5px] leading-[1.5] text-ink">{c.capsule}</p>
        </div>

        <div className="mt-5">
          <Byline reviewed={c.reviewed} />
        </div>
      </header>

      {/* At a glance */}
      <div className="flex flex-wrap border border-line bg-white-warm mt-9">
        {c.facts.map(([label, value]) => (
          <div
            key={label}
            className="flex-1 min-w-[190px] px-4 py-3.5 border-r border-line last:border-r-0 max-sm:min-w-[45%] max-sm:border-b"
          >
            <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-slate block mb-[3px]">{label}</span>
            <b className="font-sans text-[14px] font-semibold leading-snug">{value}</b>
          </div>
        ))}
      </div>

      <p className="font-serif italic text-[20px] text-ink-soft border-l-[3px] border-signal pl-4 mt-10 max-w-[780px]">
        {c.hook}
      </p>
      <p className="text-[17.5px] text-ink-soft mt-5 max-w-[780px]">{c.lede}</p>

      {c.slug === 'us' && <UsPersonWarning className="mt-7 max-w-[780px]" />}

      {/* Comparison table — early, and independently extractable. */}
      <H id="comparison">{c.table.caption}</H>
      <div className="overflow-x-auto plot-card">
        <table className="table w-full border-collapse min-w-[820px]">
          <thead>
            <tr>
              {c.table.head.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="bg-ink text-white-warm font-mono text-[10px] tracking-[0.14em] uppercase text-left px-4 py-3 font-medium"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {c.table.rows.map((row) => (
              <tr key={row[0]} className="even:[&>td]:bg-paper">
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className={`px-4 py-3.5 text-[14.5px] align-top border-t border-line-soft ${
                      i === 0 ? 'font-sans font-semibold text-ink' : 'text-ink-soft'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {c.table.note && (
        <p className="font-serif italic text-[14.5px] text-slate mt-3 max-w-[820px]">{c.table.note}</p>
      )}

      {/* Question-shaped sections */}
      <div className="max-w-[820px]">
        {c.qas.map((qa) => (
          <section key={qa.q}>
            <H>{qa.q}</H>
            {qa.a.map((para) => (
              <p key={para.slice(0, 40)} className="text-[17px] text-ink-soft mt-3 leading-[1.62]">
                {para}
              </p>
            ))}
            {qa.sources && <SourceList sources={qa.sources} />}
          </section>
        ))}
      </div>

      {/* Empanelment — the asset no competitor has. Owner supplies the data. */}
      <H id="who-accepts">Which houses actually accept investors in {c.country}?</H>
      <div className="max-w-[820px]">
        <p className="text-[17px] text-ink-soft mt-3 leading-[1.62]">
          This is the question we are asked most and the one nobody publishes an answer to. Access is
          set house by house as a commercial decision, so the only useful answer is a current list —
          not a rule. We maintain one from our own empanelments rather than from public sources.
        </p>
      </div>
      <div className="max-w-[820px] mt-5">
        <CorridorAccessForm country={c.country} label={c.label} />
      </div>

      {/* Mistakes — problem-shaped headings rank for problem-shaped queries. */}
      <H id="mistakes">Five mistakes that cost money in this corridor</H>
      <ol className="max-w-[820px] mt-4 space-y-4">
        {c.mistakes.map((mi, i) => (
          <li key={mi.m} className="border-l-[3px] border-l-alert/60 pl-4">
            <h3 className="font-sans font-semibold text-[16.5px] text-ink">
              <span className="font-mono text-[11px] text-alert mr-2">{String(i + 1).padStart(2, '0')}</span>
              {mi.m}
            </h3>
            <p className="text-[15.5px] text-ink-soft mt-1">{mi.why}</p>
          </li>
        ))}
      </ol>

      {/* Checklist */}
      <H id="checklist">What to do, in order</H>
      <ul className="max-w-[820px] mt-3">
        {c.checklist.map((item) => (
          <li
            key={item}
            className="relative py-2 pl-[22px] text-[16.5px] text-ink-soft before:content-[''] before:absolute before:left-0.5 before:top-[18px] before:w-2.5 before:h-[1.5px] before:bg-signal"
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Why we cite no Indian section numbers — a genuine freshness signal. */}
      <div className="mt-11 bg-white-warm border border-line border-l-4 border-l-teal px-5 py-4.5 max-w-[820px]">
        <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-teal mb-2">
          Why this page quotes no Indian section numbers
        </h2>
        <p className="text-[15.5px] text-ink-soft">
          India replaced its entire income tax statute with effect from 1 April 2026 — the
          Income-tax Act, 1961 was repealed and renumbered wholesale. Pages still citing the old
          sections are citing a repealed Act. We describe Indian rules by what they do, and cite
          section numbers only for foreign law and for Indian regulators whose numbering is stable.
        </p>
      </div>

      <CorridorSwitcher current={c.slug} />

      {/* CTA */}
      <div className="mt-14 plot-card px-8 py-8 flex items-center justify-between gap-6 flex-wrap max-sm:px-5">
        <div>
          <p className="font-sans font-bold text-[20px]">
            Working out what actually fits from {c.country}?
          </p>
          <p className="font-serif italic text-[15.5px] text-slate mt-1">
            Tell us where you are tax-resident and we will tell you what is open to you — including
            when the answer is nothing yet.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <a
            href={whatsappHref(
              `Hello team, I'm an NRI resident in ${c.label} and I'd like to understand which Indian structures are open to me.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[14px] font-medium tracking-[0.08em] uppercase px-6 py-3 rounded-[3px] bg-ink text-white-warm border-[1.5px] border-ink hover:bg-bronze hover:border-bronze transition-colors"
          >
            Talk to the desk →
          </a>
          <Link
            href="/fit-finder"
            className="font-sans text-[14px] font-medium tracking-[0.08em] uppercase px-6 py-3 rounded-[3px] border-[1.5px] border-ink text-ink hover:bg-paper-2 transition-colors"
          >
            Run the Fit Finder
          </Link>
        </div>
      </div>

      <div className="mt-12 max-w-[820px]">
        <SourceList sources={c.sources} label="Every source cited on this page" />
      </div>

      <p className="font-serif italic text-[13.5px] text-slate mt-8 border-t border-line pt-5 max-w-[820px]">
        {DISCLOSURE.education} {DISCLOSURE.tax} Cross-border tax positions turn on your own
        residence, day counts and holdings — this page is a starting point for that conversation,
        not a substitute for advice from a professional qualified in {c.country}.
      </p>
    </article>
  )
}

export type { Corridor }
