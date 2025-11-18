'use client'

import { ArrowRight, Sparkles } from 'lucide-react'
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
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-neural-accent/10 border border-neural-accent/20"
        >
          <Sparkles className="w-4 h-4 text-neural-accent" />
          <span className="text-sm font-medium text-neural-accent">
            Interactive Neural Network Simulator
          </span>
        </motion.div>

        {/* Main heading with gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="studio-heading mb-8 bg-gradient-to-r from-studio-charcoal via-studio-charcoal to-neural-accent bg-clip-text text-transparent"
        >
          Christopher Sellers
        </motion.h1>

        {/* Subheading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="studio-subheading mb-12 text-studio-stone"
        >
          Systems & impact designer
        </motion.h2>

        {/* Short description - very minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-2xl space-y-6 mb-16"
        >
          <p className="studio-body leading-relaxed">
            Bridging regulation, equity, and technology through elegant systems design.
          </p>
          <p className="studio-body leading-relaxed">
            Building tools that make complex compliance landscapes accessible and fair.
          </p>
        </motion.div>

        {/* CTA to Lab */}
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
      </motion.div>
    </section>
  )
}
