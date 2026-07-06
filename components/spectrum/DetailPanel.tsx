'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { productById } from '@/lib/content/products'
import { FD_PATH_5Y, formatCr } from '@/lib/content/format'

interface DetailPanelProps {
  selectedId: string | null
}

/** Inspection panel for the selected structure — analogy, ₹1 Cr story, specs. */
export function DetailPanel({ selectedId }: DetailPanelProps) {
  const product = selectedId ? productById(selectedId) : undefined
  if (!product) return null
  const v5 = Math.pow(1 + product.mid / 100, 5)

  const specs: [string, string][] = [
    ['Minimum', product.min],
    ['Indicative range', product.ret],
    ['Risk band', product.riskBand],
    ['Liquidity', product.liqLabel],
    ['Horizon', product.horizon],
  ]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={product.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="mt-[26px] bg-white-warm border border-line border-l-4 border-l-signal shadow-plot px-[30px] py-7 max-sm:px-5"
      >
        <div className="flex justify-between gap-5 flex-wrap items-baseline">
          <div>
            <div className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-bronze">
              {product.tag}
              <span className="ml-2 font-mono text-[9.5px] tracking-[0.1em] bg-ink text-white-warm px-2 py-[3px] rounded-[2px] normal-tracking">
                {product.badge}
              </span>
            </div>
            <h3 className="font-sans text-2xl font-bold mt-1">{product.name}</h3>
          </div>
          <Link
            href={`/learn/${product.slug}`}
            className="font-sans text-[13px] font-medium tracking-[0.06em] uppercase text-bronze border-b-[1.5px] border-bronze-soft hover:text-ink transition-colors"
          >
            Full specification →
          </Link>
        </div>

        <p className="font-serif italic text-[18px] text-ink-soft border-l-2 border-line pl-4 my-3.5">
          {product.analogy}
        </p>

        {/* ₹1 Cr story */}
        <div className="bg-paper border border-line px-[22px] py-[18px] my-4 max-w-[460px]">
          <div className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-slate mb-2">
            The story · ₹1 Cr · 5 years · at range midpoint
          </div>
          <div className="font-sans text-2xl font-bold">
            ₹1 Cr → <b className="text-bronze">{formatCr(v5)}</b>
          </div>
          <div className="text-[15px] text-slate mt-1">vs FD path (post-tax) → {formatCr(FD_PATH_5Y)}</div>
          <div className="font-sans font-bold text-base mt-2">{(v5 / FD_PATH_5Y).toFixed(2)}× the FD path.</div>
        </div>

        <div className="flex flex-wrap border border-line">
          {specs.map(([label, value]) => (
            <div key={label} className="flex-1 min-w-[130px] px-4 py-3 border-r border-line last:border-r-0">
              <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-slate block mb-[3px]">
                {label}
              </span>
              <b className="font-sans text-[14.5px] font-semibold">{value}</b>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
