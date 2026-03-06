import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'

export function GET() {
  const content = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    '## Canonical Links',
    `- Website: ${SITE_URL}`,
    `- Blog: ${SITE_URL}/blog`,
    '- Arche docs: https://docs.arche.fi',
    '- Arche access: https://arche.fi/request-access',
  ].join('\n')

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
