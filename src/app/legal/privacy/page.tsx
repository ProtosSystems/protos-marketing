import { LegalPageShell, buildLegalMetadata } from '../legal-page-shell'

export const metadata = buildLegalMetadata(
  'Privacy Policy',
  'How Protos Systems collects and processes personal information.',
  '/legal/privacy',
)

export default function PrivacyPage() {
  return (
    <LegalPageShell title="Privacy Policy">
      <p>
        This Privacy Policy describes how Protos Systems collects and processes
        personal information when you access our website, developer portal, and
        related services.
      </p>

      <section className="space-y-3 pt-2">
        <h2 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
          Information We Collect
        </h2>
        <ul className="list-disc space-y-2 pl-5 marker:text-gray-400">
          <li>Account information such as name, email, and organization</li>
          <li>Authentication identifiers associated with your account</li>
          <li>API usage and request metadata</li>
          <li>Technical information such as IP address and device details</li>
        </ul>
      </section>

      <section className="space-y-3 pt-2">
        <h2 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
          How We Use Information
        </h2>
        <p>Information is used to:</p>
        <ul className="list-disc space-y-2 pl-5 marker:text-gray-400">
          <li>Provide and operate the Services</li>
          <li>Authenticate users and manage accounts</li>
          <li>Monitor usage and prevent abuse</li>
          <li>Improve service reliability and performance</li>
        </ul>
      </section>

      <section className="space-y-3 pt-2">
        <h2 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
          Data Retention
        </h2>
        <p>
          Personal information is retained only as long as necessary to operate
          the Services and comply with legal obligations.
        </p>
      </section>

      <section className="space-y-3 pt-2">
        <h2 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
          Contact
        </h2>
        <p>
          Privacy inquiries may be directed to{' '}
          <a
            className="font-semibold text-gray-900 dark:text-white"
            href="mailto:privacy@protos.fi"
          >
            privacy@protos.fi
          </a>
          .
        </p>
      </section>
    </LegalPageShell>
  )
}
