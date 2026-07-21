import Image from 'next/image'
import Link from 'next/link'
import {
  Check,
  Clapperboard,
  Keyboard,
  Layers,
  PlayCircle,
  RotateCcw,
  ShieldCheck,
  VolumeX,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SiteHeader } from '@/components/site-header'

const features = [
  [PlayCircle, 'Auto-advance slideshow', 'Hands-free photo and video playback that keeps your gallery moving.'],
  [Clapperboard, 'Smart video handling', 'Play videos in full or preview a timed sample before moving on.'],
  [Layers, 'Flexible viewing modes', 'Switch between Mixed, Image-only, and Video-only modes instantly.'],
  [Keyboard, 'Keyboard control', 'Use Space, arrow keys, and Escape without reaching for the mouse.'],
  [RotateCcw, 'Mute and resume', 'Keep your sound preference for the session and resume where you left off.'],
  [ShieldCheck, '100% local and private', 'No analytics, no browsing history, and no gallery data leaves your device.'],
] as const

function BrowserFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-foreground/5">
      <div className="flex h-10 items-center gap-2 border-b border-border bg-muted px-4" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="ml-2 h-5 flex-1 rounded-md bg-background" />
      </div>
      <Image src={src} alt={alt} width={1280} height={800} className="aspect-[16/10] w-full object-cover" unoptimized />
    </div>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />
      <main>
        <section className="px-5 pb-20 pt-20 lg:px-8 lg:pb-28 lg:pt-28">
          <div className="mx-auto max-w-6xl text-center">
            <Reveal>
              <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground shadow-sm">
                <ShieldCheck className="size-4 text-primary" aria-hidden="true" /> Private by design. Always local.
              </div>
              <h1 className="mx-auto max-w-4xl text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">Turn any gallery into a hands-free slideshow.</h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">GalleryPilot turns any page of images and videos into a private, hands-free slideshow—one click, no uploads, no tracking.</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="https://chromewebstore.google.com/detail/gallerypilot-%E2%80%94-page-slide/hieimlenfnplaaododphkaogpjohlpob"
                target='_blank' 
                className="flex min-h-12 items-center justify-center rounded-full bg-accent px-7 font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5">Add to Chrome — Free</Link>
                <Link href="#how-it-works" className="flex min-h-12 items-center justify-center rounded-full border border-border bg-card px-7 font-semibold transition-colors hover:bg-muted">See how it works</Link>
              </div>
              <p className="mt-5 text-sm text-muted-foreground">Core playback is free · 100% local · No analytics</p>
            </Reveal>
            <Reveal delay={0.15} className="mx-auto mt-14 max-w-4xl">
              <BrowserFrame src="/gallerypilot-popup.jpeg" alt="GalleryPilot extension popup with playback, media filters, pacing, mute, and Pro controls" />
            </Reveal>
          </div>
        </section>

        <section className="border-y border-border bg-muted/50 px-5 py-8" aria-label="Privacy highlights">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm font-semibold text-muted-foreground">
            <span>No host permissions</span><span>No remote code</span><span>No downloads</span><span>No access-control bypass</span>
          </div>
        </section>

        <section id="features" className="scroll-mt-20 px-5 py-24 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl"><p className="font-mono text-sm font-semibold uppercase tracking-widest text-primary">Built for flow</p><h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Everything you need. Nothing watching you.</h2><p className="mt-4 text-lg leading-relaxed text-muted-foreground">Thoughtful controls for effortless viewing, with privacy built into every session.</p></Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {features.map(([Icon, title, copy], index) => <Reveal key={title} delay={index * 0.04}><article className="h-full rounded-2xl border border-border bg-card p-7 shadow-sm"><div className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary"><Icon className="size-5" aria-hidden="true" /></div><h3 className="mt-6 text-xl font-semibold">{title}</h3><p className="mt-2 leading-relaxed text-muted-foreground">{copy}</p>{title === 'Mute and resume' && <VolumeX className="mt-5 size-5 text-muted-foreground" aria-hidden="true" />}</article></Reveal>)}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-20 bg-muted/50 px-5 py-24 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal className="text-center"><p className="font-mono text-sm font-semibold uppercase tracking-widest text-primary">Three easy steps</p><h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">From page to playback in seconds</h2></Reveal>
            <div className="relative mt-12 grid gap-5 md:grid-cols-3">
              <div className="absolute left-1/6 right-1/6 top-7 hidden h-px bg-border md:block" aria-hidden="true" />
              {['Open any gallery page', 'Click the GalleryPilot icon → Start on this tab', 'Lean back — it plays automatically'].map((title, i) => <Reveal key={title} delay={i * 0.08}><article className="relative rounded-2xl border border-border bg-card p-6"><span className="flex size-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">{i + 1}</span><div className="mt-6 aspect-[3/2] rounded-xl bg-muted p-4"><div className="grid h-full grid-cols-3 gap-2">{[1, 2, 3, 4, 5, 6].map(x => <span key={x} className="rounded-md bg-secondary" />)}</div></div><h3 className="mt-5 text-lg font-semibold">{title}</h3></article></Reveal>)}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <Reveal className="text-center"><p className="font-mono text-sm font-semibold uppercase tracking-widest text-primary">See it in action</p><h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">A focused viewer that stays out of the way</h2><p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">Choose what to show, set the pace, and start playback without sending the gallery anywhere.</p></Reveal>
            <Reveal delay={0.1} className="mt-12 overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-xl shadow-foreground/5">
              <video className="aspect-video w-full rounded-xl bg-muted object-cover" controls muted playsInline preload="metadata" poster="/gallerypilot-popup.jpeg" aria-label="GalleryPilot product demonstration">
                <source src="/gallerypilot-demo.mp4" type="video/mp4" />
                Your browser does not support this GalleryPilot demonstration video.
              </video>
            </Reveal>
          </div>
        </section>

        <section className="bg-muted/50 px-5 py-24 lg:px-8"><div className="mx-auto max-w-6xl"><Reveal className="text-center"><h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Small permissions. Clear purpose.</h2><p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">GalleryPilot uses temporary access only when you start it on the active tab.</p></Reveal><div className="mt-12 grid gap-5 md:grid-cols-3">{[['activeTab', 'Temporary access to the page you explicitly start GalleryPilot on.'], ['scripting', 'Runs the slideshow controls on that active page only.'], ['storage', 'Keeps your extension preferences on your device.']].map(([name, copy]) => <article key={name} className="rounded-2xl border border-border bg-card p-7"><p className="font-mono text-sm font-semibold text-primary">{name}</p><p className="mt-3 leading-relaxed text-muted-foreground">{copy}</p></article>)}</div></div></section>

        <section id="pricing" className="scroll-mt-20 px-5 py-24 lg:px-8"><div className="mx-auto max-w-5xl"><Reveal className="text-center"><p className="font-mono text-sm font-semibold uppercase tracking-widest text-primary">Simple pricing</p><h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Start free. Upgrade when you want more.</h2></Reveal><div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card p-8"><h3 className="text-2xl font-semibold">Free</h3><p className="mt-4 text-4xl font-semibold">$0</p><p className="mt-2 text-muted-foreground">Core playback for every gallery.</p><ul className="mt-8 flex flex-col gap-4">{['Photo and video playback', 'All viewing modes', 'Keyboard controls', 'Local-only privacy'].map(x => <li key={x} className="flex gap-3"><Check className="mt-0.5 size-5 text-primary" />{x}</li>)}</ul><Link href="https://chromewebstore.google.com/detail/gallerypilot-%E2%80%94-page-slide/hieimlenfnplaaododphkaogpjohlpob?authuser=0&hl=fr" className="mt-9 flex min-h-12 items-center justify-center rounded-full border border-border font-semibold hover:bg-muted" target='_blank'>Add to Chrome</Link></article>
          <article className="relative rounded-2xl border-2 border-accent bg-card p-8 shadow-xl shadow-accent/10"><span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">One-time</span><h3 className="text-2xl font-semibold">Pro</h3><p className="mt-4 text-4xl font-semibold">€9.90</p><p className="mt-2 text-muted-foreground">Power presets with a single upgrade.</p><ul className="mt-8 flex flex-col gap-4">{['Everything in Free', 'Cinema, Quick Scan, and Video Focus', 'One-click preset switching', 'No recurring subscription'].map(x => <li key={x} className="flex gap-3"><Check className="mt-0.5 size-5 text-primary" />{x}</li>)}</ul><Link href="https://buy.stripe.com/aFafZi5sd7DLc0ocfeeIw00" target="_blank" rel="noopener noreferrer" className="mt-9 flex min-h-12 items-center justify-center rounded-full bg-accent font-semibold text-accent-foreground hover:opacity-90">Choose Pro</Link><p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">Secure checkout hosted by Stripe. No payment data enters the extension.</p></article>
        </div></div></section>

        <section id="faq" className="scroll-mt-20 bg-muted/50 px-5 py-24 lg:px-8"><div className="mx-auto max-w-3xl"><Reveal className="text-center"><h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Questions, answered</h2></Reveal><div className="mt-10 flex flex-col gap-3">{[
          ['What pages does it work on?', 'GalleryPilot is designed for pages that display standard images or videos. It works only on the active tab where you explicitly start it.'],
          ['Is my browsing data collected?', 'No. GalleryPilot runs locally, uses no analytics, and does not collect your browsing history or gallery content.'],
          ['Does it download media or bypass logins?', 'No. It only displays media already available to you on the open page. It does not download files or bypass access controls.'],
          ['How does Pro work? Can I redeem a code?', 'Pro checkout is hosted securely by Stripe. After purchase, follow the activation instructions to unlock presets or redeem an eligible code.'],
          ['Is it really free?', 'Yes. Core slideshow playback, viewing modes, keyboard controls, and privacy features are free.'],
          ['How do I install it?', 'Install GalleryPilot from its official browser extension listing, then pin the icon for quick access.'],
        ].map(([q, a]) => <details key={q} className="group rounded-xl border border-border bg-card p-5"><summary className="cursor-pointer list-none font-semibold marker:hidden">{q}<span className="float-right text-primary group-open:rotate-45">+</span></summary><p className="mt-3 pr-8 leading-relaxed text-muted-foreground">{a}</p></details>)}</div></div></section>

        <section className="bg-primary px-5 py-20 text-primary-foreground lg:px-8"><div className="mx-auto max-w-4xl text-center"><h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Start watching hands-free in seconds</h2><p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">One click to start. Your gallery stays on your device.</p><Link href="https://chromewebstore.google.com/detail/gallerypilot-%E2%80%94-page-slide/hieimlenfnplaaododphkaogpjohlpob?authuser=0&hl=fr" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-accent px-7 font-semibold text-accent-foreground" target='_blank'>Add to Chrome — Free</Link><p className="mt-5 text-sm text-primary-foreground/75">Private by design · No analytics · No browsing history collected</p></div></section>
      </main>
      <footer className="border-t border-border px-5 py-12 lg:px-8"><div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4"><div><p className="font-semibold">GalleryPilot</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Made for private, local viewing.</p></div>{[['Product', 'Features', 'How it works', 'Pricing'], ['Resources', 'FAQ', 'Install guide', 'Support'], ['Legal', 'Privacy Policy', 'Terms', 'Contact']].map(([heading, ...items]) => <div key={heading}><p className="text-sm font-semibold">{heading}</p><ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">{items.map(item => <li key={item}><Link href={item === 'Privacy Policy' ? '/privacy' : item === 'Contact' ? 'mailto:privacy@gallerypilot.app' : '#'} className="hover:text-foreground">{item}</Link></li>)}</ul></div>)}</div><div className="mx-auto mt-10 max-w-6xl border-t border-border pt-6 text-sm text-muted-foreground">© 2026 GalleryPilot</div></footer>
    </div>
  )
}
