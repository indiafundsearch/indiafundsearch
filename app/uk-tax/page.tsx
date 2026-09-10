import type { Metadata } from 'next'
import { ClusterHub } from '@/components/eeat/ClusterHub'
import { JsonLd } from '@/components/shared/JsonLd'
import { pageMeta, breadcrumbJsonLd } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'UK Tax for NRIs: Reporting Fund Status and Indian Funds',
  description:
    'What a UK-resident holder of Indian funds has to understand: HMRC reporting fund status, offshore income gains, and which India funds are on the list.',
  path: '/uk-tax',
  ogTitle: 'UK tax for NRIs',
  languages: { 'en-GB': '/uk-tax', 'x-default': '/uk-tax' },
})

export default function UkTaxHub() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'UK tax for NRIs', path: '/uk-tax' },
        ])}
      />
      <ClusterHub
        eyebrow="UK tax"
        title={
          <>
            Your Indian fund is probably taxed as income,
            <br />
            <em className="font-serif italic font-medium text-bronze">not as a gain.</em>
          </>
        }
        marketNote="If you are UK-resident and hold Indian funds"
        lede={[
          'For a UK resident, the question that decides your outcome is not what the fund returned. It is whether that exact share class holds HMRC reporting fund status. Without it, your profit on sale is not a capital gain at all. It is an offshore income gain, charged to income tax at up to 45%.',
          'Most Indian funds do not hold the status. Some do, including several GIFT City funds, and we maintain the India-exposed extract of HMRC\'s own list.',
        ]}
        reviewed="September 2026"
        sections={[
          {
            heading: 'Start here',
            links: [
              { label: 'HMRC reporting funds list: Indian funds', href: '/uk-tax/hmrc-reporting-funds-list', note: 'The maintained extract, dated, with the method stated' },
              { label: 'UK reporting fund status explained', href: '/uk-tax/uk-reporting-fund-status', note: 'What the status is, and what it costs you annually' },
              { label: 'Reporting vs non-reporting funds', href: '/uk-tax/reporting-vs-non-reporting-funds', note: 'The rate, the allowances and the asymmetric loss relief' },
              { label: 'What counts as an offshore fund', href: '/uk-tax/offshore-reporting-funds', note: 'And why a managed account sits outside the rules' },
            ],
          },
          {
            heading: 'Related reading',
            links: [
              { label: 'NRIs in the United Kingdom', href: '/nri/uk', note: 'The full corridor guide, including the four-year window' },
              { label: 'HMRC reporting fund status and Indian funds', href: '/learn/hmrc-reporting-fund-status-india', note: 'The original explainer, kept live' },
              { label: 'Can an NRI invest in PMS?', href: '/learn/can-nri-invest-in-pms', note: 'The structure that is not a fund at all' },
            ],
          },
        ]}
      />
    </>
  )
}
