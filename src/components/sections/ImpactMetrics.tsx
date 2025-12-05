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
            Technical Depth Meets Social Impact
          </h2>
          <p className="studio-body max-w-2xl mx-auto">
            A proven record of guiding technology, policy, and community work
            from strategy to execution while keeping every stakeholder at the
            table.
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
            Each metric reflects hands-on leadership—merging technical rigor,
            civic partnership, and disciplined delivery to move missions
            forward.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
