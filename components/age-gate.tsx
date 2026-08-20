'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'gp-age-verified'
const UNDERAGE_REDIRECT = 'https://www.google.com'
const EASE = [0.16, 1, 0.3, 1] as const

type GateState = 'checking' | 'open' | 'verified'

export function AgeGate() {
  const reduceMotion = useReducedMotion()
  const [state, setState] = useState<GateState>('checking')
  const dialogRef = useRef<HTMLDivElement>(null)
  const confirmRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let verified = false
    try {
      verified = window.localStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      verified = false
    }
    setState(verified ? 'verified' : 'open')
  }, [])

  useEffect(() => {
    if (state !== 'open') return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    confirmRef.current?.focus({ preventScroll: true })
    return () => {
      document.body.style.overflow = previous
    }
  }, [state])

  const trapFocus = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !dialogRef.current) return
    const focusables = dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]')
    if (focusables.length === 0) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }, [])

  const verify = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // storage unavailable — session-only verification
    }
    setState('verified')
  }

  const deny = () => {
    window.location.href = UNDERAGE_REDIRECT
  }

  return (
    <AnimatePresence>
      {state === 'open' && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-background/85 px-5 backdrop-blur-md"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="age-gate-title"
            aria-describedby="age-gate-description"
            onKeyDown={trapFocus}
            className="relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-border bg-card p-8 shadow-2xl shadow-black/50 sm:p-10"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98, transition: { duration: 0.25, ease: EASE } }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Adults only</p>
            <h2 id="age-gate-title" className="mt-4 text-2xl font-semibold tracking-tight">
              Are you 18 or older?
            </h2>
            <p id="age-gate-description" className="mt-3 text-sm leading-relaxed text-muted-foreground">
              GalleryPilot is intended for adults and features partner content of an explicit nature.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <button
                ref={confirmRef}
                type="button"
                onClick={verify}
                className="min-h-12 rounded-full bg-primary px-6 font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
              >
                Yes, I&rsquo;m 18 or older
              </button>
              <button
                type="button"
                onClick={deny}
                className="min-h-12 rounded-full border border-border px-6 font-semibold text-muted-foreground transition-colors duration-300 hover:border-primary/50 hover:text-foreground"
              >
                No, I&rsquo;m under 18
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
