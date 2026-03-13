import { Button } from '@/components/button'
import {
  BlogFallbackVisual,
  usesWhyArcheExistsVisual,
} from '@/components/blog-fallback-visual'
import { Container } from '@/components/container'
import { Link } from '@/components/link'
import { image } from '@/sanity/image'
import {
  getCategories,
  getPosts,
  getPostsCount,
} from '@/sanity/queries'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  RssIcon,
} from '@heroicons/react/16/solid'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  path: '/blog',
  title: 'Blog',
  description:
    'Product updates, technical notes, and company announcements from Protos Systems.',
})

const postsPerPage = 5

type SanityImageRef = {
  asset?: {
    _ref?: string
  }
  alt?: string
}

async function Categories({ selected }: { selected?: string }) {
  let { data: categories } = await getCategories()

  if (categories.length === 0) {
    return
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Menu>
        <MenuButton className="flex items-center justify-between gap-2 font-medium">
          {categories.find(({ slug }) => slug === selected)?.title ||
            'All categories'}
          <ChevronUpDownIcon className="size-4 fill-gray-900" />
        </MenuButton>
        <MenuItems
          anchor="bottom start"
          className="min-w-40 rounded-lg bg-white p-1 shadow-lg ring-1 ring-gray-200 [--anchor-gap:6px] [--anchor-offset:-4px] [--anchor-padding:10px]"
        >
          <MenuItem>
            <Link
              href="/blog"
              data-selected={selected === undefined ? true : undefined}
              className="group grid grid-cols-[1rem_1fr] items-center gap-2 rounded-md px-2 py-1 data-focus:bg-gray-950/5"
            >
              <CheckIcon className="hidden size-4 group-data-selected:block" />
              <p className="col-start-2 text-sm/6">All categories</p>
            </Link>
          </MenuItem>
          {categories.map((category) => {
            if (!category.slug || !category.title) return null

            return (
              <MenuItem key={category.slug}>
                <Link
                  href={`/blog?category=${category.slug}`}
                  data-selected={category.slug === selected ? true : undefined}
                  className="group grid grid-cols-[16px_1fr] items-center gap-2 rounded-md px-2 py-1 data-focus:bg-gray-950/5"
                >
                  <CheckIcon className="hidden size-4 group-data-selected:block" />
                  <p className="col-start-2 text-sm/6">{category.title}</p>
                </Link>
              </MenuItem>
            )
          })}
        </MenuItems>
      </Menu>
      <div className="flex items-center gap-2">
        <Button variant="outline" href="/blog/tags">
          Tags
        </Button>
        <Button variant="outline" href="/blog/feed.xml" className="gap-1">
          <RssIcon className="size-4" />
          RSS Feed
        </Button>
      </div>
    </div>
  )
}

