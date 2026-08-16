'use client'

import { motion, useReducedMotion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function WordReveal({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion()
  const words = text.split(' ')
  if (reduceMotion) return <span className={className}>{text}</span>
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden="true">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.85, delay: delay + i * 0.06, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function HeroEnter({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24, filter: 'blur(8px)' }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function Parallax({ children, className = '', amount = 40 }: { children: React.ReactNode; className?: string; amount?: number }) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount])
  if (reduceMotion) return <div className={className}>{children}</div>
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

export function ScrollProgress() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28, restDelta: 0.001 })
  if (reduceMotion) return null
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-primary"
      style={{ scaleX }}
    />
  )
}

export function Stagger({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'show'}
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
        show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function MobileNav({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="overflow-hidden md:hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
