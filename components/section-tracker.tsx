'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import type { SiteEventName } from '@/lib/site-analytics'
import { siteTrack } from '@/lib/site-analytics'

interface SectionTrackerProps {
  event: Extract<SiteEventName, 'features_view' | 'pro_section_view' | 'permissions_view'>
  children: ReactNode
  className?: string
}

/** Fires the given view event once per page load when the section becomes visible. */
export function SectionTracker({ event, children, className }: SectionTrackerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const fired = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || fired.current) return
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          fired.current = true
          siteTrack(event)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [event])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
