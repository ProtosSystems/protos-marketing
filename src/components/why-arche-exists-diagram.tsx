type WhyArcheExistsDiagramProps = {
  className?: string
  ariaLabel?: string
}

export function WhyArcheExistsDiagram({
  className,
  ariaLabel = 'Diagram showing Sources flowing into a versioned ledger, then exposed via a contract-first API.',
}: WhyArcheExistsDiagramProps) {
  const diagramVars = {
    color: 'var(--color-primary)',
    '--surface': '#ffffff',
    '--surface-2': '#f8fafc',
    '--border': '#d1d5db',
    '--text': '#0f172a',
    '--text-muted': '#475569',
    '--color-accent': '#1b3a64',
  } as Record<string, string>

  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1200"
        height="420"
        viewBox="0 0 1200 420"
        role="img"
        aria-label={ariaLabel}
        className="h-auto w-full"
        style={diagramVars}
      >
        <defs>
          <style>
            {`
              .bg { fill: var(--surface); }
              .panel { fill: var(--surface-2); stroke: var(--border); stroke-width: 1.5; }
              .card { fill: var(--surface); stroke: var(--border); stroke-width: 1.25; }
              .ink { fill: var(--text); font-family: Switzer, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; }
              .muted { fill: var(--text-muted); font-family: Switzer, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; }
              .mono { font-family: Switzer, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
              .h { font-size: 16px; font-weight: 700; }
              .b { font-size: 13px; }
              .s { font-size: 12px; }
              .st { stroke: var(--border); stroke-width: 1.5; fill: none; }
              .flow { stroke: var(--color-accent); stroke-width: 2.5; fill: none; }
              .accent { fill: var(--color-accent); }
              .pill { fill: color-mix(in srgb, var(--color-accent) 14%, transparent); stroke: var(--border); stroke-width: 1; }
              .shadow { filter: drop-shadow(0 10px 18px rgba(0,0,0,0.08)); }
              html.dark .shadow { filter: drop-shadow(0 10px 18px rgba(0,0,0,0.25)); }
            `}
          </style>

          <marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
            <path d="M0,0 L12,6 L0,12 Z" fill="var(--color-accent)" />
          </marker>
        </defs>

        <rect className="bg" x="0" y="0" width="1200" height="420" rx="18" />

        <g className="shadow">
          <rect className="panel" x="50" y="60" width="300" height="300" rx="16" />
          <text className="ink h" x="75" y="95">
            Sources
          </text>
          <text className="muted s" x="75" y="118">
            Raw filings and corrections become versioned events
          </text>

          <g>
            <rect className="card" x="75" y="145" width="250" height="52" rx="12" />
            <circle className="accent" cx="95" cy="171" r="6" />
            <text className="ink b" x="110" y="176">
              EDGAR filings
            </text>
            <text className="muted s" x="110" y="193">
              Accessioned, timestamped
            </text>
          </g>

          <g>
            <rect className="card" x="75" y="210" width="250" height="52" rx="12" />
            <circle className="accent" cx="95" cy="236" r="6" />
            <text className="ink b" x="110" y="241">
              Amendments / restatements
            </text>
            <text className="muted s" x="110" y="258">
              New versions, never overwrites
            </text>
          </g>

          <g>
            <rect className="card" x="75" y="275" width="250" height="52" rx="12" />
            <circle className="accent" cx="95" cy="301" r="6" />
            <text className="ink b" x="110" y="306">
              Provider corrections
            </text>
            <text className="muted s" x="110" y="323">
              Explicit change events
            </text>
          </g>
        </g>

        <g className="shadow">
          <rect className="panel" x="400" y="40" width="430" height="340" rx="18" />
          <text className="ink h" x="425" y="75">
            Versioned ledger
          </text>
          <text className="muted s" x="425" y="98">
            Immutable versions with provenance
          </text>

          <rect className="card" x="425" y="125" width="380" height="120" rx="14" />
          <text className="ink b" x="448" y="156">
            Statement: AAPL • 2024-12-31
          </text>
          <text className="muted s mono" x="448" y="179">
            source=edgar • accession=0000320193-25-000010
          </text>
          <text className="muted s mono" x="448" y="200">
            version=v3 • ingested_at=2025-02-05T02:14:31Z
          </text>

          <rect className="pill" x="448" y="212" width="165" height="24" rx="10" />
          <text className="ink s mono" x="460" y="229">
            provenance: strong
          </text>

          <text className="muted s" x="425" y="280">
            Versions over time
          </text>
          <line className="st" x1="425" y1="305" x2="805" y2="305" />
          <circle className="accent" cx="470" cy="305" r="7" />
          <circle className="accent" cx="585" cy="305" r="7" />
          <circle className="accent" cx="700" cy="305" r="7" />
          <text className="muted s mono" x="458" y="332">
            v1
          </text>
          <text className="muted s mono" x="573" y="332">
            v2
          </text>
          <text className="muted s mono" x="688" y="332">
            v3
          </text>
        </g>

        <g className="shadow">
          <rect className="panel" x="880" y="60" width="270" height="300" rx="16" />
          <text className="ink h" x="905" y="95">
            Contract-first API
          </text>
          <text className="muted s" x="905" y="118">
            Versioned routes, machine-readable schemas
          </text>

          <rect className="card" x="905" y="145" width="220" height="150" rx="14" />
          <text className="ink b" x="925" y="175">
            GET /v1/…
          </text>
          <text className="muted s" x="925" y="200">
            Deterministic ordering
          </text>
          <text className="muted s" x="925" y="222">
            Explicit pagination
          </text>
          <text className="muted s" x="925" y="244">
            Canonical error envelopes
          </text>
          <text className="muted s" x="925" y="266">
            Stable schema contracts
          </text>

          <rect className="pill" x="905" y="312" width="220" height="32" rx="12" />
          <text className="ink s" x="925" y="332">
            Ready for MCP tool use
          </text>
          <text className="muted s mono" x="1060" y="332">
            mcp
          </text>
        </g>

        <path
          d="M350 210 C385 210, 385 210, 400 210"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
        <circle cx="400" cy="210" r="3" fill="currentColor" opacity="0.8" />

        <path
          d="M830 210 C865 210, 865 210, 880 210"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
        <circle cx="880" cy="210" r="3" fill="currentColor" opacity="0.8" />
      </svg>
    </div>
  )
}
