'use client'

import { Download, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import AnimatedBackground from './AnimatedBackground'
import HeroVisual from './HeroVisual'
import { Typography } from '../design/Typography'

export default function Hero() {
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
            Disaster responder turned Senate aide turned tech operator turned regulatory AI founder.
            I build systems at the intersection of policy, technology, and human need—where the cost of failure is highest
            and the usual playbooks don&apos;t apply.
          </Typography>
          <Typography variant="body-lg">
            Currently building RegEngine: graph-based regulatory infrastructure that makes compliance
            computable, auditable, and fair.
          </Typography>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center gap-4"
        >
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

