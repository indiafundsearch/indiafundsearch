import Link from 'next/link'
import { CONTACT, DISCLOSURE, NAV_LINKS, SITE, whatsappHref } from '@/lib/constants'
import { Logo } from '@/components/shared/Logo'

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-white-warm">
      <div className="mx-auto max-w-[1180px] px-[22px] py-14">
        {/* Brand row */}
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo tone="paper" size={36} />
            <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-bronze-soft mt-2">
              {SITE.initiative} · {SITE.tagline}
            </p>
            <p className="mt-4 max-w-prose text-[15px] text-[#c7d6ce] leading-relaxed">
              Every SEBI-regulated alternative, explained the way we would across a
              table — no jargon survives past the first sentence.
            </p>
          </div>

          <nav aria-label="Footer" className="md:justify-self-center">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze-soft mb-3">
              Index
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-sans text-[14px] text-[#c7d6ce] hover:text-white-warm transition-colors"
                  >
                    <span className="font-mono text-[10px] text-bronze-soft mr-2">{l.no}</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze-soft mb-3">
              Talk to the desk
            </p>
            <ul className="space-y-2 font-sans text-[14px]">
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c7d6ce] hover:text-white-warm transition-colors"
                >
                  WhatsApp the desk ↗
                </a>
              </li>
              {CONTACT.calendlyUrl && (
                <li>
                  <a
                    href={CONTACT.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#c7d6ce] hover:text-white-warm transition-colors"
                  >
                    Book a conversation ↗
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-[#c7d6ce] hover:text-white-warm transition-colors"
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclosure block */}
        <div className="mt-12 border-t border-[rgba(252,251,248,0.15)] pt-6 space-y-3">
          <p className="text-[12.5px] leading-relaxed text-[#9db5aa]">{DISCLOSURE.commission}</p>
          <p className="text-[12.5px] leading-relaxed text-[#9db5aa]">{DISCLOSURE.education}</p>
          <p className="font-mono text-[10px] tracking-[0.06em] text-[#9db5aa] pt-2">
            © {new Date().getFullYear()} {SITE.name} · All rights reserved ·{' '}
            <Link href="/privacy" className="hover:text-white-warm underline underline-offset-2">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
