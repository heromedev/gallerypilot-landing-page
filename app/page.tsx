import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, Eye, Gauge, Keyboard, LockKeyhole, Play, ShieldCheck, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SiteHeader } from '@/components/site-header'

const STORE_URL = 'https://chromewebstore.google.com/detail/gallerypilot-%E2%80%94-page-slide/hieimlenfnplaaododphkaogpjohlpob'
const STRIPE_URL = 'https://buy.stripe.com/aFafZi5sd7DLc0ocfeeIw00'

const features = [
  { icon: Gauge, title: 'Set the pace. It keeps moving.', copy: 'Choose a comfortable interval and let each image advance on its own.', className: 'md:col-span-2' },
  { icon: Play, title: 'Videos play their way.', copy: 'Watch every video in full or sample a timed preview before moving on.', className: '' },
  { icon: Eye, title: 'You choose what appears.', copy: 'All media. Video only. Photos only. Switch without breaking your flow.', className: '' },
  { icon: Keyboard, title: 'Control without reaching.', copy: 'Pause, skip, resume, and exit with familiar keyboard shortcuts.', className: '' },
  { icon: LockKeyhole, title: 'Your gallery stays yours.', copy: 'Everything runs locally. No uploads, analytics, or browsing history collection.', className: 'md:col-span-2' },
]

