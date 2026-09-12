import type { CompareVerdict } from '@/lib/content/compare'

/**
 * "Choose this when…" — the block a decided reader scrolls straight to, so it
 * sits high on the page rather than as a conclusion at the foot.
 *
 * Each condition is written to be testable against the reader's own situation
 * rather than as a benefit. "You can leave the money alone for seven years" is
 * something a reader can answer; "suitable for long-term investors" is not.
 */
export function VerdictSplit({ verdicts }: { verdicts: CompareVerdict[] }) {
  return (
    <section className="mt-12 max-w-[980px]">
      <div className="dim mb-6">
        <span>The verdict</span>
      </div>
      <div
        className={`grid gap-4 ${verdicts.length > 2 ? 'lg:grid-cols-3' : 'sm:grid-cols-2'}`}
      >
        {verdicts.map((v, i) => (
          <div key={v.side} className="plot-card px-6 py-5 relative max-sm:px-5">
            {i === 0 && (
              <>
                <span className="corner corner-tl" />
                <span className="corner corner-bl" />
              </>
            )}
            {i === verdicts.length - 1 && (
              <>
                <span className="corner corner-tr" />
                <span className="corner corner-br" />
              </>
            )}
            <h3 className="font-sans font-bold text-[17.5px] leading-snug text-ink">{v.side}</h3>
            <ul className="mt-3.5">
              {v.when.map((w) => (
                <li
                  key={w.slice(0, 40)}
                  className="relative py-[5px] pl-[22px] text-[15.5px] leading-[1.5] text-ink-soft before:content-[''] before:absolute before:left-0.5 before:top-[13px] before:w-2.5 before:h-[1.5px] before:bg-signal"
                >
                  {w}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
