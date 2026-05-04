import Link from 'next/link'
import { NriPathfinder } from '@/components/knowledge/NriPathfinder'
import { TrustStrip } from '@/components/shared/TrustStrip'

export const metadata = {
  title: 'GIFT City for NRIs — onshore IFSC investing',
  description:
    'GIFT City is India\'s onshore IFSC. USD-denominated AIFs, family office structures, and a distinct FEMA + tax regime for NRIs and OCIs. A primer plus a 3-question NRI Pathfinder.',
}

export default function GiftCityPage() {
  return (
    <div className="container-grid pt-12 pb-20 md:pt-20">
      <header className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-widest text-gold">GIFT City</p>
        <h1 className="mt-2">India’s onshore IFSC, in plain English.</h1>
        <p className="mt-4 max-w-prose text-lg text-text-muted">
          For NRIs, OCIs, and global Indian families, GIFT City is the most consequential change to onshore investing in a decade. USD-denominated structures, distinct FEMA rules, and a tax regime that doesn’t depend on offshoring capital.
        </p>
        <div className="mt-5">
          <TrustStrip variant="inline" />
        </div>
      </header>

      <section className="mt-14 grid gap-6 md:grid-cols-2">
        <div className="rounded-card border border-card-border bg-card p-5 shadow-card md:p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">What it is</p>
          <h2 className="mt-2 text-2xl">A regulated, USD-friendly enclave</h2>
          <p className="mt-3 text-base text-text-primary">
            Gujarat International Finance Tec-City. A Special Economic Zone in Gandhinagar regulated by IFSCA (not RBI / SEBI in the usual way). It runs banking, insurance, AIFs, family offices, and brokerages in dollars under a distinct legal regime.
          </p>
        </div>
        <div className="rounded-card border border-card-border bg-card p-5 shadow-card md:p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Who it’s for</p>
          <h2 className="mt-2 text-2xl">NRIs, OCIs, and global Indian families</h2>
          <p className="mt-3 text-base text-text-primary">
            If you live overseas and want to invest in India — or globally — without offshoring capital and without bumping into FEMA and PFIC rules, GIFT structures are designed for you. Resident Indians have narrower use cases here.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <header className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-gold">What’s available</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
            The product set, briefly.
          </h2>
        </header>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          <ProductCard
            title="IFSC AIFs"
            body="USD-denominated alternative funds — long-short, private credit, pre-IPO — onshore in India. No FEMA frictions for repatriation."
          />
          <ProductCard
            title="IFSC Banking Units"
            body="GIFT-City branches of Indian banks offer USD term deposits and structured products outside the standard FCNR/NRE rails."
          />
          <ProductCard
            title="IFSC Brokerage / RIA"
            body="Direct USD-trading accounts to access US and global equities. Lighter paperwork for non-US NRIs than going via a US broker."
          />
          <ProductCard
            title="Family Office Structures"
            body="Single-Family Offices and Variable Capital Companies (VCCs) for HNIs consolidating cross-border wealth."
          />
        </ul>
      </section>

      <section className="mt-14">
        <header className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-gold">Pathfinder</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
            Three questions. Real direction.
          </h2>
          <p className="mt-3 text-base text-text-muted">
            Country, FEMA status, repatriation needs. We’ll show you which IFSC and onshore structures fit — and which don’t.
          </p>
        </header>
        <div className="mt-6">
          <NriPathfinder />
        </div>
      </section>

      <section className="mt-16 rounded-card border border-card-border border-l-4 border-l-gold bg-card p-6 shadow-card md:p-10">
        <span className="inline-flex items-center rounded-pill bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
          Beyond Wealth
        </span>
        <h2 className="mt-3 text-2xl">Need a real conversation?</h2>
        <p className="mt-2 max-w-prose text-base text-text-muted">
          We don’t distribute. We don’t take commissions. When you’re ready to talk about a specific GIFT-City structure for your family, our advisory practice walks through it without selling.
        </p>
        <Link
          href="/about"
          className="mt-5 inline-flex items-center justify-center rounded-button bg-text-primary px-5 py-3 text-sm font-medium text-white shadow-card hover:opacity-90 hover:shadow-card-hover"
        >
          About Beyond Wealth →
        </Link>
      </section>

      <p className="mt-12 text-xs text-text-muted">
        IndiaFundSearch is an educational platform. NRI tax and FEMA rules are personal to your status. Consult a SEBI-registered advisor and a cross-border tax professional before acting.
      </p>
    </div>
  )
}

function ProductCard({ title, body }: { title: string; body: string }) {
  return (
    <li className="rounded-card border border-card-border bg-card p-5 shadow-card">
      <p className="text-base font-semibold text-text-primary">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">{body}</p>
    </li>
  )
}
