import { ArcheOrbitVisual } from '@/components/arche-orbit-visual'
import { HeroVersionedTimelineCard } from '@/components/hero-versioned-timeline-card'
import { WhyArcheExistsDiagram } from '@/components/why-arche-exists-diagram'

const WHY_ARCHE_EXISTS_VISUAL_SLUGS = new Set([
  'how-arche-handles-financial-restatements',
])

const TIMELINE_VISUAL_SLUGS = new Set(['why-deterministic-financial-data-matters'])

export function usesWhyArcheExistsVisual(slug: string) {
  return WHY_ARCHE_EXISTS_VISUAL_SLUGS.has(slug)
}

export function BlogFallbackVisual({
  slug,
  compact = false,
}: {
  slug: string
  compact?: boolean
}) {
  if (WHY_ARCHE_EXISTS_VISUAL_SLUGS.has(slug)) {
    return <WhyArcheExistsDiagram className="w-full" />
  }

  if (TIMELINE_VISUAL_SLUGS.has(slug)) {
    return (
      <div className={compact ? 'w-full scale-[0.84]' : 'w-full scale-[1.02]'}>
        <HeroVersionedTimelineCard />
      </div>
    )
  }

  return <ArcheOrbitVisual />
}
