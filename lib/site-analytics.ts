export const SITE_ANALYTICS = {
  measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '',
} as const

/**
 * Site-surface events only (acquisition / marketing / conversion).
 * Extension usage events live in the extension's own analytics module
 * and must never be sent from here.
 */
const EVENT_SCHEMA = {
  page_view: {},
  landing_view: {},
  hero_cta_click: { placement: 'string' },
  chrome_store_click: { placement: 'string' },
  features_view: {},
  permissions_view: {},
  privacy_view: {},
  pro_section_view: {},
  pro_cta_click: { placement: 'string' },
  checkout_click: { plan: 'string' },
  faq_open: { question_id: 'number' },
} as const

export type SiteEventName = keyof typeof EVENT_SCHEMA
type SiteEventParams = Record<string, string | number | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function isSiteAnalyticsEnabled(): boolean {
  return SITE_ANALYTICS.measurementId.startsWith('G-')
}

/** Silently no-ops when analytics is disabled or the event is unknown. */
export function siteTrack(name: SiteEventName, params: SiteEventParams = {}): void {
  if (!isSiteAnalyticsEnabled() || typeof window === 'undefined') return
  if (!(name in EVENT_SCHEMA)) return
  const allowedKeys = Object.keys(EVENT_SCHEMA[name])
  const clean: SiteEventParams = {}
  for (const key of allowedKeys) {
    const value = params[key]
    if (typeof value === 'string' || typeof value === 'number') clean[key] = value
  }
  try {
    window.gtag?.('event', name, clean)
  } catch {
    // Analytics must never break the page.
  }
}
