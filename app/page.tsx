import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, Eye, Gauge, Keyboard, LockKeyhole, Play, ShieldCheck, Sparkles } from 'lucide-react'
import { HeroEnter, Parallax, Reveal, ScrollProgress, Stagger, StaggerItem, WordReveal } from '@/components/reveal'
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

const assurances = ['No host permissions', 'No remote code', 'No downloads', 'No access-control bypass', 'No account', 'No analytics']

export default function Page() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <ScrollProgress />
      <a href="#main" className="sr-only fixed left-4 top-4 z-50 rounded-md bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <section className="relative min-h-[calc(100svh-4rem)] border-b border-border px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <HeroEnter>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm text-muted-foreground"><ShieldCheck className="size-4 text-primary" aria-hidden="true" /> Local by design. Private by default.</div>
              </HeroEnter>
              <h1 className="mt-7 max-w-3xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                <WordReveal text="Your private gallery." delay={0.15} />
                <br />
                <WordReveal text="On autopilot." delay={0.4} className="text-primary" />
              </h1>
              <HeroEnter delay={0.55}>
                <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">Open. Start. Lean back. EroPilot handles the rest — locally, privately, yours.</p>
              </HeroEnter>
              <HeroEnter delay={0.7}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link href={STORE_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"><ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" /> Add to Chrome — Free</Link>
                  <Link href="#demo" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-7 font-semibold transition-colors duration-300 hover:border-primary/60"><Play className="size-4 fill-current transition-transform duration-300 group-hover:scale-110" aria-hidden="true" /> Watch demo</Link>
                </div>
                <p className="mt-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">No account · No analytics · Core playback free</p>
              </HeroEnter>
            </div>
            <HeroEnter delay={0.35} className="relative">
              <Parallax amount={28}>
                <div className="absolute -inset-4 rounded-[2rem] border border-primary/10" aria-hidden="true" />
                <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-2xl shadow-primary/10">
                  <div className="flex h-11 items-center gap-2 border-b border-border px-4" aria-hidden="true"><span className="size-2 rounded-full bg-primary" /><span className="size-2 rounded-full bg-muted-foreground/40" /><span className="ml-auto font-mono text-xs text-muted-foreground">ACTIVE TAB</span></div>
                  <Image src="/gallerypilot-popup.jpeg" alt="EroPilot controls over a media gallery" width={1280} height={800} priority className="aspect-[16/10] w-full object-cover" />
                </div>
              </Parallax>
            </HeroEnter>
          </div>
        </section>

        <section className="overflow-hidden border-b border-border py-6" aria-label="Privacy assurances">
          <div className="marquee flex w-max gap-10" aria-hidden="true">
            {[...assurances, ...assurances, ...assurances].map((item, i) => (
              <span key={i} className="flex items-center gap-10 font-mono text-xs uppercase tracking-widest text-muted-foreground">{item}<span className="text-primary">·</span></span>
            ))}
          </div>
          <p className="sr-only">{assurances.join(', ')}</p>
        </section>

        <section id="features" className="scroll-mt-20 px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal className="grid gap-5 lg:grid-cols-2 lg:items-end"><div><p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">Built for flow</p><h2 className="mt-4 max-w-2xl text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Nothing between you and the next frame.</h2></div><p className="max-w-lg text-lg leading-relaxed text-muted-foreground lg:justify-self-end">Deliberate controls. No clutter. Every feature exists to make viewing feel effortless.</p></Reveal>
            <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {features.map(({ icon: Icon, title, copy, className }) => (
                <StaggerItem key={title} className={className}>
                  <article className="group h-full min-h-64 border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
                    <Icon className="size-6 text-primary transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
                    <h3 className="mt-16 max-w-sm text-2xl font-semibold tracking-tight">{title}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{copy}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
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

        <section id="how-it-works" className="scroll-mt-20 px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><Reveal><p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">Three moves</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Open. Start. Lean back.</h2></Reveal><Stagger className="mt-14 grid border-y border-border md:grid-cols-3"><ol className="contents">{[['01','Open your gallery','Navigate to the page you want to view.'],['02','Start EroPilot','Click the extension and choose your mode.'],['03','Let it move','Pause, skip, or adjust the pace at any time.']].map(([n,title,copy]) => <StaggerItem key={n}><li className="h-full border-b border-border py-8 last:border-0 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-0"><span className="font-mono text-sm text-primary">{n}</span><h3 className="mt-12 text-2xl font-semibold">{title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{copy}</p></li></StaggerItem>)}</ol></Stagger></div></section>

        <section id="pricing" className="scroll-mt-20 border-y border-border bg-card px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><Reveal><p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">One honest upgrade</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Start free.<br />Keep it forever.</h2><p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">Core playback costs nothing. Pro adds focused presets with one payment — no subscription hiding in the small print.</p></Reveal><Reveal delay={0.08}><article className="border border-primary/40 bg-background p-8 shadow-2xl shadow-primary/10 transition-shadow duration-500 hover:shadow-primary/20 sm:p-10"><div className="flex items-start justify-between gap-6"><div><p className="font-mono text-xs uppercase tracking-widest text-primary">EroPilot Pro</p><p className="mt-3 text-5xl font-semibold tracking-tight">€9.90</p></div><span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">One-time</span></div><ul className="mt-9 grid gap-4 sm:grid-cols-2">{['Everything in Free','Cinema preset','Quick Scan preset','Video Focus preset','One-click switching','No recurring fee'].map(x => <li key={x} className="flex gap-3"><Check className="mt-0.5 size-5 text-primary" aria-hidden="true" />{x}</li>)}</ul><Link href={STRIPE_URL} target="_blank" rel="noopener noreferrer" className="group mt-10 flex min-h-13 items-center justify-center gap-2 rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25">Unlock Pro <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" /></Link><p className="mt-4 text-center text-xs text-muted-foreground">Secure checkout by Stripe. Payment data never enters the extension.</p></article></Reveal></div></section>

        <section id="faq" className="scroll-mt-20 px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.6fr_1fr]"><Reveal><p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">Clear answers</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Private means private.</h2></Reveal><Stagger className="border-t border-border">{[
          ['What pages does it work on?','EroPilot is designed for pages that display standard images or videos. It runs only on the active tab where you start it.'],
          ['Is my browsing data collected?','No. EroPilot runs locally, uses no analytics, and does not collect browsing history or gallery content.'],
          ['Does it download media or bypass logins?','No. It only displays media already available on the open page. It does not download files or bypass access controls.'],
          ['What is included for free?','Core slideshow playback, viewing modes, keyboard controls, and all privacy features.'],
        ].map(([q,a]) => <StaggerItem key={q}><details className="group border-b border-border py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold transition-colors marker:hidden hover:text-primary">{q}<span className="text-primary transition-transform duration-300 group-open:rotate-45">+</span></summary><p className="mt-4 max-w-2xl pr-8 leading-relaxed text-muted-foreground">{a}</p></details></StaggerItem>)}</Stagger></div></section>

        <section className="border-t border-border px-5 py-24 lg:px-8"><Reveal className="mx-auto max-w-5xl text-center"><Sparkles className="mx-auto size-7 text-primary" aria-hidden="true" /><h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">Your gallery. Your rules.<br />Your privacy.</h2><Link href={STORE_URL} target="_blank" rel="noopener noreferrer" className="group mt-9 inline-flex min-h-13 items-center gap-2 rounded-full bg-primary px-8 font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25">Add to Chrome — Free <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" /></Link></Reveal></section>
      </main>
      <footer className="border-t border-border px-5 py-10 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-foreground">EroPilot</p><p className="mt-1">Your private gallery co-pilot.</p></div><nav className="flex flex-wrap gap-6" aria-label="Footer"><Link href={STORE_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">Chrome Web Store</Link><Link href="/privacy" className="transition-colors hover:text-foreground">Privacy</Link><Link href="mailto:privacy@gallerypilot.app" className="transition-colors hover:text-foreground">Contact</Link></nav><p>© 2026 EroPilot</p></div></footer>
      <Link href={STORE_URL} target="_blank" rel="noopener noreferrer" className="fixed inset-x-4 bottom-4 z-30 flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground shadow-2xl md:hidden"><ArrowRight className="size-5" aria-hidden="true" /> Add to Chrome — Free</Link>
    </div>
  )
}
