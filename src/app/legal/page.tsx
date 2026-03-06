import { Link } from '@/components/link'
import { LegalPageShell, buildLegalMetadata } from './legal-page-shell'

export const metadata = buildLegalMetadata(
  'Legal',
  'Legal policies for Protos Systems and Arche API access.',
  '/legal',
)

export default function LegalPage() {
  return (
    <LegalPageShell title="Legal">
      <p>
        Protos Systems provides developer infrastructure for deterministic
        financial data derived from public regulatory filings.
      </p>
      <p>
        The following policies govern access to and use of the Protos platform
        and Arche API.
      </p>

      <ul className="list-disc space-y-2 pl-5 marker:text-gray-400">
        <li>
          <Link href="/legal/terms" className="font-semibold text-gray-900 dark:text-white">
            Terms of Service
          </Link>{' '}
          - Conditions governing use of the platform and APIs
        </li>
        <li>
          <Link href="/legal/privacy" className="font-semibold text-gray-900 dark:text-white">
            Privacy Policy
          </Link>{' '}
          - How we collect and process personal information
        </li>
        <li>
          <Link
            href="/legal/data-disclaimer"
            className="font-semibold text-gray-900 dark:text-white"
          >
            Data Disclaimer
          </Link>{' '}
          - Limitations of financial data provided through the service
        </li>
        <li>
          <Link href="/legal/security" className="font-semibold text-gray-900 dark:text-white">
            Security
          </Link>{' '}
          - Security practices and vulnerability disclosure
        </li>
      </ul>

      <p>
        For legal inquiries contact{' '}
        <a className="font-semibold text-gray-900 dark:text-white" href="mailto:legal@protos.fi">
          legal@protos.fi
        </a>
        .
      </p>
    </LegalPageShell>
  )
}
