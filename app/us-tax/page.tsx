import type { Metadata } from 'next'
import { ClusterHub } from '@/components/eeat/ClusterHub'
import { TrcSteps } from '@/components/eeat/TrcSteps'
import { JsonLd } from '@/components/shared/JsonLd'
import { pageMeta, breadcrumbJsonLd } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'US Tax for NRIs: PFIC, Form 8621 and Treaty Relief',
  description:
    'What a US taxpayer holding Indian investments has to understand: the PFIC regime, Form 8621, and the Form 8802 chain for claiming India treaty relief.',
  path: '/us-tax',
  ogTitle: 'US tax for NRIs',
  languages: { 'en-US': '/us-tax', 'x-default': '/us-tax' },
})

export default function UsTaxHub() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'US tax for NRIs', path: '/us-tax' },
        ])}
      />
      <ClusterHub
        eyebrow="US tax"
        title={
          <>
            Your Indian portfolio,
            <br />
            <em className="font-serif italic font-medium text-bronze">on a US tax return.</em>
          </>
        }
        marketNote="If you are a US taxpayer — green card, citizenship, or substantial presence"
        lede={[
          'Indian law does not stop a US resident investing at home. American law is what decides whether it is sensible. A pooled Indian fund is usually a PFIC, which means tax at the top marginal rate, an interest charge, and a separate form for every fund, every year.',
          'These pages explain the rules and what they mean for someone holding Indian funds. They do not work out what you owe, and they are not a substitute for a US CPA or an Enrolled Agent.',
        ]}
        reviewed="September 2026"
        sections={[
          {
            heading: 'PFIC and Form 8621',
            links: [
              { label: 'What is Form 8621?', href: '/us-tax/form-8621', note: 'Who files it, and why an unfiled year never closes' },
              { label: 'Form 8621 instructions', href: '/us-tax/form-8621-instructions', note: 'What the form asks, and the two elections' },
              { label: 'Who has to file Form 8621?', href: '/us-tax/form-8621-filing-requirements', note: 'Direct and indirect ownership, and visa holders' },
              { label: 'PFIC reporting threshold', href: '/us-tax/pfic-reporting-threshold', note: 'The de minimis exception, and what breaks it' },
              { label: 'PFIC annual information statement', href: '/us-tax/pfic-annual-information-statement', note: 'Why QEF is rarely available on Indian funds' },
              { label: 'PFIC tax rate', href: '/us-tax/pfic-tax-rate', note: 'Why there is no single rate, and the interest charge' },
              { label: 'How to avoid PFIC status', href: '/us-tax/how-to-avoid-pfic-status', note: 'The one Indian structure that sits outside it' },
              { label: 'PFIC look-through rules', href: '/us-tax/pfic-look-through-rules', note: 'When a fund-of-funds multiplies your filings' },
            ],
          },
          {
            heading: 'Claiming India treaty relief',
            links: [
              { label: 'What is Form 8802?', href: '/us-tax/form-8802', note: 'Asking the IRS to certify your US residency' },
              { label: 'US tax residency certificate', href: '/us-tax/us-tax-residency-certificate', note: 'Form 6166, and what India does with it' },
              { label: 'Form 10F, now Form 41', href: '/learn/form-10f-for-nri', note: 'The Indian side, filed online without a PAN' },
            ],
          },
          {
            heading: 'Related reading',
            links: [
              { label: 'NRIs in the United States', href: '/nri/us', note: 'The full corridor guide' },
              { label: 'Are Indian mutual funds PFICs?', href: '/learn/are-indian-mutual-funds-pfic', note: 'The short answer, with sources' },
              { label: 'Which AMCs accept US NRIs?', href: '/learn/which-amcs-accept-us-nri', note: 'Why most decline, and what to ask instead' },
            ],
          },
        ]}
      >
        <TrcSteps />
      </ClusterHub>
    </>
  )
}
