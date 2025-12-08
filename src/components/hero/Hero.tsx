'use client'

import { ArrowRight, Download, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import AnimatedBackground from './AnimatedBackground'
import HeroVisual from './HeroVisual'
import { Typography } from '../design/Typography'

interface HeroProps {
  onOpenLab: () => void
}

export default function Hero({ onOpenLab }: HeroProps) {
  return (
    <section
      id="studio"
      className="min-h-screen px-6 md:px-12 lg:px-24 py-section-md flex items-center justify-center relative overflow-hidden bg-bg-page"
    >
      {/* Animated background */}
      <AnimatedBackground />

      {/* Hero visual (right side) */}
      <HeroVisual />

      {/* Content */}
      <div className="max-w-5xl w-full relative z-10">
        {/* Accent badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-bg-surface border border-border-light backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-text-accent" />
          <Typography variant="label" className="text-text-secondary">
            Building trusted systems when stakes are highest
          </Typography>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <Typography variant="display-lg" tag="h1">
            Trusted systems in chaos
          </Typography>
        </motion.div>

        {/* Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-10 max-w-3xl"
        >
          <Typography variant="display-md" tag="h2" className="text-text-secondary">
            Navigating failure, scrutiny, and speed to deliver infrastructure that is resilient, humane, and verifiable.
          </Typography>
        </motion.div>

        {/* Short description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-3xl space-y-5 mb-14"
        >
          <Typography variant="body-lg">
            I design systems that hold steady through chaos: policy-grade AI tooling, safety-critical architecture, and
            operational frameworks that keep teams moving when everything is on fire.
          </Typography>
          <Typography variant="body-lg">
            My work translates human urgency into accountable technology—balancing experimentation with structure so the
            right decisions happen faster, with evidence.
          </Typography>
        </motion.div>

        {/* CTA to Lab */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenLab}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-text-primary text-bg-page rounded-lg hover:shadow-2xl transition-all"
          >
            <span className="relative z-10 font-medium">Open Neural Night Sky Lab</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
          </motion.button>

          <a
            href="/Christopher_Sellers_CV.pdf"
            className="group inline-flex items-center gap-2 px-6 py-3 border border-border-strong rounded-lg transition-all duration-300 hover:bg-bg-surface"
          >
            <Download className="w-5 h-5 text-text-secondary transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span className="font-semibold text-text-secondary">Download CV</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

