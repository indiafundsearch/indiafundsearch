'use client'

import { useState } from 'react'
import type { CorridorTable } from '@/lib/content/types'
import { renderInline } from '@/lib/utils/renderInline'

/**
 * A guide table that is a normal table on desktop and a tap-to-open list on
 * phones. One set of markup serves both, so the text is in the page once:
 * on a phone each row shows its name, and tapping it reveals the other
 * columns, each labelled with its column heading.
 *
 * `openFirst` starts the first row open. Used on the worked examples, where
 * the rows are meant to be compared and the pattern should be obvious.
 */
export function GuideTable({ table, openFirst = false }: { table: CorridorTable; openFirst?: boolean }) {
  const [open, setOpen] = useState<ReadonlySet<number>>(() => new Set(openFirst ? [0] : []))

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })

  return (
    <div className="md:overflow-x-auto md:plot-card">
      <table className="w-full border-collapse md:min-w-[820px] max-md:block">
        <thead className="max-md:sr-only">
          <tr>
            {table.head.map((h) => (
              <th
                key={h}
                scope="col"
                className="bg-ink text-white-warm font-mono text-[12px] tracking-[0.14em] uppercase text-left px-4 py-3 font-medium"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="max-md:grid max-md:gap-2">
          {table.rows.map((row, r) => {
            const isOpen = open.has(r)
            return (
              <tr
                key={row[0]}
                className="md:even:[&>td]:bg-paper max-md:block max-md:bg-white-warm max-md:border max-md:border-line max-md:shadow-plot"
              >
                {row.map((cell, i) =>
                  i === 0 ? (
                    <td
                      key={i}
                      className="font-sans font-semibold text-ink align-top text-[14.5px] md:px-4 md:py-3.5 md:border-t md:border-line-soft max-md:block"
                    >
                      <span className="max-md:hidden">{renderInline(cell)}</span>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => toggle(r)}
                        className="md:hidden w-full flex items-center gap-3 text-left px-4 py-3.5 text-[16px] font-semibold"
                      >
                        <span className="flex-1">{renderInline(cell)}</span>
                        <span aria-hidden className={`font-mono transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
                      </button>
                    </td>
                  ) : (
                    <td
                      key={i}
                      data-label={table.head[i]}
                      className={`text-[14.5px] text-ink-soft align-top md:px-4 md:py-3.5 md:border-t md:border-line-soft max-md:px-4 max-md:pb-3 max-md:before:content-[attr(data-label)] max-md:before:block max-md:before:font-mono max-md:before:text-[12px] max-md:before:tracking-[0.12em] max-md:before:uppercase max-md:before:text-bronze ${
                        isOpen ? 'max-md:block' : 'max-md:hidden'
                      } ${i === 1 ? 'max-md:border-t max-md:border-line-soft max-md:pt-3' : ''}`}
                    >
                      {renderInline(cell)}
                    </td>
                  ),
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
