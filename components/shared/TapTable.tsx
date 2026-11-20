'use client'

import { useState, type ReactNode } from 'react'

export interface TapTableRow {
  /** Stable React key. */
  key: string
  cells: ReactNode[]
}

interface TapTableProps {
  /** Column names. Used as the desktop header and as the label on each value on phones. */
  head: string[]
  rows: TapTableRow[]
  /** Custom desktop header cell, e.g. with a sub-label. Defaults to the plain name. */
  renderHead?: (name: string, index: number) => ReactNode
  /** Extra classes for a body cell on desktop, by column index. */
  cellClass?: (column: number) => string
  /** Tailwind min-width class for the desktop table. */
  minWidth?: string
  /** Start with the first row open on phones. */
  openFirst?: boolean
}

/**
 * A normal table on desktop, a tap-to-open list on phones, from one set of
 * markup so the text is in the page once. On a phone each row shows its first
 * cell; tapping it reveals the other columns, each labelled with its heading.
 * This is the pattern the owner chose for the country guides (November 2026),
 * now shared by every data table on the site.
 */
export function TapTable({
  head,
  rows,
  renderHead,
  cellClass,
  minWidth = 'md:min-w-[820px]',
  openFirst = false,
}: TapTableProps) {
  const [open, setOpen] = useState<ReadonlySet<string>>(
    () => new Set(openFirst && rows[0] ? [rows[0].key] : []),
  )

  const toggle = (key: string) =>
    setOpen((current) => {
      const next = new Set(current)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  return (
    <div className="md:overflow-x-auto md:plot-card">
      <table className={`w-full border-collapse max-md:block ${minWidth}`}>
        <thead className="max-md:sr-only">
          <tr>
            {head.map((h, i) => (
              <th
                key={h}
                scope="col"
                className="bg-ink text-white-warm font-mono text-[12px] tracking-[0.14em] uppercase text-left px-4 py-3 font-medium align-top"
              >
                {renderHead ? renderHead(h, i) : h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="max-md:grid max-md:gap-2">
          {rows.map((row) => {
            const isOpen = open.has(row.key)
            return (
              <tr
                key={row.key}
                className="md:even:[&>td]:bg-paper max-md:block max-md:bg-white-warm max-md:border max-md:border-line max-md:shadow-plot"
              >
                {row.cells.map((cell, i) =>
                  i === 0 ? (
                    <td
                      key={i}
                      className={`font-sans font-semibold text-ink align-top text-[14.5px] md:px-4 md:py-3.5 md:border-t md:border-line-soft max-md:block ${cellClass?.(0) ?? ''}`}
                    >
                      <span className="max-md:hidden">{cell}</span>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => toggle(row.key)}
                        className="md:hidden w-full flex items-center gap-3 text-left px-4 py-3.5 text-[16px] font-semibold"
                      >
                        <span className="flex-1">{cell}</span>
                        <span aria-hidden className={`font-mono transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
                      </button>
                    </td>
                  ) : (
                    <td
                      key={i}
                      data-label={head[i]}
                      className={`text-[14.5px] text-ink-soft align-top md:px-4 md:py-3.5 md:border-t md:border-line-soft max-md:px-4 max-md:pb-3 max-md:before:content-[attr(data-label)] max-md:before:block max-md:before:font-mono max-md:before:text-[12px] max-md:before:tracking-[0.12em] max-md:before:uppercase max-md:before:text-bronze ${
                        isOpen ? 'max-md:block' : 'max-md:hidden'
                      } ${i === 1 ? 'max-md:border-t max-md:border-line-soft max-md:pt-3' : ''} ${cellClass?.(i) ?? ''}`}
                    >
                      {cell}
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
