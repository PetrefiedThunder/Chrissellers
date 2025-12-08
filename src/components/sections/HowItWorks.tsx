'use client'

/**
 * How It Works Section
 *
 * Scroll-driven storytelling section explaining the neural network
 */

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Network, TrendingUp, Shield } from 'lucide-react'
import ScrollReveal from '../effects/ScrollReveal'
import { Typography } from '../design/Typography'

const steps = [
  {
    icon: Brain,
    title: 'Neural Network Architecture',
    description: 'A fully-connected feedforward network models stakeholders, regulations, and community outcomes. Each layer represents a different aspect of the regulatory ecosystem.',
    details: '8 inputs → 12 hidden → 8 hidden → 4 outputs',
  },
  {
    icon: Network,
    title: 'Real-Time Training',
    description: 'Watch the network learn optimal pathways through complex compliance landscapes using stochastic gradient descent and backpropagation.',
    details: 'Custom implementation, not a simulation',
  },
  {
    icon: TrendingUp,
    title: 'Policy Metrics',
    description: 'Unique metrics measure compliance burden, social benefit, and equity. The system optimizes for fairness alongside accuracy.',
    details: 'Benefit/burden ratio, equity scoring',
  },
  {
    icon: Shield,
    title: 'Social Impact',
    description: 'Visualize how coordinated support systems can reduce barriers while maintaining safety and creating economic opportunity.',
    details: 'Four scenario datasets, real-world inspired',
  },
]

export default function HowItWorks() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <section
      ref={containerRef}
      className="relative py-section-md px-6 md:px-12 lg:px-24 overflow-hidden bg-bg-page"
    >
      <motion.div style={{ opacity, scale }} className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="text-center mb-20">
          <Typography variant="display-md" tag="h2" className="mb-6">
            How It Works
          </Typography>
          <Typography variant="body-lg" className="max-w-2xl mx-auto">
            A real neural network that learns to navigate regulatory complexity
            while optimizing for equity and opportunity.
          </Typography>
        </ScrollReveal>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <ScrollReveal
              key={step.title}
              delay={index * 0.1}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <div className="group relative p-8 rounded-2xl bg-bg-surface border border-border-light hover:border-text-accent/30 transition-all duration-500 hover:shadow-xl">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-text-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-7 h-7 text-bg-page" />
                </div>

                {/* Content */}
                <Typography variant="title-lg" tag="h3" className="mb-3 group-hover:text-text-accent transition-colors">
                  {step.title}
                </Typography>
                <Typography variant="body-md" className="mb-4">
                  {step.description}
                </Typography>
                <Typography variant="label" className="text-text-accent/80 font-mono">
                  {step.details}
                </Typography>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-text-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
