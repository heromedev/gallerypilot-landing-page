'use client'

import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useMemo } from 'react'
import { Lock, Shield, FolderLock, Fingerprint, Share2 } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

const featureIcons = [Lock, Shield, FolderLock, Fingerprint, Share2]

function VaultDoor() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 })

  const handleRotation = useTransform(smoothProgress, [0.05, 0.55], [-45, 315])
  const doorTranslateX = useTransform(smoothProgress, [0.25, 0.85], [0, 320])
  const beamScale = useTransform(smoothProgress, [0.15, 0.65], [0, 1.6])
  const beamOpacity = useTransform(smoothProgress, [0.15, 0.5], [0, 0.9])
  const glowOpacity = useTransform(smoothProgress, [0.1, 0.5], [0.15, 0.65])

  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        cx: 250 + Math.cos((i * 2.39996) + i * 0.7) * (170 + (i % 5) * 22),
        cy: 250 + Math.sin((i * 2.39996) + i * 0.7) * (170 + (i % 5) * 22),
        r: 0.4 + (i % 4) * 0.35,
        delay: i * 0.18,
        duration: 3.5 + (i % 5) * 0.6,
      })),
    [],
  )

  const ticks = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => {
        const angle = (i * 6 * Math.PI) / 180
        const isMajor = i % 5 === 0
        const r1 = isMajor ? 202 : 208
        const r2 = 218
        return {
          x1: 250 + r1 * Math.cos(angle),
          y1: 250 + r1 * Math.sin(angle),
          x2: 250 + r2 * Math.cos(angle),
          y2: 250 + r2 * Math.sin(angle),
          isMajor,
        }
      }),
    [],
  )

  const bolts = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45 * Math.PI) / 180
        return { cx: 250 + 172 * Math.cos(angle), cy: 250 + 172 * Math.sin(angle) }
      }),
    [],
  )

  const idleAnimation = reduceMotion
    ? {}
    : {
        rotate: [0, 0, -3, 0, 3, 0, 0],
        transition: {
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      }

  return (
    <div ref={sectionRef} className="relative flex items-center justify-center">
      {/* Atmospheric glow */}
      <motion.div
        className="absolute inset-0 -inset-x-20 -inset-y-10"
        style={{
          opacity: glowOpacity,
          background:
            'radial-gradient(ellipse 50% 60% at 55% 50%, oklch(0.62 0.19 35 / 0.18), oklch(0.62 0.19 35 / 0.06) 45%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Light beam behind door */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2"
        style={{ scale: beamScale, opacity: beamOpacity }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle at center, oklch(0.72 0.16 55 / 0.25) 0%, oklch(0.62 0.19 35 / 0.08) 40%, transparent 65%)',
          }}
        />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <div
            key={deg}
            className="absolute left-1/2 top-1/2 h-0.5 origin-left -translate-y-1/2"
            style={{
              width: '260px',
              rotate: `${deg}deg`,
              background:
                'linear-gradient(90deg, oklch(0.72 0.16 55 / 0.2), transparent 85%)',
            }}
          />
        ))}
      </motion.div>

      {/* Floating particles */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 500 500"
        aria-hidden="true"
      >
        {particles.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill="oklch(0.72 0.14 45)"
            initial={{ opacity: 0, scale: 0 }}
            animate={
              reduceMotion
                ? { opacity: 0.3 }
                : {
                    opacity: [0, 0.55, 0],
                    scale: [0.3, 1.2, 0.3],
                    y: [0, -10, 0],
                  }
            }
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>

      {/* The vault door */}
      <motion.div
        className="relative"
        style={{ x: doorTranslateX }}
        animate={idleAnimation}
      >
        <motion.svg
          viewBox="0 0 500 500"
          className="w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[500px] md:h-[500px]"
          style={{ filter: 'drop-shadow(0 25px 60px oklch(0 0 0 / 0.45))' }}
        >
          <defs>
            <linearGradient id="vaultMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.32 0.02 280)" />
              <stop offset="30%" stopColor="oklch(0.26 0.025 280)" />
              <stop offset="50%" stopColor="oklch(0.22 0.02 280)" />
              <stop offset="70%" stopColor="oklch(0.28 0.025 280)" />
              <stop offset="100%" stopColor="oklch(0.20 0.02 280)" />
            </linearGradient>
            <linearGradient id="vaultInner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.18 0.02 280)" />
              <stop offset="50%" stopColor="oklch(0.14 0.015 280)" />
              <stop offset="100%" stopColor="oklch(0.16 0.02 280)" />
            </linearGradient>
            <linearGradient id="vaultShine" x1="0%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.45 0.01 280 / 0.4)" />
              <stop offset="100%" stopColor="oklch(0.45 0.01 280 / 0)" />
            </linearGradient>
            <radialGradient id="vaultGlow">
              <stop offset="0%" stopColor="oklch(0.62 0.19 35 / 0.12)" />
              <stop offset="100%" stopColor="oklch(0.62 0.19 35 / 0)" />
            </radialGradient>
          </defs>

          {/* Ambient glow ring */}
          <motion.circle cx="250" cy="250" r="235" fill="none" stroke="oklch(0.62 0.19 35 / 0.08)" strokeWidth="1"
            animate={reduceMotion ? {} : { strokeOpacity: [0.04, 0.12, 0.04] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Outer door body */}
          <circle cx="250" cy="250" r="218" fill="url(#vaultMetallic)" />
          <circle cx="250" cy="250" r="218" fill="url(#vaultShine)" />

          {/* Precision tick marks */}
          {ticks.map((t, i) => (
            <line
              key={i}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke={t.isMajor ? 'oklch(0.55 0.02 280)' : 'oklch(0.38 0.015 280)'}
              strokeWidth={t.isMajor ? 2 : 0.8}
              strokeLinecap="round"
            />
          ))}

          {/* Inner decorative ring */}
          <circle cx="250" cy="250" r="185" fill="none" stroke="oklch(0.35 0.02 280)" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="172" fill="url(#vaultInner)" />

          {/* Locking bolts */}
          {bolts.map((b, i) => (
            <circle
              key={i}
              cx={b.cx}
              cy={b.cy}
              r="5.5"
              fill="oklch(0.35 0.015 280)"
              stroke="oklch(0.45 0.02 280)"
              strokeWidth="1"
            />
          ))}

          {/* Center faceplate */}
          <circle cx="250" cy="250" r="58" fill="url(#vaultMetallic)" stroke="oklch(0.35 0.02 280)" strokeWidth="1.5" />

          {/* Rotating handle assembly */}
          <motion.g style={{ rotate: handleRotation, transformOrigin: '250px 250px' }}>
            {/* Handle base */}
            <circle cx="250" cy="250" r="32" fill="oklch(0.18 0.015 280)" stroke="oklch(0.42 0.025 280)" strokeWidth="2" />

            {/* Handle arms */}
            <rect x="245" y="208" width="10" height="46" rx="5" fill="oklch(0.42 0.025 280)" />
            <rect x="245" y="246" width="10" height="46" rx="5" fill="oklch(0.42 0.025 280)" />
            <rect x="208" y="245" width="46" height="10" rx="5" fill="oklch(0.42 0.025 280)" />
            <rect x="246" y="245" width="46" height="10" rx="5" fill="oklch(0.42 0.025 280)" />

            {/* Handle knobs */}
            <circle cx="250" cy="208" r="6" fill="oklch(0.48 0.03 280)" />
            <circle cx="250" cy="292" r="6" fill="oklch(0.48 0.03 280)" />
            <circle cx="208" cy="250" r="6" fill="oklch(0.48 0.03 280)" />
            <circle cx="292" cy="250" r="6" fill="oklch(0.48 0.03 280)" />

            {/* Center cap */}
            <circle cx="250" cy="250" r="12" fill="oklch(0.38 0.025 280)" stroke="oklch(0.5 0.03 280)" strokeWidth="1.5" />
            <circle cx="250" cy="250" r="4" fill="oklch(0.58 0.04 280)" />
          </motion.g>

          {/* Highlight arc */}
          <path
            d="M 100 160 A 218 218 0 0 1 250 32"
            fill="none"
            stroke="oklch(0.6 0.01 280 / 0.12)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </motion.svg>
      </motion.div>
    </div>
  )
}

const vaultFeatureVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, delay: i * 0.1, ease: EASE },
  }),
}

export function VaultSection({
  label,
  heading,
  description,
  features,
}: {
  label: string
  heading: string
  description: string
  features: { title: string; copy: string }[]
}) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-background px-5 py-28 lg:px-8 lg:py-40">
      {/* Subtle noise texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]" aria-hidden="true"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left: copy + features */}
        <div>
          <motion.p
            className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary"
            initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {label}
          </motion.p>
          <motion.h2
            className="mt-5 max-w-lg text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl"
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          >
            {heading}
          </motion.h2>
          <motion.p
            className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground"
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          >
            {description}
          </motion.p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {features.map((feature, i) => {
              const Icon = featureIcons[i] ?? Lock
              return (
                <motion.div
                  key={feature.title}
                  className="group flex gap-4"
                  custom={i}
                  variants={vaultFeatureVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/[0.06] transition-colors duration-500 group-hover:border-primary/30 group-hover:bg-primary/[0.1]">
                    <Icon className="size-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{feature.copy}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Right: vault door */}
        <VaultDoor />
      </div>
    </section>
  )
}
