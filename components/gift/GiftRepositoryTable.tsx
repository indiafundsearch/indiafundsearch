'use client'

import { Fragment, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { OUTBOUND_GROUP_ORDER, type AccessMark, type GiftProduct } from '@/lib/gift/data'
import { GIFT_SHELF } from '@/lib/constants'
import { GiftEnquiryForm } from './GiftEnquiryForm'

interface GiftRepositoryTableProps {
  products: GiftProduct[]
  curatedAsOf?: string
  /** preferred group ordering; unknown groups append in data order */
  groupOrder?: readonly string[]
}

/**
 * Curated repository table — grouped role sections, factual theme chips,
 * and an orange * for lower accredited-investor minimums (a PPM fact, not a
 * recommendation). Rows expand for detail + enquiry. No evaluative signals:
 * this is an education/reference surface, not investment advice.
 */
/** ✓ accepted · ✗ not accepted · – not confirmed. Colour never carries the meaning alone. */
function Mark({ label, value }: { label: string; value: AccessMark }) {
  const glyph = value === 'yes' ? '✓' : value === 'no' ? '✗' : '–'
  const tone = value === 'yes' ? 'text-teal' : value === 'no' ? 'text-alert' : 'text-slate'
  const title = value === 'yes' ? 'Accepted' : value === 'no' ? 'Not accepted' : 'Not confirmed'
  return (
    <span className="inline-flex items-center gap-1 mr-3 last:mr-0" title={`${label}: ${title}`}>
      <span className="font-mono text-[9.5px] tracking-[0.12em] uppercase text-slate">{label}</span>
      <span className={`font-sans text-[13px] font-bold ${tone}`} aria-label={title}>{glyph}</span>
    </span>
  )
}

export function GiftRepositoryTable({
  products,
  curatedAsOf,
  groupOrder = OUTBOUND_GROUP_ORDER,
}: GiftRepositoryTableProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const hasAccess = products.some((p) => p.access)
  const columns = ['Fund', 'Approach', 'Structure', 'Min.', ...(hasAccess ? ['Access & eligibility'] : ['Theme'])]

  const groups = [...groupOrder, ...products.map((p) => p.group ?? 'Other')]
    .filter((g, i, arr) => arr.indexOf(g) === i)
    .map((g) => ({ name: g, rows: products.filter((p) => (p.group ?? 'Other') === g) }))
    .filter((g) => g.rows.length > 0)

  return (
    <div>
      {curatedAsOf && (
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate text-right mb-2">
          Curated as of <b className="text-ink">{curatedAsOf}</b> · {GIFT_SHELF.reviewCadence}
        </p>
      )}

      <div className="overflow-x-auto plot-card">
        <table className="w-full border-collapse min-w-[880px]">
          <thead>
            <tr>
              {columns.map((h) => (
                <th
                  key={h}
                  className="font-mono text-[10px] tracking-[0.18em] uppercase text-left px-5 py-3.5 bg-ink text-white-warm font-medium"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((g) => (
              <Fragment key={g.name}>
                {/* Group banner */}
                <tr>
                  <td colSpan={5} className="bg-ink px-5 py-2.5">
                    <span className="inline-flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-signal inline-block" aria-hidden />
                      <span className="font-sans text-[13.5px] font-bold tracking-[0.04em] uppercase text-white-warm">
                        {g.name}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-bronze-soft">
                        {g.rows.length} route{g.rows.length > 1 ? 's' : ''}
                      </span>
                    </span>
                  </td>
                </tr>
                {g.rows.map((p) => {
                  const open = openId === p._id
                  return (
                    <Fragment key={p._id}>
                      <tr
                        onClick={() => setOpenId(open ? null : p._id)}
                        aria-expanded={open}
                        className="cursor-pointer align-top transition-colors bg-white-warm hover:bg-paper"
                      >
                        <td className="px-5 py-4 border-b border-line-soft font-sans font-bold text-[15.5px] min-w-[200px]">
                          {p.name}
                        </td>
                        <td className="px-5 py-4 border-b border-line-soft font-serif text-[14.5px] text-ink-soft max-w-[380px]">
                          {p.thesis}
                        </td>
                        <td className="px-5 py-4 border-b border-line-soft font-sans font-semibold text-[14px] whitespace-nowrap">
                          {p.structure}
                        </td>
                        <td className="px-5 py-4 border-b border-line-soft font-sans font-bold text-[14.5px] whitespace-nowrap">
                          {p.minInvestment}
                          {p.lowerMinForAccredited && (
                            <span className="text-signal-ink" title="Lower minimum for Accredited Investors — per the fund's PPM">
                              *
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4 border-b border-line-soft whitespace-nowrap">
                          {hasAccess ? (
                            p.access ? (
                              <>
                                <Mark label="US" value={p.access.us} />
                                <Mark label="UK" value={p.access.uk} />
                                <Mark label="CA" value={p.access.ca} />
                              </>
                            ) : (
                              <span className="font-mono text-[10px] text-slate">–</span>
                            )
                          ) : (
                            p.theme && (
                              <span className="font-mono text-[9.5px] tracking-[0.1em] uppercase border border-line bg-paper text-slate px-2.5 py-1.5 rounded-[2px] inline-block whitespace-nowrap">
                                {p.theme}
                              </span>
                            )
                          )}
                        </td>
                      </tr>
                      <AnimatePresence initial={false}>
                        {open && (
                          <tr>
                            <td colSpan={5} className="border-b border-line-soft p-0 bg-white-warm">
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                className="overflow-hidden"
                              >
                                <div className="px-5 py-5 max-w-[860px]">
                                  <p className="text-[15px] text-ink-soft">{p.description}</p>
                                  {hasAccess && p.theme && (
                                    <span className="font-mono text-[9.5px] tracking-[0.1em] uppercase border border-line bg-paper text-slate px-2.5 py-1.5 rounded-[2px] inline-block mt-2.5">
                                      {p.theme}
                                    </span>
                                  )}
                                  {p.eligibility && (
                                    <p className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-slate mt-2.5">
                                      Eligibility — {p.eligibility}
                                    </p>
                                  )}
                                  {p.manager && (
                                    <p className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-slate mt-1.5">
                                      Manager — {p.manager}
                                    </p>
                                  )}
                                  <GiftEnquiryForm product={p} />
                                </div>
                              </motion.div>
                            </td>
                          </tr>
                        )}
                      </AnimatePresence>
                    </Fragment>
                  )
                })}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footnotes — as on the desk one-pager; shown only when applicable */}
      {hasAccess && (
        <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-slate mt-4">
          <span className="text-teal font-bold">✓</span> Accepted · <span className="text-alert font-bold">✗</span> Not accepted ·
          <span className="font-bold"> –</span> Not confirmed — as confirmed with each house; re-checked at onboarding.
        </p>
      )}
      {products.some((p) => p.lowerMinForAccredited) && (
        <div className="bg-bronze-wash border border-bronze-soft px-5 py-3.5 mt-4 text-[14px] text-ink-soft">
          <b className="font-sans text-bronze">Accredited Investor minimums:</b> funds marked{' '}
          <span className="text-signal-ink font-bold">*</span> carry materially lower minimums for
          Accredited Investors, per each fund&apos;s PPM
          {products.some((p) => p.accreditedMin) && (
            <>
              {' — '}
              {products
                .filter((p) => p.accreditedMin)
                .map((p) => `${p.name.split(' ')[0]} ${p.accreditedMin}`)
                .join(' · ')}
            </>
          )}
          .
        </div>
      )}
      <p className="font-serif text-[13.5px] text-slate mt-3">
        Access route, domicile and minimums are confirmed against the relevant PPM at onboarding.
        This is a reference list, not a recommendation. Tap any row for the full note and to ask the desk.
      </p>
    </div>
  )
}
