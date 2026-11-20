'use client'

import { COMPARISON } from '@/lib/content/comparison'
import { TapTable } from '@/components/shared/TapTable'

/** The four structures, side by side — PMS / AIF / MF / SIF. On a phone each
 *  attribute opens to show the four structures' values, labelled. */
export function ComparisonTable() {
  return (
    <TapTable
      head={COMPARISON.head.map((h, i) => h || (i === 0 ? 'Attribute' : `Column ${i + 1}`))}
      rows={COMPARISON.rows.map((row) => ({ key: row[0], cells: row }))}
      openFirst
      renderHead={(name, i) => (
        <span className="font-sans text-[14px] font-bold normal-case tracking-normal">
          {COMPARISON.head[i]}
          {COMPARISON.sub[i] && (
            <small className="block font-mono text-[10.5px] tracking-[0.1em] font-normal text-bronze-soft uppercase mt-[3px]">
              {COMPARISON.sub[i]}
            </small>
          )}
        </span>
      )}
      cellClass={(column) => (column === 0 ? 'md:w-[170px]' : '')}
    />
  )
}
