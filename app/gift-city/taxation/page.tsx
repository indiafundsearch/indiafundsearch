import type { Metadata } from 'next'
import { PendingContent } from '@/components/eeat/PendingContent'
import { JsonLd } from '@/components/shared/JsonLd'
import { pageMeta, breadcrumbJsonLd } from '@/lib/seo'

// noindex until copy is supplied (Appendix A, Task A.4).
export const metadata: Metadata = pageMeta({
  title: 'GIFT City Fund Taxation Explained',
  description: 'GIFT City Fund Taxation Explained. Copy pending supply and review; the page is not indexed until then.',
  path: '/gift-city/taxation',
  noindex: true,
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'GIFT City', path: '/gift-city' },
          { name: 'GIFT City Fund Taxation Explained', path: '/gift-city/taxation' },
        ])}
      />
      <PendingContent
        eyebrow="GIFT City"
        title={'GIFT City Fund Taxation Explained'}
        intent={'gift city fund taxation'}
        covers={['How the fund is taxed and how the investor is taxed', 'Why an Indian exemption can be worth nothing to a foreign taxpayer', 'What changes by corridor']}
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
