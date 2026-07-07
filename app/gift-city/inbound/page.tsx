import type { Metadata } from 'next'
import Link from 'next/link'
import { GiftRepositoryTable } from '@/components/gift/GiftRepositoryTable'
import { INBOUND_GROUP_ORDER, getGiftProducts } from '@/lib/gift/data'
import { DISCLOSURE, SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'GIFT City inbound funds — NRI investing into India (USD)',
  description:
    'Curated GIFT IFSC inbound funds for NRIs and foreign investors: Indian equity, market-neutral and private credit strategies, subscribed in US dollars under IFSCA. Minimums, liquidity and tax notes.',
  alternates: { canonical: `${SITE.url}/gift-city/inbound` },
}

export default async function GiftInboundPage() {
  const { products } = await getGiftProducts('inbound')

  return (
    <div className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <nav className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-slate mb-8" aria-label="Breadcrumb">
        <Link href="/gift-city" className="hover:text-ink">GIFT City</Link>
        <span className="mx-2">/</span>
        <span className="text-bronze">Route A — Inbound</span>
      </nav>

      <header className="mb-10 max-w-[780px]">
        <div className="eyebrow mb-3.5">Route A — Overseas Capital → Indian Strategies</div>
        <h1 className="font-sans font-bold text-[clamp(30px,4.5vw,44px)] tracking-[-0.01em] leading-[1.08]">
          Into India, in dollars.
        </h1>
        <p className="font-serif text-[19px] text-ink-soft mt-3.5">
          A GIFT City inbound fund runs an Indian strategy — the same PMS or AIF logic used onshore
          — but is housed inside the GIFT IFSC, where it accepts{' '}
          <b>US dollars from overseas investors</b> under the IFSCA regulator. No Indian bank
          account, no currency conversion, no resident-style tax filings.{' '}
          <em className="text-bronze italic">
            For NRIs, frequently the cleanest route into Indian strategies.
          </em>{' '}
          Below is the desk&apos;s working repository, organised by the role each fund plays.
        </p>
      </header>

      <GiftRepositoryTable
        products={products}
        curatedAsOf="July 2026"
        groupOrder={INBOUND_GROUP_ORDER}
      />

      <div className="mt-12 bg-white-warm border border-line border-l-4 border-l-teal px-6 py-5 text-[15px] text-ink-soft max-w-[860px]">
        <b className="font-sans">Eligibility, in one line —</b> inbound GIFT funds are built for
        NRIs, OCIs and foreign investors; resident Indians generally access these strategies through
        the domestic (onshore) versions instead.{' '}
        <Link href="/fit-finder" className="text-bronze font-sans font-medium">
          Not sure which side you&apos;re on? Run the Fit Finder →
        </Link>
      </div>

      <p className="font-serif italic text-[13.5px] text-slate mt-10 border-t border-line pt-5 max-w-[860px]">
        {DISCLOSURE.commission} {DISCLOSURE.education}
      </p>
    </div>
  )
}
