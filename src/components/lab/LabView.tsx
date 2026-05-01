'use client'

import { useEffect, Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import { useSimulationStore } from '@/src/state/simulationStore'
import { NeuralGalaxy } from './NeuralGalaxy'
import { NebulaBackground } from './NebulaBackground'
import { LiveISSTracker } from './LiveISSTracker'
import { MilkyWayVisualizer } from './MilkyWayVisualizer'
import { HazardousAsteroidTracker } from './HazardousAsteroidTracker'
import { Typography } from '../design/Typography'
import { useReducedMotion } from 'framer-motion'

export default function LabView() {
  const initialize = useSimulationStore(state => state.initialize)
  const step = useSimulationStore(state => state.step)
  const isTraining = useSimulationStore(state => state.isTraining)
  const startTraining = useSimulationStore(state => state.startTraining)
  const pauseTraining = useSimulationStore(state => state.pauseTraining)
  const reset = useSimulationStore(state => state.reset)
  const metrics = useSimulationStore(state => state.metrics)
  const constellationMode = useSimulationStore(state => state.constellationMode)
  const toggleConstellationMode = useSimulationStore(state => state.toggleConstellationMode)
  const [liveTelemetry, setLiveTelemetry] = useState(false)
  const [milkyWay, setMilkyWay] = useState(true)
  const [asteroids, setAsteroids] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const [sheetExpanded, setSheetExpanded] = useState(false)

  useEffect(() => {
    let cancelled = false
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        if (!cancelled) setUserLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude })
      },
      () => {}
    )
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTraining) {
      interval = setInterval(() => {
        step()
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isTraining, step])

  const currentMetric = metrics[metrics.length - 1]
  const lossValue = currentMetric?.loss ?? 0
  const accuracyValue = currentMetric?.accuracy ?? 0
  const epochValue = currentMetric?.epoch ?? 0

  return (
    <div className="relative w-full h-screen bg-neural-dark overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-6 z-10 flex justify-between items-start pointer-events-none">
        <div>
          <Typography variant="display-md" tag="h1" className="text-white mb-2">
            Neural Night Sky
          </Typography>
          <Typography variant="body-md" className="text-white/70">
            Regulatory Compliance Neural Network
          </Typography>
        </div>
      </div>

      {/* Responsive Controls - Desktop Side / Mobile Bottom Sheet */}
      <motion.div 
        className="fixed md:absolute top-auto md:top-6 bottom-0 md:left-6 right-0 md:w-auto z-50 bg-black/80 md:bg-black/50 backdrop-blur-xl md:backdrop-blur-md p-6 md:rounded-lg border-t md:border border-white/10 pointer-events-auto"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.y < -50) setSheetExpanded(true)
          if (info.offset.y > 50) setSheetExpanded(false)
        }}
        animate={{ y: sheetExpanded ? 0 : 100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Drag handle */}
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-4 md:hidden" />
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <button 
              onClick={isTraining ? pauseTraining : startTraining}
              className="touch-target flex-1 min-h-[44px] px-4 py-3 bg-neural-accent text-white rounded-lg hover:bg-neural-accent/80 transition-colors"
            >
              {isTraining ? 'Pause' : 'Start'}
            </button>
            <button 
              onClick={reset}
              className="touch-target min-h-[44px] px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              Reset
            </button>
          </div>

          <button
            onClick={toggleConstellationMode}
            aria-pressed={constellationMode}
            className={`touch-target min-h-[44px] w-full px-4 py-3 rounded-lg transition-colors border ${
              constellationMode 
                ? 'bg-neural-accent/20 border-neural-accent text-neural-accent' 
                : 'bg-transparent border-white/20 text-white/70 hover:text-white'
            }`}
          >
            {constellationMode ? '✨ Constellation: ON' : 'Constellation: OFF'}
          </button>

          <button
            onClick={() => setLiveTelemetry(!liveTelemetry)}
            aria-pressed={liveTelemetry}
            className={`touch-target min-h-[44px] w-full px-4 py-3 rounded-lg transition-colors border ${
              liveTelemetry 
                ? 'bg-red-500/20 border-red-500/50 text-red-400' 
                : 'bg-transparent border-white/20 text-white/70 hover:text-white'
            }`}
          >
            {liveTelemetry ? '📡 Live ISS: ON' : 'Live ISS: OFF'}
          </button>

          <button
            onClick={() => setMilkyWay(!milkyWay)}
            aria-pressed={milkyWay}
            className={`touch-target min-h-[44px] w-full px-4 py-3 rounded-lg transition-colors border ${
              milkyWay 
                ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' 
                : 'bg-transparent border-white/20 text-white/70 hover:text-white'
            }`}
          >
            {milkyWay ? '🌌 Milky Way: ON' : 'Milky Way: OFF'}
          </button>

          <button
            onClick={() => setAsteroids(!asteroids)}
            aria-pressed={asteroids}
            className={`touch-target min-h-[44px] w-full px-4 py-3 rounded-lg transition-colors border ${
              asteroids 
                ? 'bg-red-500/20 border-red-500/50 text-red-400' 
                : 'bg-transparent border-white/20 text-white/70 hover:text-white'
            }`}
          >
            {asteroids ? '☄️ Asteroids: ON' : 'Asteroids: OFF'}
          </button>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-white/80">
              <span>Epoch:</span>
              <span className="font-mono">{epochValue}</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>Loss:</span>
              <span className="font-mono">{lossValue.toFixed(4)}</span>
            </div>
            <div className="flex justify-between text-white/80">
              <span>Accuracy:</span>
              <span className="font-mono">{(accuracyValue * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="sr-only" role="status" aria-live="polite">
        {`Training metrics updated. Epoch ${epochValue}. Loss ${lossValue.toFixed(4)}. Accuracy ${(
          accuracyValue * 100
        ).toFixed(1)} percent.`}
      </div>

      {/* 3D Scene */}
      <Canvas camera={{ position: [0, 0, 30], fov: 45 }}>
        <color attach="background" args={['#050510']} />
        <fog attach="fog" args={['#050510', 20, 60]} />
        
        <Suspense fallback={null}>
          <NebulaBackground />
          <NeuralGalaxy />
          {milkyWay && (
            <MilkyWayVisualizer 
              latitude={userLocation?.lat ?? 37.7749} 
              longitude={userLocation?.lon ?? -122.4194} 
            />
          )}
          {liveTelemetry && <LiveISSTracker />}
          {asteroids && <HazardousAsteroidTracker />}
          
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          <EffectComposer>
            <Bloom 
              luminanceThreshold={1} 
              mipmapBlur 
              intensity={1.5} 
              radius={0.4}
            />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
        
        <OrbitControls 
          enablePan={false} 
          minDistance={10} 
          maxDistance={50}
          autoRotate={!shouldReduceMotion && isTraining}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
