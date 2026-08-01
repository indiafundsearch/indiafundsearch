import type { Metadata } from 'next'
import { CONTACT, SITE } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Privacy Policy',
  description:
    'How IndiaFundSearch collects, uses, stores and protects your personal data — what we collect, why, who processes it, how long we keep it, and your rights under India’s DPDP Act 2023.',
  path: '/privacy',
})

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-sans font-bold text-[20px] mt-9 mb-2">{children}</h2>
  )
}

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-[820px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <div className="eyebrow mb-3.5">Legal</div>
      <h1 className="font-sans font-bold text-[clamp(30px,4.5vw,44px)] tracking-[-0.01em] leading-[1.08]">
        Privacy Policy
      </h1>
      <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-slate mt-2">
        Last updated August 2026
      </p>

      <div className="text-[16.5px] text-ink-soft mt-6 space-y-3">
        <p>
          This policy explains how {SITE.name} ({SITE.initiative}) collects, uses, stores and
          protects your personal data when you use this website. We aim to be plain and honest — the
          same way we write everything else here.
        </p>

        <H>What we collect</H>
        <p>We only collect what you choose to give us. Depending on how you use the site, that can include:</p>
        <ul className="space-y-1.5 pl-1">
          {[
            'Contact details you submit — name, email address, phone number and city/location.',
            'Your message or enquiry text (contact form and GIFT City enquiries).',
            'The answers and shortlist you generate in the Fit Finder, if you ask us to email your blueprint.',
            'A one-time verification code (OTP) sent to your email to confirm it is yours.',
            'Basic, privacy-friendly usage analytics (pages viewed, approximate location, device type) — collected without advertising cookies.',
          ].map((x) => (
            <li key={x} className="relative pl-[22px] before:content-[''] before:absolute before:left-0.5 before:top-[13px] before:w-2.5 before:h-[1.5px] before:bg-signal">
              {x}
            </li>
          ))}
        </ul>
        <p>
          We do <b>not</b> ask for, or want, sensitive financial information (bank/demat numbers,
          passwords, PAN, card details) through this website. Please never send those here.
        </p>

        <H>Why we use it</H>
        <ul className="space-y-1.5 pl-1">
          {[
            'To respond to your enquiry and, where you want it, to advise you.',
            'To send you the confirmation, blueprint or verification code you requested.',
            'To let our desk follow up on a lead you started.',
            'To understand, in aggregate, which content is useful — so we can improve it.',
          ].map((x) => (
            <li key={x} className="relative pl-[22px] before:content-[''] before:absolute before:left-0.5 before:top-[13px] before:w-2.5 before:h-[1.5px] before:bg-signal">
              {x}
            </li>
          ))}
        </ul>

        <H>Who processes your data</H>
        <p>Your data is stored and processed by a small set of trusted service providers, on our behalf:</p>
        <ul className="space-y-1.5 pl-1">
          {[
            'Sanity (content platform) — stores the enquiry/lead records you submit.',
            'Resend (email delivery) — sends confirmation and verification emails to you, and lead alerts to our desk.',
            'Vercel (hosting & privacy-friendly analytics) — serves the website and provides aggregate, cookieless usage stats.',
          ].map((x) => (
            <li key={x} className="relative pl-[22px] before:content-[''] before:absolute before:left-0.5 before:top-[13px] before:w-2.5 before:h-[1.5px] before:bg-signal">
              {x}
            </li>
          ))}
        </ul>
        <p>
          We do <b>not</b> sell your personal data, and we do not share it with anyone for
          advertising. It reaches our advisory desk so we can respond to you.
        </p>

        <H>Cookies &amp; storage</H>
        <p>
          We do not use advertising or cross-site tracking cookies. To remember that you have passed
          the one-time email verification on the GIFT City section, your browser stores a small
          functional flag on your own device (session/local storage) — no personal data, and nothing
          shared with third parties.
        </p>

        <H>How long we keep it</H>
        <p>
          We keep your enquiry and contact details for as long as needed to serve the relationship
          you started, and to meet any legal or regulatory obligations. You can ask us to delete
          your data at any time (see below).
        </p>

        <H>Your rights</H>
        <p>
          Under India&apos;s Digital Personal Data Protection Act, 2023, you can ask us to access,
          correct, update or erase the personal data we hold about you, and withdraw consent for
          future use. To exercise any of these, or to raise a concern, email{' '}
          <a href={`mailto:${CONTACT.email}`} className="text-bronze border-b border-bronze-soft">
            {CONTACT.email}
          </a>
          . We will respond within a reasonable time.
        </p>

        <H>Children</H>
        <p>This website is intended for adults making investment decisions and is not directed at anyone under 18.</p>

        <H>Changes</H>
        <p>
          We may update this policy as the site or the law evolves. The &ldquo;last updated&rdquo;
          date above always reflects the current version.
        </p>

        <H>Contact</H>
        <p>
          Questions about this policy or your data? Email{' '}
          <a href={`mailto:${CONTACT.email}`} className="text-bronze border-b border-bronze-soft">
            {CONTACT.email}
          </a>
          .
        </p>

        <p className="font-serif italic text-[13.5px] text-slate mt-8 border-t border-line pt-5">
          This policy is provided in good faith and in plain language; it is not legal advice. It
          should be reviewed by your compliance/legal adviser before being relied on as your final
          published policy.
        </p>
      </div>
    </article>
  )
}
