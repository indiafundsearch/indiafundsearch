'use client'

import { OBJECTIVES } from '@/lib/content/objectives'

interface ObjectiveViewProps {
  onSelect: (id: string) => void
}

/** By-objective view — which structure does which job. */
export function ObjectiveView({ onSelect }: ObjectiveViewProps) {
  return (
    <div>
      {OBJECTIVES.map((o) => (
        <div key={o.heading} className="plot-card overflow-hidden mb-[22px]">
          <div className="bg-ink text-white-warm px-6 py-4 flex items-baseline gap-3.5 flex-wrap">
            <h3 className="font-sans text-[19px] font-bold tracking-[0.02em]">{o.heading}</h3>
            <span className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-bronze-soft">{o.sub}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {['Product type', 'What it holds', 'Fit in the portfolio', 'Structure'].map((h) => (
                    <th
                      key={h}
                      className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-left px-6 py-[11px] bg-paper-2 text-slate font-medium max-md:px-3.5"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {o.rows.map((r) => (
                  <tr
                    key={r[0]}
                    onClick={() => onSelect(r[4])}
                    className="cursor-pointer hover:[&>td]:bg-bronze-wash"
                  >
                    <td className="px-6 py-3.5 border-t border-line-soft font-sans font-semibold text-[15px] whitespace-nowrap max-md:px-3.5 max-md:whitespace-normal">
                      {r[0]}
                    </td>
                    <td className="px-6 py-3.5 border-t border-line-soft text-[15px] align-top max-md:px-3.5">{r[1]}</td>
                    <td className="px-6 py-3.5 border-t border-line-soft text-[15px] align-top max-md:px-3.5">{r[2]}</td>
                    <td className="px-6 py-3.5 border-t border-line-soft align-top max-md:px-3.5">
                      <span className="font-mono text-[9.5px] tracking-[0.1em] uppercase bg-ink text-white-warm px-2 py-[3px] rounded-[2px] inline-block whitespace-nowrap">
                        {r[3]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      <p className="font-mono text-[11px] text-slate tracking-[0.04em] mt-3">
        Tap any row for the specification. Objective mapping per the Beyond desk framework — approaches for consideration, not advice.
      </p>
    </div>
  )
}
