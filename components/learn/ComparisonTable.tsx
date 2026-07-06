import { COMPARISON } from '@/lib/content/comparison'

/** The four structures, side by side — PMS / AIF / MF / SIF. */
export function ComparisonTable() {
  return (
    <div className="overflow-x-auto plot-card">
      <table className="w-full border-collapse min-w-[820px]">
        <thead>
          <tr>
            {COMPARISON.head.map((h, i) => (
              <th
                key={i}
                className={`font-sans text-[14px] font-bold text-left px-4 py-3.5 bg-ink text-white-warm ${i === 0 ? 'w-[170px]' : ''}`}
              >
                {h}
                {COMPARISON.sub[i] && (
                  <small className="block font-mono text-[9px] tracking-[0.1em] font-normal text-bronze-soft uppercase mt-[3px]">
                    {COMPARISON.sub[i]}
                  </small>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARISON.rows.map((row, ri) => (
            <tr key={ri} className="even:[&>td]:bg-paper">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-4 py-3 border-b border-line-soft align-top ${
                    ci === 0
                      ? 'font-mono text-[10px] tracking-[0.1em] uppercase text-slate'
                      : 'text-[14px]'
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
  )
}
