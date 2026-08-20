import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/cancel/', '/success/'] }],
    sitemap: 'https://eromepilot.vercel.app/sitemap.xml',
  }
}
