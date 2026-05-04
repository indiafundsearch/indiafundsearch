'use client'

import dynamic from 'next/dynamic'
import config from '../../../sanity.config'

/**
 * NextStudio touches `window` at module load. Mount it only on the client to
 * avoid SSR `window is not defined` warnings. Loading state is a thin skeleton.
 */
const NextStudio = dynamic(
  () => import('next-sanity/studio').then((m) => m.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen items-center justify-center text-text-muted">
        Loading Studio…
      </div>
    ),
  },
)

export function Studio() {
  return <NextStudio config={config} />
}
