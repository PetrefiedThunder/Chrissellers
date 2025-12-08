'use client'

/**
 * Professional Experience Section
 *
 * Showcases career in tech government, public service, and non-profit impact
 */

import { Briefcase, Code, Users, Award, Building2, Shield, Lightbulb } from 'lucide-react'
import ScrollReveal from '../effects/ScrollReveal'
import { Typography } from '../design/Typography'

interface Experience {
  icon: typeof Briefcase
  role: string
  organization: string
  period: string
  description: string
  highlights?: string[]
  category: string
}

const experiences: Experience[] = [
  {
    icon: Code,
    role: 'Technical Founder & CEO',
    organization: 'RegEngine (formerly PrepChef)',
    period: '2023 – Present',
    description: 'Building graph-based regulatory infrastructure to automate cross-border compliance—the "Stripe for Regulation."',
    highlights: [
      'Single-handedly architected provenance-tracked arbitrage API using Python and GraphDB',
      'Leveraged AI agents to execute a product roadmap that typically requires a 5-person engineering team',
      'Operating from mobile off-grid environment, proving ability to execute complex technical work in austere settings',
    ],
    category: 'Current Mission',
  },
  {
    icon: Building2,
    role: 'Business Development',
    organization: 'RadarFirst (Privacy SaaS)',
    period: '2018 – 2019',
    description: 'Key operator in growth engine leading to $100M strategic exit to Vista Equity Partners.',
    highlights: [
      'Translated complex technical privacy code into business value for C-Suite at Fortune 500 companies',
      'Supported closing of $3M+ in enterprise pipeline',
      'Proved "privacy" was a competitive advantage, not just a compliance cost',
    ],
    category: 'Commercial',
  },
  {
    icon: Briefcase,
    role: 'Technical Account Manager',
    organization: 'SeatGeek',
    period: '2016 – 2018',
    description: 'Managed critical integrations for highest-value partners during hyper-growth phase.',
    highlights: [
      'Achieved 100% retention across 50-100 enterprise accounts (including Major League Soccer teams)',
      'Zero churn through proactive technical problem solving and high-touch relationship management',
      'Primary translator between Engineering and Client Ops, ensuring technical promises were delivered',
    ],
    category: 'Commercial',
  },
  {
    icon: Shield,
    role: 'Personal Aide & Special Assistant',
    organization: 'Office of U.S. Senator Jeff Merkley',
    period: '2013 – 2016',
    description: 'Served as "Body Man" and operational anchor for sitting U.S. Senator in zero-fail environment.',
    highlights: [
      'Acted as Senator\'s "second brain" on the road, anticipating needs hours in advance',
      'Orchestrated movement across 36 Oregon counties without a single schedule failure over three years',
      'Maintained absolute discretion while privy to sensitive matters and high-level strategy',
    ],
    category: 'Government',
  },
  {
    icon: Users,
    role: 'Founding Team Lead & Crisis Operator',
    organization: 'AmeriCorps NCCC & AmeriCorps Alums',
    period: '2008 – 2013',
    description: 'Deployed to high-friction disaster zones to engineer solutions where resources did not exist.',
    highlights: [
      'Built community amphitheater in Mullens, WV with zero budget—completed 24-hour final sprint at 4 AM by truck headlights',
      'Architected entire operational stack for post-Katrina workforce program in New Orleans from blank whiteboard',
      'Founded Oregon alumni chapter with such momentum that federal agency CEO personally lobbied for national replication',
    ],
    category: 'Public Service',
  },
  {
    icon: Lightbulb,
    role: 'Education',
    organization: 'Landmark College & Portland State University',
    period: '2000s',
    description: 'Bachelor of Arts in Psychology (Neurodivergence & Resilience) and Political Science coursework.',
    highlights: [],
    category: 'Foundation',
  },
]

export default function ProfessionalExperience() {
  return (
    <section className="relative py-section-md px-6 md:px-12 lg:px-24 bg-bg-page">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Typography variant="display-md" tag="h2">Professional Experience</Typography>
            <div className="flex-1 h-px bg-border-light/20" />
          </div>
          <Typography variant="title-lg" className="italic text-text-accent mb-6">
            "I Build the Stage & I Fill the Seats."
          </Typography>
          <Typography variant="body-lg" className="max-w-3xl">
            Technical Evangelist and Field Operator who bridges the gap between human struggle and technical solution. 
            From the U.S. Senate to hyper-growth tech companies to building infrastructure by truck headlights in Appalachia—a 
            career defined by resilience, adaptation, and the ability to execute in zero-fail environments.
          </Typography>
        </ScrollReveal>

        {/* Experience timeline */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <ScrollReveal
              key={exp.role}
              delay={index * 0.1}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <article className="group relative">
                <div className="flex gap-6 items-start">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-text-accent flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                    <exp.icon className="w-8 h-8 text-bg-page" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-bg-surface/80 backdrop-blur-sm border border-border-light rounded-2xl p-8 group-hover:border-text-accent/30 group-hover:shadow-xl transition-all duration-500">
                    {/* Category badge */}
                    <div className="inline-block mb-3">
                      <span className="text-xs font-semibold tracking-wider uppercase text-text-accent px-3 py-1 rounded-full bg-text-accent/10">
                        {exp.category}
                      </span>
                    </div>

                    {/* Role and org */}
                    <Typography variant="title-lg" tag="h3" className="mb-2 group-hover:text-text-accent transition-colors duration-300">
                      {exp.role}
                    </Typography>
                    <div className="flex items-center gap-3 mb-4">
                      <Typography variant="body-lg" className="font-medium text-text-secondary/80">
                        {exp.organization}
                      </Typography>
                      <span className="text-sm text-text-secondary/60">•</span>
                      <Typography variant="body-sm" className="text-text-secondary/60">{exp.period}</Typography>
                    </div>

                    {/* Description */}
                    <Typography variant="body-md" className="mb-4">{exp.description}</Typography>

                    {/* Highlights */}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <div className="pt-4 border-t border-border-light/50">
                        <ul className="space-y-2">
                          {exp.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-text-accent mt-1">•</span>
                              <Typography variant="body-sm" className="text-text-secondary/70">{highlight}</Typography>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom call-to-action */}
        <ScrollReveal delay={0.5} className="mt-16 text-center">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-studio-sage/5 to-studio-water/5 border border-studio-stone/10">
            <p className="studio-body max-w-2xl">
              Now applying this foundation in public service and community impact to building 
              technology that makes complex systems—like regulatory compliance—more accessible, 
              equitable, and human-centered.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
