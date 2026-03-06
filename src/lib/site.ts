const FALLBACK_SITE_URL = 'http://localhost:3000'

function parseSiteUrl(value?: string): string {
  const raw = value?.trim()

  if (!raw) {
    return FALLBACK_SITE_URL
  }

  try {
    return new URL(raw).origin
  } catch {
    return FALLBACK_SITE_URL
  }
}

export const SITE_NAME = 'Protos Systems'
export const SITE_TAGLINE = 'Financial Data Infrastructure for Temporal Truth'
export const SITE_DESCRIPTION =
  'Protos Systems builds financial data infrastructure from first principles. Arche models financial statements as versioned, time-aware assertions that preserve restatements, provenance, and point-in-time truth.'
export const SITE_URL = parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)
export const SOCIAL_PROFILES = ['https://www.linkedin.com/company/protos-sys/']
