'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { calculateScorecard, type ScoreMap } from '@/lib/utils/scorecardLogic'
import { PmsSelector } from './scorecard/PmsSelector'
import { CriteriaForm } from './scorecard/CriteriaForm'
import { ScorecardResult } from './scorecard/ScorecardResult'

type Stage =
  | { kind: 'select' }
  | { kind: 'score'; fundName: string }
  | { kind: 'result'; fundName: string }

type Props = {
  fundOptions: string[]
}

export function Scorecard({ fundOptions }: Props) {
  const params = useSearchParams()
  const initialFund = params?.get('fund') ?? undefined

  const [stage, setStage] = useState<Stage>(
    initialFund ? { kind: 'score', fundName: initialFund } : { kind: 'select' },
  )
  const [scores, setScores] = useState<ScoreMap>({})

  const reset = () => {
    setScores({})
    setStage({ kind: 'select' })
  }

  if (stage.kind === 'result') {
    const result = calculateScorecard(scores)
    if (!result) {
      return (
        <div className="rounded-card border border-card-border bg-card p-6 text-sm text-text-muted">
          Couldn&rsquo;t compute your scorecard. Try again.
        </div>
      )
    }
    return (
      <ScorecardResult result={result} fundName={stage.fundName} onReset={reset} />
    )
  }

  if (stage.kind === 'score') {
    return (
      <CriteriaForm
        fundName={stage.fundName}
        scores={scores}
        onChange={setScores}
        onBack={() => setStage({ kind: 'select' })}
        onSubmit={() => setStage({ kind: 'result', fundName: stage.fundName })}
      />
    )
  }

  return (
    <PmsSelector
      fundOptions={fundOptions}
      initialFund={initialFund}
      onSubmit={(fundName) => setStage({ kind: 'score', fundName })}
    />
  )
}
