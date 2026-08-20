import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { getDictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/types'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getDictionary(locale)
  return {
    title: t.privacy.metaTitle,
    description: t.privacy.metaDescription,
  }
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = getDictionary(locale)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader dictionary={t} locale={locale} />
      <main className="px-5 py-16 lg:px-8 lg:py-24">
        <article className="mx-auto max-w-3xl">
          <div className="border-b border-border pb-10">
            <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-secondary text-primary"><ShieldCheck className="size-6" aria-hidden="true" /></div>
            <p className="font-mono text-sm font-semibold uppercase tracking-widest text-primary">{t.privacy.legalLabel}</p>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">{t.privacy.heading}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t.privacy.intro}</p>
            <p className="mt-4 text-sm text-muted-foreground"><strong className="text-foreground">{t.privacy.effectiveDate}</strong> July 13, 2026</p>
          </div>
          <div className="flex flex-col gap-10 py-10">
            {t.privacy.sections.map((section) => <section key={section.title}><h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2><p className="mt-3 leading-7 text-muted-foreground">{section.content}</p></section>)}
          </div>
          <div className="border-t border-border pt-8"><Link href={`/${locale}`} className="inline-flex min-h-11 items-center rounded-full border border-border px-5 text-sm font-semibold hover:bg-muted">{t.privacy.backToEroPilot}</Link></div>
        </article>
      </main>
      <footer className="border-t border-border px-5 py-8 text-center text-sm text-muted-foreground">{t.privacy.footerNote}</footer>
    </div>
  )
}
