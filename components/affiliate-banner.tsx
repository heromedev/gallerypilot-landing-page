'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useEffect, useRef } from 'react'

const AFFILIATE_URL = 'https://chaturbate.com/in/?tour=LQps&campaign=bnSAi&track=default&room=eromedev'

const EASE = [0.16, 1, 0.3, 1] as const

function ExoClickAd() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const script1 = document.createElement('script')
    script1.async = true
    script1.type = 'application/javascript'
    script1.src = 'https://a.magsrv.com/ad-provider.js'
    document.body.appendChild(script1)

    const script2 = document.createElement('script')
    script2.textContent = `(AdProvider = window.AdProvider || []).push({"serve": {}});`
    document.body.appendChild(script2)

    return () => {
      script1.remove()
      script2.remove()
    }
  }, [])

  return (
    <div ref={containerRef} className="flex items-center justify-center">
      <ins className="eas6a97888e2" data-zoneid="6007880" />
    </div>
  )
}

export function AffiliateBanner() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden border-y border-border bg-card px-5 py-16 lg:px-8 lg:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden="true"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_auto]">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <motion.p
            className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary"
            initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            Keep it free
          </motion.p>

          <motion.h2
            className="text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          >
            Help us keep GalleryPilot free
          </motion.h2>

          <motion.p
            className="max-w-lg text-lg leading-relaxed text-muted-foreground"
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          >
            Check out our partners below — visiting their sites helps us keep the extension free for everyone.
          </motion.p>

          <motion.a
            href={AFFILIATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-2 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-8 font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          >
            Visit Chaturbate
            <ExternalLink className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </motion.a>
        </div>

        <ExoClickAd />
      </div>
    </section>
  )
}
