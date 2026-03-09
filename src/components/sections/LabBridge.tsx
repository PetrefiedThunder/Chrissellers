'use client'

/**
 * Lab Bridge Section
 *
 * Narrative connector between the portfolio story and the Neural Night Sky Lab.
 * Explains *why* a neural network visualization belongs on a portfolio for someone
 * who worked in the Senate and built amphitheaters by truck headlights.
 */

import { ArrowRight, Zap } from 'lucide-react'
import ScrollReveal from '../effects/ScrollReveal'
import { Typography } from '../design/Typography'

interface LabBridgeProps {
  onOpenLab: () => void
}

export default function LabBridge({ onOpenLab }: LabBridgeProps) {
  return (
    <section className="relative py-section-md px-6 md:px-12 lg:px-24 overflow-hidden bg-bg-page">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-text-accent/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: narrative */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-text-accent/10 border border-text-accent/20 mb-6">
                <Zap className="w-3.5 h-3.5 text-text-accent" />
                <Typography variant="label" className="text-text-accent">
                  Interactive Proof of Concept
                </Typography>
              </div>

              <Typography variant="title-lg" tag="h2" className="mb-6">
                Regulation is the operating system of society. I built a neural network to show how it actually works.
              </Typography>

              <div className="space-y-4 mb-8">
                <Typography variant="body-md" className="text-text-secondary">
                  The Neural Night Sky Lab isn&apos;t a tech demo—it&apos;s a working model of how regulatory decisions cascade through communities. Watch a neural network learn to balance compliance burden against social benefit in real time.
                </Typography>
                <Typography variant="body-md" className="text-text-secondary">
                  Every node represents a stakeholder. Every connection represents a policy relationship. The training process reveals what most compliance systems hide: the tradeoffs between enforcement and equity.
                </Typography>
              </div>

              <button
                onClick={onOpenLab}
                className="group inline-flex items-center gap-3 px-6 py-3 bg-text-primary text-bg-page rounded-lg hover:shadow-xl transition-all"
              >
                <span className="font-medium">Explore the Lab</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Right: visual teaser */}
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#050510] to-[#0a0a2e] border border-white/10 overflow-hidden flex items-center justify-center">
                {/* Stylized network preview */}
                <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 opacity-60">
                  {/* Connections */}
                  <line x1="40" y1="60" x2="100" y2="40" stroke="rgb(99 102 241 / 0.3)" strokeWidth="0.5" />
                  <line x1="40" y1="100" x2="100" y2="40" stroke="rgb(99 102 241 / 0.2)" strokeWidth="0.5" />
                  <line x1="40" y1="100" x2="100" y2="100" stroke="rgb(99 102 241 / 0.4)" strokeWidth="0.5" />
                  <line x1="40" y1="140" x2="100" y2="100" stroke="rgb(99 102 241 / 0.3)" strokeWidth="0.5" />
                  <line x1="40" y1="140" x2="100" y2="160" stroke="rgb(99 102 241 / 0.2)" strokeWidth="0.5" />
                  <line x1="40" y1="60" x2="100" y2="100" stroke="rgb(99 102 241 / 0.15)" strokeWidth="0.5" />
                  <line x1="100" y1="40" x2="160" y2="80" stroke="rgb(99 102 241 / 0.3)" strokeWidth="0.5" />
                  <line x1="100" y1="40" x2="160" y2="120" stroke="rgb(99 102 241 / 0.2)" strokeWidth="0.5" />
                  <line x1="100" y1="100" x2="160" y2="80" stroke="rgb(99 102 241 / 0.4)" strokeWidth="0.5" />
                  <line x1="100" y1="100" x2="160" y2="120" stroke="rgb(99 102 241 / 0.3)" strokeWidth="0.5" />
                  <line x1="100" y1="160" x2="160" y2="120" stroke="rgb(99 102 241 / 0.25)" strokeWidth="0.5" />
                  <line x1="100" y1="160" x2="160" y2="80" stroke="rgb(99 102 241 / 0.15)" strokeWidth="0.5" />

                  {/* Input layer */}
                  <circle cx="40" cy="60" r="4" fill="rgb(99 102 241 / 0.6)" />
                  <circle cx="40" cy="100" r="4" fill="rgb(99 102 241 / 0.8)" />
                  <circle cx="40" cy="140" r="4" fill="rgb(99 102 241 / 0.5)" />

                  {/* Hidden layer */}
                  <circle cx="100" cy="40" r="5" fill="rgb(99 102 241 / 0.7)" />
                  <circle cx="100" cy="100" r="5" fill="rgb(99 102 241 / 0.9)" />
                  <circle cx="100" cy="160" r="5" fill="rgb(99 102 241 / 0.4)" />

                  {/* Output layer */}
                  <circle cx="160" cy="80" r="4" fill="rgb(168 162 255 / 0.8)" />
                  <circle cx="160" cy="120" r="4" fill="rgb(168 162 255 / 0.6)" />

                  {/* Labels */}
                  <text x="20" y="58" fill="rgb(255 255 255 / 0.3)" fontSize="5" fontFamily="monospace">stakeholders</text>
                  <text x="82" y="28" fill="rgb(255 255 255 / 0.3)" fontSize="5" fontFamily="monospace">policies</text>
                  <text x="148" y="70" fill="rgb(255 255 255 / 0.3)" fontSize="5" fontFamily="monospace">outcomes</text>
                </svg>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-indigo-500/5 pointer-events-none" />
              </div>

              {/* Floating metrics preview */}
              <div className="absolute -bottom-4 -right-4 bg-bg-surface border border-border-light rounded-xl p-4 shadow-lg">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <Typography variant="label" className="text-text-secondary">Equity Score</Typography>
                  </div>
                  <Typography variant="body-sm" className="font-mono text-text-accent">0.847</Typography>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
