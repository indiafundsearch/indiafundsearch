import PlausibleProvider from 'next-plausible'

/**
 * Plausible analytics. Disabled in dev and when
 * NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC is unset.
 *
 * In Plausible v4 (next-plausible v4), you supply the per-site script URL
 * from your Plausible dashboard (e.g. https://plausible.io/js/pa-XXXXX.js).
 * Set NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC in Vercel project env to enable.
 */
export function Analytics() {
  const src = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC
  if (!src || process.env.NODE_ENV !== 'production') return null

  return <PlausibleProvider src={src} />
}
