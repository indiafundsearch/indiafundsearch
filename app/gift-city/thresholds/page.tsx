import type { Metadata } from 'next'
import Link from 'next/link'
import { CHANGELOG, COLUMNS, LAST_VERIFIED, PARTIAL, ROWS, VERSION } from '@/lib/content/ifscaThresholds'
import { JsonLd } from '@/components/shared/JsonLd'
import { AuthorByline } from '@/components/eeat/AuthorByline'
import { DisclosureLine } from '@/components/shared/DisclosureLine'
import { SITE } from '@/lib/constants'
import { pageMeta, breadcrumbJsonLd, articleJsonLd } from '@/lib/seo'

// noindex until ROWS is populated (Appendix A, Task A.5). An empty reference
// table is worse than no reference table, and it would compete with the
// existing /learn/gift-city-minimum-investment page while carrying nothing.
export const metadata: Metadata = pageMeta({
  title: 'IFSCA Thresholds: GIFT City Minimums by Vehicle',
  description:
    'A maintained reference table of IFSCA minimums by vehicle type and investor class, with the governing provision and last-verified date against every row.',
  path: '/gift-city/thresholds',
  // Stays out of the index while any column is still 'Pending verification'.
  noindex: ROWS.length === 0 || PARTIAL,
})

export default function ThresholdsPage() {
  const empty = ROWS.length === 0
  return (
    <div className="mx-auto max-w-[1180px] px-[22px] pt-13 pb-24 max-sm:pt-9">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'GIFT City', path: '/gift-city' },
            { name: 'IFSCA thresholds', path: '/gift-city/thresholds' },
          ]),
          articleJsonLd({
            title: 'IFSCA thresholds: GIFT City minimums by vehicle',
            description: 'Reference table of IFSCA minimums by vehicle type and investor class.',
            path: '/gift-city/thresholds',
          }),
          {
            '@context': 'https://schema.org',
            '@type': 'Dataset',
            name: 'IFSCA thresholds by vehicle type and investor class',
            description:
              'Minimum investment, minimum corpus, FME category, sponsor commitment, tenure and repatriability for GIFT City vehicles, each with its governing provision.',
            url: `${SITE.url}/gift-city/thresholds`,
            version: VERSION,
            license: 'https://creativecommons.org/licenses/by/4.0/',
            creator: { '@type': 'Organization', '@id': `${SITE.url}/#organization` },
            distribution: [
              {
                '@type': 'DataDownload',
                encodingFormat: 'text/csv',
                contentUrl: `${SITE.url}/api/ifsca-thresholds.csv`,
              },
            ],
          },
        ]}
      />

      <nav className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-slate mb-8" aria-label="Breadcrumb">
        <Link href="/gift-city" className="hover:text-ink">GIFT City</Link>
        <span className="mx-2">/</span>
        <span className="text-bronze">IFSCA thresholds</span>
      </nav>

      <div className="eyebrow mb-3.5">Reference · version {VERSION}</div>
      <h1 className="font-sans font-bold text-[clamp(30px,4.5vw,44px)] tracking-[-0.01em] leading-[1.08] max-w-[820px]">
        IFSCA thresholds, by vehicle and investor class.
      </h1>
      <p className="font-serif text-[18.5px] text-ink-soft max-w-[760px] mt-4">
        A maintained reference table. Every row carries the governing provision it comes from and
        the date it was last verified, because a threshold without a citation and a date is not
        much use to anyone.
      </p>
      <AuthorByline
        className="mt-6"
        reviewed="September 2026"
        regulatoryAsAt={LAST_VERIFIED ?? undefined}
      />

      {empty ? (
        <div className="mt-10 bg-bronze-wash border border-dashed border-bronze-soft px-6 py-6 max-w-[860px]">
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-bronze mb-2">
            TODO: CONTENT — pending legal review
          </p>
          <p className="text-[16.5px] text-ink-soft">
            The table structure, CSV export, versioning and schema are built. The rows themselves
            are held back until legal review is complete, and this page stays out of the search
            index until they land. An empty reference table would be worse than none.
          </p>
          <p className="text-[16.5px] text-ink-soft mt-3">
            In the meantime, the verified IFSCA minimums we do publish are on{' '}
            <Link href="/learn/gift-city-minimum-investment" className="text-bronze border-b border-bronze-soft">
              GIFT City fund minimum investment
            </Link>
            .
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto plot-card mt-8">
            <table className="w-full border-collapse min-w-[1000px]">
              <caption className="sr-only">
                IFSCA minimums by vehicle type and investor class, version {VERSION}
              </caption>
              <thead>
                <tr>
                  {COLUMNS.map((c) => (
                    <th
                      key={c.key}
                      scope="col"
                      className="bg-ink text-white-warm font-mono text-[10px] tracking-[0.14em] uppercase text-left px-4 py-3 font-medium"
                    >
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr key={i} className="even:[&>td]:bg-paper">
                    {COLUMNS.map((c) => (
                      <td
                        key={c.key}
                        className="px-4 py-3 text-[14px] align-top border-t border-line-soft text-ink-soft"
                      >
                        {r[c.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-mono text-[11px] text-slate mt-3">
            <a href="/api/ifsca-thresholds.csv" className="text-bronze border-b border-bronze-soft">
              Download as CSV
            </a>
            {LAST_VERIFIED && <> · Last verified {LAST_VERIFIED}</>}
          </p>
        </>
      )}

      <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze mt-12 mb-3">
        Reuse
      </h2>
      <p className="text-[16.5px] text-ink-soft max-w-[820px]">
        This table may be reproduced with attribution and a link to this page.
      </p>

      <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-bronze mt-10 mb-3">
        Changelog
      </h2>
      <ul className="max-w-[820px]">
        {CHANGELOG.map((c) => (
          <li key={c.version} className="text-[15.5px] text-ink-soft py-1">
            <span className="font-mono text-[12px] text-bronze mr-2">{c.version}</span>
            {c.date} — {c.note}
          </li>
        ))}
      </ul>

      <DisclosureLine />
    </div>
  )
}
