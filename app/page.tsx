'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useViewStore } from '@/src/state/viewStore'
import Hero from '@/src/components/hero/Hero'
import Footer from '@/src/components/layout/Footer'
import LoadingScreen from '@/src/components/layout/LoadingScreen'
import CustomCursor from '@/src/components/effects/CustomCursor'
import MobileNav from '@/src/components/layout/MobileNav'
import ImpactMetrics from '@/src/components/sections/ImpactMetrics'
import KineticBackground from '@/src/components/canvas/KineticBackground'

// Lazy load heavy components
const EnhancedProjectGrid = lazy(() => import('@/src/components/studio/EnhancedProjectGrid'))

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const setSection = useViewStore((state) => state.setSection)

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      <CustomCursor />
      <MobileNav />
      <KineticBackground />

      <div className="relative w-full">
        {/* Hero Section */}
        <motion.section
          onViewportEnter={() => setSection('hero')}
          viewport={{ amount: 0.3 }}
          className="min-h-screen bg-transparent"
        >
          <Hero />
        </motion.section>

        {/* Work Section */}
        <motion.section
          onViewportEnter={() => setSection('work')}
          viewport={{ amount: 0.3 }}
          className="min-h-screen bg-transparent"
          id="projects"
        >
          <Suspense fallback={<div className="min-h-screen" />}>
            <EnhancedProjectGrid />
          </Suspense>
        </motion.section>

        {/* Impact Section */}
        <motion.section
          onViewportEnter={() => setSection('impact')}
          viewport={{ amount: 0.3 }}
          className="min-h-screen bg-transparent"
          id="impact"
        >
          <ImpactMetrics />
        </motion.section>

        {/* Contact Section */}
        <motion.section
          onViewportEnter={() => setSection('contact')}
          viewport={{ amount: 0.3 }}
          className="bg-transparent"
          id="contact"
        >
          <Footer />
        </motion.section>
      </div>
    </>
  )
}
