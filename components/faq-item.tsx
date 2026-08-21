'use client'

import { useState } from 'react'
import { siteTrack } from '@/lib/site-analytics'

interface FaqItemProps {
  question: string
  answer: string
  questionId: number
}

export function FaqItem({ question, answer, questionId }: FaqItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <details
      className="group border-b border-border py-6"
      open={open}
      onToggle={(e) => {
        const isOpen = (e.target as HTMLDetailsElement).open
        setOpen(isOpen)
        if (isOpen) siteTrack('faq_open', { question_id: questionId })
      }}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold transition-colors marker:hidden hover:text-primary">{question}<span className="text-primary transition-transform duration-300 group-open:rotate-45">+</span></summary>
      <p className="mt-4 max-w-2xl pr-8 leading-relaxed text-muted-foreground">{answer}</p>
    </details>
  )
}
