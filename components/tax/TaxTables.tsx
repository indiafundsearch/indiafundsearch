'use client'

import { useState } from 'react'
import { TAX_ROWS } from '@/lib/content/tax'

type Mode = 'res' | 'nri'

const HEADS: Record<Mode, string[]> = {
  res: ['Structure', 'LT threshold', 'Short-term', 'Long-term', 'Income / other', 'Note'],
  nri: ['Structure', 'LT threshold', 'Short-term', 'Long-term', 'Income / TDS', 'NRI note'],
}

/** Resident / NRI tax schedule with toggle. */
export function TaxTables() {
  const [mode, setMode] = useState<Mode>('res')

  return (
    <div>
      <div className="flex border-[1.5px] border-ink w-max rounded-[3px] overflow-hidden mb-[26px]">
        {(['res', 'nri'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className={`font-sans text-[13px] font-medium tracking-[0.08em] uppercase px-[22px] py-2.5 transition-colors ${
              mode === m ? 'bg-ink text-white-warm' : 'text-slate hover:text-ink'
            }`}
          >
            {m === 'res' ? 'Resident' : 'NRI'}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto plot-card">
        <table className="w-full border-collapse min-w-[900px]">
          <thead>
            <tr>
              {HEADS[mode].map((h) => (
                <th
                  key={h}
                  className="font-mono text-[10px] tracking-[0.14em] uppercase text-left px-4 py-3.5 bg-ink text-white-warm font-medium"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TAX_ROWS[mode].map((row, ri) => (
              <tr key={ri} className="even:[&>td]:bg-paper">
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-4 py-[13px] border-b border-line-soft align-top ${
                      ci === 0
                        ? 'font-sans font-semibold text-[14px]'
                        : ci < 4
                          ? 'font-mono text-[13px]'
                          : 'text-[14.5px]'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
