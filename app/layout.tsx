import type { Metadata, Viewport } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ModeProvider } from '@/components/shared/SimpleProToggle'
import { Analytics } from '@/components/shared/Analytics'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://indiafundsearch.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'IndiaFundSearch — PMS, AIF & GIFT City explained',
    template: '%s · IndiaFundSearch',
  },
  description:
    'The Morningstar of Indian alternatives. Education-first discovery for PMS, AIF, and GIFT City investments. No login. No commissions.',
  applicationName: 'IndiaFundSearch',
  authors: [{ name: 'IndiaFundSearch' }],
  keywords: [
    'PMS', 'AIF', 'GIFT City', 'Indian alternatives',
    'PMS vs AIF', 'best PMS India', 'PMS fees explained', 'what is AIF',
    'SEBI PMS', 'Indian wealth advisory',
  ],
  openGraph: {
    title: 'IndiaFundSearch',
    description:
      'Education-first discovery for PMS, AIF, and GIFT City investments in India.',
    url: siteUrl,
    siteName: 'IndiaFundSearch',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'IndiaFundSearch — the Morningstar of Indian alternatives.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IndiaFundSearch',
    description:
      'Education-first discovery for PMS, AIF, and GIFT City investments in India.',
    images: ['/og'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
  icons: { icon: '/favicon.ico' },
}

export const viewport: Viewport = {
  themeColor: '#fafafa',
  width: 'device-width',
  initialScale: 1,
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'IndiaFundSearch',
  url: siteUrl,
  description:
    'Education-first platform for PMS, AIF, and GIFT City investments in India. Run by Beyond Wealth, a SEBI-aware advisory practice.',
  logo: `${siteUrl}/og`,
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'IndiaFundSearch',
  url: siteUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/knowledge?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        <Analytics />
        <ModeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ModeProvider>
      </body>
    </html>
  )
}
