'use client'

import { useMode } from '@/components/shared/SimpleProToggle'

type Props = {
  simple?: string
  pro?: string
}

export function StrategyDescription({ simple, pro }: Props) {
  const { mode } = useMode()
  const text = mode === 'pro' ? pro || simple : simple || pro

  if (!text) {
    return (
      <p className="text-base text-text-muted">
        No strategy description available yet. Add one in /studio.
      </p>
    )
  }

  return <p className="max-w-prose text-base leading-relaxed text-text-primary">{text}</p>
}
