import { Button } from '@/components/button'
import { BlogFallbackVisual } from '@/components/blog-fallback-visual'
import { Container } from '@/components/container'
import { Link } from '@/components/link'
import { Heading, Subheading } from '@/components/text'
import { SITE_NAME, SITE_URL } from '@/lib/site'
import { image } from '@/sanity/image'
import { getPost } from '@/sanity/queries'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import dayjs from 'dayjs'
import type { Metadata } from 'next'
import { PortableText } from 'next-sanity'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  let { data: post } = await getPost((await params).slug)

  if (!post) return {}

  const canonicalPath = `/blog/${post.slug}`
  const socialImage = post.mainImage
    ? image(post.mainImage).size(1200, 630).format('jpg').url()
    : `${SITE_URL}/protos-og.png`

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: 'article',
      siteName: SITE_NAME,
      title: post.title,
      description: post.excerpt,
      url: canonicalPath,
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      tags: Array.isArray(post.tags)
        ? post.tags
            .map((tag: { title?: string | null }) => tag?.title)
            .filter((title: string | null | undefined): title is string => typeof title === 'string')
        : undefined,
      images: [{ url: socialImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [socialImage],
    },
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  let { data: post } = await getPost((await params).slug)
  if (!post) notFound()
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: canonicalUrl,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: post.author?.name
      ? {
          '@type': 'Person',
          name: post.author.name,
        }
      : {
          '@type': 'Organization',
          name: SITE_NAME,
        },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/android-chrome-512x512.png`,
      },
    },
    image: post.mainImage
      ? image(post.mainImage).size(1200, 630).format('jpg').url()
      : `${SITE_URL}/protos-og.png`,
    mainEntityOfPage: canonicalUrl,
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <div className="relative border-b border-[color:var(--color-soft-gray)] bg-gray-100 dark:border-white/10 dark:bg-[color:var(--color-primary)]">
        <Container className="relative">
          <div className="py-16 sm:py-20 md:py-24">
            <Subheading>{dayjs(post.publishedAt).format('dddd, MMMM D, YYYY')}</Subheading>
            <Heading as="h1" className="mt-2 max-w-4xl">
              {post.title}
            </Heading>
          </div>
        </Container>
      </div>

      <div className="bg-white dark:bg-[color:var(--color-primary)]">
        <Container>
          <div className="grid grid-cols-1 gap-8 py-16 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
            <div className="flex flex-wrap items-center gap-8 max-lg:justify-between lg:flex-col lg:items-start">
              {post.author && (
                <div className="flex items-center gap-3">
                  {post.author.image && (
                    <img
                      alt=""
                      src={image(post.author.image).size(64, 64).url()}
                      className="aspect-square size-6 rounded-full object-cover"
                    />
                  )}
                  <div className="text-sm/5 text-gray-700">
                    {post.author.name}
                  </div>
                </div>
              )}
              {Array.isArray(post.categories) && (
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category: { title: string; slug: string }) => (
                    <Link
                      key={category.slug}
                      href={`/blog?category=${category.slug}`}
                      className="rounded-full border border-dotted border-gray-300 bg-gray-50 px-2 text-sm/6 font-medium text-gray-500"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              )}
              {Array.isArray(post.tags) && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: { title: string; slug: string }) => (
                    <Link
                      key={tag.slug}
                      href={`/blog/tags/${tag.slug}`}
                      className="rounded-full border border-dotted border-gray-300 bg-gray-50 px-2 text-sm/6 font-medium text-gray-500"
                    >
                      #{tag.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="text-gray-700">
              <div className="max-w-2xl xl:mx-auto">
                {post.mainImage && (
                  <img
                    alt={post.mainImage.alt || ''}
                    src={image(post.mainImage).size(2016, 1344).url()}
                    className="mb-10 aspect-3/2 w-full rounded-2xl object-cover shadow-xl"
                  />
                )}
                {!post.mainImage && (
                  <div className="mb-10 aspect-3/2 overflow-hidden rounded-2xl border border-[color:var(--color-soft-gray)] bg-gray-100 shadow-xl dark:border-white/10 dark:bg-[color:var(--color-primary)]">
                    <div className="flex h-full items-center justify-center">
                      <BlogFallbackVisual slug={post.slug} />
                    </div>
                  </div>
                )}
                {post.body && (
                  <PortableText
                    value={post.body}
                    components={{
                      block: {
                        normal: ({ children }) => (
                          <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                            {children}
                          </p>
                        ),
                        h2: ({ children }) => (
                          <h2 className="mt-12 mb-10 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="mt-12 mb-10 text-xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                            {children}
                          </h3>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="my-10 border-l-2 border-l-gray-300 pl-6 text-base/8 text-gray-950 first:mt-0 last:mb-0">
                            {children}
                          </blockquote>
                        ),
                      },
                      types: {
                        image: ({ value }) => (
                          <img
                            alt={value.alt || ''}
                            src={image(value).width(2000).url()}
                            className="w-full rounded-2xl"
                          />
                        ),
                        separator: ({ value }) => {
                          switch (value.style) {
                            case 'line':
                              return (
                                <hr className="my-8 border-t border-gray-200" />
                              )
                            case 'space':
                              return <div className="my-8" />
                            default:
                              return null
                          }
                        },
                      },
                      list: {
                        bullet: ({ children }) => (
                          <ul className="list-disc pl-4 text-base/8 marker:text-gray-400">
                            {children}
                          </ul>
                        ),
                        number: ({ children }) => (
                          <ol className="list-decimal pl-4 text-base/8 marker:text-gray-400">
                            {children}
                          </ol>
                        ),
                      },
                      listItem: {
                        bullet: ({ children }) => {
                          return (
                            <li className="my-2 pl-2 has-[br]:mb-8">
                              {children}
                            </li>
                          )
                        },
                        number: ({ children }) => {
                          return (
                            <li className="my-2 pl-2 has-[br]:mb-8">
                              {children}
                            </li>
                          )
                        },
                      },
                      marks: {
                        strong: ({ children }) => (
                          <strong className="font-semibold text-gray-950">
                            {children}
                          </strong>
                        ),
                        code: ({ children }) => (
                          <>
                            <span aria-hidden>`</span>
                            <code className="text-[15px]/8 font-semibold text-gray-950">
                              {children}
                            </code>
                            <span aria-hidden>`</span>
                          </>
                        ),
                        link: ({ value, children }) => {
                          return (
                            <Link
                              href={value.href}
                              className="font-medium text-gray-950 underline decoration-gray-400 underline-offset-4 data-hover:decoration-gray-600"
                            >
                              {children}
                            </Link>
                          )
                        },
                      },
                    }}
                  />
                )}
                <div className="mt-10">
                  <Button variant="outline" href="/blog">
                    <ChevronLeftIcon className="size-4" />
                    Back to blog
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </main>
  )
}
