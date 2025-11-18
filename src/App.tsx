import { useState } from 'react'
import Hero from './components/hero/Hero'
import ProjectGrid from './components/studio/ProjectGrid'
import Footer from './components/layout/Footer'
import LabView from './components/lab/LabView'

type View = 'studio' | 'lab'

function App() {
  const [currentView, setCurrentView] = useState<View>('studio')

  const handleOpenLab = () => {
    setCurrentView('lab')
  }

  const handleCloseLab = () => {
    setCurrentView('studio')
  }

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Studio View */}
      <div
        className={`transition-opacity duration-700 ${
          currentView === 'studio' ? 'opacity-100' : 'opacity-0 pointer-events-none absolute inset-0'
        }`}
      >
        <Hero onOpenLab={handleOpenLab} />
        <ProjectGrid onOpenLab={handleOpenLab} />
        <Footer />
      </div>

      {/* Lab View */}
      <div
        className={`transition-opacity duration-700 ${
          currentView === 'lab' ? 'opacity-100' : 'opacity-0 pointer-events-none absolute inset-0'
        }`}
      >
        <LabView onClose={handleCloseLab} />
      </div>
    </div>
  )
}

export default App
