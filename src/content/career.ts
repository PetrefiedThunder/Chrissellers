export interface Role {
  role: string
  organization: string
  period: string
  summary: string
  highlights: string[]
}

export const career: Role[] = [
  {
    role: 'Technical Founder',
    organization: 'RegEngine',
    period: '2023 — Present',
    summary:
      'Architected and shipped a compliance platform for food supply chain traceability, solo.',
    highlights: [
      'Designed and built the full stack — backend services, data model, and frontend — without an engineering team',
      'Used AI agents to cover a roadmap that would normally take a five-person team',
    ],
  },
  {
    role: 'Business Development',
    organization: 'RadarFirst',
    period: '2018 — 2019',
    summary:
      'Privacy SaaS. Part of the growth engine through a $100M exit to Vista Equity Partners.',
    highlights: [
      'Translated technical privacy tooling into business value for Fortune 500 C-suites',
      'Supported closing $3M+ in enterprise pipeline',
    ],
  },
  {
    role: 'Technical Account Manager',
    organization: 'SeatGeek',
    period: '2016 — 2018',
    summary:
      'Owned integrations for the highest-value partners through the company\'s hyper-growth phase.',
    highlights: [
      '100% retention across 50–100 enterprise accounts, including Major League Soccer teams',
      'Primary translator between engineering and client operations',
    ],
  },
  {
    role: 'Personal Aide & Special Assistant',
    organization: 'Office of U.S. Senator Jeff Merkley',
    period: '2013 — 2016',
    summary:
      'Operational anchor for a sitting U.S. Senator in a zero-fail environment.',
    highlights: [
      'Ran movement across 36 Oregon counties for three years without a schedule failure',
      'Held absolute discretion while privy to sensitive matters and high-level strategy',
    ],
  },
  {
    role: 'Team Lead & Crisis Operator',
    organization: 'AmeriCorps NCCC & AmeriCorps Alums',
    period: '2008 — 2013',
    summary:
      'Deployed to disaster zones to build solutions where the resources did not exist.',
    highlights: [
      'Built a community amphitheater in Mullens, WV on zero budget',
      'Designed the operational stack for a post-Katrina workforce program in New Orleans from scratch',
      'Founded the Oregon alumni chapter; the federal agency CEO lobbied to replicate it nationally',
    ],
  },
  {
    role: 'Education',
    organization: 'Landmark College · Portland State University',
    period: '',
    summary:
      'B.A. Psychology, focused on neurodivergence and resilience. Political science coursework at PSU.',
    highlights: [],
  },
]
