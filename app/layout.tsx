import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Newsreader, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Analytics } from '@/components/shared/Analytics'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'
import { LeadGate } from '@/components/gate/LeadGate'
import { JsonLd } from '@/components/shared/JsonLd'
import { organizationJsonLd, personJsonLd } from '@/lib/seo'
import { SITE } from '@/lib/constants'

const grotesk = Space_Grotesk({
  variable: '--font-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
})

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'IndiaFundSearch — The Architecture of Alternatives',
    template: '%s · IndiaFundSearch',
  },
  description: SITE.description,
  applicationName: SITE.name,
  // Per-route keyword targeting lives in each page's title/description/H1
  // (the real ranking signals) — the ignored meta-keywords tag is removed (P3-30).
  authors: [{ name: 'Yash Jhaveri', url: `${SITE.url}/about` }],
  openGraph: {
    title: 'IndiaFundSearch — The Architecture of Alternatives',
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'IndiaFundSearch — The Architecture of Alternatives',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IndiaFundSearch — The Architecture of Alternatives',
    description: SITE.description,
    images: ['/og'],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#f5f4ee',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${newsreader.variable} ${plexMono.variable} h-full`}
    >
      <head>
        <JsonLd data={[organizationJsonLd(), personJsonLd()]} />
      </head>
      <body className="min-h-full flex flex-col">
        <Analytics />
        <VercelAnalytics />
        <LeadGate />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
