'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Globe, Menu, Moon, Play, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { MobileNav } from '@/components/reveal'
import { StoreCta } from '@/components/store-cta'
import type { Dictionary, Locale } from '@/i18n/types'
import { locales } from '@/i18n/config'

const localeLabels: Record<Locale, string> = {
  en: 'EN', fr: 'FR', de: 'DE', es: 'ES', pt: 'PT', ja: 'JA', ko: 'KO', ru: 'RU', zh: 'ZH',
}

function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split('/')[1]
  if (locales.includes(segment as Locale)) return segment as Locale
  return 'en'
}

interface SiteHeaderProps {
  dictionary: Dictionary
  locale: Locale
}

export function SiteHeader({ dictionary: t, locale }: SiteHeaderProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  const currentLocale = getLocaleFromPathname(pathname)

  const links = [
    { href: `/${currentLocale}/#features`, label: 'Features' },
    { href: `/${currentLocale}/#demo`, label: 'Demo' },
    { href: `/${currentLocale}/#pricing`, label: 'Pro' },
    { href: `/${currentLocale}/#faq`, label: 'FAQ' },
  ]

  const localizedLinks = links.map((link) => {
    const key = link.href.split('#')[1]
    if (key === 'features') return { ...link, label: t.featuresSection.label }
    if (key === 'demo') return { ...link, label: t.demoSection.label }
    if (key === 'pricing') return { ...link, label: 'Pro' }
    if (key === 'faq') return { ...link, label: t.faqSection.label }
    return link
  })

  useEffect(() => setDark(document.documentElement.classList.contains('dark')), [])

  function toggleTheme() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    window.localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  function switchLocale(newLocale: Locale) {
    const segments = pathname.split('/')
    segments[1] = newLocale
    window.location.href = segments.join('/')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href={`/${currentLocale}`} className="flex items-center gap-3 font-semibold tracking-tight" aria-label="EroPilot home">
          <span className="flex size-9 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary"><Play className="size-4 fill-current" aria-hidden="true" /></span>
          <span>EroPilot <span className="font-normal text-muted-foreground">/ {t.footer.tagline}</span></span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {localizedLinks.map((link) => <Link key={link.href} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{link.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)} className="flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="Change language" aria-expanded={langOpen}>
              <Globe className="size-5" aria-hidden="true" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-36 rounded-xl border border-border bg-background p-1 shadow-xl">
                {locales.map((loc) => (
                  <button key={loc} onClick={() => { switchLocale(loc); setLangOpen(false) }} className={`flex w-full items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted ${loc === currentLocale ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>
                    {localeLabels[loc]}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={toggleTheme} className="flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label={dark ? 'Use light theme' : 'Use dark theme'}>
            {dark ? <Sun aria-hidden="true" className="size-5" /> : <Moon aria-hidden="true" className="size-5" />}
          </button>
          {pathname === `/${currentLocale}/privacy` ? (
            <Link href={`/${currentLocale}`} className="hidden min-h-11 items-center rounded-full border border-border px-5 text-sm font-semibold sm:flex">Back to home</Link>
          ) : (
            <StoreCta placement="navbar" className="hidden min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 sm:flex">Add to Chrome <ArrowUpRight className="size-4" aria-hidden="true" /></StoreCta>
          )}
          <button onClick={() => setOpen(!open)} className="flex size-11 items-center justify-center rounded-full border border-border md:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label="Toggle navigation">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      <MobileNav open={open}>
        <nav id="mobile-nav" className="flex flex-col gap-1 border-t border-border bg-background px-5 py-4" aria-label="Mobile navigation">
          {localizedLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium hover:bg-muted">{link.label}</Link>)}
          <StoreCta placement="mobile_nav" onClick={() => setOpen(false)} className="mt-2 flex min-h-11 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground">Add to Chrome</StoreCta>
        </nav>
      </MobileNav>
    </header>
  )
}
