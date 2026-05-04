'use client'

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'
import { DIMENSION_LABELS, type Dimension } from '@/lib/utils/diagnosticScoring'

type Props = {
  scores: Record<Dimension, number>
}

export function DiagnosticRadar({ scores }: Props) {
  const data = (Object.keys(DIMENSION_LABELS) as Dimension[]).map((key) => ({
    dimension: DIMENSION_LABELS[key],
    score: scores[key],
  }))

  return (
    <div className="h-72 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 8, right: 24, bottom: 8, left: 24 }}>
          <PolarGrid stroke="rgba(0,0,0,0.08)" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: '#1d1d1f', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#86868b', fontSize: 10 }}
            stroke="rgba(0,0,0,0.06)"
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#b8960c"
            fill="#b8960c"
            fillOpacity={0.18}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
