export const AUTH_COOKIE_NAME = 'site_auth'
export const AUTH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7

function getConfiguredCredentials():
  | { username: string; password: string }
  | null {
  const username = process.env.SITE_USERNAME?.trim()
  const password = process.env.SITE_PASSWORD?.trim()

  if (!username || !password) return null
  return { username, password }
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export async function buildAuthToken(
  username: string,
  password: string,
): Promise<string> {
  return sha256Hex(`${username}:${password}`)
}

export async function getExpectedAuthToken(): Promise<string | null> {
  const credentials = getConfiguredCredentials()
  if (!credentials) return null
  return buildAuthToken(credentials.username, credentials.password)
}

export function credentialsConfigured(): boolean {
  return getConfiguredCredentials() !== null
}

export function isValidNextPath(nextValue: string | null): nextValue is string {
  if (!nextValue) return false
  if (!nextValue.startsWith('/')) return false
  if (nextValue.startsWith('//')) return false
  return true
}

export function sanitizeNextPath(nextValue: string | null): string {
  if (!isValidNextPath(nextValue)) return '/'
  return nextValue
}
