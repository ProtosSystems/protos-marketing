import { SITE_URL } from '@/lib/site'
import { getPostsForFeed } from '@/sanity/queries'
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
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }))

  try {
    const posts = await getPostsForFeed()
    const postEntries: MetadataRoute.Sitemap = (posts.data ?? []).flatMap(
      (post) => {
        if (!post?.slug) return []

        return [
          {
            url: `${SITE_URL}/blog/${post.slug}`,
            lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
            changeFrequency: 'monthly',
            priority: 0.6,
          },
        ]
      },
    )

    return [...staticEntries, ...postEntries]
  } catch {
    // Fall back to static routes when CMS data isn't available.
    return staticEntries
  }
}
