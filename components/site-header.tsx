'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Menu, Moon, Play, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { MobileNav } from '@/components/reveal'

const STORE_URL = 'https://chromewebstore.google.com/detail/gallerypilot-%E2%80%94-page-slide/hieimlenfnplaaododphkaogpjohlpob'
const links = [
  { href: '/#features', label: 'Features' },
  { href: '/#demo', label: 'Demo' },
  { href: '/#pricing', label: 'Pro' },
  { href: '/#faq', label: 'FAQ' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => setDark(document.documentElement.classList.contains('dark')), [])

  function toggleTheme() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    window.localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight" aria-label="EroPilot home">
          <span className="flex size-9 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary"><Play className="size-4 fill-current" aria-hidden="true" /></span>
          <span>EroPilot <span className="font-normal text-muted-foreground">/ Gallery co-pilot</span></span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {links.map((link) => <Link key={link.href} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{link.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label={dark ? 'Use light theme' : 'Use dark theme'}>
            {dark ? <Sun aria-hidden="true" className="size-5" /> : <Moon aria-hidden="true" className="size-5" />}
          </button>
          {pathname === '/privacy' ? (
            <Link href="/" className="hidden min-h-11 items-center rounded-full border border-border px-5 text-sm font-semibold sm:flex">Back to home</Link>
          ) : (
            <Link href={STORE_URL} target="_blank" rel="noopener noreferrer" className="hidden min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 sm:flex">Add to Chrome <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
          )}
          <button onClick={() => setOpen(!open)} className="flex size-11 items-center justify-center rounded-full border border-border md:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label="Toggle navigation">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      <MobileNav open={open}>
        <nav id="mobile-nav" className="flex flex-col gap-1 border-t border-border bg-background px-5 py-4" aria-label="Mobile navigation">
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium hover:bg-muted">{link.label}</Link>)}
          <Link href={STORE_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="mt-2 flex min-h-11 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground">Add to Chrome</Link>
        </nav>
      </MobileNav>
    </header>
  )
}
