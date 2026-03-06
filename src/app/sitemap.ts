import { SITE_URL } from '@/lib/site'
import { getPostsForFeed, getTags } from '@/sanity/queries'
import type { MetadataRoute } from 'next'

const staticRoutes = [
  '/',
  '/about',
  '/blog',
  '/legal',
  '/legal/terms',
  '/legal/privacy',
  '/legal/data-disclaimer',
  '/legal/security',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }))

  try {
    const [posts, tags] = await Promise.all([getPostsForFeed(), getTags()])
    const postEntries: MetadataRoute.Sitemap = (posts.data ?? []).flatMap(
      (post) => {
        if (!post?.slug) return []

        return [
          {
            url: `${SITE_URL}/blog/${post.slug}`,
            lastModified: post.publishedAt ? new Date(post.publishedAt) : undefined,
            changeFrequency: 'monthly',
            priority: 0.6,
          },
        ]
      },
    )

    const tagEntries: MetadataRoute.Sitemap = (tags.data ?? []).flatMap(
      (tag: { slug?: string | null }) => {
      if (!tag?.slug) return []
      return [
        {
          url: `${SITE_URL}/blog/tags/${tag.slug}`,
          changeFrequency: 'weekly',
          priority: 0.5,
        },
      ]
      },
    )

    return [...staticEntries, ...postEntries, ...tagEntries]
  } catch {
    // Fall back to static routes when CMS data isn't available.
    return staticEntries
  }
}
