import Link from 'next/link'
import { XCircle } from 'lucide-react'

export default function CancelPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-5 text-center">
      <XCircle className="mb-6 size-16 text-muted-foreground" aria-hidden="true" />
      <h1 className="text-4xl font-semibold tracking-tight">Payment cancelled</h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
        No worries — your payment was not processed. You can try again whenever you are ready.
      </p>
      <Link
        href="/"
        className="mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
      >
        Back to EroPilot
      </Link>
    </div>
  )
}
