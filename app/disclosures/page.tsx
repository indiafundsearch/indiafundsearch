import type { Metadata } from 'next'
import Link from 'next/link'
import { DISCLOSURE, SITE } from '@/lib/constants'
import { pageMeta, breadcrumbJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/shared/JsonLd'

export const metadata: Metadata = pageMeta({
  title: 'Disclosures',
  description:
    'How IndiaFundSearch is paid, what this site is and is not, and the limits of the tax information published here.',
  path: '/disclosures',
})

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: 'How we are paid',
    p: [
      DISCLOSURE.commission,
      'In practice this means two things. Any fee arrangement that applies to a product is disclosed to you before you transact, not afterwards. And nothing on this site is ranked, ordered or recommended on the basis of what we earn from it — where we think a structure is wrong for you, we say so, including when that costs us the business.',
    ],
  },
  {
    h: 'What this site is, and is not',
    p: [
      DISCLOSURE.education,
      'We are not a SEBI-registered investment adviser, and nothing here is personalised advice. The Fit Finder produces a shortlist for a conversation, not a recommendation. Where a decision turns on your own circumstances — and in cross-border cases it almost always does — you need a professional who is looking at your actual position.',
    ],
  },
  {
    h: 'On the tax information published here',
    p: [
      DISCLOSURE.tax,
      'India replaced its entire income tax statute with effect from 1 April 2026, so material written before that date — including much of what is published elsewhere — may cite provisions that no longer exist. We describe Indian tax rules by what they do rather than by section number for exactly that reason, and cite section numbers only for foreign law and for Indian regulators, whose numbering is stable.',
      'Foreign tax claims on this site are attributed to the authority that publishes them, with a link to the primary source. Where a position is unsettled or rests only on Tribunal-level authority, we say so on the page rather than rounding it into a confident answer.',
    ],
  },
  {
    h: 'Product availability',
    p: [
      'Whether any particular fund or manager will accept you is a commercial decision made by that house, and it changes. Nothing on this site is an offer, and inclusion of a structure in our education content does not mean it is available to you or appropriate for you.',
    ],
  },
]

export default function DisclosuresPage() {
  return (
    <div className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Disclosures', path: '/disclosures' },
        ])}
      />

      <div className="eyebrow mb-3.5">Disclosures</div>
      <h1 className="font-sans font-bold text-[clamp(30px,4.5vw,44px)] tracking-[-0.01em] leading-[1.08] max-w-[760px]">
        How we are paid, and what this site is for.
      </h1>
      <p className="font-serif text-[19px] text-ink-soft max-w-[720px] mt-4">
        The short version sits at the foot of every page. This is the long version, in one place, so
        it does not have to be repeated eleven times.
      </p>
      <p className="text-[17px] text-ink-soft max-w-[820px] mt-5">
        <b>{SITE.name}</b> and <b>Beyond</b> are brands of <b>{SITE.legalEntity}</b>. That company
        operates this website, holds the distribution and referral arrangements described below, and
        is who you are dealing with when you contact the desk.
      </p>
      <p className="font-mono text-[13px] text-slate leading-relaxed max-w-[820px] mt-3">
        CIN {SITE.cin} · Incorporated {SITE.incorporated}
        <br />
        Registered office: {SITE.registeredAddress}
      </p>

      <div className="mt-12 max-w-[820px] space-y-10">
        {SECTIONS.map((s) => (
          <section key={s.h}>
            <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze mb-3 flex items-center gap-2.5 after:content-[''] after:h-px after:flex-1 after:bg-line-soft">
              {s.h}
            </h2>
            {s.p.map((para) => (
              <p key={para.slice(0, 40)} className="text-[17px] text-ink-soft leading-[1.62] mt-3">
                {para}
              </p>
            ))}
          </section>
        ))}
      </div>

      <p className="font-mono text-[11px] tracking-[0.04em] text-slate mt-14 border-t border-line pt-4 max-w-[820px]">
        {SITE.legalEntity} · Operator of {SITE.name} ·{' '}
        <Link href="/privacy" className="text-bronze border-b border-bronze-soft hover:text-ink">
          Privacy Policy
        </Link>{' '}
        ·{' '}
        <Link href="/contact" className="text-bronze border-b border-bronze-soft hover:text-ink">
          Contact
        </Link>
      </p>
    </div>
  )
}
