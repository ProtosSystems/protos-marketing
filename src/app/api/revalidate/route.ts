import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { timingSafeEqual } from 'node:crypto'

type RevalidateWebhookBody = {
  _type?: string
  slug?: string | null
  tags?: (string | null)[] | null
}

function isAuthorized(secret: string | undefined, provided: string | null) {
  if (!secret || !provided) return false

  const secretBuffer = Buffer.from(secret)
  const providedBuffer = Buffer.from(provided)

  if (secretBuffer.length !== providedBuffer.length) {
    return false
  }

  return timingSafeEqual(secretBuffer, providedBuffer)
}

function normalizeSlugs(values?: (string | null)[] | null) {
  return Array.from(
    new Set(
      (values ?? [])
        .map((value) => value?.trim())
        .filter((value): value is string => Boolean(value)),
    ),
  )
}

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  const providedSecret = new URL(request.url).searchParams.get('secret')

  if (!isAuthorized(secret, providedSecret)) {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 })
  }

  const body = (await request.json().catch(() => ({}))) as RevalidateWebhookBody
  const paths = new Set<string>([
    '/blog',
    '/blog/tags',
    '/blog/feed.xml',
    '/sitemap.xml',
  ])

  if (body._type === 'post' && body.slug) {
    paths.add(`/blog/${body.slug}`)
  }

  for (const tagSlug of normalizeSlugs(body.tags)) {
    paths.add(`/blog/tags/${tagSlug}`)
  }

  await revalidateTag('sanity:fetch-sync-tags')

  for (const path of paths) {
    revalidatePath(path)
  }

  return NextResponse.json({
    ok: true,
    revalidated: Array.from(paths).sort(),
    documentType: body._type ?? null,
    slug: body.slug ?? null,
  })
}
