/**
 * Neuron Component
 *
 * Renders a single neuron as a glowing sphere in 3D space.
 */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { NeuronVisual } from '../../lib/neural/types'
import { getNeuronColor } from '../../lib/viz/networkLayout'

interface NeuronProps {
  neuron: NeuronVisual
  isSelected: boolean
  onClick: () => void
}

export default function Neuron({ neuron, isSelected, onClick }: NeuronProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  // Animate based on activation
  useFrame((state) => {
    if (meshRef.current && glowRef.current) {
      const time = state.clock.getElapsedTime()

      // Pulse based on activation
      const basePulse = Math.sin(time * 2) * 0.05
      const activationPulse = neuron.activation * 0.3
      const scale = 1 + basePulse + activationPulse

      meshRef.current.scale.setScalar(scale)

      // Glow intensity
      const glowMaterial = glowRef.current.material as THREE.MeshBasicMaterial
      glowMaterial.opacity = 0.2 + neuron.activation * 0.3

      // Selected state
      if (isSelected) {
        meshRef.current.scale.setScalar(scale * 1.3)
        glowMaterial.opacity = 0.5
      }
    }
  })

  const color = getNeuronColor(neuron)
  const baseSize = neuron.type === 'input' ? 0.15 : neuron.type === 'output' ? 0.18 : 0.12

  return (
    <group position={neuron.position}>
      {/* Main neuron sphere */}
      <Sphere ref={meshRef} args={[baseSize, 16, 16]} onClick={onClick}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5 + neuron.activation * 0.5}
          metalness={0.3}
          roughness={0.4}
        />
      </Sphere>

      {/* Glow effect */}
      <Sphere ref={glowRef} args={[baseSize * 1.5, 16, 16]}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Label text (optional, for debugging) */}
      {/* {showLabels && (
        <Text
          position={[0, baseSize + 0.3, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {neuron.label}
        </Text>
      )} */}
    </group>
  )
}
