import { Container } from '@/components/container'
import { Link } from '@/components/link'
import {
  CircleStackIcon,
  ClockIcon,
  CodeBracketSquareIcon,
  NewspaperIcon,
  LinkIcon,
} from '@heroicons/react/20/solid'
import { buildPageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({
  path: '/about',
  title: 'About Protos Systems',
  description:
    'Financial data infrastructure for modern software built on deterministic datasets and point-in-time correctness.',
})

const engineeringPrinciples = [
  {
    title: 'deterministic datasets',
    body: 'Financial queries should produce reproducible results across environments and over time.',
    icon: CircleStackIcon,
  },
  {
    title: 'point-in-time correctness',
    body: 'Historical financial data must reflect what was known at the time.',
    icon: ClockIcon,
  },
  {
    title: 'transparent lineage',
    body: 'Restatements and revisions are preserved so downstream systems can trace the full history of financial statements.',
    icon: LinkIcon,
  },
  {
    title: 'developer-first infrastructure',
    body: 'Financial intelligence should integrate into software systems through reliable, well-structured APIs.',
    icon: CodeBracketSquareIcon,
  },
]

function Section({
  title,
  noBorderTop = false,
  children,
}: {
  title: string
  noBorderTop?: boolean
  children: React.ReactNode
}) {
  return (
    <section
      className={`py-12 sm:py-16 ${
        noBorderTop
          ? ''
          : 'border-t border-[color:var(--color-soft-gray)] dark:border-white/10'
      }`}
    >
      <h2 className="text-2xl font-medium tracking-tight text-[color:var(--color-primary)] dark:text-white sm:text-3xl">
        {title}
      </h2>
      <div className="mt-6 max-w-2xl space-y-6 text-base/7 text-gray-700 dark:text-[color:var(--color-soft-gray)]">
        {children}
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <main>
      <div className="relative border-b border-[color:var(--color-soft-gray)] bg-gray-100 dark:border-white/10 dark:bg-[color:var(--color-primary)]">
        <Container className="relative">
          <div className="py-16 sm:py-24 md:py-28">
            <div className="max-w-4xl">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full bg-gray-200 px-3 py-1 text-sm/6 font-normal text-[color:var(--color-charcoal)] data-hover:bg-gray-300 dark:bg-white/10 dark:text-white dark:data-hover:bg-white/15"
              >
                <NewspaperIcon className="size-4" />
                Keep up to date about Protos Systems
              </Link>
              <h1 className="mt-6 text-4xl font-medium tracking-tight text-[color:var(--color-primary)] dark:text-white sm:text-6xl">
                About Protos Systems
              </h1>
              <p className="mt-6 text-xl/8 text-[color:var(--color-charcoal)] dark:text-[color:var(--color-soft-gray)]">
                Financial data infrastructure for modern software.
              </p>
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-white dark:bg-[color:var(--color-primary)]">
        <Container className="py-8 sm:py-12">
        <div className="max-w-3xl">
        <Section
          title="Financial data infrastructure for modern software"
          noBorderTop
        >
          <p>
            Protos Systems builds infrastructure that transforms regulatory
            financial filings into deterministic datasets for software systems.
          </p>
          <p>
            Financial disclosures contain critical information used by
            investors, researchers, and financial platforms. Yet working
            directly with regulatory filings remains difficult for developers.
            Filings are revised, statements are restated, and historical values
            can change over time. These inconsistencies make it challenging to
            build reliable financial models, research systems, and analytics
            platforms.
          </p>
          <p>
            Protos Systems exists to make regulatory financial data reliable for
            software.
          </p>
          <p>
            Our systems convert raw filings into structured financial
            intelligence while preserving filing lineage, historical context,
            and point-in-time correctness. This allows developers to query
            financial data with the same reliability expected from modern data
            infrastructure.
          </p>
        </Section>

        <Section title="Arche API">
          <p>Arche API is the primary product developed by Protos Systems.</p>
          <p>
            Arche provides deterministic EDGAR intelligence through a
            developer-first API designed for quantitative research, financial
            applications, and data engineering workflows. By preserving
            restatement history and filing context, Arche enables reproducible
            financial queries and historical analysis without requiring teams to
            maintain their own ingestion and normalization pipelines.
          </p>
          <p>
            Developers can integrate structured financial statements, historical
            datasets, and regulatory intelligence directly into their systems.
          </p>
        </Section>

        <Section title="Engineering principles">
          <p>
            Protos Systems is built around a set of principles designed for
            reliable financial infrastructure.
          </p>
          <div className="grid gap-6 pt-2 sm:grid-cols-2">
            {engineeringPrinciples.map((principle) => (
              <article
                key={principle.title}
                className="rounded-xl border border-[color:var(--color-soft-gray)] p-5 dark:border-white/10"
              >
                <h3 className="flex items-center gap-2 text-sm font-semibold tracking-wide text-[color:var(--color-primary)] dark:text-white">
                  <principle.icon className="size-4" />
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm/6 text-gray-700 dark:text-[color:var(--color-soft-gray)]">
                  {principle.body}
                </p>
              </article>
            ))}
          </div>
        </Section>

        <Section title="Building the infrastructure layer for financial disclosures">
          <p>
            Protos Systems sits between regulatory disclosure systems and
            financial software.
          </p>
          <p>
            By transforming raw filings into structured datasets, Protos enables
            developers to build financial applications, research systems, and
            analytics platforms on top of reliable regulatory intelligence.
          </p>
        </Section>
        </div>
      </Container>
      </div>
    </main>
  )
}
