import type { Metadata } from 'next'
import Link from 'next/link'
import { GiftShelf } from '@/components/gift/GiftShelf'
import { getGiftProducts } from '@/lib/gift/data'
import { DISCLOSURE, SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'GIFT City outbound — global investing for resident Indians (LRS)',
  description:
    'Curated GIFT IFSC outbound products for resident Indians: global equity, US technology and USD income strategies via the RBI LRS route (US $250,000/year). Minimums, liquidity and tax notes.',
  alternates: { canonical: `${SITE.url}/gift-city/outbound` },
}

export default async function GiftOutboundPage() {
  const { products, isSeed } = await getGiftProducts('outbound')

  return (
    <div className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <nav className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-slate mb-8" aria-label="Breadcrumb">
        <Link href="/gift-city" className="hover:text-ink">GIFT City</Link>
        <span className="mx-2">/</span>
        <span className="text-bronze">Route B — Outbound</span>
      </nav>

      <header className="mb-10 max-w-[780px]">
        <div className="eyebrow mb-3.5">Route B — Resident Capital → Global Markets</div>
        <h1 className="font-sans font-bold text-[clamp(30px,4.5vw,44px)] tracking-[-0.01em] leading-[1.08]">
          Go global, without the maze.
        </h1>
        <p className="font-serif text-[19px] text-ink-soft mt-3.5">
          Resident Indians can invest globally through the RBI&apos;s LRS route —{' '}
          <b>US $2,50,000 per person per year</b>. GIFT-domiciled outbound structures put dollar
          assets inside Indian paperwork: global equity, US technology, USD income —{' '}
          <em className="text-bronze italic">
            geographic and currency diversification in a single, regulated wrapper.
          </em>
        </p>
      </header>

      <GiftShelf products={products} isSeed={isSeed} />

      <div className="mt-12 bg-white-warm border border-line border-l-4 border-l-teal px-6 py-5 text-[15px] text-ink-soft max-w-[860px]">
        <b className="font-sans">Tax, in one line —</b> GIFT/global fund units held by residents:
        LTCG 12.5% after 24 months, slab rate if sooner; Schedule FA reporting is mandatory and TCS
        applies on LRS above ₹10 L/yr (adjustable against tax).{' '}
        <Link href="/tax" className="text-bronze font-sans font-medium">
          Full schedule →
        </Link>
      </div>

      <p className="font-serif italic text-[13.5px] text-slate mt-10 border-t border-line pt-5 max-w-[860px]">
        {DISCLOSURE.commission} {DISCLOSURE.education}
      </p>
    </div>
  )
}
