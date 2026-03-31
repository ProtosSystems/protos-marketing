import { Button } from '@/components/button'
import { ArcheOrbitVisual } from '@/components/arche-orbit-visual'
import { Container } from '@/components/container'
import { Link } from '@/components/link'
import {
  ChevronRightIcon,
  ArrowPathIcon,
  ClockIcon,
  CubeTransparentIcon,
  DocumentCheckIcon,
  LinkIcon,
  Squares2X2Icon,
} from '@heroicons/react/20/solid'
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  path: '/',
  description:
    'Protos Systems builds financial data infrastructure from first principles.',
})

const features = [
  {
    name: 'Point-in-time correctness.',
    description:
      'Query financial data exactly as it was known at any moment. No look-ahead bias, no retroactive overwrites, no silent drift.',
    icon: ClockIcon,
  },
  {
    name: 'Explicit provenance.',
    description:
      'Every number is traceable to a specific filing, version, and effective date. Auditable by design, not bolted on later.',
    icon: DocumentCheckIcon,
  },
  {
    name: 'Versioned financial primitives.',
    description:
      'Statements, metrics, and classifications are modeled as evolving assertions, preserving revisions and restatements without breaking downstream systems.',
    icon: Squares2X2Icon,
  },
]

const foundationFeatures = [
  {
    name: 'Assertions, not rows.',
    description:
      'Financial statements are modeled as explicit assertions rather than mutable records. Values exist because they were stated, not because they overwrote history.',
    icon: CubeTransparentIcon,
  },
  {
    name: 'Time-aware by design.',
    description:
      'Every assertion is bound to effective and knowledge dates, enabling precise as-of queries without look-ahead bias.',
    icon: ClockIcon,
  },
  {
    name: 'Revisions preserved.',
    description:
      'Amendments and restatements are captured as first-class versions, allowing true before-and-after comparison.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Provenance built in.',
    description:
      'Each number remains traceable to a specific filing, version, and source, making reconciliation and auditability inherent.',
    icon: DocumentCheckIcon,
  },
  {
    name: 'Canonical primitives.',
    description:
      'Statements, metrics, and classifications are expressed as stable primitives that downstream systems can depend on.',
    icon: Squares2X2Icon,
  },
  {
    name: 'Composable by default.',
    description:
      'The model is designed to integrate cleanly into analytics, research, and production systems without downstream hacks.',
    icon: LinkIcon,
  },
]

function Hero() {
  return (
    <div className="relative border-b border-[color:var(--color-soft-gray)] bg-gray-100 dark:border-white/10 dark:bg-[color:var(--color-primary)]">
      <Container className="relative">
        <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-32">
          <div className="mb-6">
            <Link
              href="/blog/introducing-arche-deterministic-edgar-intelligence-for-developers"
              className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-3 py-0.5 text-sm/6 font-normal text-[color:var(--color-charcoal)] data-hover:bg-gray-300 dark:bg-white/10 dark:text-white dark:data-hover:bg-white/15"
            >
              Introducing Arche
              <ChevronRightIcon className="size-4" />
            </Link>
          </div>
          <h1 className="font-display text-4xl/[0.9] font-normal tracking-tight text-balance text-[color:var(--color-primary)] dark:text-white sm:text-6xl/[0.8] md:text-7xl/[0.8]">
            <span className="block pb-1">Financial data infrastructure,</span>
            <span className="block">built from first principles.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl/7 font-normal text-gray-950/75 sm:text-2xl/8 dark:text-white/70">
            Protos Systems builds the core infrastructure behind Arche, which
            models financial statements as versioned, auditable assertions
            instead of mutable records.
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button href="https://arche.fi/request-access">
              Request Arche access
            </Button>
            <Link
              href="https://docs.arche.fi"
              className="inline-flex items-center text-base font-normal text-[color:var(--color-primary)] data-hover:text-[color:var(--color-deep-steel-blue)] dark:text-white dark:data-hover:text-[color:var(--color-slate-100)]"
            >
              Explore Arche →
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

function WorkflowSection() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32 dark:bg-[color:var(--color-primary)]">
      <Container>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-[color:var(--color-deep-steel-blue)] dark:text-[color:var(--color-slate-100)]">
                Introducing Arche
              </h2>
              <p className="mt-2 text-4xl font-normal tracking-tight text-pretty text-[color:var(--color-primary)] sm:text-5xl dark:text-white">
                Financial statements, modeled correctly
              </p>
              <p className="mt-6 text-lg/8 text-[color:var(--color-charcoal)] dark:text-[color:var(--color-soft-gray)]">
                Arche is Protos Systems’ canonical financial data platform. It
                models financial statements as versioned, time-aware assertions
                to preserve restatements, revisions and provenance instead of
                overwriting history. The result is point-in-time accurate
                financial data you can trust in research, analytics and
                production systems.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none dark:text-[color:var(--color-soft-gray)]">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-[color:var(--color-primary)] dark:text-white">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute top-1 left-1 size-5 text-[color:var(--color-slate-blue)] dark:text-[color:var(--color-soft-gray)]"
                      />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <ArcheOrbitVisual />
        </div>
      </Container>
    </div>
  )
}

function FoundationSection() {
  return (
    <div className="bg-white pt-0 pb-24 sm:pb-32 dark:bg-[color:var(--color-primary)]">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-base/7 font-semibold text-[color:var(--color-deep-steel-blue)] dark:text-[color:var(--color-slate-100)]">
            Foundation, not feeds
          </h2>
          <p className="mt-2 text-4xl font-normal tracking-tight text-pretty text-[color:var(--color-primary)] sm:text-5xl dark:text-white">
            A foundation layer, not another dataset.
          </p>
          <p className="mt-6 text-lg/8 text-[color:var(--color-charcoal)] dark:text-[color:var(--color-soft-gray)]">
            Protos Systems provides infrastructure primitives for financial data,
            the way databases provide primitives for applications. Instead of
            mutable rows, Arche models financial truth as structured, time-aware
            assertions, making downstream analytics correct by construction, not
            by convention.
          </p>
        </div>
        <dl className="mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base/7 text-[color:var(--color-charcoal)] sm:grid-cols-2 lg:max-w-none lg:grid-cols-3 lg:gap-x-16 dark:text-[color:var(--color-soft-gray)]">
          {foundationFeatures.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-[color:var(--color-primary)] dark:text-white">
                <feature.icon
                  aria-hidden="true"
                  className="absolute top-1 left-1 size-5 text-[color:var(--color-slate-blue)] dark:text-[color:var(--color-soft-gray)]"
                />
                {feature.name}
              </dt>{' '}
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  )
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <main>
        <WorkflowSection />
        <FoundationSection />
      </main>
    </div>
  )
}
