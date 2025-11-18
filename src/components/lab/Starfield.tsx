'use client'

/**
 * Starfield Component
 *
 * Renders a background starfield for the "Neural Night Sky" effect.
 */

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Starfield() {
  const pointsRef = useRef<THREE.Points>(null)

  // Generate random star positions
  const particles = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Random position in a sphere
      const i3 = i * 3
      const radius = 50 + Math.random() * 100
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      // Star colors (bluish-white)
      const brightness = 0.5 + Math.random() * 0.5
      colors[i3] = brightness * 0.8
      colors[i3 + 1] = brightness * 0.9
      colors[i3 + 2] = brightness * 1.0
    }

    return { positions, colors }
  }, [])

  // Slow rotation for depth
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.01
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.005
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
