import { LegalPageShell, buildLegalMetadata } from '../legal-page-shell'

export const metadata = buildLegalMetadata(
  'Terms of Service',
  'Terms governing use of Protos Systems services and APIs.',
)

export default function TermsPage() {
  return (
    <LegalPageShell title="Terms of Service">
      <p>
        These Terms govern access to the Protos Systems platform, APIs,
        documentation, and related services (&quot;Services&quot;). By using the
        Services, you agree to these Terms.
      </p>

      <section className="space-y-3 pt-2">
        <h2 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
          Use of the Services
        </h2>
        <p>
          Protos Systems provides programmatic access to structured financial
          data derived from publicly available regulatory filings. Access is
          provided through authenticated API credentials issued through the
          developer portal.
        </p>
      </section>

      <section className="space-y-3 pt-2">
        <h2 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
          Account Responsibility
        </h2>
        <p>
          You are responsible for safeguarding API keys and credentials
          associated with your account and for all activity conducted under
          those credentials.
        </p>
      </section>

      <section className="space-y-3 pt-2">
        <h2 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
          Acceptable Use
        </h2>
        <p>You may not:</p>
        <ul className="list-disc space-y-2 pl-5 marker:text-gray-400">
          <li>Circumvent usage limits or rate limits</li>
          <li>Interfere with the operation of the Services</li>
          <li>Redistribute Protos datasets as a competing data service</li>
          <li>Use the Services in violation of applicable law</li>
        </ul>
      </section>

      <section className="space-y-3 pt-2">
        <h2 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
          Service Availability
        </h2>
        <p>
          The Services are provided on a commercially reasonable basis. Protos
          does not guarantee uninterrupted availability.
        </p>
      </section>

      <section className="space-y-3 pt-2">
        <h2 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
          Limitation of Liability
        </h2>
        <p>
          To the maximum extent permitted by law, Protos Systems shall not be
          liable for indirect or consequential damages arising from use of the
          Services.
        </p>
      </section>

      <section className="space-y-3 pt-2">
        <h2 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
          Changes
        </h2>
        <p>
          Protos may update these Terms periodically. Continued use of the
          Services constitutes acceptance of the updated Terms.
        </p>
      </section>
    </LegalPageShell>
  )
}
