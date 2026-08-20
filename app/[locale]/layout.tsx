import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { getDictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/types'

const SITE_URL = 'https://eromepilot.vercel.app'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getDictionary(locale)

  return {
    title: { default: t.meta.title, template: `%s | ${t.footer.brand}` },
    description: t.meta.description,
    metadataBase: new URL(SITE_URL),
    authors: [{ name: 'EroPilot' }],
    generator: 'Next.js',
    applicationName: 'EroPilot',
    referrer: 'origin-when-cross-origin',
    keywords: ['chrome extension', 'gallery viewer', 'private', 'local', 'autopilot', 'media viewer'],
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
      apple: { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.ogDescription,
      url: SITE_URL,
      siteName: t.footer.brand,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'fr' ? 'fr_FR' : locale === 'de' ? 'de_DE' : locale === 'es' ? 'es_ES' : locale === 'pt' ? 'pt_BR' : locale === 'ja' ? 'ja_JP' : locale === 'ko' ? 'ko_KR' : locale === 'zh' ? 'zh_CN' : locale === 'ru' ? 'ru_RU' : 'en_US',
      images: [{ url: '/gallerypilot-popup.jpeg', width: 1280, height: 800, alt: t.hero.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.ogDescription,
      images: [{ url: '/gallerypilot-popup.jpeg', width: 1280, height: 800, alt: t.hero.alt }],
    },
    alternates: { canonical: SITE_URL },
  }
}

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {process.env.NODE_ENV === 'production' && <Analytics />}
    </>
  )
}
