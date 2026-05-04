/**
 * Sanity Studio mounted at /studio.
 * Configuration is loaded from sanity.config.ts at the project root.
 *
 * The actual Studio component lives in ./Studio.tsx (client component) so this
 * file can stay a Server Component and export `metadata` / `viewport`.
 */

import { Studio } from './Studio'

export const dynamic = 'force-static'
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <Studio />
}
