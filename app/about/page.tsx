import type { Metadata } from 'next'
import Link from 'next/link'
import { DISCLOSURE, SITE } from '@/lib/constants'
import { AUTHOR, personJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/shared/JsonLd'

export const metadata: Metadata = {
  title: 'About — Yash Jhaveri & IndiaFundSearch',
  description:
    'Who is behind IndiaFundSearch: Yash Jhaveri and the Beyond advisory practice — the people, the lineage and the empanelments behind the education.',
  // Draft: real credentials, photo, lineage and empanelment set are pending
  // the owner. Keep out of the index until the [COPY NEEDED] blocks are filled.
  robots: { index: false, follow: false },
}

function CopyNeeded({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-bronze-wash border border-dashed border-bronze-soft px-4 py-3 my-3 max-w-[820px]">
      <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-bronze font-semibold block mb-1">
        Copy needed — owner to supply
      </span>
      <span className="font-serif italic text-[14px] text-ink-soft">{children}</span>
    </div>
  )
}

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze mb-2.5 mt-10 flex items-center gap-2.5 after:content-[''] after:h-px after:flex-1 after:bg-line-soft">
      {children}
    </h2>
  )
}

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <JsonLd data={personJsonLd()} />

      <div className="eyebrow mb-3.5">The people behind the education</div>
      <h1 className="font-sans font-bold text-[clamp(30px,4.5vw,44px)] tracking-[-0.01em] leading-[1.08] max-w-[820px]">
        {AUTHOR.name}
      </h1>
      <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-slate mt-2">{AUTHOR.role}</p>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] mt-8">
        {/* Photo */}
        <div>
          <div className="plot-card aspect-[4/5] flex items-center justify-center text-center p-6">
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-slate">
              [ Professional photograph of {AUTHOR.name} — owner to supply ]
            </span>
          </div>
        </div>

        {/* Bio */}
        <div className="max-w-[720px] space-y-3 text-[16.5px] text-ink-soft">
          <p>
            IndiaFundSearch is the education-first face of a working advisory practice. The goal is
            simple: explain every SEBI- and IFSCA-regulated alternative in India the way a good
            adviser would across a table — jargon-free, honest about what does <em>not</em> fit, and
            useful whether or not you ever become a client.
          </p>
          <CopyNeeded>
            Yash Jhaveri&apos;s bio — professional background, qualifications and credentials
            (e.g. relevant certifications, years in practice, areas of focus). Keep it factual and
            verifiable.
          </CopyNeeded>
        </div>
      </div>

      <H>Our lineage</H>
      <p className="max-w-[820px] text-[16.5px] text-ink-soft">
        The practice traces its roots back decades — advising business families and first-generation
        wealth through several market cycles.
      </p>
      <CopyNeeded>
        The 1992 firm lineage — the founding story, the family/firm history, and how it led to
        today&apos;s practice. Dates and names to be confirmed by the owner.
      </CopyNeeded>

      <H>Who we work with &amp; how</H>
      <p className="max-w-[820px] text-[16.5px] text-ink-soft">{DISCLOSURE.commission}</p>

      <H>Empanelments</H>
      <p className="max-w-[820px] text-[16.5px] text-ink-soft">
        We work with a curated set of SEBI/IFSCA-regulated managers across PMS, AIF, SIF and GIFT
        City.
      </p>
      <CopyNeeded>
        The empanelment set — the specific AMCs / managers the practice is empanelled with, plus any
        registration numbers (AMFI ARN / IFSCA reference). Verify each before publishing.
      </CopyNeeded>

      <div className="mt-14 plot-card px-8 py-8 flex items-center justify-between gap-6 flex-wrap max-w-[860px] max-sm:px-5">
        <p className="font-sans font-bold text-[20px]">Start a conversation.</p>
        <Link
          href="/contact"
          className="font-sans text-[14px] font-medium tracking-[0.08em] uppercase px-6 py-3 rounded-[3px] bg-ink text-white-warm border-[1.5px] border-ink hover:bg-bronze hover:border-bronze transition-colors"
        >
          Talk to {AUTHOR.name.split(' ')[0]} →
        </Link>
      </div>

      <p className="font-serif italic text-[13.5px] text-slate mt-12 border-t border-line pt-5 max-w-[820px]">
        {DISCLOSURE.education} · {SITE.name} · {SITE.initiative}
      </p>
    </article>
  )
}
