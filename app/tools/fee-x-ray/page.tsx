import { Suspense } from 'react'
import { FeeXRay } from '@/components/lead-magnets/FeeXRay'
import { TrustStrip } from '@/components/shared/TrustStrip'

export const metadata = {
  title: 'Fee X-Ray Calculator — what you actually pay',
  description:
    'See exactly what PMS and AIF fees cost you over time. Year-by-year breakdown of management, performance, brokerage, GST, and custody. Free, ungated.',
}

export default function FeeXRayPage() {
  return (
    <div className="container-grid pt-12 pb-20 md:pt-16">
      <header className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-widest text-gold">Fee X-Ray</p>
        <h1 className="mt-2">What does this fund actually cost you?</h1>
        <p className="mt-4 max-w-prose text-lg text-text-muted">
          Headline fees lie. Real costs come from compounding management charges, performance fees on hurdle-beating returns, brokerage drag, GST, and custody. We model all five — year by year.
        </p>
        <div className="mt-5">
          <TrustStrip variant="inline" />
        </div>
      </header>

      <div className="mt-10 md:mt-12">
        <Suspense
          fallback={
            <div className="rounded-card border border-card-border bg-card p-10 text-center text-sm text-text-muted">
              Loading calculator…
            </div>
          }
        >
          <FeeXRay />
        </Suspense>
      </div>
    </div>
  )
}
