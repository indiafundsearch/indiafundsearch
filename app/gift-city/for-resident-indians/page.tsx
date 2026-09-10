import type { Metadata } from 'next'
import { PendingContent } from '@/components/eeat/PendingContent'
import { JsonLd } from '@/components/shared/JsonLd'
import { pageMeta, breadcrumbJsonLd } from '@/lib/seo'

// noindex until copy is supplied (Appendix A, Task A.4).
export const metadata: Metadata = pageMeta({
  title: 'GIFT City Funds for Resident Indians',
  description: 'GIFT City Funds for Resident Indians. Copy pending supply and review; the page is not indexed until then.',
  path: '/gift-city/for-resident-indians',
  noindex: true,
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'GIFT City', path: '/gift-city' },
          { name: 'GIFT City Funds for Resident Indians', path: '/gift-city/for-resident-indians' },
        ])}
      />
      <PendingContent
        eyebrow="GIFT City"
        title={'GIFT City Funds for Resident Indians'}
        intent={'gift city mutual funds for indian residents'}
        covers={['The liberalised remittance route and its annual cap', 'What a resident may and may not access', 'Reporting duties that follow']}
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
