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

// Horizontal topo lines: f(x,y) = y + wave(x)
// Isolines are y = C - wave(x) — mathematically impossible to cross, always horizontal
const TOPO_PATHS: string[] = (() => {
  const W = 1200, H = 520
  const LINES = 40
  const PTS = 120 // points per line

  // Wave function — contour lines of a data distribution surface (Gaussian peaks)
  const wave = (x: number) => {
    const g = (mu: number, sigma: number, amp: number) =>
      amp * Math.exp(-((x - mu) ** 2) / (2 * sigma ** 2))

    const peaks =
      g(150,  180, 190) +   // far-left cluster
      g(500,  200, 245) +   // left-centre dominant peak
      g(820,  130, 130) +   // smaller saddle peak
      g(1050, 210, 200) +   // right cluster
      g(350,  110,  95)     // secondary left shoulder

    const texture =
      6 * Math.sin(x * 0.0412 + 0.9) +
      3 * Math.sin(x * 0.0763 + 2.1)

    return peaks + texture
  }

  // Measure wave extremes to set level range
  let wMin = Infinity, wMax = -Infinity
  for (let i = 0; i <= 300; i++) {
    const v = wave((i / 300) * W)
    if (v < wMin) wMin = v
    if (v > wMax) wMax = v
  }

  // Lines span from just above the top to just below the bottom
  const lo = 0  + wMin
  const hi = H + wMax

  return Array.from({ length: LINES }, (_, l) => {
    const C = lo + (l / (LINES - 1)) * (hi - lo)
    const pts = Array.from({ length: PTS + 1 }, (_, j) => {
      const x = (j / PTS) * W
      const y = C - wave(x)
      return [x, y] as [number, number]
    })
    // Catmull-Rom → cubic bezier
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)]
      const p1 = pts[i]
      const p2 = pts[i + 1]
      const p3 = pts[Math.min(pts.length - 1, i + 2)]
      const cp1x = p1[0] + (p2[0] - p0[0]) / 6
      const cp1y = p1[1] + (p2[1] - p0[1]) / 6
      const cp2x = p2[0] - (p3[0] - p1[0]) / 6
      const cp2y = p2[1] - (p3[1] - p1[1]) / 6
      d += `C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
    }
    return d
  })
})()

function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-[color:var(--color-primary)] border-b border-white/10">
      {/* Topographic contour lines */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        viewBox="0 0 1200 500"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(255,255,255,1) 15%, rgba(255,255,255,1) 85%, rgba(255,255,255,0) 100%)',
          WebkitMaskComposite: 'destination-in',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(255,255,255,1) 15%, rgba(255,255,255,1) 85%, rgba(255,255,255,0) 100%)',
          maskComposite: 'intersect',
          opacity: 0.22,
        }}
      >
        <path d={TOPO_PATHS.join(' ')} stroke="white" strokeWidth="0.7" fill="none" />
      </svg>
      {/* Bottom fade for grid pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[color:var(--color-primary)] to-transparent"
      />
      {/* Centered glow bloom — pulsing */}
      <style>{`
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.08; transform: scale(1); }
          50% { opacity: 0.16; transform: scale(1.15); }
        }
        .hero-glow { animation: glow-pulse 4s ease-in-out infinite; }
      `}</style>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 flex items-center justify-center transform-gpu"
      >
        <div className="hero-glow h-96 w-96 rounded-full bg-white blur-3xl" />
      </div>
      <Container className="relative">
        <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-32">
          <div className="mb-6">
            <Link
              href="/blog/introducing-arche-deterministic-edgar-intelligence-for-developers"
              className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-0.5 text-sm/6 font-normal text-white hover:bg-white/25"
            >
              Introducing Arche
              <ChevronRightIcon className="size-4" />
            </Link>
          </div>
          <h1 className="font-display text-4xl/[1.05] font-normal tracking-tight text-balance text-white sm:text-6xl/[1.0] md:text-7xl/[1.0]">
            <span className="block pb-1">Financial data infrastructure,</span>
            <span className="block">built from first principles.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl/7 font-normal text-white/70 sm:text-2xl/8">
            Protos Systems builds the core infrastructure behind Arche, which
            models financial statements as versioned, auditable assertions
            instead of mutable records.
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button variant="secondary" href="https://arche.fi/request-access" className="!bg-white !text-[color:var(--color-primary)] hover:!bg-white/90">
              Request Arche access
            </Button>
            <Link
              href="https://docs.arche.fi"
              className="inline-flex items-center text-base font-normal text-white hover:text-white/80"
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
              <h2 className="font-mono text-xs/5 font-normal tracking-widest uppercase text-gray-700 dark:text-[color:var(--color-soft-gray)]">
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
          <h2 className="font-mono text-xs/5 font-normal tracking-widest uppercase text-gray-700 dark:text-[color:var(--color-soft-gray)]">
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
