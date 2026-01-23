'use client'

import { useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { useSimulationStore } from '@/src/state/simulationStore'
import { NeuralGalaxy } from './NeuralGalaxy'
import { NebulaBackground } from './NebulaBackground'
import { Typography } from '../design/Typography'

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

  useEffect(() => {
    initialize()
  }, [initialize])

  // Training Loop
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTraining) {
      interval = setInterval(() => {
        step()
      }, 100) // Speed of simulation
    }
    return () => clearInterval(interval)
  }, [isTraining, step])

  const currentMetric = metrics[metrics.length - 1]

  return (
    <div className="relative w-full h-screen bg-neural-dark overflow-hidden">
      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full p-6 z-10 flex justify-between items-start pointer-events-none">
        <div>
          <Typography variant="display-md" tag="h1" className="text-white mb-2">
            Neural Night Sky
          </Typography>
          <Typography variant="body-md" className="text-white/70">
            Regulatory Compliance Neural Network
          </Typography>
        </div>

        <div className="bg-black/50 backdrop-blur-md p-4 rounded-lg border border-white/10 pointer-events-auto">
          <div className="flex gap-4 mb-4">
            <button
              onClick={isTraining ? pauseTraining : startTraining}
              className="px-4 py-2 bg-neural-accent text-white rounded hover:bg-neural-accent/80 transition-colors"
              aria-label={isTraining ? 'Pause neural network training' : 'Start neural network training'}
            >
              {isTraining ? 'Pause Training' : 'Start Training'}
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
              aria-label="Reset simulation to initial state"
            >
              Reset
            </button>
          </div>

          <div className="mb-4">
            <button
              onClick={toggleConstellationMode}
              className={`w-full px-4 py-2 rounded transition-colors border ${
                constellationMode
                  ? 'bg-neural-accent/20 border-neural-accent text-neural-accent'
                  : 'bg-transparent border-white/20 text-white/70 hover:text-white'
              }`}
              aria-label={constellationMode ? 'Disable constellation visualization mode' : 'Enable constellation visualization mode'}
              aria-pressed={constellationMode}
            >
              {constellationMode ? '✨ Constellation Mode: ON' : 'Constellation Mode: OFF'}
            </button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white/80">
              <span>Epoch:</span>
              <span className="font-mono">{currentMetric?.epoch || 0}</span>
            </div>
            <div className="flex justify-between text-sm text-white/80">
              <span>Loss:</span>
              <span className="font-mono">{currentMetric?.loss.toFixed(4) || '0.0000'}</span>
            </div>
            <div className="flex justify-between text-sm text-white/80">
              <span>Accuracy:</span>
              <span className="font-mono">{(currentMetric?.accuracy * 100).toFixed(1) || '0.0'}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Scene */}
      <Canvas camera={{ position: [0, 0, 30], fov: 45 }}>
        <color attach="background" args={['#050510']} />
        <fog attach="fog" args={['#050510', 20, 60]} />
        
        <Suspense fallback={null}>
          <NebulaBackground />
          <NeuralGalaxy />
          
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
          autoRotate={isTraining}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
