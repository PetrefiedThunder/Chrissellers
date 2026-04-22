'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface MilkyWayProps {
  latitude?: number
  longitude?: number
  radius?: number
}

export function MilkyWayVisualizer({ 
  latitude = 37.7749, 
  longitude = -122.4194,
  radius = 100 
}: MilkyWayProps) {
  const groupRef = useRef<THREE.Group>(null)

  const particles = useMemo(() => {
    const starCount = 15000
    const positions = new Float32Array(starCount * 3)
    const colors = new Float32Array(starCount * 3)
    const color = new THREE.Color()

    for (let i = 0; i < starCount; i++) {
      const u = Math.random()
      
      const ra = u * Math.PI * 2
      const dec = (Math.random() - 0.5) * Math.pow(Math.random(), 3) * Math.PI 

      const x = radius * Math.cos(dec) * Math.cos(ra)
      const y = radius * Math.sin(dec)
      const z = -radius * Math.cos(dec) * Math.sin(ra)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      color.setHSL(0.6 + (Math.random() * 0.15 - 0.05), 0.9, Math.random() * 0.6 + 0.4)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, colors }
  }, [radius])

  useFrame(() => {
    if (!groupRef.current) return
    
    const now = new Date()
    const daysSinceJ2000 = (now.getTime() - 946728000000) / 86400000
    const gmst = 18.697374558 + 24.06570982441908 * daysSinceJ2000
    const lst = (gmst + longitude / 15) % 24 
    const lstRadians = (lst / 24) * Math.PI * 2

    groupRef.current.rotation.y = -lstRadians
    
    const latRad = THREE.MathUtils.degToRad(latitude)
    groupRef.current.rotation.x = (Math.PI / 2) - latRad
  })

  return (
    <group ref={groupRef}>
      <points>
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
          size={0.4}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}