'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatINR } from '@/lib/utils/formatCurrency'
import type { YearPoint } from '@/lib/utils/calculateFees'

type Props = {
  data: YearPoint[]
  totalFees: number
  years: number
}

export function FeeDragChart({ data, totalFees, years }: Props) {
  return (
    <div className="rounded-card border border-card-border bg-card p-5 shadow-card md:p-7">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">
          Fee Drag
        </p>
        <h3 className="mt-1 text-2xl font-semibold text-text-primary md:text-3xl">
          You'll pay <span className="text-error">{formatINR(totalFees)}</span> in fees over {years}{' '}
          {years === 1 ? 'year' : 'years'}.
        </h3>
        <p className="mt-2 text-sm text-text-muted">
          The gap between gross (no fees), index (0.5% expense), and net (your fund) is what fees actually cost you over time.
        </p>
      </div>

      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
            <CartesianGrid stroke="rgba(0,0,0,0.06)" vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#86868b', fontSize: 12 }}
              label={{ value: 'Year', position: 'insideBottom', offset: -2, fill: '#86868b', fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#86868b', fontSize: 12 }}
              tickFormatter={(value: number) => formatINR(value, { compact: true })}
              width={68}
            />
            <Tooltip
              contentStyle={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: 12,
                boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
                fontSize: 13,
              }}
              formatter={(value, name) => [formatINR(Number(value ?? 0)), labelFor(String(name))]}
              labelFormatter={(year) => `Year ${year}`}
            />
            <Line
              type="monotone"
              dataKey="gross"
              name="gross"
              stroke="#86868b"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="index"
              name="index"
              stroke="#b8960c"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="net"
              name="net"
              stroke="#1d1d1f"
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <Legend />
    </div>
  )
}

function labelFor(name: string): string {
  if (name === 'gross') return 'Gross (no fees)'
  if (name === 'index') return 'Index ETF (0.5%)'
  if (name === 'net') return 'Your fund (net)'
  return name
}

function Legend() {
  return (
    <ul className="mt-4 flex flex-wrap gap-4 text-xs text-text-muted">
      <Swatch color="#86868b" dashed>Gross (no fees)</Swatch>
      <Swatch color="#b8960c">Index ETF (0.5% expense)</Swatch>
      <Swatch color="#1d1d1f">Your fund (net of fees)</Swatch>
    </ul>
  )
}

function Swatch({
  color,
  dashed,
  children,
}: {
  color: string
  dashed?: boolean
  children: React.ReactNode
}) {
  return (
    <li className="inline-flex items-center gap-2">
      <span
        aria-hidden
        className="inline-block h-2 w-6 rounded-pill"
        style={{
          background: dashed
            ? `repeating-linear-gradient(90deg, ${color} 0 4px, transparent 4px 8px)`
            : color,
        }}
      />
      {children}
    </li>
  )
}
