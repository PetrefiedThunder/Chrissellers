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
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-studio-charcoal/50 border border-white/10 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-neural-accent" />
          <span className="text-sm font-medium text-white/80">
            Building trusted systems when stakes are highest
          </span>
        </motion.div>

        {/* Main heading with gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="studio-heading mb-6 bg-gradient-to-br from-neural-highlight via-neural-accent to-white bg-clip-text text-transparent"
        >
          Trusted systems in chaos
        </motion.h1>

        {/* Subheading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="studio-subheading mb-10 text-studio-stone max-w-3xl"
        >
          Navigating failure, scrutiny, and speed to deliver infrastructure that is resilient, humane, and verifiable.
        </motion.h2>

        {/* Short description - very minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-3xl space-y-5 mb-14 text-studio-stone"
        >
          <p className="studio-body leading-relaxed">
            I design systems that hold steady through chaos: policy-grade AI tooling, safety-critical architecture, and
            operational frameworks that keep teams moving when everything is on fire.
          </p>
          <p className="studio-body leading-relaxed">
            My work translates human urgency into accountable technology—balancing experimentation with structure so the
            right decisions happen faster, with evidence.
          </p>
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
            className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-medium bg-studio-charcoal text-white rounded-lg hover:shadow-2xl hover:shadow-neural-accent/20"
          >
            <span className="relative z-10">Open Neural Night Sky Lab</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-neural-accent to-neural-highlight opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300" />
          </motion.button>

          <a
            href="/Christopher_Sellers_CV.pdf"
            className="group inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white/80 border border-white/15 rounded-lg transition-all duration-300 hover:text-white hover:border-neural-highlight/60 hover:bg-white/5"
          >
            <Download className="w-5 h-5 text-neural-highlight transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span>Download CV</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
