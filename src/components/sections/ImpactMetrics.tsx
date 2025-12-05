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
    value: 20,
    label: 'Years Across Sectors',
    suffix: '+',
    description: 'Public, private, and non-profit collaboration experience',
  },
  {
    value: 100,
    label: 'MLS Client Retention',
    suffix: '%',
    description: 'Every Major League Soccer partner renewed their engagement',
  },
  {
    value: 150,
    label: 'Town Halls',
    suffix: '+',
    description: 'Community forums facilitated for corridor revitalization',
  },
  {
    value: 250,
    label: 'Project Budget',
    suffix: 'K',
    description: 'Managed to deliver measurable outcomes for Westside Future Fund',
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
    <section className="relative py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white/30 to-white/50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="studio-heading text-4xl md:text-5xl mb-6">
            Measurable Impact at Every Stage
          </h2>
          <p className="studio-body max-w-2xl mx-auto">
            Two decades of cross-sector partnerships, fan experience innovation,
            and community-first engagement—captured in outcomes you can measure.
          </p>
        </ScrollReveal>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <ScrollReveal key={metric.label} delay={index * 0.1}>
              <div className="text-center group">
                <div className="mb-4">
                  <div className="text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-neural-accent to-neural-highlight bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block">
                    <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-studio-charcoal">
                  {metric.label}
                </h3>
                <p className="text-sm text-studio-stone/70">{metric.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Call to action */}
        <ScrollReveal delay={0.4} className="text-center mt-16">
          <p className="studio-body mb-6">
            A track record of building trust, earning renewals, and managing
            complex budgets to create equitable growth.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
