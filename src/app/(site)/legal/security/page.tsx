import { LegalPageShell, buildLegalMetadata } from '../legal-page-shell'

export const metadata = buildLegalMetadata(
  'Security',
  'Security practices and responsible disclosure process for Protos Systems.',
  '/legal/security',
)

export default function SecurityPage() {
  return (
    <LegalPageShell title="Security">
      <p>
        Security and data integrity are core design principles of the Protos
        platform.
      </p>

      <section className="space-y-3 pt-2">
        <h2 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
          Security Practices
        </h2>
        <ul className="list-disc space-y-2 pl-5 marker:text-gray-400">
          <li>Encryption in transit and at rest</li>
          <li>Access-controlled infrastructure</li>
          <li>Continuous monitoring and observability</li>
          <li>Dependency and vulnerability scanning</li>
        </ul>
      </section>

      <section className="space-y-3 pt-2">
        <h2 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
          Responsible Disclosure
        </h2>
        <p>
          If you discover a security vulnerability affecting Protos Systems,
          please report it to{' '}
          <a
            className="font-semibold text-gray-900 dark:text-white"
            href="mailto:security@protos.fi"
          >
            security@protos.fi
          </a>
          .
        </p>
      </section>
    </LegalPageShell>
  )
}
