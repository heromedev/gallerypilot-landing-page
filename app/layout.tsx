import { AgeGate } from '@/components/age-gate'
import { SiteAnalytics } from '@/components/site-analytics'
import type { Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const viewport: Viewport = {
  colorScheme: 'dark', width: 'device-width', initialScale: 1,
  themeColor: '#0a0a0f',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background dark">
      <head>
        <meta name="6a97888e-site-verification" content="2f5d8d0eb9897bcf65c70108a9d43d11" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <AgeGate />
        <SiteAnalytics />
      </body>
    </html>
  )
}
