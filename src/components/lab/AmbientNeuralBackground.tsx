/**
 * Ambient Neural Network Background
 *
 * A subtle, dreamy neural network that lives behind all content,
 * responding gently to mouse movement and scroll position.
 */

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import Neuron from './Neuron'
import Connection from './Connection'
import { useSimulationStore } from '../../state/simulationStore'

interface MousePosition {
  x: number
  y: number
}

function NeuralNetwork({ mousePosition }: { mousePosition: MousePosition }) {
  const { neurons, connections } = useSimulationStore()
  const groupRef = useRef<THREE.Group>(null)

  // Create a neuron lookup map for efficient access
  const neuronMap = new Map(neurons.map((n) => [n.id, n]))

  // Gentle rotation based on mouse position
  useEffect(() => {
    if (groupRef.current) {
      const targetRotationY = (mousePosition.x - 0.5) * 0.3
      const targetRotationX = -(mousePosition.y - 0.5) * 0.2

      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05
    }
  }, [mousePosition])

  return (
    <group ref={groupRef}>
      {/* Render connections first (behind neurons) */}
      {connections.map((connection) => {
        const fromNeuron = neuronMap.get(connection.from)
        const toNeuron = neuronMap.get(connection.to)
        if (!fromNeuron || !toNeuron) return null

        return (
          <Connection
            key={connection.id}
            connection={connection}
            fromNeuron={fromNeuron}
            toNeuron={toNeuron}
            isSelected={false}
            showConnections={true}
          />
        )
      })}

      {/* Render neurons */}
      {neurons.map((neuron) => (
        <Neuron
          key={neuron.id}
          neuron={neuron}
          isSelected={false}
          onClick={() => {}} // No interaction in ambient mode
        />
      ))}
    </group>
  )
}

export default function AmbientNeuralBackground() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0.5, y: 0.5 })

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Dreamy gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dreamy-lavender/20 via-dreamy-mist/10 to-dreamy-teal/20" />

      {/* Neural network canvas */}
      <Canvas
        camera={{ position: [0, 0, 25], fov: 50 }}
        style={{ opacity: 0.4 }} // Very subtle presence
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#e0d5f3" />
        <pointLight position={[-10, -10, -10]} intensity={0.2} color="#b8d4d4" />

        <NeuralNetwork mousePosition={mousePosition} />

        {/* Subtle auto-rotation */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.2}
        />
      </Canvas>

      {/* Additional dreamy effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent pointer-events-none" />

      {/* Subtle noise texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
