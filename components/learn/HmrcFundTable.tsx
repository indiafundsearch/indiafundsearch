import { AS_OF, HMRC_INDIA_FUNDS, HMRC_SOURCE, HMRC_TOTALS } from '@/lib/content/hmrcIndiaFunds'

/**
 * The audit table. Ungated and dated on purpose: original benchmark data is
 * what earns citations, and a table without an as-of date is worthless on a
 * list that changes every month.
 */
export function HmrcFundTable() {
  return (
    <section className="max-w-[860px] mt-12">
      <h2 className="font-sans font-bold text-[clamp(20px,2.4vw,25px)] tracking-[-0.01em] leading-[1.2] mb-3">
        Which Indian funds are on the list right now
      </h2>
      <p className="text-[17px] text-ink-soft leading-[1.62]">
        We parsed HMRC&rsquo;s own published file, all {(124141).toLocaleString('en-IN')} share-class
        rows of it, and pulled out everything India-domiciled or GIFT City. As at{' '}
        <b>{AS_OF}</b> there are <b>{HMRC_TOTALS.parents} parent funds</b> holding reporting fund
        status across <b>{HMRC_TOTALS.classes} share classes</b>. {HMRC_TOTALS.gift} of those parents
        are GIFT City or IFSC funds.
      </p>
      <p className="text-[17px] text-ink-soft leading-[1.62] mt-3">
        So &ldquo;no Indian fund has reporting status&rdquo; is simply wrong. But the list is short,
        most entries are recent, and one has already come off it.
      </p>

      <div className="overflow-x-auto plot-card mt-6">
        <table className="w-full border-collapse min-w-[620px]">
          <thead>
            <tr>
              {['Parent fund', 'Share classes', 'Reporting from', 'Status'].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="bg-ink text-white-warm font-mono text-[10px] tracking-[0.14em] uppercase text-left px-4 py-3 font-medium"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HMRC_INDIA_FUNDS.map((f) => (
              <tr key={f.parent} className="even:[&>td]:bg-paper">
                <td className="px-4 py-3 text-[14.5px] align-top border-t border-line-soft font-sans font-semibold text-ink">
                  {f.parent}
                  {f.gift && (
                    <span className="ml-2 font-mono text-[9px] tracking-[0.08em] uppercase border border-bronze-soft text-bronze bg-bronze-wash px-1.5 py-[2px] rounded-[2px] align-middle">
                      GIFT / IFSC
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-[14.5px] align-top border-t border-line-soft text-ink-soft">
                  {f.classes}
                </td>
                <td className="px-4 py-3 text-[14.5px] align-top border-t border-line-soft text-ink-soft whitespace-nowrap">
                  {f.from}
                </td>
                <td className="px-4 py-3 text-[14.5px] align-top border-t border-line-soft text-ink-soft">
                  {f.ceased ? (
                    <span className="text-alert font-sans font-semibold">
                      A class ceased {f.ceased}
                    </span>
                  ) : (
                    'On the list'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="font-mono text-[11px] tracking-[0.04em] text-slate mt-3">
        Source:{' '}
        <a
          href={HMRC_SOURCE}
          target="_blank"
          rel="noopener noreferrer"
          className="text-bronze border-b border-bronze-soft"
        >
          HMRC, approved offshore reporting funds
        </a>
        , file dated {AS_OF}. Counted as Indian where the ISIN is Indian, or the fund name says GIFT
        or IFSC. Grouped by parent; &ldquo;reporting from&rdquo; is the earliest date across that
        parent&rsquo;s classes.
      </p>

      <div className="bg-white-warm border border-line border-l-4 border-l-alert px-5 py-4 mt-5 text-[15.5px] text-ink-soft">
        <b className="font-sans">Read this table with three cautions.</b> Status belongs to a{' '}
        <b>share class</b>, not to the fund, so finding the name here is not the check. It runs{' '}
        <b>from a date</b>, and most Indian entries only start in April 2025, so a longer-held
        holding may have been non-reporting for part of its life. And it can{' '}
        <b>cease</b> &mdash; one class here came off the list on 31/03/2026. Always confirm your own
        class against HMRC&rsquo;s current file before you buy or sell.
      </div>
    </section>
  )
}
