import { X } from 'lucide-react'
import EnhancedNeuralScene from './EnhancedNeuralScene'
import ControlPanel from './ControlPanel'
import Dashboard from './Dashboard'
import InfoPanel from './InfoPanel'

interface LabViewProps {
  onClose: () => void
}

export default function LabView({ onClose }: LabViewProps) {
  return (
    <div className="lab-section relative w-full h-screen overflow-hidden">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20 transition-all duration-200 hover:scale-110"
        aria-label="Close Lab"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Header */}
      <div className="absolute top-6 left-6 z-40">
        <h1 className="text-2xl font-display font-bold text-gradient">
          Neural Night Sky Lab
        </h1>
        <p className="text-sm text-white/60 mt-1">
          Regulatory Compliance & Social Impact Simulator
        </p>
      </div>

      {/* Main grid layout */}
      <div className="w-full h-full grid grid-cols-12 grid-rows-12 gap-4 p-6 pt-24">
        {/* Left sidebar - Controls */}
        <div className="col-span-3 row-span-12 overflow-y-auto custom-scrollbar">
          <ControlPanel />
        </div>

        {/* Center - 3D Scene */}
        <div className="col-span-6 row-span-8">
          <div className="w-full h-full rounded-lg overflow-hidden border border-white/10 shadow-2xl shadow-neural-accent/10">
            <EnhancedNeuralScene />
          </div>
        </div>

        {/* Right sidebar - Info */}
        <div className="col-span-3 row-span-12 overflow-y-auto custom-scrollbar">
          <InfoPanel />
        </div>

        {/* Bottom - Dashboard */}
        <div className="col-span-6 row-span-4">
          <Dashboard />
        </div>
      </div>
    </div>
  )
}
