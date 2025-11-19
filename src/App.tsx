import { useState, useEffect, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Hero from './components/hero/Hero'
import Footer from './components/layout/Footer'
import LoadingScreen from './components/layout/LoadingScreen'
import CustomCursor from './components/effects/CustomCursor'
import MobileNav from './components/layout/MobileNav'
import HowItWorks from './components/sections/HowItWorks'
import ImpactMetrics from './components/sections/ImpactMetrics'
import AmbientNeuralBackground from './components/lab/AmbientNeuralBackground'
import FloatingNeuralPanel from './components/lab/FloatingNeuralPanel'

// Lazy load heavy components
const EnhancedProjectGrid = lazy(() => import('./components/studio/EnhancedProjectGrid'))

function App() {
  const [isLoading, setIsLoading] = useState(true)

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
      {/* Ambient neural network background - always visible, behind everything */}
      <AmbientNeuralBackground />

      {/* Custom cursor for desktop */}
      <CustomCursor />

      {/* Mobile navigation */}
      <MobileNav />

      {/* Floating neural network control panel */}
      <FloatingNeuralPanel />

      {/* Main content - scrollable, on top of neural background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <Hero />
        <HowItWorks />
        <ImpactMetrics />
        <Suspense fallback={<div className="min-h-screen" />}>
          <div id="projects">
            <EnhancedProjectGrid />
          </div>
        </Suspense>
        <div id="contact">
          <Footer />
        </div>
      </motion.div>
    </>
  )
}

export default App
