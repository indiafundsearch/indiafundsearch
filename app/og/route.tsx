import { ImageResponse } from 'next/og'
import { type NextRequest } from 'next/server'

export const runtime = 'edge'

const SIZE = { width: 1200, height: 630 }

/**
 * Branded Open Graph image generator.
 * Usage: <meta property="og:image" content="/og?title=Foo&eyebrow=Bar" />
 *
 * Defaults to the site brand if no params are passed.
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const eyebrow = params.get('eyebrow') ?? 'IndiaFundSearch'
  const title =
    params.get('title') ?? 'The Morningstar of Indian alternatives.'
  const subtitle = params.get('subtitle') ?? 'PMS · AIF · GIFT City — education first.'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px',
          background: '#fafafa',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#b8960c',
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 32,
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            color: '#1d1d1f',
            letterSpacing: '-0.02em',
            maxWidth: 1040,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 'auto',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              color: '#86868b',
              maxWidth: 800,
            }}
          >
            {subtitle}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 18,
              fontWeight: 500,
              color: '#1d1d1f',
            }}
          >
            <span
              style={{
                display: 'flex',
                width: 12,
                height: 12,
                background: '#b8960c',
                borderRadius: 999,
              }}
            />
            indiafundsearch.com
          </div>
        </div>
      </div>
    ),
    SIZE,
  )
}
