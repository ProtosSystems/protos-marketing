import { LegalPageShell, buildLegalMetadata } from '../legal-page-shell'

export const metadata = buildLegalMetadata(
  'Financial Data Disclaimer',
  'Limitations and intended use of financial data provided by Protos Systems.',
)

export default function DataDisclaimerPage() {
  return (
    <LegalPageShell title="Financial Data Disclaimer">
      <p>
        Protos Systems provides structured financial data derived from publicly
        available regulatory filings and automated normalization processes.
      </p>
      <p>
        While Protos aims to provide deterministic and reproducible datasets,
        the Services are provided for informational and analytical purposes
        only.
      </p>
      <p>
        The Services do <strong>not</strong> constitute investment advice,
        financial advisory services, accounting guidance, or legal advice.
      </p>
      <p>
        Users remain responsible for evaluating the accuracy and suitability of
        data for their intended use.
      </p>
    </LegalPageShell>
  )
}

