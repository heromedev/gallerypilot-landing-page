export type Locale = 'en' | 'fr' | 'de' | 'es' | 'pt' | 'ja' | 'ko' | 'ru' | 'zh'

export type Dictionary = {
  meta: { title: string; description: string; ogDescription: string }
  skipToContent: string
  hero: {
    badge: string
    headline1: string
    headline2: string
    subtext: string
    ctaAdd: string
    ctaDemo: string
    disclaimer: string
    activeTab: string
    alt: string
  }
  marquee: string[]
  featuresSection: {
    label: string
    heading: string
    description: string
  }
  features: { title: string; copy: string }[]
  demoSection: {
    label: string
    heading: string
    description: string
    videoLabel: string
    videoFallback: string
  }
  howItWorks: {
    label: string
    heading: string
    steps: { number: string; title: string; copy: string }[]
  }
  pricingSection: {
    label: string
    heading: string
    description: string
    tiers: {
      name: string
      price: string
      frequency: string
      features: string[]
      cta: string
      badge?: string
    }[]
    disclaimer: string
  }
  vaultSection: {
    label: string
    heading: string
    description: string
    features: { title: string; copy: string }[]
  }
  faqSection: {
    label: string
    heading: string
    items: { q: string; a: string }[]
  }
  finalCta: { heading: string; cta: string }
  footer: {
    brand: string
    tagline: string
    chromeWebStore: string
    partners: string
    privacy: string
    contact: string
  }
  mobileCta: string
  privacy: {
    metaTitle: string
    metaDescription: string
    legalLabel: string
    heading: string
    intro: string
    effectiveDate: string
    sections: { title: string; content: string }[]
    backToEroPilot: string
    footerNote: string
  }
}
