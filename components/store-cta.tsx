'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { siteTrack } from '@/lib/site-analytics'

const STORE_URL = 'https://chromewebstore.google.com/detail/gallerypilot-%E2%80%94-page-slide/hieimlenfnplaaododphkaogpjohlpob'

export type StoreCtaPlacement = 'hero' | 'navbar' | 'mobile_nav' | 'pricing' | 'final_cta' | 'footer' | 'mobile_sticky'

interface StoreCtaProps extends Omit<React.ComponentProps<typeof Link>, 'href'> {
  placement: StoreCtaPlacement
  children: ReactNode
}

/** Chrome Web Store link that fires chrome_store_click (and hero_cta_click for the hero). */
export function StoreCta({ placement, onClick, ...props }: StoreCtaProps) {
  return (
    <Link
      href={STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      onClick={(e) => {
        if (placement === 'hero') siteTrack('hero_cta_click', { placement })
        siteTrack('chrome_store_click', { placement })
        onClick?.(e)
      }}
    />
  )
}
