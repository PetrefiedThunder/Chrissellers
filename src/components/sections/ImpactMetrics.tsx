'use client'

/**
 * Impact Metrics Section
 *
 * Animated counters showing the technical depth and social impact
 */

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { memo, useEffect, useRef, useState } from 'react'
import ScrollReveal from '../effects/ScrollReveal'
import { Typography } from '../design/Typography'

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
    description: 'Leadership in government, tech, and community programs',
  },
  {
    value: 100,
    label: 'MLS Client Retention',
    suffix: '%',
    description: 'Trusted to deliver outcomes across complex stakeholder groups',
  },
  {
    value: 150,
    label: 'Town Halls',
    suffix: '+',
    description: 'Community listening sessions facilitated nationwide',
  },
  {
    value: 250,
    label: 'Project Budget',
    suffix: 'K',
    description: 'Managed from inception through delivery with accountability',
  },
]

const AnimatedCounter = memo(function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 50,
  })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest))
    })
    return unsubscribe
  }, [springValue])

  return (
    <span ref={ref} className="inline-block">
      {displayValue}{suffix}
    </span>
  )
})

export default function ImpactMetrics() {
  return (
    <section className="relative py-section-md px-6 md:px-12 lg:px-24 bg-bg-page">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <Typography variant="display-md" tag="h2" className="mb-6">
            Measurable Impact at Every Stage
          </Typography>
          <Typography variant="body-lg" className="max-w-2xl mx-auto">
            A proven record of guiding technology, policy, and community work
            from strategy to execution while keeping every stakeholder at the
            table.
          </Typography>
        </ScrollReveal>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <ScrollReveal key={metric.label} delay={index * 0.1}>
              <div className="text-center group">
                <div className="mb-4">
                  <div className="text-5xl md:text-6xl font-display font-bold text-text-accent group-hover:scale-110 transition-transform duration-300 inline-block">
                    <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                  </div>
                </div>
                <Typography variant="title-md" tag="h3" className="mb-2">
                  {metric.label}
                </Typography>
                <Typography variant="body-sm" className="text-text-secondary/70">
                  {metric.description}
                </Typography>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Call to action */}
        <ScrollReveal delay={0.4} className="text-center mt-16">
          <Typography variant="body-lg" className="mb-6">
            Each metric reflects hands-on leadership—merging technical rigor,
            civic partnership, and disciplined delivery to move missions
            forward.
          </Typography>
        </ScrollReveal>
      </div>
    </section>
  )
}
