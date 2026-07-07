'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { BUBBLE_LEGEND, MAP, computeOutcomeBubbles } from './mapLayout'

interface OutcomeMapProps {
  selectedId: string | null
  onSelect: (id: string) => void
}

/** Outcome view — indicative return × typical horizon, bubble = min ticket. */
export function OutcomeMap({ selectedId, onSelect }: OutcomeMapProps) {
  const bubbles = useMemo(() => computeOutcomeBubbles(), [])
  const { W, H, PL } = MAP
  const PR = 36
  const PT = 48
  const PB = 78
  const iw = W - PL - PR
  const ih = H - PT - PB
  const X0 = 5, X1 = 33, Y0 = 0, Y1 = 11
  const X = (v: number) => PL + ((v - X0) / (X1 - X0)) * iw
  const Y = (v: number) => PT + ih - ((v - Y0) / (Y1 - Y0)) * ih

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Indicative return versus typical horizon map"
      className="w-full h-auto block"
    >
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i}>
          <line x1={PL + (i / 9) * iw} y1={PT} x2={PL + (i / 9) * iw} y2={PT + ih} stroke="#013528" strokeOpacity=".06" />
          <line x1={PL} y1={PT + (i / 9) * ih} x2={PL + iw} y2={PT + (i / 9) * ih} stroke="#013528" strokeOpacity=".06" />
        </g>
      ))}
      <rect x={PL} y={PT} width={iw} height={ih} fill="none" stroke="#013528" strokeWidth="1.5" />

      {/* Quadrant guides at ~14% and 5 yrs */}
      <line x1={X(14)} y1={PT} x2={X(14)} y2={PT + ih} stroke="#587067" strokeDasharray="4 5" strokeOpacity=".5" />
      <line x1={PL} y1={Y(5)} x2={PL + iw} y2={Y(5)} stroke="#587067" strokeDasharray="4 5" strokeOpacity=".5" />
      <text x={PL + 14} y={PT + 22} fontFamily="var(--font-plex-mono)" fontSize="11" letterSpacing="2" fill="#587067">PATIENCE TAX</text>
      <text x={PL + iw - 14} y={PT + 22} textAnchor="end" fontFamily="var(--font-plex-mono)" fontSize="11" letterSpacing="2" fill="#C05C08">LONG GAME</text>
      <text x={PL + 14} y={PT + ih - 14} fontFamily="var(--font-plex-mono)" fontSize="11" letterSpacing="2" fill="#587067">BORING &amp; SAFE</text>
      <text x={PL + iw - 14} y={PT + ih - 14} textAnchor="end" fontFamily="var(--font-plex-mono)" fontSize="11" letterSpacing="2" fill="#96382A">HIDDEN RISK</text>

      {/* Axes */}
      {[6, 10, 14, 18, 22, 26, 30].map((v) => (
        <text key={v} x={X(v)} y={PT + ih + 24} textAnchor="middle" fontFamily="var(--font-plex-mono)" fontSize="10.5" fill="#587067">{v}</text>
      ))}
      {[2, 4, 6, 8, 10].map((v) => (
        <text key={v} x={PL - 12} y={Y(v) + 4} textAnchor="end" fontFamily="var(--font-plex-mono)" fontSize="10.5" fill="#587067">{v}</text>
      ))}
      <text x={PL + iw / 2} y={PT + ih + 52} textAnchor="middle" fontFamily="var(--font-plex-mono)" fontSize="11" letterSpacing="3" fill="#C05C08">INDICATIVE RETURN (% P.A.) →</text>
      <text x={PL - 52} y={PT + ih / 2} fontFamily="var(--font-plex-mono)" fontSize="11" letterSpacing="3" fill="#C05C08" transform={`rotate(-90 ${PL - 52} ${PT + ih / 2})`} textAnchor="middle">TYPICAL HORIZON (YEARS) →</text>

      {/* Legend */}
      {BUBBLE_LEGEND.map(([fill, label], i) => (
        <g key={label}>
          <circle cx={PL + 10 + i * 180} cy={PT - 22} r="6" fill={fill} />
          <text x={PL + 22 + i * 180} y={PT - 18} fontFamily="var(--font-plex-mono)" fontSize="10" fill="#587067">{label.toUpperCase()}</text>
        </g>
      ))}

      {/* Connector ticks behind bubbles */}
      {bubbles.map((b) =>
        b.tick ? (
          <line key={`t-${b.product.id}`} x1={b.cx} y1={b.tick.y1} x2={b.cx} y2={b.tick.y2} stroke="#587067" strokeWidth="0.8" strokeOpacity=".5" />
        ) : null,
      )}

      {/* Bubbles — pop in by ticket size order */}
      {bubbles.map((b, i) => {
        const selected = selectedId === b.product.id
        return (
          <motion.g
            key={b.product.id}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: 'backOut' }}
            style={{ transformOrigin: `${b.cx}px ${b.cy}px` }}
            role="button"
            tabIndex={0}
            aria-label={b.product.name}
            aria-pressed={selected}
            className="cursor-pointer outline-none"
            onClick={() => onSelect(b.product.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelect(b.product.id)
              }
            }}
          >
            <circle
              cx={b.cx}
              cy={b.cy}
              r={b.r.toFixed(1)}
              fill={b.fill}
              fillOpacity=".85"
              stroke={selected ? '#FF862F' : '#013528'}
              strokeWidth={selected ? 3 : 1.5}
              style={{ transition: 'stroke .18s ease, stroke-width .18s ease' }}
            />
            <text x={b.labelX} y={b.labelY.toFixed(1)} textAnchor="middle" fontFamily="var(--font-grotesk)" fontWeight="700" fontSize="12" fill="#013528">
              {b.product.name}
            </text>
          </motion.g>
        )
      })}
    </svg>
  )
}
