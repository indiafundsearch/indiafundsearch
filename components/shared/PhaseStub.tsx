import type { ReactNode } from 'react'

type Props = {
  phase: string
  title: string
  description?: ReactNode
}

export function PhaseStub({ phase, title, description }: Props) {
  return (
    <div className="container-grid py-20 md:py-28">
      <p className="text-sm font-medium uppercase tracking-widest text-gold">{phase}</p>
      <h1 className="mt-4 max-w-3xl">{title}</h1>
      {description ? (
        <p className="mt-6 max-w-prose text-lg text-text-muted">{description}</p>
      ) : null}
    </div>
  )
}
