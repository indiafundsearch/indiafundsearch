'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatINR } from '@/lib/utils/formatCurrency'
import type { WaterfallBucket } from '@/lib/utils/calculateFees'

const BUCKET_COLORS: Record<WaterfallBucket['key'], string> = {
  management: '#1d1d1f',
  performance: '#b8960c',
  brokerage: '#5b6068',
  gst: '#9aa1aa',
  custody: '#cfd2d6',
}

type Props = {
  buckets: WaterfallBucket[]
  totalFees: number
}

export function FeeWaterfall({ buckets, totalFees }: Props) {
  const sorted = [...buckets].sort((a, b) => b.amount - a.amount)
  const showing = sorted.filter((b) => b.amount > 0)

  return (
    <div className="rounded-card border border-card-border bg-card p-5 shadow-card md:p-7">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">
          Fee Waterfall
        </p>
        <h3 className="mt-1 text-xl font-semibold text-text-primary">
          Where the {formatINR(totalFees)} actually went.
        </h3>
        <p className="mt-2 text-sm text-text-muted">
          Total fees decomposed by bucket. GST is 18% on management + performance. Brokerage is a 0.5% turnover proxy. Custody / audit is a flat ₹25,000 per year.
        </p>
      </div>

      <div className="mt-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={showing}
            layout="vertical"
            margin={{ top: 4, right: 16, bottom: 4, left: 4 }}
          >
            <CartesianGrid stroke="rgba(0,0,0,0.06)" horizontal={false} />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#86868b', fontSize: 12 }}
              tickFormatter={(value: number) => formatINR(value, { compact: true })}
            />
            <YAxis
              type="category"
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#1d1d1f', fontSize: 12 }}
              width={130}
            />
            <Tooltip
              contentStyle={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: 12,
                boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
                fontSize: 13,
              }}
              formatter={(value) => [formatINR(Number(value ?? 0)), 'Total over horizon']}
            />
            <Bar dataKey="amount" radius={[6, 6, 6, 6]}>
              {showing.map((bucket) => (
                <Cell key={bucket.key} fill={BUCKET_COLORS[bucket.key]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
