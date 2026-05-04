import { Diagnostic } from '@/components/lead-magnets/Diagnostic'
import { TrustStrip } from '@/components/shared/TrustStrip'

export const metadata = {
  title: 'Diagnostic — should you even look at PMS or AIF?',
  description:
    '12 questions. 4 verdicts. No sales pitch. Find out in 3 minutes whether PMS, AIF, or just an index fund is right for you. Free. Ungated. Education-first.',
}

export default function DiagnosticPage() {
  return (
    <div className="container-grid pt-12 pb-20 md:pt-16">
      <header className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-widest text-gold">Diagnostic</p>
        <h1 className="mt-2">Should you even look at PMS or AIF?</h1>
        <p className="mt-4 max-w-prose text-lg text-text-muted">
          Most people aren&rsquo;t ready — and that&rsquo;s usually a good thing. Twelve quick questions across capital structure, liquidity, risk, and knowledge. We&rsquo;ll show you exactly where you stand.
        </p>
        <p className="mt-3 text-sm text-text-muted">
          12 questions · 4 verdicts · No sales pitch · Includes a &ldquo;Not Yet&rdquo; verdict
        </p>
        <div className="mt-5">
          <TrustStrip variant="inline" />
        </div>
      </header>

      <div className="mt-10 md:mt-12">
        <Diagnostic />
      </div>
    </div>
  )
}