export default function Page() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <a href="#main" className="sr-only fixed left-4 top-4 z-50 rounded-md bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <section className="relative min-h-[calc(100svh-4rem)] border-b border-border px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm text-muted-foreground"><ShieldCheck className="size-4 text-primary" aria-hidden="true" /> Local by design. Private by default.</div>
              <h1 className="mt-7 max-w-3xl text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">Your private gallery.<br /><span className="text-primary">On autopilot.</span></h1>
              <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">Open. Start. Lean back. EroPilot handles the rest — locally, privately, yours.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href={STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"><ArrowRight className="size-5" aria-hidden="true" /> Add to Chrome — Free</Link>
                <Link href="#demo" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-7 font-semibold transition-colors hover:border-muted-foreground"><Play className="size-4 fill-current" aria-hidden="true" /> Watch demo</Link>
              </div>
              <p className="mt-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">No account · No analytics · Core playback free</p>
            </Reveal>
            <Reveal delay={0.12} className="relative">
              <div className="absolute -inset-4 rounded-[2rem] border border-primary/10" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-2xl shadow-primary/10">
                <div className="flex h-11 items-center gap-2 border-b border-border px-4" aria-hidden="true"><span className="size-2 rounded-full bg-primary" /><span className="size-2 rounded-full bg-muted-foreground/40" /><span className="ml-auto font-mono text-xs text-muted-foreground">ACTIVE TAB</span></div>
                <Image src="/gallerypilot-popup.jpeg" alt="EroPilot controls over a media gallery" width={1280} height={800} priority className="aspect-[16/10] w-full object-cover" />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-b border-border px-5 py-6 lg:px-8" aria-label="Privacy assurances"><div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-10 gap-y-3 font-mono text-xs uppercase tracking-widest text-muted-foreground"><span>No host permissions</span><span>No remote code</span><span>No downloads</span><span>No access-control bypass</span></div></section>

        <section id="features" className="scroll-mt-20 px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal className="grid gap-5 lg:grid-cols-2 lg:items-end"><div><p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">Built for flow</p><h2 className="mt-4 max-w-2xl text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Nothing between you and the next frame.</h2></div><p className="max-w-lg text-lg leading-relaxed text-muted-foreground lg:justify-self-end">Deliberate controls. No clutter. Every feature exists to make viewing feel effortless.</p></Reveal>
            <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {features.map(({ icon: Icon, title, copy, className }, index) => <Reveal key={title} delay={index * .05} className={className}><article className="group h-full min-h-64 border border-border bg-card p-7 transition-colors hover:border-primary/50"><Icon className="size-6 text-primary" aria-hidden="true" /><h3 className="mt-16 max-w-sm text-2xl font-semibold tracking-tight">{title}</h3><p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{copy}</p></article></Reveal>)}
            </div>
          </div>
        </section>

        <section id="demo" className="scroll-mt-20 border-y border-border bg-card px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">Product, not promises</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">See the co-pilot at work.</h2></div><p className="max-w-md leading-relaxed text-muted-foreground">Choose what to show, set the pace, and start — without sending the gallery anywhere.</p></Reveal>
            <Reveal delay={0.1} className="mt-12 overflow-hidden rounded-2xl border border-border bg-background p-2 shadow-2xl">
              <video className="aspect-video w-full rounded-xl bg-muted object-cover" controls muted playsInline preload="metadata" poster="/gallerypilot-popup.jpeg" aria-label="EroPilot product demonstration"><source src="/gallerypilot-demo.mp4" type="video/mp4" />Your browser does not support this EroPilot demonstration video.</video>
            </Reveal>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-20 px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><Reveal><p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">Three moves</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Open. Start. Lean back.</h2></Reveal><ol className="mt-14 grid border-y border-border md:grid-cols-3">{[['01','Open your gallery','Navigate to the page you want to view.'],['02','Start EroPilot','Click the extension and choose your mode.'],['03','Let it move','Pause, skip, or adjust the pace at any time.']].map(([n,title,copy]) => <li key={n} className="border-b border-border py-8 last:border-0 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-0"><span className="font-mono text-sm text-primary">{n}</span><h3 className="mt-12 text-2xl font-semibold">{title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{copy}</p></li>)}</ol></div></section>

        <section id="pricing" className="scroll-mt-20 border-y border-border bg-card px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><Reveal><p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">One honest upgrade</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Start free.<br />Keep it forever.</h2><p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">Core playback costs nothing. Pro adds focused presets with one payment — no subscription hiding in the small print.</p></Reveal><Reveal delay={0.08}><article className="border border-primary/40 bg-background p-8 shadow-2xl shadow-primary/10 sm:p-10"><div className="flex items-start justify-between gap-6"><div><p className="font-mono text-xs uppercase tracking-widest text-primary">EroPilot Pro</p><p className="mt-3 text-5xl font-semibold tracking-tight">€9.90</p></div><span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">One-time</span></div><ul className="mt-9 grid gap-4 sm:grid-cols-2">{['Everything in Free','Cinema preset','Quick Scan preset','Video Focus preset','One-click switching','No recurring fee'].map(x => <li key={x} className="flex gap-3"><Check className="mt-0.5 size-5 text-primary" aria-hidden="true" />{x}</li>)}</ul><Link href={STRIPE_URL} target="_blank" rel="noopener noreferrer" className="mt-10 flex min-h-13 items-center justify-center gap-2 rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">Unlock Pro <ArrowRight className="size-4" aria-hidden="true" /></Link><p className="mt-4 text-center text-xs text-muted-foreground">Secure checkout by Stripe. Payment data never enters the extension.</p></article></Reveal></div></section>

        <section id="faq" className="scroll-mt-20 px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.6fr_1fr]"><Reveal><p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">Clear answers</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Private means private.</h2></Reveal><div className="border-t border-border">{[
          ['What pages does it work on?','EroPilot is designed for pages that display standard images or videos. It runs only on the active tab where you start it.'],
          ['Is my browsing data collected?','No. EroPilot runs locally, uses no analytics, and does not collect browsing history or gallery content.'],
          ['Does it download media or bypass logins?','No. It only displays media already available on the open page. It does not download files or bypass access controls.'],
          ['What is included for free?','Core slideshow playback, viewing modes, keyboard controls, and all privacy features.'],
        ].map(([q,a]) => <details key={q} className="group border-b border-border py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold marker:hidden">{q}<span className="text-primary transition-transform group-open:rotate-45">+</span></summary><p className="mt-4 max-w-2xl pr-8 leading-relaxed text-muted-foreground">{a}</p></details>)}</div></div></section>

        <section className="border-t border-border px-5 py-24 lg:px-8"><Reveal className="mx-auto max-w-5xl text-center"><Sparkles className="mx-auto size-7 text-primary" aria-hidden="true" /><h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">Your gallery. Your rules.<br />Your privacy.</h2><Link href={STORE_URL} target="_blank" rel="noopener noreferrer" className="mt-9 inline-flex min-h-13 items-center gap-2 rounded-full bg-primary px-8 font-semibold text-primary-foreground">Add to Chrome — Free <ArrowRight className="size-4" /></Link></Reveal></section>
      </main>
      <footer className="border-t border-border px-5 py-10 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-foreground">EroPilot</p><p className="mt-1">Your private gallery co-pilot.</p></div><nav className="flex flex-wrap gap-6" aria-label="Footer"><Link href={STORE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Chrome Web Store</Link><Link href="/privacy" className="hover:text-foreground">Privacy</Link><Link href="mailto:privacy@gallerypilot.app" className="hover:text-foreground">Contact</Link></nav><p>© 2026 EroPilot</p></div></footer>
      <Link href={STORE_URL} target="_blank" rel="noopener noreferrer" className="fixed inset-x-4 bottom-4 z-30 flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground shadow-2xl md:hidden"><ArrowRight className="size-5" aria-hidden="true" /> Add to Chrome — Free</Link>
    </div>
  )
}