async function Posts({ page, category }: { page: number; category?: string }) {
  let { data: posts } = await getPosts(
    (page - 1) * postsPerPage,
    page * postsPerPage,
    category,
  )

  if (posts.length === 0 && (page > 1 || category)) {
    notFound()
  }

  if (posts.length === 0) {
    return <p className="mt-6 text-gray-700">No posts found.</p>
  }

  return (
    <div className="mt-6">
      {posts.map((post: {
        title: string
        slug: string
        publishedAt: string
        mainImage?: SanityImageRef
        excerpt: string
        author?: { name?: string; image?: SanityImageRef | null }
        categories?: { title: string; slug: string }[]
      }) => (
        <article
          key={post.slug}
          className="grid grid-cols-1 border-b border-b-gray-200 py-10 max-sm:gap-3 sm:grid-cols-3"
        >
          <div>
            <p className="text-sm/5 font-medium text-gray-900 dark:text-white">
              {dayjs(post.publishedAt).format('dddd, MMMM D, YYYY')}
            </p>
            {post.author && (
              <div className="mt-2.5 flex items-center gap-3">
                {post.author.image && (
                  <img
                    alt=""
                    src={image(post.author.image).width(64).height(64).url()}
                    className="aspect-square size-6 rounded-full object-cover"
                  />
                )}
                <p className="text-sm/5 text-gray-900 dark:text-[color:var(--color-soft-gray)]">
                  {post.author.name}
                </p>
              </div>
            )}
          </div>
          <div className="sm:col-span-2 sm:max-w-2xl">
            <h2 className="text-2xl/8 font-semibold tracking-tight text-gray-950 dark:text-white">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="mt-3 text-sm/6 text-gray-900 dark:text-[color:var(--color-soft-gray)]">
              {post.excerpt}
            </p>
            {post.categories?.[0] && (
              <p className="mt-2 text-sm/6 text-gray-900 dark:text-[color:var(--color-soft-gray)]">
                Category: {post.categories[0].title}
              </p>
            )}
            <div className="mt-5 overflow-hidden rounded-xl border border-[color:var(--color-soft-gray)] bg-gray-100 dark:border-white/10 dark:bg-[color:var(--color-primary)]">
              {post.mainImage ? (
                <img
                  alt={post.mainImage.alt || ''}
                  src={image(post.mainImage).size(960, 640).url()}
                  className={`${usesWhyArcheExistsVisual(post.slug) ? 'aspect-[20/7]' : 'aspect-3/2'} w-full object-cover`}
                />
              ) : (
                <div
                  className={`${usesWhyArcheExistsVisual(post.slug) ? 'aspect-[20/7]' : 'aspect-3/2'} w-full`}
                >
                  <div className="flex h-full items-center justify-center">
                    <BlogFallbackVisual slug={post.slug} compact />
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4">
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm/5 font-semibold text-gray-950 underline decoration-gray-400 underline-offset-4 hover:decoration-gray-700 dark:text-white dark:decoration-gray-500 dark:hover:decoration-gray-300"
              >
                Read more
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

async function Pagination({
  page,
  category,
}: {
  page: number
  category?: string
}) {
  function url(page: number) {
    let params = new URLSearchParams()

    if (category) params.set('category', category)
    if (page > 1) params.set('page', page.toString())

    return params.size !== 0 ? `/blog?${params.toString()}` : '/blog'
  }

  let totalPosts = (await getPostsCount(category)).data
  let hasPreviousPage = page - 1
  let previousPageUrl = hasPreviousPage ? url(page - 1) : undefined
  let hasNextPage = page * postsPerPage < totalPosts
  let nextPageUrl = hasNextPage ? url(page + 1) : undefined
  let pageCount = Math.ceil(totalPosts / postsPerPage)

  if (pageCount < 2) {
    return
  }

  return (
    <div className="mt-6 flex items-center justify-between gap-2">
      <Button
        variant="outline"
        href={previousPageUrl}
        disabled={!previousPageUrl}
      >
        <ChevronLeftIcon className="size-4" />
        Previous
      </Button>
      <div className="flex gap-2 max-sm:hidden">
        {Array.from({ length: pageCount }, (_, i) => (
          <Link
            key={i + 1}
            href={url(i + 1)}
            data-active={i + 1 === page ? true : undefined}
            className={clsx(
              'size-7 rounded-lg text-center text-sm/7 font-medium',
              'data-hover:bg-gray-100',
              'data-active:shadow-sm data-active:ring-1 data-active:ring-black/10',
              'data-active:data-hover:bg-gray-50',
            )}
          >
            {i + 1}
          </Link>
        ))}
      </div>
      <Button variant="outline" href={nextPageUrl} disabled={!nextPageUrl}>
        Next
        <ChevronRightIcon className="size-4" />
      </Button>
    </div>
  )
}

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  let params = await searchParams
  let page =
    'page' in params
      ? typeof params.page === 'string' && parseInt(params.page) > 1
        ? parseInt(params.page)
        : notFound()
      : 1

  let category =
    typeof params.category === 'string' ? params.category : undefined

  return (
    <main>
      <div className="relative border-b border-[color:var(--color-soft-gray)] bg-gray-100 dark:border-white/10 dark:bg-[color:var(--color-primary)]">
        <Container className="relative">
          <div className="pt-16 pb-24 sm:pt-24 sm:pb-28 md:pb-32">
            <p className="text-sm/6 font-medium tracking-widest text-[color:var(--color-deep-steel-blue)] uppercase dark:text-[color:var(--color-soft-gray)]">
              Blog
            </p>
            <h1 className="mt-4 max-w-4xl text-6xl/[0.92] font-medium tracking-tight text-[color:var(--color-primary)] dark:text-white sm:text-7xl/[0.88]">
              Latest from Protos Systems
            </h1>
            <p className="mt-6 max-w-3xl text-xl/8 text-[color:var(--color-charcoal)] dark:text-[color:var(--color-soft-gray)]">
              Product updates, technical notes, and announcements about Arche
              and deterministic financial data infrastructure.
            </p>
          </div>
        </Container>
      </div>

      <div className="bg-white dark:bg-[color:var(--color-primary)]">
        <Container className="py-16 pb-24">
          <Categories selected={category} />
          <Posts page={page} category={category} />
          <Pagination page={page} category={category} />
        </Container>
      </div>
    </main>
  )
}
