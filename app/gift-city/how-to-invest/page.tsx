import type { Metadata } from 'next'
import { PendingContent } from '@/components/eeat/PendingContent'
import { JsonLd } from '@/components/shared/JsonLd'
import { pageMeta, breadcrumbJsonLd } from '@/lib/seo'

// noindex until copy is supplied (Appendix A, Task A.4).
export const metadata: Metadata = pageMeta({
  title: 'How to Invest in GIFT City Funds',
  description: 'How to Invest in GIFT City Funds. Copy pending supply and review; the page is not indexed until then.',
  path: '/gift-city/how-to-invest',
  noindex: true,
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'GIFT City', path: '/gift-city' },
          { name: 'How to Invest in GIFT City Funds', path: '/gift-city/how-to-invest' },
        ])}
      />
      <PendingContent
        eyebrow="GIFT City"
        title={'How to Invest in GIFT City Funds'}
        intent={'how to invest in gift city mutual funds'}
        covers={['The account and KYC route for an NRI and for a resident', 'What paperwork the FME asks for', 'How money moves in, and how it comes back']}
        insteadRead={[
          { label: 'GIFT City explained', href: '/gift-city' },
          { label: 'GIFT City fund minimum investment', href: '/learn/gift-city-minimum-investment' },
          { label: 'GIFT City vs Indian mutual fund', href: '/learn/gift-city-vs-mutual-fund-for-nri' },
          { label: 'IFSCA thresholds', href: '/gift-city/thresholds' },
        ]}
      />
    </>
  )
}
