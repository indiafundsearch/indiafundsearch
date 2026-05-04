import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ModeProvider } from '@/components/shared/SimpleProToggle'

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
    default: 'IndiaFundSearch — PMS, AIF, SIF & GIFT City explained',
    template: '%s · IndiaFundSearch',
  },
  description:
    'The Morningstar of Indian alternatives. Education-first discovery for PMS, AIF, SIF, and GIFT City investments. No login. No commissions.',
  openGraph: {
    title: 'IndiaFundSearch',
    description:
      'Education-first discovery for PMS, AIF, SIF, and GIFT City investments in India.',
    url: siteUrl,
    siteName: 'IndiaFundSearch',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        <ModeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ModeProvider>
      </body>
    </html>
  )
}
