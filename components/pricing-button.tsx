'use client'

import { ArrowRight } from 'lucide-react'
import { siteTrack } from '@/lib/site-analytics'

interface PricingButtonProps {
  label: string
  placement?: string
}

export function PricingButton({ label, placement = 'pricing' }: PricingButtonProps) {
  return (
    <button
      onClick={async () => {
        siteTrack('pro_cta_click', { placement })
        try {
          const res = await fetch('/api/checkout', { method: 'POST' })
          const data = await res.json()
          if (data.url) {
            siteTrack('checkout_click', { plan: 'pro' })
            window.location.href = data.url
          }
        } catch {
          // Keep the UI silent on network failure.
        }
      }}
      className="group mt-10 flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25 cursor-pointer"
    >
      {label} <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
    </button>
  )
}
