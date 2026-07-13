import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How GalleryPilot protects your privacy and handles data.',
}

const sections = [
  ['1. Our privacy promise', <>GalleryPilot is designed to run locally in your browser. We do not operate analytics in the extension, build browsing profiles, or collect your browsing history. Gallery and media content you view is processed on your device.</>],
  ['2. Information we collect', <>The GalleryPilot extension does not collect, transmit, or sell personal information, browsing history, page content, image URLs, video URLs, or slideshow activity. We do not use advertising trackers or behavioral analytics.</>],
  ['3. How the extension works', <>GalleryPilot reads the images and videos already available on the active page so it can present them as a slideshow. This processing happens locally. The extension does not upload gallery content to GalleryPilot servers.</>],
  ['4. Browser permissions', <>GalleryPilot requests only the browser permissions needed to identify playable media on the active tab, start the viewer, and remember extension settings. Permission access is used solely to provide features you initiate.</>],
  ['5. Downloads and access controls', <>GalleryPilot does not download media, bypass logins, defeat paywalls, or grant access to content you cannot already view. It displays content available to you in your current browser session.</>],
  ['6. Settings and local storage', <>Preferences such as playback mode, timing, mute state, and Pro activation status may be stored locally by your browser. You can remove this local information by uninstalling the extension or clearing its extension data through your browser settings.</>],
  ['7. Pro purchases and Stripe', <>If you purchase GalleryPilot Pro, checkout is hosted by Stripe. Payment details do not enter or pass through the GalleryPilot extension. Stripe processes your transaction under its own privacy policy. We may receive limited purchase information required to activate and support your license, such as a transaction identifier and purchase status.</>],
  ['8. Data retention', <>Because the extension does not collect browsing or gallery data, GalleryPilot does not retain that information. Limited purchase or support records may be retained only as long as necessary to provide service, meet legal obligations, resolve disputes, and prevent fraud.</>],
  ['9. Data sharing', <>We do not sell personal information. We do not share browsing history or gallery content because we do not collect it. Limited purchase information may be processed by Stripe and essential service providers only when needed to complete a transaction or provide support.</>],
  ['10. Security', <>We use reasonable administrative and technical safeguards for the limited information associated with purchases and support. No system can guarantee absolute security, but GalleryPilot minimizes risk by keeping gallery processing on your device and collecting as little information as possible.</>],
  ['11. Children’s privacy', <>GalleryPilot is not directed to children under 13, and we do not knowingly collect personal information from children.</>],
  ['12. Changes to this policy', <>We may update this Privacy Policy as GalleryPilot evolves or legal requirements change. The revised policy will be posted on this page with a new effective date. Material changes will be communicated where appropriate.</>],
  ['13. Contact', <>For privacy questions or requests, email <Link href="mailto:privacy@gallerypilot.app" className="font-medium text-primary underline underline-offset-4">privacy@gallerypilot.app</Link>.</>],
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="px-5 py-16 lg:px-8 lg:py-24">
        <article className="mx-auto max-w-3xl">
          <div className="border-b border-border pb-10">
            <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-secondary text-primary"><ShieldCheck className="size-6" aria-hidden="true" /></div>
            <p className="font-mono text-sm font-semibold uppercase tracking-widest text-primary">Legal</p>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">Privacy Policy</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">GalleryPilot is private by design. This policy explains what the extension accesses, what we do not collect, and how Pro purchases are handled.</p>
            <p className="mt-4 text-sm text-muted-foreground"><strong className="text-foreground">Effective date:</strong> July 13, 2026</p>
          </div>
          <div className="flex flex-col gap-10 py-10">
            {sections.map(([title, content]) => <section key={title as string}><h2 className="text-2xl font-semibold tracking-tight">{title}</h2><p className="mt-3 leading-7 text-muted-foreground">{content}</p></section>)}
          </div>
          <div className="border-t border-border pt-8"><Link href="/" className="inline-flex min-h-11 items-center rounded-full border border-border px-5 text-sm font-semibold hover:bg-muted">Back to GalleryPilot</Link></div>
        </article>
      </main>
      <footer className="border-t border-border px-5 py-8 text-center text-sm text-muted-foreground">© 2026 GalleryPilot · Made for private, local viewing</footer>
    </div>
  )
}
