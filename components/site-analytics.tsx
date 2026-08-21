'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { SITE_ANALYTICS, isSiteAnalyticsEnabled, siteTrack } from '@/lib/site-analytics'

export function SiteAnalytics() {
  const pathname = usePathname()
  const isFirstRun = useRef(true)

  useEffect(() => {
    if (!isSiteAnalyticsEnabled() || !pathname) return

    // Initial page view is sent automatically via gtag config.
    if (isFirstRun.current) {
      isFirstRun.current = false
    } else {
      siteTrack('page_view')
    }

    if (/^\/[a-z]{2}\/?$/.test(pathname)) siteTrack('landing_view')
    if (pathname.includes('/privacy')) siteTrack('privacy_view')
  }, [pathname])

  if (!isSiteAnalyticsEnabled()) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${SITE_ANALYTICS.measurementId}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${SITE_ANALYTICS.measurementId}');`}
      </Script>
    </>
  )
}
