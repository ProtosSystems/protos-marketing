export function usesWhyArcheExistsVisual(slug: string) {
  return slug === 'how-arche-handles-financial-restatements'
}

function FallbackCard({
  title,
  subtitle,
  compact,
}: {
  title: string
  subtitle: string
  compact: boolean
}) {
  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center rounded-2xl border border-[color:var(--color-soft-gray)] bg-white p-4 dark:border-white/10 dark:bg-[color:var(--color-primary)]"
    >
      <div className={compact ? 'space-y-2 text-center' : 'space-y-3 text-center'}>
        <p className="text-2xl tracking-tight text-[color:var(--color-primary)] dark:text-white">
          protos systems
        </p>
        <p className={compact ? 'text-sm font-semibold text-gray-900 dark:text-white' : 'text-base font-semibold text-gray-900 dark:text-white'}>
          {title}
        </p>
        <p className={compact ? 'text-xs text-gray-800 dark:text-[color:var(--color-slate-300)]' : 'text-sm text-gray-800 dark:text-[color:var(--color-slate-300)]'}>
          {subtitle}
        </p>
      </div>
    </div>
  )
}

export function BlogFallbackVisual({
  slug,
  compact = false,
}: {
  slug: string
  compact?: boolean
}) {
  if (slug === 'how-arche-handles-financial-restatements') {
    return (
      <FallbackCard
        title="Financial Restatements"
        subtitle="Versioned statements with explicit provenance."
        compact={compact}
      />
    )
  }

  if (slug === 'why-deterministic-financial-data-matters') {
    return (
      <FallbackCard
        title="Deterministic Financial Data"
        subtitle="Point-in-time correctness for production systems."
        compact={compact}
      />
    )
  }

  return (
    <FallbackCard
      title="Arche Platform"
      subtitle="Structured financial intelligence from public filings."
      compact={compact}
    />
  )
}
