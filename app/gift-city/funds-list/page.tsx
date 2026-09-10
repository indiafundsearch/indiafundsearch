import type { Metadata } from 'next'
import { PendingContent } from '@/components/eeat/PendingContent'
import { JsonLd } from '@/components/shared/JsonLd'
import { pageMeta, breadcrumbJsonLd } from '@/lib/seo'

// noindex until copy is supplied (Appendix A, Task A.4).
export const metadata: Metadata = pageMeta({
  title: 'GIFT City Funds List: What Is Available',
  description: 'GIFT City Funds List: What Is Available. Copy pending supply and review; the page is not indexed until then.',
  path: '/gift-city/funds-list',
  noindex: true,
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'GIFT City', path: '/gift-city' },
          { name: 'GIFT City Funds List', path: '/gift-city/funds-list' },
        ])}
      />
      <PendingContent
        eyebrow="GIFT City"
        title={'GIFT City Funds List: What Is Available'}
        intent={'gift city mutual funds list'}
        covers={['Which categories of scheme exist in GIFT City and what each is for', 'How the shelf is curated and how often it is reviewed', 'Why named private-placement products cannot be listed publicly']}
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
