import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

/**
 * Sanity webhook → Next.js page revalidation.
 *
 * Set the SANITY_REVALIDATE_SECRET env var, then in sanity.io/manage configure
 * a webhook to POST to /api/revalidate with that secret.
 */
export async function POST(request: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string; slug?: { current?: string } }>(
      request,
      process.env.SANITY_REVALIDATE_SECRET,
    )

    if (!isValidSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    if (!body?._type) {
      return NextResponse.json({ error: 'Missing _type in payload' }, { status: 400 })
    }

    // Next 16 signature: revalidateTag(tag, cacheLifeProfile)
    revalidateTag(body._type, 'default')
    if (body._type === 'giftProduct') {
      // Direction isn't reliable in the payload — refresh the whole section
      revalidatePath('/gift-city')
      revalidatePath('/gift-city/inbound')
      revalidatePath('/gift-city/outbound')
    } else if (body.slug?.current) {
      revalidatePath(routeFor(body._type, body.slug.current))
    }

    return NextResponse.json({ revalidated: true, type: body._type })
  } catch (error) {
    console.error('revalidate error', error)
    return NextResponse.json({ error: 'Revalidate failed' }, { status: 500 })
  }
}

function routeFor(type: string, slug: string): string {
  switch (type) {
    case 'article':
      return `/learn/${slug}`
    default:
      return '/'
  }
}
