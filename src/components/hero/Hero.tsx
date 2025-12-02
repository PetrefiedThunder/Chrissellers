'use client'

import { ArrowRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import AnimatedBackground from './AnimatedBackground'
import HeroVisual from './HeroVisual'

export default function Hero() {
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
        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="studio-heading mb-8 text-studio-ink"
        >
          Christopher Sellers
        </motion.h1>

        {/* Subheading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="studio-subheading mb-12 text-studio-concrete"
        >
          Systems & impact designer
        </motion.h2>

        {/* Short description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl space-y-6 mb-16"
        >
          <p className="studio-body leading-relaxed">
            Bridging regulation, equity, and technology through elegant systems design.
          </p>
          <p className="studio-body leading-relaxed">
            Building tools that make complex compliance landscapes accessible and fair.
          </p>
        </motion.div>

        {/* CTA to Projects */}
        <motion.a
          href="#projects"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-medium bg-studio-ink text-white rounded-lg hover:shadow-2xl transition-all duration-300"
        >
          <span className="relative z-10">View Work</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
        </motion.a>
      </motion.div>
    </section>
  )
}
