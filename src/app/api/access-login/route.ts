import { NextResponse } from 'next/server'
import {
  AUTH_COOKIE_MAX_AGE_SECONDS,
  AUTH_COOKIE_NAME,
  buildAuthToken,
  sanitizeNextPath,
} from '@/lib/access-auth'

type LoginPayload = {
  username?: string
  password?: string
  next?: string
}

export async function POST(request: Request) {
  const configuredUsername = process.env.SITE_USERNAME?.trim()
  const configuredPassword = process.env.SITE_PASSWORD?.trim()

  if (!configuredUsername || !configuredPassword) {
    return NextResponse.json(
      { ok: false, error: 'Access gate is not configured.' },
      { status: 503 },
    )
  }

  let payload: LoginPayload
  try {
    payload = (await request.json()) as LoginPayload
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request payload.' },
      { status: 400 },
    )
  }

  const username = payload.username?.trim() ?? ''
  const password = payload.password ?? ''
  const redirectTo = sanitizeNextPath(payload.next ?? '/')

  if (username !== configuredUsername || password !== configuredPassword) {
    return NextResponse.json(
      { ok: false, error: 'Invalid username or password.' },
      { status: 401 },
    )
  }

  const token = await buildAuthToken(configuredUsername, configuredPassword)
  const response = NextResponse.json({ ok: true, redirectTo })

  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: AUTH_COOKIE_MAX_AGE_SECONDS,
  })

  return response
}
