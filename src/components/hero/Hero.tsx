'use client'

import { ArrowRight, Download, Sparkles } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import AnimatedBackground from './AnimatedBackground'
import HeroVisual from './HeroVisual'

interface HeroProps {
  onOpenLab: () => void
}

export default function Hero({ onOpenLab }: HeroProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50])

  return (
    <section
      ref={ref}
      id="studio"
      className="studio-section flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated background */}
      <AnimatedBackground />

      {/* Hero visual (right side) */}
      <HeroVisual />

      {/* Content with parallax */}
      <motion.div
        style={{ opacity, scale, y }}
        className="max-w-5xl w-full relative z-10"
      >
        {/* Accent badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur"
        >
          <Sparkles className="w-4 h-4 text-neural-accent" />
          <span className="text-sm font-medium text-studio-cream">Trusted systems in chaos</span>
        </motion.div>

        {/* Main heading with gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="studio-heading mb-8 bg-gradient-to-r from-neural-accent via-studio-cream to-neural-highlight bg-clip-text text-transparent"
        >
          I design calm out of crisis.
        </motion.h1>

        {/* Subheading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="studio-subheading mb-12 text-studio-stone"
        >
          Resilient systems, compliant rails, and AI safeguards that hold when the lights flicker.
        </motion.h2>

        {/* Short description - very minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-2xl space-y-6 mb-16"
        >
          <p className="studio-body leading-relaxed">
            I build trusted environments for the messiest problems: coordinating human teams, product velocity,
            and regulatory precision across industries where failure is not an option.
          </p>
          <p className="studio-body leading-relaxed text-studio-sage">
            The result: durable playbooks, measurable compliance, and AI-powered safety nets that scale with ambition.
          </p>
        </motion.div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenLab}
            className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-medium bg-studio-charcoal text-white rounded-lg hover:shadow-2xl hover:shadow-neural-accent/20"
          >
            <span className="relative z-10">Open Neural Night Sky Lab</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-neural-accent to-neural-highlight opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300" />
          </motion.button>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            href="/Christopher_Sellers_CV.pdf"
            className="inline-flex items-center gap-2 px-7 py-4 text-lg font-medium rounded-lg border border-white/20 bg-white/5 text-studio-cream hover:border-neural-accent/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Download CV</span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
