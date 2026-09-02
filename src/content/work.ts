export interface Project {
  name: string
  tagline: string
  description: string
  /** Honest current state. This site does not claim traction it does not have. */
  status: string
  stack: string[]
  detail?: string[]
  href?: string
  hrefLabel?: string
}

// TODO(chris): verify every `href` resolves publicly before deploying. These come
// from README files, not from a live check — a 404 on a portfolio link costs more
// credibility than omitting the link entirely.

export const featured: Project[] = [
  {
    name: 'RegEngine',
    tagline: 'Traceability evidence for FDA FSMA 204',
    description:
      'FSMA 204 requires covered food businesses to hand the FDA sortable traceability records within 24 hours of a request. That data normally lives scattered across an ERP, supplier spreadsheets, and EDI documents in a shape no auditor will accept. RegEngine sits beside the ERP and turns it into evidence.',
    status: 'Pre-production · founding design partners',
    stack: ['FastAPI', 'PostgreSQL + RLS', 'Redis', 'Next.js', 'Railway', 'Vercel'],
    detail: [
      'Tamper-evident hash-chained event storage with Merkle export bundles, plus a public verifier so a third party can confirm integrity without trusting my infrastructure',
      'Multi-tenant isolation enforced at the database layer — production refuses to start if its Postgres role can bypass row-level security',
      'Four intake paths: webhook API, CSV upload, EPCIS 2.0 JSON-LD, and EDI 856',
      '72 Alembic migrations with an ORM drift gate and a seeded mid-chain migration rehearsal in CI, both added after real incidents',
    ],
    href: 'https://regengine.co/proof',
    hrefLabel: 'regengine.co/proof',
  },
  {
    name: 'Agent Middleware API',
    tagline: 'A transaction boundary for autonomous agents',
    description:
      'When an agent dispatches a consequential action and the response never comes back, you cannot tell whether it landed, whether retrying is safe, or what authority it consumed. This binds a scoped signed permit and a spend allowance to a single logical action, so the same key cannot dispatch twice or double-debit.',
    status: 'Live · v1.3.0',
    stack: ['FastAPI', 'PostgreSQL', 'Ed25519', 'MCP SDK', 'Railway'],
    detail: [
      'A missing post-dispatch result resolves to an explicit "delivery uncertain" state rather than silently redispatching',
      'Per-wallet signed hash chains; budget reservation is a single guarded UPDATE that holds even where row locking is a no-op',
      'Crash-recovery harness kills a worker mid-commit across two live processes to prove one effect, one debit, one receipt',
      'Adversarial black-box audit against production found zero fail-open conditions — and the report publishes the two P1 bugs it did find',
    ],
    href: 'https://www.thisisatest.tech',
    hrefLabel: 'thisisatest.tech',
  },
  {
    name: 'SupportCarr',
    tagline: 'Roadside assistance for e-bikes',
    description:
      'On-demand rescue for e-bikes and bicycles, piloting in Pasadena. Built as partner infrastructure rather than a single app: tenant-scoped APIs, signed outbound webhooks, and a delivery ledger so dispatch networks can integrate without bespoke glue.',
    status: 'Live · Pasadena pilot',
    stack: ['Express 5', 'PostgreSQL + PostGIS', 'BullMQ', 'React PWA', 'Stripe'],
    detail: [
      'Finite state machine for ride lifecycle with Redis geo-lookup for nearby-driver assignment',
      'Geofence enforcement and deterministic SLA breach tracking with idempotent breach events',
      '~330 tests passing across the monorepo',
    ],
    href: 'https://support-carr-client.vercel.app',
    hrefLabel: 'support-carr-client.vercel.app',
  },
]

export const other: Project[] = [
  {
    name: 'PrepChef',
    tagline: 'Commercial kitchen marketplace — and a 97% rewrite',
    description:
      'A two-sided marketplace matching culinary entrepreneurs with commercial kitchen space. Its real story is the demolition: 223,753 lines of regulatory engines, Python microservices, and Kubernetes orchestration replaced by roughly 3,500 lines of Next.js that do the same job.',
    status: 'Dormant',
    stack: ['Next.js', 'Supabase', 'Stripe Connect'],
  },
  {
    name: 'TopoSonics',
    tagline: 'Images rendered as musical soundscapes',
    description:
      'Analyzes the visual structure of an image and maps it to note events across three mapping modes, sharing one analysis core between a web studio and a React Native app.',
    status: 'Built, not shipped',
    stack: ['Turborepo', 'Tone.js', 'Expo', 'Fastify'],
  },
  {
    name: 'PopFact',
    tagline: 'A fact-checking ticker overlay',
    description:
      'A browser extension exploring what a always-on credibility ticker would feel like on the open web. Explicitly a proof of concept — the verdicts are heuristic, and the README says so before anything else.',
    status: 'Prototype',
    stack: ['Manifest V3', 'Playwright'],
  },
]
