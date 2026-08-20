import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { getDictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/types'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getDictionary(locale)
  return {
    title: { default: t.meta.title, template: `%s | ${t.footer.brand}` },
    description: t.meta.description,
    metadataBase: new URL('https://eromepilot.vercel.app'),
    openGraph: { title: t.meta.title, description: t.meta.ogDescription, type: 'website' },
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
