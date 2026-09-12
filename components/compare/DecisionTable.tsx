import type { CompareTable } from '@/lib/content/compare'

/**
 * The decision matrix — the element the whole page exists to deliver.
 *
 * Two things are deliberate. The first column is a sticky row-label so a reader
 * scrolling a wide table on a phone never loses track of which row they are on.
 * And the whole table stays real HTML with a <caption> rather than a grid of
 * divs, because an answer engine reading the markup has to be able to tell
 * which value belongs to which structure.
 */
export function DecisionTable({ table }: { table: CompareTable }) {
  return (
    <figure className="my-8">
      <div className="overflow-x-auto plot-card">
        <table className="w-full border-collapse min-w-[720px]">
          <caption className="sr-only">{table.caption}</caption>
          <thead>
            <tr>
              {table.head.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  className={`font-sans text-[13.5px] font-bold text-left px-4 py-3.5 bg-ink text-white-warm align-bottom ${
                    i === 0 ? 'w-[190px] sticky left-0 z-10 bg-ink' : ''
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, ri) => (
              <tr key={ri} className="even:[&>td]:bg-paper even:[&>th]:bg-paper">
                {row.map((cell, ci) =>
                  ci === 0 ? (
                    <th
                      key={ci}
                      scope="row"
                      className="px-4 py-3 border-b border-line-soft align-top text-left font-sans text-[13.5px] font-semibold text-ink sticky left-0 z-10 bg-white-warm"
                    >
                      {cell}
                    </th>
                  ) : (
                    <td
                      key={ci}
                      className="px-4 py-3 border-b border-line-soft align-top text-[14px] text-ink-soft"
                    >
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* The table scrolls inside its own container on a narrow screen. Without
          a hint, a reader on a phone sees a clipped column and assumes that is
          all there is. */}
      <p
        aria-hidden="true"
        className="sm:hidden font-mono text-[9.5px] tracking-[0.14em] uppercase text-slate mt-2"
      >
        Scroll the table sideways →
      </p>
      <figcaption className="font-mono text-[10.5px] tracking-[0.06em] text-slate mt-3 leading-relaxed">
        {table.caption}
        {table.note && <span className="block mt-1 normal-case">{table.note}</span>}
      </figcaption>
    </figure>
  )
}
