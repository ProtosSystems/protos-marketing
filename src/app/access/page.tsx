import { Suspense } from 'react'
import { Container } from '@/components/container'
import { AccessForm } from './access-form'

function AccessFallback() {
  return (
    <div className="rounded-3xl border border-[color:var(--color-soft-gray)] bg-white p-8 shadow-xl dark:border-white/10 dark:bg-[color:var(--color-protos-navy)]">
      <p className="text-sm/6 text-gray-700 dark:text-[color:var(--color-slate-300)]">
        Loading secure access...
      </p>
    </div>
  )
}

export default function AccessPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-gray-100 py-16 dark:bg-[color:var(--color-primary)] sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,58,100,0.12),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(203,213,225,0.12),transparent_60%)]"
      />
      <Container className="relative">
        <div className="mx-auto max-w-md">
          <Suspense fallback={<AccessFallback />}>
            <AccessForm />
          </Suspense>
        </div>
      </Container>
    </main>
  )
}
