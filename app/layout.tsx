import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Newsreader, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Analytics } from '@/components/shared/Analytics'
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
  authors: [{ name: 'IndiaFundSearch' }, { name: 'Beyond' }],
  keywords: [
    'PMS', 'AIF', 'SIF', 'GIFT City', 'GIFT City funds', 'Indian alternatives',
    'PMS vs AIF', 'AIF categories explained', 'PMS taxation India',
    'GIFT City inbound fund', 'GIFT City outbound', 'NRI investment India',
    'private credit India', 'pre-IPO investing',
  ],
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
  icons: { icon: '/favicon.ico' },
}

export const viewport: Viewport = {
  themeColor: '#f5f4ee',
  width: 'device-width',
  initialScale: 1,
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  logo: `${SITE.url}/og`,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Analytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
