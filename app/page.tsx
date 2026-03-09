'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Hero from '@/src/components/hero/Hero'
import Footer from '@/src/components/layout/Footer'
import LoadingScreen from '@/src/components/layout/LoadingScreen'
import CustomCursor from '@/src/components/effects/CustomCursor'
import MobileNav from '@/src/components/layout/MobileNav'
import AboutNarrative from '@/src/components/sections/AboutNarrative'
import ImpactMetrics from '@/src/components/sections/ImpactMetrics'
import ProfessionalExperience from '@/src/components/sections/ProfessionalExperience'

// Lazy load heavy components
const EnhancedProjectGrid = lazy(() => import('@/src/components/studio/EnhancedProjectGrid'))

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
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

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        className="relative w-full min-h-screen"
      >
        <Hero />
        <div id="about">
          <AboutNarrative />
        </div>
        <ImpactMetrics />
        <Suspense fallback={<div className="min-h-screen" />}>
          <div id="projects">
            <EnhancedProjectGrid />
          </div>
        </Suspense>
        <div id="experience">
          <ProfessionalExperience />
        </div>
        <div id="contact">
          <Footer />
        </div>
      </motion.div>
    </>
  )
}
