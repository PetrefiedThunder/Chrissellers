import { useState, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Hero from './components/hero/Hero'
import Footer from './components/layout/Footer'
import LoadingScreen from './components/layout/LoadingScreen'
import CustomCursor from './components/effects/CustomCursor'
import MobileNav from './components/layout/MobileNav'
import HowItWorks from './components/sections/HowItWorks'
import ImpactMetrics from './components/sections/ImpactMetrics'

// Lazy load heavy components
const EnhancedProjectGrid = lazy(() => import('./components/studio/EnhancedProjectGrid'))
const LabView = lazy(() => import('./components/lab/LabView'))

type View = 'studio' | 'lab'

function App() {
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
              <LabView onClose={handleCloseLab} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
