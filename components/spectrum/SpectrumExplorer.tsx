'use client'

import { useRef, useState } from 'react'
import { SpectrumMap } from './SpectrumMap'
import { OutcomeMap } from './OutcomeMap'
import { ObjectiveView } from './ObjectiveView'
import { DetailPanel } from './DetailPanel'

type View = 'pos' | 'out' | 'obj'

const VIEWS: { key: View; label: string }[] = [
  { key: 'pos', label: 'Position — Risk × Liquidity' },
  { key: 'out', label: 'Outcome — ₹1 Cr, 5 Years' },
  { key: 'obj', label: 'By Objective' },
]

/** The interactive Spectrum — three readings of the same landscape. */
export function SpectrumExplorer() {
  const [view, setView] = useState<View>('pos')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const detailRef = useRef<HTMLDivElement>(null)

  const select = (id: string) => {
    setSelectedId(id)
    // Let the panel render, then bring it into view
    requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    })
  }

  return (
    <div>
      {/* View toggle */}
      <div className="flex border-[1.5px] border-ink w-max max-w-full rounded-[3px] overflow-hidden mb-6 overflow-x-auto">
        {VIEWS.map((v) => (
          <button
            key={v.key}
            type="button"
            onClick={() => setView(v.key)}
            className={`font-sans text-[12.5px] font-medium tracking-[0.07em] uppercase px-[18px] py-2.5 whitespace-nowrap transition-colors ${
              view === v.key ? 'bg-ink text-white-warm' : 'text-slate hover:text-ink'
            }`}
            aria-pressed={view === v.key}
          >
            {v.label}
          </button>
        ))}
      </div>

      {view === 'obj' ? (
        <ObjectiveView onSelect={select} />
      ) : (
        <div className="plot-card p-[26px] pb-[18px] max-sm:p-3.5">
          <span className="corner corner-tl" />
          <span className="corner corner-tr" />
          <span className="corner corner-bl" />
          <span className="corner corner-br" />
          {view === 'pos' ? (
            <SpectrumMap selectedId={selectedId} onSelect={select} />
          ) : (
            <OutcomeMap selectedId={selectedId} onSelect={select} />
          )}
          <div className="font-mono text-[11px] text-slate tracking-[0.04em] mt-3 flex justify-between flex-wrap gap-2">
            {view === 'pos' ? (
              <>
                <span>SCALE — POSITIONS INDICATIVE, NOT TO PRECISION</span>
                <span>SOURCE — SEBI PRODUCT FRAMEWORKS, FY 2026–27</span>
              </>
            ) : (
              <>
                <span>NUMBERS ARE TYPICAL-CASE ORIENTATIONS, NOT FORECASTS</span>
                <span>BUBBLE SIZE — MINIMUM TICKET (LOG SCALE)</span>
              </>
            )}
          </div>
        </div>
      )}

      <div ref={detailRef}>
        <DetailPanel selectedId={selectedId} />
      </div>
    </div>
  )
}
