import { Container } from '@/components/container'
import type { Metadata } from 'next'

export function buildLegalMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
  }
}

export function LegalPageShell({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <main>
      <div className="relative border-b border-[color:var(--color-soft-gray)] bg-gray-100 dark:border-white/10 dark:bg-[color:var(--color-primary)]">
        <Container className="relative">
          <div className="py-16 sm:py-20 md:py-24">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-medium tracking-tight text-[color:var(--color-primary)] dark:text-white sm:text-6xl">
                {title}
              </h1>
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-white dark:bg-[color:var(--color-primary)]">
        <Container className="py-10 sm:py-14">
          <article className="max-w-3xl space-y-6 text-base/8 text-[color:var(--color-charcoal)] dark:text-[color:var(--color-soft-gray)]">
            {children}
          </article>
        </Container>
      </div>
    </main>
  )
}

