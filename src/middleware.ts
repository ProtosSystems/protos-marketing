import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  AUTH_COOKIE_NAME,
  getExpectedAuthToken,
  sanitizeNextPath,
} from '@/lib/access-auth'

const ALLOWED_PATHS = new Set(['/access', '/api/access-login'])

function isPublicFile(pathname: string): boolean {
  return /\.[a-zA-Z0-9]+$/.test(pathname)
}

function isUnprotectedPath(pathname: string): boolean {
  if (ALLOWED_PATHS.has(pathname)) return true
  if (pathname.startsWith('/_next/static')) return true
  if (pathname.startsWith('/_next/image')) return true
  if (isPublicFile(pathname)) return true
  return false
}

function getRequestPathWithQuery(request: NextRequest): string {
  const query = request.nextUrl.search
  return `${request.nextUrl.pathname}${query}`
}

export async function middleware(request: NextRequest) {
  const expectedToken = await getExpectedAuthToken()
  if (!expectedToken) {
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl
  if (isUnprotectedPath(pathname)) {
    return NextResponse.next()
  }

  const cookieToken = request.cookies.get(AUTH_COOKIE_NAME)?.value
  if (cookieToken === expectedToken) {
    return NextResponse.next()
  }

  const nextPath = sanitizeNextPath(getRequestPathWithQuery(request))
  const redirectUrl = new URL('/access', request.url)
  redirectUrl.searchParams.set('next', nextPath)
  return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|apple-touch-icon.png|android-chrome-192x192.png|android-chrome-512x512.png|favicon-16x16.png|favicon-32x32.png|site.webmanifest).*)',
  ],
}
