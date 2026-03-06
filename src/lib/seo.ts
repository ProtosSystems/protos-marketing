import { SITE_NAME, SITE_TAGLINE } from '@/lib/site'
import type { Metadata } from 'next'

type PageMetadataInput = {
  path: string
  title?: string
  description: string
  image?: string
  type?: 'website' | 'article'
}

function normalizePath(path: string): string {
  if (!path) return '/'
  return path.startsWith('/') ? path : `/${path}`
}

export function buildPageMetadata({
  path,
  title,
  description,
  image = '/protos-og.png',
  type = 'website',
}: PageMetadataInput): Metadata {
  const canonical = normalizePath(path)
  const resolvedTitle = title ?? `${SITE_NAME} — ${SITE_TAGLINE}`

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type,
      siteName: SITE_NAME,
      title: resolvedTitle,
      description,
      url: canonical,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
      images: [image],
    },
  }
}
