import type { Metadata } from 'next'
import { PendingContent } from '@/components/eeat/PendingContent'
import { JsonLd } from '@/components/shared/JsonLd'
import { pageMeta, breadcrumbJsonLd } from '@/lib/seo'

// noindex until copy is supplied (Appendix A, Task A.4).
export const metadata: Metadata = pageMeta({
  title: 'Who Can Invest in GIFT City Funds',
  description: 'Who Can Invest in GIFT City Funds. Copy pending supply and review; the page is not indexed until then.',
  path: '/gift-city/eligibility',
  noindex: true,
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'GIFT City', path: '/gift-city' },
          { name: 'Who Can Invest in GIFT City Funds', path: '/gift-city/eligibility' },
        ])}
      />
      <PendingContent
        eyebrow="GIFT City"
        title={'Who Can Invest in GIFT City Funds'}
        intent={'who can invest in gift city funds'}
        covers={['The eligible investor classes under the IFSCA rules', 'Where residence changes the answer', 'Why accreditation does not carry across from SEBI']}
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
