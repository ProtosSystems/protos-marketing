import { Container } from '@/components/container'
import { Link } from '@/components/link'
import { getTags } from '@/sanity/queries'
import type { Metadata } from 'next'

type TagRecord = {
  title: string | null
  slug: string | null
  count: number | null
}

export const metadata: Metadata = {
  title: 'Blog Tags',
  description: 'Browse posts by tag.',
}

export default async function BlogTagsPage() {
  const { data: tags } = await getTags()

  return (
    <main>
      <div className="relative border-b border-[color:var(--color-soft-gray)] bg-gray-100 dark:border-white/10 dark:bg-[color:var(--color-primary)]">
        <Container className="relative">
          <div className="py-16 sm:py-20 md:py-24">
            <h1 className="text-5xl/[0.95] font-medium tracking-tight text-[color:var(--color-primary)] dark:text-white sm:text-6xl/[0.9]">
              Tags
            </h1>
            <p className="mt-4 max-w-2xl text-base/7 text-gray-700 dark:text-[color:var(--color-soft-gray)]">
              Controlled tag taxonomy for engineering and data infrastructure
              topics.
            </p>
          </div>
        </Container>
      </div>

      <div className="bg-white dark:bg-[color:var(--color-primary)]">
        <Container className="py-12 sm:py-16">
          <div className="flex flex-wrap gap-3">
            {(tags as TagRecord[]).map((tag) => {
              if (!tag.slug || !tag.title) return null

              return (
                <Link
                  key={tag.slug}
                  href={`/blog/tags/${tag.slug}`}
                  className="inline-flex items-center rounded-full border border-[color:var(--color-soft-gray)] px-3 py-1.5 text-sm/6 font-medium text-[color:var(--color-primary)] dark:border-white/10 dark:text-white"
                >
                  #{tag.title} ({tag.count ?? 0})
                </Link>
              )
            })}
          </div>
        </Container>
      </div>
    </main>
  )
}
