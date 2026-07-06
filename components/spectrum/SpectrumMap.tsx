'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { MAP, computeSpectrumRects } from './mapLayout'

interface SpectrumMapProps {
  selectedId: string | null
  onSelect: (id: string) => void
}

/** Position view — risk × liquidity plan, drawn like a site plan. */
export function SpectrumMap({ selectedId, onSelect }: SpectrumMapProps) {
  const rects = useMemo(() => computeSpectrumRects(), [])
  const { W, H, PL, PR, PT, PB } = MAP
  const iw = W - PL - PR
  const ih = H - PT - PB

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Risk versus liquidity map of thirteen investment structures"
      className="w-full h-auto block"
    >
      {/* Grid */}
      {Array.from({ length: 11 }, (_, i) => (
        <g key={i}>
          <line x1={PL + (i / 10) * iw} y1={PT} x2={PL + (i / 10) * iw} y2={PT + ih} stroke="#013528" strokeOpacity=".06" />
          <line x1={PL} y1={PT + (i / 10) * ih} x2={PL + iw} y2={PT + (i / 10) * ih} stroke="#013528" strokeOpacity=".06" />
        </g>
      ))}
      <rect x={PL} y={PT} width={iw} height={ih} fill="none" stroke="#013528" strokeWidth="1.5" />

      {/* Dimension rules + axis annotations */}
      <line x1={PL} y1={PT + ih + 34} x2={PL + iw} y2={PT + ih + 34} stroke="#587067" strokeWidth="1" />
      <path d={`M ${PL} ${PT + ih + 30} l 0 8 M ${PL + iw} ${PT + ih + 30} l 0 8`} stroke="#587067" strokeWidth="1" />
      <text x={PL} y={PT + ih + 56} fontFamily="var(--font-plex-mono)" fontSize="11" letterSpacing="2" fill="#587067">LOWER RISK</text>
      <text x={PL + iw} y={PT + ih + 56} textAnchor="end" fontFamily="var(--font-plex-mono)" fontSize="11" letterSpacing="2" fill="#587067">HIGHER RISK</text>
      <text x={PL + iw / 2} y={PT + ih + 56} textAnchor="middle" fontFamily="var(--font-plex-mono)" fontSize="11" letterSpacing="3" fill="#C05C08">RISK →</text>
      <line x1={PL - 34} y1={PT} x2={PL - 34} y2={PT + ih} stroke="#587067" strokeWidth="1" />
      <path d={`M ${PL - 38} ${PT} l 8 0 M ${PL - 38} ${PT + ih} l 8 0`} stroke="#587067" strokeWidth="1" />
      <text x={PL - 48} y={PT + 8} fontFamily="var(--font-plex-mono)" fontSize="11" letterSpacing="2" fill="#587067" transform={`rotate(-90 ${PL - 48} ${PT + 8})`} textAnchor="end">EASY EXIT</text>
      <text x={PL - 48} y={PT + ih} fontFamily="var(--font-plex-mono)" fontSize="11" letterSpacing="2" fill="#587067" transform={`rotate(-90 ${PL - 48} ${PT + ih})`}>LOCKED</text>
      <text x={PL - 48} y={PT + ih / 2} fontFamily="var(--font-plex-mono)" fontSize="11" letterSpacing="3" fill="#C05C08" transform={`rotate(-90 ${PL - 48} ${PT + ih / 2})`} textAnchor="middle">LIQUIDITY →</text>

      {/* Product nodes — staggered rise-in */}
      {rects.map((r, i) => {
        const selected = selectedId === r.product.id
        return (
          <motion.g
            key={r.product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05, duration: 0.45, ease: 'easeOut' }}
            role="button"
            tabIndex={0}
            aria-label={r.product.name}
            aria-pressed={selected}
            className="cursor-pointer outline-none"
            onClick={() => onSelect(r.product.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelect(r.product.id)
              }
            }}
          >
            <rect
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              fill="#FCFBF8"
              stroke={selected ? '#C05C08' : '#013528'}
              strokeWidth={selected ? 2.5 : 1.5}
              style={{ transition: 'stroke .18s ease, stroke-width .18s ease' }}
            />
            <rect x={r.x} y={r.y} width={6} height={r.h} fill="#FF862F" fillOpacity={r.shade.toFixed(2)} />
            <rect x={r.x} y={r.y} width={6} height={r.h} fill="none" stroke="#013528" strokeWidth="1" />
            <text x={r.x + 16} y={r.y + 20} fontFamily="var(--font-grotesk)" fontWeight="700" fontSize="13" fill="#013528">
              {r.product.name}
            </text>
            <text x={r.x + 16} y={r.y + 36} fontFamily="var(--font-plex-mono)" fontSize="9" letterSpacing="1.2" fill="#587067">
              {r.product.badge.toUpperCase()} · MIN {r.product.min.split('(')[0].trim().toUpperCase()}
            </text>
          </motion.g>
        )
      })}
    </svg>
  )
}
