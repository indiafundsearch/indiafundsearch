'use client'

import { useState } from 'react'
import { TAX_ROWS } from '@/lib/content/tax'
import { TapTable } from '@/components/shared/TapTable'

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

      <TapTable
        key={mode}
        head={HEADS[mode]}
        rows={TAX_ROWS[mode].map((row) => ({ key: row[0], cells: row }))}
        minWidth="md:min-w-[900px]"
        cellClass={(column) => (column > 0 && column < 4 ? 'md:font-mono md:text-[13px]' : '')}
      />
    </div>
  )
}
