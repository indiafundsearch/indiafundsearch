import type { Metadata } from 'next'
import Link from 'next/link'
import {
  COMPARE_SECTIONS,
  EXTERNAL_COMPARISONS,
  compareByKind,
} from '@/lib/content/compare'
import { ComparisonTable } from '@/components/learn/ComparisonTable'
import { FadeInOnScroll } from '@/components/shared/FadeInOnScroll'
import { SHEETS } from '@/lib/constants'
import { breadcrumbJsonLd, pageMeta } from '@/lib/seo'
import { JsonLd } from '@/components/shared/JsonLd'
import { DisclosureLine } from '@/components/shared/DisclosureLine'

export const metadata: Metadata = pageMeta({
  title: 'Compare Indian Investment Structures Side by Side',
  description:
    'PMS against AIF, SIF against PMS, REITs against property, private credit against a fixed deposit. Decision matrices for investors choosing between two structures.',
  path: '/compare',
})

/**
 * The comparison hub.
 *
 * Its job is internal linking as much as traffic. Every comparison on the site
 * is indexed here in one place — including the four that live under /learn and
 * /uk-tax and are deliberately not duplicated into this cluster — so a reader
 * who is at the choosing stage never has to guess which section holds what.
 */
export default function CompareHub() {
  return (
    <div className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Compare', path: '/compare' },
        ])}
      />

      <div className="mb-10">
        <div className="eyebrow mb-3.5">
          Sheet {SHEETS.compare.no} — {SHEETS.compare.title}
        </div>
        <h1 className="font-sans font-bold text-[clamp(30px,4.5vw,44px)] tracking-[-0.01em] leading-[1.08] max-w-[840px]">
          You have narrowed it to two. Here is what actually separates them.
        </h1>
        <p className="font-serif text-[19px] text-ink-soft max-w-[720px] mt-3.5">
          Every page here is a decision matrix, not an explainer. Minimums, liquidity, tax
          treatment and what each structure is legally allowed to hold —{' '}
          <em className="text-bronze italic">
            with the verdict stated plainly, including when it is &ldquo;keep what you have&rdquo;.
          </em>
        </p>
        <p className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-slate mt-5 max-w-[720px] leading-relaxed">
          Categories only. No scheme is named, no manager is ranked, and no performance claim is
          made or implied.
        </p>
      </div>

      {COMPARE_SECTIONS.map((section) => {
        const pages = compareByKind(section.kind)
        if (!pages.length) return null
        return (
          <section key={section.kind} className="mt-14 first:mt-0">
            <div className="dim mb-6">
              <span>{section.heading}</span>
            </div>
            <p className="font-serif text-[17px] text-ink-soft max-w-[720px] mb-6 -mt-2">
              {section.blurb}
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pages.map((p, i) => (
                <FadeInOnScroll key={p.slug} delay={(i % 3) * 0.06}>
                  <Link
                    href={`/compare/${p.slug}`}
                    className="plot-card block p-6 h-full relative hover:shadow-plot-hover transition-shadow group before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-bronze-soft"
                  >
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {p.sides.slice(0, 3).map((s) => (
                        <span
                          key={s.label}
                          className="font-mono text-[9px] tracking-[0.1em] uppercase border border-line text-slate bg-paper px-2 py-[3px] rounded-[2px]"
                        >
                          {s.label}
                        </span>
                      ))}
                      {p.sides.length > 3 && (
                        <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-slate px-1 py-[3px]">
                          +{p.sides.length - 3}
                        </span>
                      )}
                    </div>
                    <h2 className="font-sans text-[18.5px] font-bold leading-snug group-hover:text-bronze transition-colors">
                      {p.title}
                    </h2>
                    <p className="font-serif italic text-[15px] text-ink-soft mt-2.5 leading-snug">
                      {p.hook}
                    </p>
                  </Link>
                </FadeInOnScroll>
              ))}
            </div>
          </section>
        )
      })}

      <section className="mt-16">
        <div className="dim mb-6">
          <span>Comparisons that live elsewhere on the site</span>
        </div>
        <p className="font-serif text-[17px] text-ink-soft max-w-[720px] mb-6 -mt-2">
          These four already sit in the section they belong to. They are indexed here so this page
          is the complete list, not so they are published twice.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {EXTERNAL_COMPARISONS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="plot-card px-5 py-4 hover:shadow-plot-hover transition-shadow group"
            >
              <span className="font-sans text-[15.5px] font-semibold group-hover:text-bronze transition-colors">
                {l.label} →
              </span>
              <span className="font-serif text-[14px] text-slate block mt-1 leading-snug">
                {l.note}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="dim mb-6">
          <span>Reference — the four structures, side by side</span>
        </div>
        <ComparisonTable />
        <p className="font-mono text-[11px] text-slate tracking-[0.04em] mt-3">
          Structural comparison, simplified for conversation. Category rules per SEBI; individual
          schemes vary.
        </p>
      </section>

      <div className="mt-16 plot-card px-8 py-8 flex items-center justify-between gap-6 flex-wrap max-sm:px-5">
        <div>
          <p className="font-sans font-bold text-[20px]">Not sure which two to compare?</p>
          <p className="font-serif italic text-[15.5px] text-slate mt-1 max-w-[480px]">
            Start at the other end. Seven questions narrow thirteen structures to a shortlist
            before you compare anything.
          </p>
        </div>
        <Link
          href="/fit-finder"
          className="font-sans text-[14px] font-medium tracking-[0.08em] uppercase px-6 py-3 rounded-[3px] bg-ink text-white-warm border-[1.5px] border-ink hover:bg-bronze hover:border-bronze transition-colors shrink-0"
        >
          Run the Fit Finder →
        </Link>
      </div>

      <DisclosureLine />
    </div>
  )
}
