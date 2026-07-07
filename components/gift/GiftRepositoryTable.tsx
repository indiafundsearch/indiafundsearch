'use client'

import { Fragment, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { OUTBOUND_GROUP_ORDER, type GiftProduct } from '@/lib/gift/data'
import { GiftEnquiryForm } from './GiftEnquiryForm'

interface GiftRepositoryTableProps {
  products: GiftProduct[]
  curatedAsOf?: string
}

/**
 * Curated repository table — the desk one-pager format: grouped role
 * sections, ★ recommended-core rows, orange * for lower accredited
 * minimums, theme chips. Rows expand for detail + enquiry.
 */
export function GiftRepositoryTable({ products, curatedAsOf }: GiftRepositoryTableProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const groups = [...OUTBOUND_GROUP_ORDER, ...products.map((p) => p.group ?? 'Other')]
    .filter((g, i, arr) => arr.indexOf(g) === i)
    .map((g) => ({ name: g, rows: products.filter((p) => (p.group ?? 'Other') === g) }))
    .filter((g) => g.rows.length > 0)

  return (
    <div>
      {curatedAsOf && (
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate text-right mb-2">
          Curated as of <b className="text-ink">{curatedAsOf}</b>
        </p>
      )}

      <div className="overflow-x-auto plot-card">
        <table className="w-full border-collapse min-w-[880px]">
          <thead>
            <tr>
              {['Fund', 'Approach', 'Structure', 'Min.', 'Theme'].map((h) => (
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
                  const core = p.recommendedCore
                  return (
                    <Fragment key={p._id}>
                      <tr
                        onClick={() => setOpenId(open ? null : p._id)}
                        aria-expanded={open}
                        className={`cursor-pointer align-top transition-colors ${
                          core
                            ? 'bg-bronze-wash [&>td:first-child]:border-l-[3px] [&>td:first-child]:border-l-signal'
                            : 'bg-white-warm hover:bg-paper'
                        } ${core ? 'hover:bg-[#fbe6d2]' : ''}`}
                      >
                        <td className="px-5 py-4 border-b border-line-soft font-sans font-bold text-[15.5px] min-w-[200px]">
                          {core && (
                            <span className="text-signal mr-1.5" title="Recommended core" aria-label="Recommended core">
                              ★
                            </span>
                          )}
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
                            <span className="text-signal" title="Lower minimum for Accredited Investors — per the fund's PPM">
                              *
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4 border-b border-line-soft">
                          {p.theme && (
                            <span className="font-mono text-[9.5px] tracking-[0.1em] uppercase border border-line bg-paper text-slate px-2.5 py-1.5 rounded-[2px] inline-block whitespace-nowrap">
                              {p.theme}
                            </span>
                          )}
                        </td>
                      </tr>
                      <AnimatePresence initial={false}>
                        {open && (
                          <tr>
                            <td colSpan={5} className={`border-b border-line-soft p-0 ${core ? 'bg-bronze-wash' : 'bg-white-warm'}`}>
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                className="overflow-hidden"
                              >
                                <div className="px-5 py-5 max-w-[860px]">
                                  <p className="text-[15px] text-ink-soft">{p.description}</p>
                                  {p.manager && (
                                    <p className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-slate mt-2.5">
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

      {/* Footnotes — as on the desk one-pager */}
      <div className="bg-bronze-wash border border-bronze-soft px-5 py-3.5 mt-5 text-[14px] text-ink-soft">
        <b className="font-sans text-bronze">Accredited Investor advantage:</b> funds marked{' '}
        <span className="text-signal font-bold">*</span> carry materially lower minimums for
        Accredited Investors — per each fund&apos;s PPM.
      </div>
      <p className="font-serif text-[13.5px] text-slate mt-3">
        <span className="text-signal">★</span> = Recommended core. Access route, domicile and
        minimums for private-market strategies are confirmed against the relevant PPM at
        onboarding. Tap any row for the full note and to ask the desk.
      </p>
    </div>
  )
}
