import Link from 'next/link'
import { Mail, ArrowRight } from 'lucide-react'
import { TrustStrip } from '@/components/shared/TrustStrip'

const CONTACT_EMAIL = 'hello@indiafundsearch.com'

export const metadata = {
  title: 'Contact a Beyond Wealth advisor',
  description:
    'Beyond Wealth is a fee-only advisory practice in Vadodara. We don\'t distribute. When you\'re ready for a real conversation about PMS, AIF, SIF, or GIFT City, we advise.',
}

export default function ContactPage() {
  return (
    <div className="container-prose pt-12 pb-20 md:pt-20">
      <header>
        <p className="text-sm font-medium uppercase tracking-widest text-gold">Contact</p>
        <h1 className="mt-2">Talk to a Beyond Wealth advisor.</h1>
        <p className="mt-5 text-lg text-text-muted">
          Beyond Wealth is the fee-only advisory practice that runs IndiaFundSearch. Conversations are by appointment, scoped to a real allocation question, and never end with a product pitch.
        </p>
        <div className="mt-6">
          <TrustStrip variant="inline" />
        </div>
      </header>

      <section className="mt-12 rounded-card border border-card-border border-l-4 border-l-gold bg-card p-6 shadow-card md:p-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Request a callback</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
          Email us with a one-line context.
        </h2>
        <p className="mt-3 max-w-prose text-base text-text-muted">
          Tell us roughly: investable surplus range, what you&rsquo;re considering (PMS / AIF / SIF / GIFT City), and a good window for a 30-minute call. We&rsquo;ll write back with a slot or a clarifying question.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=Advisory%20enquiry%20%E2%80%94%20IndiaFundSearch`}
          className="mt-6 inline-flex items-center gap-2 rounded-button bg-text-primary px-5 py-3 text-sm font-medium text-white shadow-card transition-all hover:opacity-90 hover:shadow-card-hover"
        >
          <Mail size={16} aria-hidden />
          {CONTACT_EMAIL}
        </a>
        <p className="mt-4 text-xs text-text-muted">
          Initial conversations are complimentary. Engaged advisory is fee-only and disclosed up front.
        </p>
      </section>

      <section className="mt-14 space-y-5">
        <h2 className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
          Before you write to us
        </h2>
        <p className="text-base leading-relaxed text-text-primary">
          The site exists so you can do the homework first. Two tools are most useful before a call:
        </p>
        <ul className="space-y-4 text-base leading-relaxed text-text-primary">
          <li className="flex gap-3">
            <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-pill bg-gold" />
            <span>
              The <Link href="/diagnostic" className="font-medium underline decoration-gold/40 underline-offset-4 hover:decoration-gold">12-question Diagnostic</Link> tells you whether PMS or AIF is even the right tier for where your portfolio is today. Three to five minutes.
            </span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-pill bg-gold" />
            <span>
              The <Link href="/tools/fee-x-ray" className="font-medium underline decoration-gold/40 underline-offset-4 hover:decoration-gold">Fee X-Ray</Link> shows what a specific fund&rsquo;s structure actually costs you over a 10-year horizon. Bring those numbers to the call.
            </span>
          </li>
        </ul>
      </section>

      <section className="mt-14 rounded-card border border-card-border bg-card p-6 shadow-card md:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Not ready to talk yet?</p>
        <p className="mt-2 text-base text-text-primary">
          That&rsquo;s often the right answer. Take the Diagnostic and let the verdict guide you — including the &ldquo;Not Yet&rdquo; verdict, which is the most common useful outcome.
        </p>
        <Link
          href="/diagnostic"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-text-primary hover:text-gold"
        >
          Take the Diagnostic
          <ArrowRight size={14} aria-hidden />
        </Link>
      </section>

      <p className="mt-12 text-xs text-text-muted">
        IndiaFundSearch.com is an educational platform. We do not distribute or sell any financial products. Beyond Wealth provides fee-only advisory under separate engagement terms. For investment advice, consult a SEBI-registered advisor.
      </p>
    </div>
  )
}
