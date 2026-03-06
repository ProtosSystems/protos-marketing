import { Container } from '@/components/container'
import { Link } from '@/components/link'
import { buildPageMetadata } from '@/lib/seo'
import { getPostsByTag, getTags } from '@/sanity/queries'
import dayjs from 'dayjs'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type TagRecord = {
  title: string | null
  slug: string | null
  count: number | null
}

type TagPostRecord = {
  title: string | null
  slug: string | null
  publishedAt: string | null
  excerpt: string | null
  categories?: { title: string | null; slug: string | null }[] | null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const slug = (await params).slug
  return buildPageMetadata({
    path: `/blog/tags/${slug}`,
    title: `Tag: ${slug}`,
    description: `Posts tagged with ${slug}.`,
  })
}

export default async function BlogTagPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  const [{ data: tags }, { data: posts }] = await Promise.all([
    getTags(),
    getPostsByTag(slug),
  ])

  const selectedTag = (tags as TagRecord[]).find((tag) => tag.slug === slug)
  if (!selectedTag) notFound()

  return (
    <main>
      <div className="relative border-b border-[color:var(--color-soft-gray)] bg-gray-100 dark:border-white/10 dark:bg-[color:var(--color-primary)]">
        <Container className="relative">
          <div className="py-16 sm:py-20 md:py-24">
            <h1 className="text-5xl/[0.95] font-medium tracking-tight text-[color:var(--color-primary)] dark:text-white sm:text-6xl/[0.9]">
              #{selectedTag.title}
            </h1>
            <p className="mt-4 text-base/7 text-gray-700 dark:text-[color:var(--color-soft-gray)]">
              {selectedTag.count} {selectedTag.count === 1 ? 'post' : 'posts'}
            </p>
          </div>
        </Container>
      </div>

      <div className="bg-white dark:bg-[color:var(--color-primary)]">
        <Container className="py-12 sm:py-16">
          <div className="space-y-8">
            {(posts as TagPostRecord[]).map((post) => {
              if (!post.slug || !post.title || !post.publishedAt) return null

              return (
                <article
                  key={post.slug}
                  className="border-b border-[color:var(--color-soft-gray)] pb-8 dark:border-white/10"
                >
                  <p className="text-sm/5 text-gray-600 dark:text-[color:var(--color-soft-gray)]">
                    {dayjs(post.publishedAt).format('dddd, MMMM D, YYYY')}
                  </p>
                  <h2 className="mt-2 text-2xl/8 font-medium tracking-tight text-[color:var(--color-primary)] dark:text-white">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="mt-3 text-sm/6 text-gray-600 dark:text-[color:var(--color-soft-gray)]">
                    {post.excerpt}
                  </p>
                  {post.categories?.[0]?.title && (
                    <p className="mt-3 text-sm/6 text-gray-600 dark:text-[color:var(--color-soft-gray)]">
                      Category: {post.categories[0].title}
                    </p>
                  )}
                </article>
              )
            })}
          </div>
          <div className="mt-10">
            <Link
              href="/blog/tags"
              className="text-sm/6 font-medium text-[color:var(--color-primary)] dark:text-white"
            >
              Back to all tags
            </Link>
          </div>
        </Container>
      </div>
    </main>
  )
}
