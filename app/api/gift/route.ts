import { NextResponse, type NextRequest } from 'next/server'
import { getGiftProducts, type GiftDirection } from '@/lib/gift/data'

/**
 * GET /api/gift?direction=inbound|outbound
 *
 * Serves the fund shelf on demand so the tables are NEVER present in the
 * initial server-rendered HTML of /gift-city/{inbound,outbound}. The client
 * only calls this after the visitor accepts the eligibility interstitial —
 * keeping the named, restricted-scheme shelf out of crawlable markup.
 */
export async function GET(request: NextRequest) {
  const direction = request.nextUrl.searchParams.get('direction')
  if (direction !== 'inbound' && direction !== 'outbound') {
    return NextResponse.json({ error: 'direction must be inbound or outbound' }, { status: 400 })
  }
  const { products } = await getGiftProducts(direction as GiftDirection)
  // Do not cache: keep the shelf off CDN edges as an indexable artifact.
  return NextResponse.json(
    { products },
    { headers: { 'X-Robots-Tag': 'noindex', 'Cache-Control': 'no-store' } },
  )
}
