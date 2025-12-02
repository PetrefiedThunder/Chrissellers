'use client'

/**
 * Impact Metrics Section
 *
 * Animated counters showing the technical depth and social impact
 */

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import ScrollReveal from '../effects/ScrollReveal'

interface Metric {
  value: number
  label: string
  suffix: string
  description: string
}

const metrics: Metric[] = [
  {
    value: 3.5,
    label: 'Revenue Multiplier',
    suffix: 'x',
    description: 'Return on systems investment',
  },
  {
    value: 0,
    label: 'Technical Debt',
    suffix: '',
    description: 'Clean architecture from foundation',
  },
  {
    value: 12,
    label: 'Market Reach',
    suffix: '+',
    description: 'Global jurisdictions addressed',
  },
  {
    value: 99,
    label: 'Compliance Rate',
    suffix: '%',
    description: 'Regulatory requirements met',
  },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 50,
  })
  const displayValue = useRef(0)

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    springValue.on('change', (latest) => {
      displayValue.current = Math.round(latest)
    })
  }, [springValue])

  return (
    <motion.span ref={ref} className="inline-block">
      <motion.span>{Math.round(springValue.get())}</motion.span>
      {suffix}
    </motion.span>
  )
}

export default function ImpactMetrics() {
  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-24 bg-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="studio-heading text-4xl md:text-5xl mb-6 text-studio-ink">
            Performance Metrics
          </h2>
          <p className="studio-body max-w-2xl mx-auto">
            Systems architecture that delivers measurable business value.
          </p>
        </ScrollReveal>

        {/* Metrics grid - Swiss minimalist style */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 border border-studio-concrete/30">
          {metrics.map((metric, index) => (
            <ScrollReveal key={metric.label} delay={index * 0.1}>
              <div className="border-r border-b border-studio-concrete/30 p-8 hover:bg-studio-paper/50 transition-colors duration-300 last:border-r-0">
                <div className="mb-4">
                  <div className="text-5xl md:text-6xl font-display font-bold text-studio-ink tracking-tighter">
                    <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                  </div>
                </div>
                <h3 className="text-xs font-display font-semibold uppercase tracking-wider mb-2 text-studio-concrete">
                  {metric.label}
                </h3>
                <p className="text-xs text-studio-concrete leading-relaxed">{metric.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Call to action */}
        <ScrollReveal delay={0.4} className="text-center mt-16">
          <p className="studio-body mb-6">
            Bridging chaotic market forces with elegant systems design.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
