import Link from 'next/link'

/**
 * The Form 8802 → Form 6166 → Form 41 chain (Appendix A, Task A.3).
 *
 * These three steps are sequential for a US-resident NRI claiming treaty relief
 * in India, and nobody publishes them together. That is the differentiating
 * asset in this cluster, so it renders on all three pages with the current step
 * marked.
 */
const STEPS = [
  { n: 1, label: 'Apply on Form 8802', who: 'To the IRS', href: '/us-tax/form-8802', note: 'Ask the IRS to certify your US tax residency for the year in question.' },
  { n: 2, label: 'Receive Form 6166', who: 'From the IRS', href: '/us-tax/us-tax-residency-certificate', note: 'The certificate itself. It names the year, so the year has to match your income.' },
  { n: 3, label: 'File Form 41 in India', who: 'To the Indian portal', href: '/learn/form-10f-for-nri', note: 'Formerly Form 10F. Online only, and no Indian digital signature is needed.' },
] as const

export function TrcSteps({ current }: { current?: 1 | 2 | 3 }) {
  return (
    <section className="max-w-[880px] mt-12">
      <h2 className="font-sans font-bold text-[clamp(20px,2.4vw,25px)] tracking-[-0.01em] mb-2">
        The three steps, in order
      </h2>
      <p className="text-[16.5px] text-slate mb-5">
        Each step depends on the one before it. Most people find out about step three after the
        tax has already been withheld.
      </p>
      <ol className="grid gap-3 sm:grid-cols-3">
        {STEPS.map((s) => {
          const active = s.n === current
          return (
            <li key={s.n}>
              <Link
                href={s.href}
                aria-current={active ? 'step' : undefined}
                className={`block h-full plot-card px-5 py-4 transition-shadow group ${
                  active ? 'bg-bronze-wash border-bronze' : 'hover:shadow-plot-hover'
                }`}
              >
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-bronze font-semibold">
                  Step {s.n} · {s.who}
                </span>
                <span className="font-sans text-[16px] font-bold block mt-1 group-hover:text-bronze transition-colors">
                  {s.label}
                </span>
                <span className="font-serif text-[14px] text-ink-soft block mt-1.5 leading-snug">
                  {s.note}
                </span>
              </Link>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
