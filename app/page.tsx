'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Hero from '@/src/components/hero/Hero'
import Footer from '@/src/components/layout/Footer'
import LoadingScreen from '@/src/components/layout/LoadingScreen'
import CustomCursor from '@/src/components/effects/CustomCursor'
import MobileNav from '@/src/components/layout/MobileNav'
import HowItWorks from '@/src/components/sections/HowItWorks'
import ImpactMetrics from '@/src/components/sections/ImpactMetrics'
import ProfessionalExperience from '@/src/components/sections/ProfessionalExperience'

// Lazy load heavy components
const EnhancedProjectGrid = lazy(() => import('@/src/components/studio/EnhancedProjectGrid'))
const LabView = lazy(() => import('@/src/components/lab/LabView'))

type View = 'studio' | 'lab'

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('studio')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleOpenLab = () => {
    setCurrentView('lab')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCloseLab = () => {
    setCurrentView('studio')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      <CustomCursor />
      <MobileNav onOpenLab={handleOpenLab} />

      <AnimatePresence mode="wait">
        {currentView === 'studio' ? (
          <motion.div
            key="studio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full min-h-screen"
          >
            <Hero onOpenLab={handleOpenLab} />
            <HowItWorks />
            <ImpactMetrics />
            <Suspense fallback={<div className="min-h-screen" />}>
              <div id="projects">
                <EnhancedProjectGrid onOpenLab={handleOpenLab} />
              </div>
            </Suspense>
            <div id="experience">
              <ProfessionalExperience />
            </div>
            <div id="contact">
              <Footer />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="lab"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative w-full min-h-screen"
          >
            <Suspense fallback={<LoadingScreen />}>
              <LabView />
            </Suspense>
            
            {/* Back Button Overlay */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
              <button
                onClick={handleCloseLab}
                className="px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all border border-white/20"
              >
                Exit Lab
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
