'use client'

import { useMemo } from 'react'
import { PRODUCTS } from '@/lib/content/products'
import type { Product } from '@/lib/content/types'
import { POS } from './mapLayout'

export type SpectrumPhoneVariant = 'ladder' | 'bands' | 'portrait'

interface Props {
  variant: SpectrumPhoneVariant
  selectedId: string | null
  onSelect: (id: string) => void
}

const shortMin = (p: Product) => p.min.split('(')[0].trim()
const byRisk = (a: Product, b: Product) => POS[a.id][0] - POS[b.id][0]

/** Five-step risk meter, filled from the hand-tuned map position. */
function RiskMeter({ risk }: { risk: number }) {
  const filled = Math.max(1, Math.min(5, Math.ceil(risk / 20)))
  return (
    <span className="flex gap-[3px]" role="img" aria-label={`Risk ${filled} of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={`h-2.5 w-2.5 border border-ink ${n <= filled ? 'bg-signal' : 'bg-white-warm'}`} />
      ))}
    </span>
  )
}

function Row({ p, selected, onSelect, right }: { p: Product; selected: boolean; onSelect: (id: string) => void; right: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(p.id)}
      aria-pressed={selected}
      className={`w-full text-left flex items-center gap-3 pl-0 pr-3 border bg-white-warm ${
        selected ? 'border-bronze border-2' : 'border-ink'
      }`}
    >
      <span className="self-stretch w-1.5 bg-signal border-r border-ink" style={{ opacity: 0.25 + (POS[p.id][0] / 100) * 0.75 }} />
      <span className="flex-1 py-2.5">
        <span className="block font-sans font-bold text-[15.5px] text-ink leading-tight">{p.name}</span>
        <span className="block font-mono text-[12px] tracking-[0.08em] uppercase text-slate mt-0.5">
          {p.badge} · min {shortMin(p)}
        </span>
      </span>
      {right}
    </button>
  )
}

export function SpectrumPhone({ variant, selectedId, onSelect }: Props) {
  const sorted = useMemo(() => [...PRODUCTS].sort(byRisk), [])

  if (variant === 'ladder') {
    return (
      <div>
        <p className="font-mono text-[12px] tracking-[0.16em] uppercase text-slate mb-2">Lower risk ↓ higher risk</p>
        <div className="grid gap-1.5">
          {sorted.map((p) => (
            <Row
              key={p.id}
              p={p}
              selected={selectedId === p.id}
              onSelect={onSelect}
              right={
                <span className="font-mono text-[12px] tracking-[0.06em] uppercase text-bronze text-right max-w-[92px] leading-tight">
                  {POS[p.id][1] >= 60 ? 'Easy exit' : POS[p.id][1] >= 30 ? 'Some lock-in' : 'Locked in'}
                </span>
              }
            />
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'bands') {
    const bands: [string, string, (liq: number) => boolean][] = [
      ['Easy exit', 'Sell in days', (l) => l >= 60],
      ['Some lock-in', 'Months to a few years', (l) => l >= 30 && l < 60],
      ['Locked in', 'Years, by design', (l) => l < 30],
    ]
    return (
      <div className="grid gap-5">
        {bands.map(([title, sub, test]) => {
          const items = sorted.filter((p) => test(POS[p.id][1]))
          return (
            <section key={title}>
              <div className="flex items-baseline justify-between border-b-[1.5px] border-ink pb-1 mb-2">
                <h3 className="font-sans font-bold text-[15px] uppercase tracking-[0.08em] text-ink">{title}</h3>
                <span className="font-mono text-[12px] tracking-[0.06em] uppercase text-slate">{sub}</span>
              </div>
              <div className="grid gap-1.5">
                {items.map((p) => (
                  <Row key={p.id} p={p} selected={selectedId === p.id} onSelect={onSelect} right={<RiskMeter risk={POS[p.id][0]} />} />
                ))}
              </div>
            </section>
          )
        })}
        <p className="font-mono text-[12px] tracking-[0.06em] uppercase text-slate">Squares show risk, 1 to 5</p>
      </div>
    )
  }

  // portrait: the same plan, redrawn for a tall screen. Risk runs down the
  // page, liquidity across it, and labels are large enough to read and tap.
  return <PortraitMap selectedId={selectedId} onSelect={onSelect} />
}

function PortraitMap({ selectedId, onSelect }: { selectedId: string | null; onSelect: (id: string) => void }) {
  const W = 360, H = 760, PL = 30, PR = 8, PT = 30, PB = 34
  const iw = W - PL - PR, ih = H - PT - PB
  const nodes = useMemo(() => {
    const list = PRODUCTS.map((product) => {
      const [risk, liq] = POS[product.id]
      const w = Math.min(176, 22 + product.name.length * 7.1)
      const h = 34
      // x: locked (left) to easy exit (right). y: lower risk (top) to higher (bottom).
      const x = Math.max(PL + 3, Math.min(PL + iw - w - 3, PL + (liq / 100) * iw - w / 2))
      const y = Math.max(PT + 3, Math.min(PT + ih - h - 3, PT + (risk / 100) * ih - h / 2))
      return { product, x, y, w, h, risk }
    })
    for (let pass = 0; pass < 40; pass++) {
      for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
          const a = list[i], b = list[j]
          if (a.x < b.x + b.w + 4 && b.x < a.x + a.w + 4 && a.y < b.y + b.h + 5 && b.y < a.y + a.h + 5) {
            const dy = a.y <= b.y ? a.y + a.h + 6 - b.y : -(b.y + b.h + 6 - a.y)
            b.y = Math.max(PT + 3, Math.min(PT + ih - b.h - 3, b.y + dy / 1.6))
            a.y = Math.max(PT + 3, Math.min(PT + ih - a.h - 3, a.y - dy / 2.6))
          }
        }
      }
    }
    return list
  }, [iw, ih])

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Risk versus liquidity map of thirteen investment structures" className="w-full h-auto block">
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`h${i}`} x1={PL} y1={PT + (i / 8) * ih} x2={PL + iw} y2={PT + (i / 8) * ih} stroke="#013528" strokeOpacity=".06" />
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <line key={`v${i}`} x1={PL + (i / 4) * iw} y1={PT} x2={PL + (i / 4) * iw} y2={PT + ih} stroke="#013528" strokeOpacity=".06" />
      ))}
      <rect x={PL} y={PT} width={iw} height={ih} fill="none" stroke="#013528" strokeWidth="1.5" />
      <text x={PL} y={18} fontFamily="var(--font-plex-mono)" fontSize="11" letterSpacing="1.5" fill="#4a6158">LOCKED IN</text>
      <text x={PL + iw} y={18} textAnchor="end" fontFamily="var(--font-plex-mono)" fontSize="11" letterSpacing="1.5" fill="#4a6158">EASY EXIT →</text>
      <text x={14} y={PT + 4} fontFamily="var(--font-plex-mono)" fontSize="11" letterSpacing="1.5" fill="#4a6158" transform={`rotate(90 14 ${PT + 4})`}>LOWER RISK</text>
      <text x={14} y={PT + ih} textAnchor="end" fontFamily="var(--font-plex-mono)" fontSize="11" letterSpacing="1.5" fill="#C05C08" transform={`rotate(90 14 ${PT + ih})`}>HIGHER RISK →</text>
      {nodes.map((n) => {
        const selected = selectedId === n.product.id
        return (
          <g
            key={n.product.id}
            role="button"
            tabIndex={0}
            aria-label={n.product.name}
            aria-pressed={selected}
            className="cursor-pointer outline-none"
            onClick={() => onSelect(n.product.id)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(n.product.id) } }}
          >
            <rect x={n.x} y={n.y} width={n.w} height={n.h} fill="#FCFBF8" stroke={selected ? '#C05C08' : '#013528'} strokeWidth={selected ? 2.5 : 1.25} />
            <rect x={n.x} y={n.y} width={5} height={n.h} fill="#FF862F" fillOpacity={(0.15 + (n.risk / 100) * 0.7).toFixed(2)} />
            <text x={n.x + 12} y={n.y + 21.5} fontFamily="var(--font-grotesk)" fontWeight="700" fontSize="12.5" fill="#013528">{n.product.name}</text>
          </g>
        )
      })}
    </svg>
  )
}
