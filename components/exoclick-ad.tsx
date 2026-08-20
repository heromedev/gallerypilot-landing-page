'use client'

import Script from 'next/script'

export function ExoClickAd() {
  return (
    <>
      <Script
        async
        type="application/javascript"
        src="https://a.magsrv.com/ad-provider.js"
        strategy="afterInteractive"
      />
      <div className="flex justify-center py-8">
        <ins className="eas6a97888e2" data-zoneid="6007880" />
      </div>
      <Script id="exoclick-init" strategy="afterInteractive">
        {`(AdProvider = window.AdProvider || []).push({"serve": {}});`}
      </Script>
    </>
  )
}
