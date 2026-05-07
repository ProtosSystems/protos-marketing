import { ArcheOrbitVisual } from '@/components/arche-orbit-visual'
import { HeroVersionedTimelineCard } from '@/components/hero-versioned-timeline-card'
import { WhyArcheExistsDiagram } from '@/components/why-arche-exists-diagram'

const WHY_ARCHE_EXISTS_VISUAL_SLUGS = new Set([
  'how-arche-handles-financial-restatements',
])

const QUESTION_VISUAL_SLUGS = new Set([
  'point-in-time-financial-data-the-missing-contract-in-financial-apis',
])

const TIMELINE_VISUAL_SLUGS = new Set([
  'why-deterministic-financial-data-matters',
])

export function usesWhyArcheExistsVisual(slug: string) {
  return WHY_ARCHE_EXISTS_VISUAL_SLUGS.has(slug)
}

export function usesTimelineVisual(slug: string) {
  return TIMELINE_VISUAL_SLUGS.has(slug)
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

  if (QUESTION_VISUAL_SLUGS.has(slug)) {
    return (
      <img
        alt="What was knowable at a specific point in time?"
        src="/blog/point-in-time-question.svg"
        className="h-full w-full object-cover"
      />
    )
  }

  if (TIMELINE_VISUAL_SLUGS.has(slug)) {
    return (
      <div className="flex h-full w-full items-stretch">
        <HeroVersionedTimelineCard
          className={[
            'w-full',
            compact ? 'scale-[0.9]' : 'h-full',
          ].join(' ')}
        />
      </div>
    )
  }

  return <ArcheOrbitVisual />
}
