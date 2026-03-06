type TimelineNode = {
  label: string
  date: string
  active?: boolean
}

type DiffRow = {
  field: string
  from: string
  to: string
  note: string
}

type HeroVersionedTimelineCardProps = {
  company?: string
  statement?: string
  asOf?: string
  nodes?: TimelineNode[]
  diff?: DiffRow
  includeLocalPattern?: boolean
  className?: string
}

export function HeroVersionedTimelineCard({
  company = 'AAPL',
  statement = 'Income Statement',
  asOf = '2023-12-31',
  nodes = [
    { label: 'Filed', date: '2022-02-10' },
    { label: 'Amended', date: '2022-04-03', active: true },
    { label: 'Reclassified', date: '2023-01-15' },
  ],
  diff = {
    field: 'Revenue',
    from: '382.47B',
    to: '383.28B',
    note: '10-K/A',
  },
  includeLocalPattern = false,
  className,
}: HeroVersionedTimelineCardProps) {
  const activeIndex = Math.max(0, nodes.findIndex((n) => n.active))
  const safeActiveIndex = activeIndex === -1 ? 0 : activeIndex

  return (
    <div className={className}>
      <div className="relative">
        {includeLocalPattern ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl"
          >
            <svg
              className="absolute inset-0 h-full w-full opacity-60 [mask-image:linear-gradient(transparent,white_8rem)] dark:opacity-50"
              viewBox="0 0 800 400"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="hero-diagonal-feature-pattern"
                  patternUnits="userSpaceOnUse"
                  width="64"
                  height="64"
                >
                  {Array.from({ length: 17 }).map((_, i) => {
                    const x = -106 + i * 8
                    return (
                      <path
                        key={i}
                        d={`M${x} 110L${x + 128} -18`}
                        className="stroke-slate-200/70 dark:stroke-white/10"
                        strokeWidth="1"
                        fill="none"
                      />
                    )
                  })}
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hero-diagonal-feature-pattern)" />
            </svg>
          </div>
        ) : null}

        <div className="relative w-full rounded-3xl border border-slate-200/70 bg-white/85 p-4 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.45)] backdrop-blur md:p-5 dark:border-white/10 dark:bg-[#0F172A]/80 dark:shadow-[0_20px_60px_-35px_rgba(0,0,0,0.55)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-slate-900/5 dark:ring-white/10"
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#3A4F7A]/70 dark:bg-[#3A4F7A]" />
                <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-100">
                  {company} <span className="text-slate-400 dark:text-white/30">·</span>{' '}
                  <span className="text-slate-600 dark:text-slate-400">{statement}</span>
                </p>
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-300">
                Conceptual view of versioned statements (illustrative)
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 self-start rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-100">
              <span className="font-mono text-slate-600 dark:text-slate-400">as_of</span>
              <span className="text-slate-400 dark:text-white/30">=</span>
              <span className="font-mono font-semibold text-slate-800 dark:text-white">{asOf}</span>
            </div>
          </div>

          <div className="mt-6">
            <Timeline nodes={nodes} activeIndex={safeActiveIndex} />
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white/70 px-4 py-4 dark:border-white/10 dark:bg-white/5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{diff.field}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">
                  Change captured as a first-class event (not an overwrite)
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <ValuePill label="from" value={diff.from} />
                <ArrowMark />
                <ValuePill label="to" value={diff.to} emphasis />
                <span className="ml-0 inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 sm:ml-2 dark:border-white/10 dark:bg-white/5 dark:text-slate-100">
                  {diff.note}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-300">
            <MetaChip>Provenance attached</MetaChip>
            <MetaChip>Temporal truth explicit</MetaChip>
            <MetaChip>As-of queries supported</MetaChip>
          </div>
        </div>
      </div>
    </div>
  )
}

function Timeline({
  nodes,
  activeIndex,
}: {
  nodes: TimelineNode[]
  activeIndex: number
}) {
  const W = 720
  const H = 110
  const padX = 56
  const y = 36
  const n = Math.max(2, nodes.length)
  const step = (W - padX * 2) / (n - 1)
  const r = 7

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-4 dark:border-white/10 dark:bg-white/5 [--tl-accent:#0F172A] [--tl-ring:rgba(27,58,100,0.18)] [--tl-baseline:rgba(148,163,184,0.55)] [--tl-inactive-fill:rgba(241,245,249,1)] [--tl-inactive-stroke:rgba(148,163,184,0.55)] dark:[--tl-accent:#3A4F7A] dark:[--tl-ring:rgba(58,79,122,0.28)] dark:[--tl-baseline:rgba(255,255,255,0.18)] dark:[--tl-inactive-fill:rgba(255,255,255,0.06)] dark:[--tl-inactive-stroke:rgba(255,255,255,0.18)]">
      <svg
        className="h-[110px] w-full"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Version timeline showing filed, amended, and reclassified events."
      >
        <line
          x1={padX}
          y1={y}
          x2={W - padX}
          y2={y}
          stroke="var(--tl-baseline)"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {activeIndex > 0 ? (
          <line
            x1={padX}
            y1={y}
            x2={padX + step * activeIndex}
            y2={y}
            stroke="var(--tl-accent)"
            strokeOpacity={0.95}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        ) : null}

        {nodes.map((node, i) => {
          const cx = padX + step * i
          const isActive = i === activeIndex

          return (
            <g key={`${node.label}-${i}`}>
              <circle cx={cx} cy={y} r={r + 7} fill={isActive ? 'var(--tl-ring)' : 'transparent'} />
              <circle
                cx={cx}
                cy={y}
                r={r}
                stroke={isActive ? 'var(--tl-accent)' : 'var(--tl-inactive-stroke)'}
                strokeWidth={2}
                fill={isActive ? 'var(--tl-accent)' : 'var(--tl-inactive-fill)'}
              />
              <text
                x={cx}
                y={y + 30}
                textAnchor="middle"
                className="fill-slate-700 text-[11px] font-semibold dark:fill-slate-100"
              >
                {node.label}
              </text>
              <text
                x={cx}
                y={y + 47}
                textAnchor="middle"
                className="fill-slate-500 text-[10px] dark:fill-slate-300"
              >
                {node.date}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function ValuePill({
  label,
  value,
  emphasis = false,
}: {
  label: string
  value: string
  emphasis?: boolean
}) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs',
        emphasis
          ? 'border-[#3A4F7A]/30 bg-[#3A4F7A]/10 text-[#0F172A] dark:border-[#3A4F7A]/40 dark:bg-[#3A4F7A]/20 dark:text-slate-100'
          : 'border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-100',
      ].join(' ')}
    >
      <span className="font-mono text-[10px] text-slate-500 dark:text-slate-300">{label}</span>
      <span className="font-mono font-semibold">{value}</span>
    </span>
  )
}

function ArrowMark() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-slate-500 dark:text-slate-300"
      aria-hidden="true"
    >
      <path d="M3 9H14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M10.5 5.5L14 9L10.5 12.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function MetaChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-2.5 py-1 dark:border-white/10 dark:bg-white/5">
      {children}
    </span>
  )
}
