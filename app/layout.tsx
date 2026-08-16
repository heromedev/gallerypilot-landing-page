import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'EroPilot — Your private gallery on autopilot', template: '%s | EroPilot' },
  description: 'A private, hands-free gallery viewer that runs locally in your browser. No uploads, analytics, or browsing history collection.',
  metadataBase: new URL('https://eromepilot.vercel.app'),
  openGraph: { title: 'EroPilot — Your private gallery on autopilot', description: 'Open. Start. Lean back. Your gallery stays on your device.', type: 'website' },
}

export const viewport: Viewport = {
  colorScheme: 'dark', width: 'device-width', initialScale: 1,
  themeColor: '#0a0a0f',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background dark">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
