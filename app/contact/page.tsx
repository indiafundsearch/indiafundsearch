import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact/ContactForm'
import { DisclosureLine } from '@/components/shared/DisclosureLine'
import { CONTACT, DISCLOSURE, SHEETS, whatsappHref } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Talk to the desk — Beyond',
  description:
    'Start a conversation with the Beyond desk about PMS, AIF, SIF or GIFT City investments. WhatsApp, book a call, or write to us — reply within one working day.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <div className="mb-10 max-w-[720px]">
        <div className="eyebrow mb-3.5">Sheet {SHEETS.contact.no} — Site Office</div>
        <h1 className="font-sans font-bold text-[clamp(30px,4.5vw,44px)] tracking-[-0.01em] leading-[1.08]">
          Talk to the desk.
        </h1>
        <p className="font-serif text-[19px] text-ink-soft mt-3.5">
          No pitch decks, no pressure. A conversation about your architecture — including, when
          it&apos;s the honest answer,{' '}
          <em className="text-bronze italic">&ldquo;you don&apos;t need any of this yet.&rdquo;</em>
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <ContactForm />

        <div className="space-y-4">
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-ink text-white-warm px-6 py-6 hover:bg-ink-soft transition-colors"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal block mb-1.5">
              Fastest
            </span>
            <span className="font-sans font-bold text-[18px]">WhatsApp the desk →</span>
            <p className="text-[14px] text-[#c7d6ce] mt-1.5">
              Straight to a human. Usually minutes, not days.
            </p>
          </a>

          {CONTACT.calendlyUrl && (
            <a
              href={CONTACT.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block plot-card px-6 py-6 hover:shadow-plot-hover transition-shadow"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze block mb-1.5">
                Structured
              </span>
              <span className="font-sans font-bold text-[18px]">Book a conversation →</span>
              <p className="text-[14px] text-slate mt-1.5">
                Pick a slot that suits you. 30 minutes, agenda yours.
              </p>
            </a>
          )}

          <a
            href={`mailto:${CONTACT.email}`}
            className="block plot-card px-6 py-6 hover:shadow-plot-hover transition-shadow"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze block mb-1.5">
              Classic
            </span>
            <span className="font-sans font-bold text-[18px]">{CONTACT.email}</span>
            <p className="text-[14px] text-slate mt-1.5">Reply within one working day.</p>
          </a>
        </div>
      </div>

      <DisclosureLine />
    </div>
  )
}
