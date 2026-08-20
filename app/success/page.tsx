import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-5 text-center">
      <CheckCircle className="mb-6 size-16 text-green-500" aria-hidden="true" />
      <h1 className="text-4xl font-semibold tracking-tight">Payment successful</h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
        Thank you for upgrading to EroPilot Pro. Your license has been activated.
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
