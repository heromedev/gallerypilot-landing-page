import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, Eye, Gauge, Keyboard, LockKeyhole, Play, ShieldCheck, Sparkles } from 'lucide-react'
import { HeroEnter, Parallax, Reveal, ScrollProgress, Stagger, StaggerItem, WordReveal } from '@/components/reveal'
import { SiteHeader } from '@/components/site-header'
import { PricingButton } from '@/components/pricing-button'
import { AffiliateBanner } from '@/components/affiliate-banner'
import { ExoClickAd } from '@/components/exoclick-ad'

import { getDictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/types'

const STORE_URL = 'https://chromewebstore.google.com/detail/gallerypilot-%E2%80%94-page-slide/hieimlenfnplaaododphkaogpjohlpob'

const featureIcons = [Gauge, Play, Eye, Keyboard, LockKeyhole]
const featureClassName = ['md:col-span-2', '', '', '', 'md:col-span-2']

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = getDictionary(locale)

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <ScrollProgress />
      <a href="#main" className="sr-only fixed left-4 top-4 z-50 rounded-md bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only">{t.skipToContent}</a>
      <SiteHeader dictionary={t} locale={locale} />
      <main id="main">
        <section className="relative min-h-[calc(100svh-4rem)] border-b border-border px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <HeroEnter>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm text-muted-foreground"><ShieldCheck className="size-4 text-primary" aria-hidden="true" /> {t.hero.badge}</div>
              </HeroEnter>
              <h1 className="mt-7 max-w-3xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                <WordReveal text={t.hero.headline1} delay={0.15} />
                <br />
                <WordReveal text={t.hero.headline2} delay={0.4} className="text-primary" />
              </h1>
              <HeroEnter delay={0.55}>
                <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">{t.hero.subtext}</p>
              </HeroEnter>
              <HeroEnter delay={0.7}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link href={STORE_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"><ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" /> {t.hero.ctaAdd}</Link>
                  <Link href="#demo" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-7 font-semibold transition-colors duration-300 hover:border-primary/60"><Play className="size-4 fill-current transition-transform duration-300 group-hover:scale-110" aria-hidden="true" /> {t.hero.ctaDemo}</Link>
                </div>
                <p className="mt-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">{t.hero.disclaimer}</p>
              </HeroEnter>
            </div>
            <HeroEnter delay={0.35} className="relative">
              <Parallax amount={28}>
                <div className="absolute -inset-4 rounded-[2rem] border border-primary/10" aria-hidden="true" />
                <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-2xl shadow-primary/10">
                  <div className="flex h-11 items-center gap-2 border-b border-border px-4" aria-hidden="true"><span className="size-2 rounded-full bg-primary" /><span className="size-2 rounded-full bg-muted-foreground/40" /><span className="ml-auto font-mono text-xs text-muted-foreground">{t.hero.activeTab}</span></div>
                  <Image src="/gallerypilot-popup.jpeg" alt={t.hero.alt} width={1280} height={800} priority className="aspect-[16/10] w-full object-cover" />
                </div>
              </Parallax>
            </HeroEnter>
          </div>
        </section>

        <section className="overflow-hidden border-b border-border py-6" aria-label="Privacy assurances">
          <div className="marquee flex w-max gap-10" aria-hidden="true">
            {[...t.marquee, ...t.marquee, ...t.marquee].map((item, i) => (
              <span key={i} className="flex items-center gap-10 font-mono text-xs uppercase tracking-widest text-muted-foreground">{item}<span className="text-primary">·</span></span>
            ))}
          </div>
          <p className="sr-only">{t.marquee.join(', ')}</p>
        </section>

        <section id="features" className="scroll-mt-20 px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal className="grid gap-5 lg:grid-cols-2 lg:items-end"><div><p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t.featuresSection.label}</p><h2 className="mt-4 max-w-2xl text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{t.featuresSection.heading}</h2></div><p className="max-w-lg text-lg leading-relaxed text-muted-foreground lg:justify-self-end">{t.featuresSection.description}</p></Reveal>
            <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {t.features.map((feature, i) => (
                <StaggerItem key={feature.title} className={featureClassName[i]}>
                  <article className="group h-full min-h-64 border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
                    {(() => { const Icon = featureIcons[i]; return <Icon className="size-6 text-primary transition-transform duration-500 group-hover:scale-110" aria-hidden="true" /> })()}
                    <h3 className="mt-16 max-w-sm text-2xl font-semibold tracking-tight">{feature.title}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{feature.copy}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section id="demo" className="scroll-mt-20 border-y border-border bg-card px-5 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t.demoSection.label}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{t.demoSection.heading}</h2></div><p className="max-w-md leading-relaxed text-muted-foreground">{t.demoSection.description}</p></Reveal>
            <Reveal delay={0.1} className="mt-12 overflow-hidden rounded-2xl border border-border bg-background p-2 shadow-2xl">
              <video className="aspect-video w-full rounded-xl bg-muted object-cover" controls muted playsInline preload="metadata" poster="/gallerypilot-popup.jpeg" aria-label={t.demoSection.videoLabel}><source src="/gallerypilot-demo.mp4" type="video/mp4" />{t.demoSection.videoFallback}</video>
            </Reveal>
          </div>
        </section>



        <section id="how-it-works" className="scroll-mt-20 px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><Reveal><p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t.howItWorks.label}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{t.howItWorks.heading}</h2></Reveal><Stagger className="mt-14 grid border-y border-border md:grid-cols-3"><ol className="contents">{t.howItWorks.steps.map((step) => <StaggerItem key={step.number}><li className="h-full border-b border-border py-8 last:border-0 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-0"><span className="font-mono text-sm text-primary">{step.number}</span><h3 className="mt-12 text-2xl font-semibold">{step.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{step.copy}</p></li></StaggerItem>)}</ol></Stagger></div></section>

        <section id="pricing" className="scroll-mt-20 border-y border-border bg-card px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto max-w-6xl"><Reveal><p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t.pricingSection.label}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl whitespace-pre-line">{t.pricingSection.heading}</h2><p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">{t.pricingSection.description}</p></Reveal><Reveal delay={0.08}><div className="mt-14 grid gap-5 sm:grid-cols-2">{t.pricingSection.tiers.map((tier) => (<article key={tier.name} className={`relative flex flex-col border p-8 transition-all duration-500 sm:p-10 ${tier.badge ? 'border-primary/40 bg-background shadow-2xl shadow-primary/10 hover:shadow-primary/20' : 'border-border bg-background/50 hover:border-border/80'}`}>{tier.badge && <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-primary-foreground">{tier.badge}</span>}<div className="flex items-start justify-between gap-6"><div><p className="font-mono text-xs uppercase tracking-widest text-primary">{tier.name}</p><p className="mt-3 text-5xl font-semibold tracking-tight">{tier.price}</p></div><span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{tier.frequency}</span></div><ul className="mt-9 grid flex-1 gap-3">{tier.features.map((x) => <li key={x} className="flex gap-3 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />{x}</li>)}</ul>{tier.name === 'Pro' ? <PricingButton label={tier.cta} /> : <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="group mt-10 flex min-h-13 items-center justify-center gap-2 rounded-full border border-border bg-card px-7 font-semibold transition-colors duration-300 hover:border-primary/60">{tier.cta}</a>}</article>))}</div><p className="mt-6 text-center text-xs text-muted-foreground">{t.pricingSection.disclaimer}</p></Reveal></div></section>

        <section id="faq" className="scroll-mt-20 px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.6fr_1fr]"><Reveal><p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t.faqSection.label}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{t.faqSection.heading}</h2></Reveal><Stagger className="border-t border-border">{t.faqSection.items.map((item) => <StaggerItem key={item.q}><details className="group border-b border-border py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold transition-colors marker:hidden hover:text-primary">{item.q}<span className="text-primary transition-transform duration-300 group-open:rotate-45">+</span></summary><p className="mt-4 max-w-2xl pr-8 leading-relaxed text-muted-foreground">{item.a}</p></details></StaggerItem>)}</Stagger></div></section>

        <ExoClickAd />

        <AffiliateBanner />

        <section className="border-t border-border px-5 py-24 lg:px-8"><Reveal className="mx-auto max-w-5xl text-center"><Sparkles className="mx-auto size-7 text-primary" aria-hidden="true" /><h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-6xl whitespace-pre-line">{t.finalCta.heading}</h2><Link href={STORE_URL} target="_blank" rel="noopener noreferrer" className="group mt-9 inline-flex min-h-13 items-center gap-2 rounded-full bg-primary px-8 font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25">{t.finalCta.cta} <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" /></Link></Reveal></section>
      </main>
      <footer className="border-t border-border px-5 py-10 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between"><div><p className="font-semibold text-foreground">{t.footer.brand}</p><p className="mt-1">{t.footer.tagline}</p></div><nav className="flex flex-wrap gap-6" aria-label="Footer"><Link href={STORE_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">{t.footer.chromeWebStore}</Link><Link href={`/${locale}/privacy`} className="transition-colors hover:text-foreground">{t.footer.privacy}</Link><Link href="mailto:privacy@gallerypilot.app" className="transition-colors hover:text-foreground">{t.footer.contact}</Link></nav><p>© 2026 EroPilot</p></div></footer>
      <Link href={STORE_URL} target="_blank" rel="noopener noreferrer" className="fixed inset-x-4 bottom-4 z-30 flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground shadow-2xl md:hidden"><ArrowRight className="size-5" aria-hidden="true" /> {t.mobileCta}</Link>
    </div>
  )
}
