'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { GiftProduct } from '@/lib/gift/data'
import { GiftEnquiryForm } from './GiftEnquiryForm'

/** Expandable product cards for one GIFT direction. */
export function GiftShelf({ products, isSeed }: { products: GiftProduct[]; isSeed: boolean }) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div>
      {isSeed && (
        <p className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-alert border border-alert/40 bg-white-warm px-3.5 py-2.5 mb-5 inline-block">
          Representative product shapes — actual shelf being finalised. Enquire for current offers.
        </p>
      )}
      <div className="grid gap-[18px] md:grid-cols-2">
        {products.map((p, i) => {
          const open = openId === p._id
          return (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: (i % 2) * 0.07, duration: 0.4 }}
              className="bg-white-warm border border-line shadow-plot relative flex flex-col before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-signal"
            >
              <div className="p-6 pb-4 flex-1">
                <div className="flex items-center justify-between gap-2 flex-wrap mb-1.5">
                  <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-bronze">
                    {p.structure}
                  </span>
                  <span
                    className={`font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-[3px] rounded-[2px] ${
                      p.status === 'Open'
                        ? 'bg-teal text-white-warm'
                        : p.status === 'Closing Soon'
                          ? 'bg-signal text-ink'
                          : 'bg-paper-2 text-slate'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <h3 className="font-sans text-[18px] font-bold">{p.name}</h3>
                <p className="font-serif italic text-[15px] text-ink-soft mt-1.5">{p.thesis}</p>

                <div className="flex gap-2 flex-wrap mt-3.5 font-mono text-[10px] tracking-[0.06em] uppercase">
                  <span className="border border-bronze-soft text-bronze bg-bronze-wash px-2 py-1 rounded-[2px]">
                    {p.indicativeReturn.split('(')[0].trim()}
                  </span>
                  <span className="border border-line text-slate bg-paper px-2 py-1 rounded-[2px]">
                    MIN {p.minInvestment}
                  </span>
                  <span className="border border-line text-slate bg-paper px-2 py-1 rounded-[2px]">
                    {p.currency}
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="text-[15px] text-ink-soft mt-4">{p.description}</p>
                      <table className="w-full border-collapse text-[13.5px] mt-3.5">
                        <tbody>
                          {(
                            [
                              ['Liquidity', p.liquidity],
                              ['Who can invest', p.eligibility],
                              p.manager ? (['Manager', p.manager] as [string, string]) : null,
                            ].filter(Boolean) as [string, string][]
                          ).map(([k, v]) => (
                            <tr key={k}>
                              <td className="font-mono text-[10px] tracking-[0.1em] uppercase text-slate py-2 pr-3 border-b border-line-soft w-[40%] align-top">
                                {k}
                              </td>
                              <td className="font-sans font-medium py-2 border-b border-line-soft">{v}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {p.taxNote && (
                        <p className="text-[13.5px] text-ink-soft bg-bronze-wash border border-dashed border-bronze-soft px-3 py-2.5 mt-3">
                          <span className="font-mono text-[8.5px] tracking-[0.18em] uppercase text-bronze block mb-1 font-semibold">
                            Tax note
                          </span>
                          {p.taxNote}
                        </p>
                      )}
                      <GiftEnquiryForm product={p} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={() => setOpenId(open ? null : p._id)}
                aria-expanded={open}
                className="font-sans text-[12.5px] font-medium tracking-[0.08em] uppercase text-left px-6 py-3.5 border-t border-line text-bronze hover:bg-paper-2 transition-colors"
              >
                {open ? '− Close specification' : '+ Full specification & enquiry'}
              </button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
