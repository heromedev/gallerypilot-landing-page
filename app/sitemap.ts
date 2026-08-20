import type { MetadataRoute } from 'next'

const SITE_URL = 'https://eromepilot.vercel.app'
const locales = ['en', 'fr', 'de', 'es', 'pt', 'ja', 'ko', 'zh', 'ru'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...locales.map((locale) => ({
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    })),
    ...locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ]
}
