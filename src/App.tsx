import { useState, useEffect, lazy, Suspense } from 'react'
import Hero from './components/hero/Hero'
import Footer from './components/layout/Footer'
import LoadingScreen from './components/layout/LoadingScreen'
import CustomCursor from './components/effects/CustomCursor'

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
  }

  const handleCloseLab = () => {
    setCurrentView('studio')
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      <CustomCursor />

      <div className="relative w-full min-h-screen overflow-x-hidden">
        {/* Studio View */}
        <div
          className={`transition-all duration-1000 ${
            currentView === 'studio'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-10 pointer-events-none absolute inset-0'
          }`}
        >
          <Hero onOpenLab={handleOpenLab} />
          <Suspense fallback={<div className="min-h-screen" />}>
            <EnhancedProjectGrid onOpenLab={handleOpenLab} />
          </Suspense>
          <Footer />
        </div>

        {/* Lab View */}
        <div
          className={`transition-all duration-1000 ${
            currentView === 'lab'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 pointer-events-none absolute inset-0'
          }`}
        >
          <Suspense fallback={<LoadingScreen />}>
            <LabView onClose={handleCloseLab} />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default App
