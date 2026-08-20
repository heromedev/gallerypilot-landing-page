'use client'

import { useEffect, useRef } from 'react'

export function ExoClickAd() {
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
    <div ref={containerRef} className="flex justify-center py-8">
      <ins className="eas6a97888e2" data-zoneid="6007880" />
    </div>
  )
}
