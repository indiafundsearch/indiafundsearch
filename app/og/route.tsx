import { ImageResponse } from 'next/og'
import { type NextRequest } from 'next/server'

export const runtime = 'edge'

const SIZE = { width: 1200, height: 630 }

/**
 * Branded Open Graph image — drawing-set style.
 * Usage: <meta property="og:image" content="/og?title=Foo&eyebrow=Bar" />
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const eyebrow = params.get('eyebrow') ?? 'IndiaFundSearch · A Beyond Initiative'
  const title = params.get('title') ?? 'The Architecture of Alternatives.'
  const subtitle =
    params.get('subtitle') ?? 'PMS · AIF · SIF · GIFT City — explained the way a good advisor would.'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '72px',
          background: '#f5f4ee',
          fontFamily: 'sans-serif',
          border: '16px solid #013528',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#c05c08',
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 28,
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            color: '#013528',
            letterSpacing: '-0.01em',
            maxWidth: 1000,
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
          <div style={{ display: 'flex', fontSize: 24, color: '#587067', maxWidth: 780 }}>
            {subtitle}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 20,
              fontWeight: 600,
              color: '#013528',
            }}
          >
            <span style={{ display: 'flex', width: 14, height: 14, background: '#ff862f' }} />
            indiafundsearch.com
          </div>
        </div>
      </div>
    ),
    SIZE,
  )
}
