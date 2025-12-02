'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, SoftShadows } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useViewStore } from '@/src/state/viewStore'

const PARTICLE_COUNT = 1200

function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const currentSection = useViewStore((state) => state.currentSection)

  // Generate position arrays for different shapes
  const positions = useMemo(() => {
    const cloud: THREE.Vector3[] = []
    const grid: THREE.Vector3[] = []
    const pillar: THREE.Vector3[] = []

    // Cloud: Random distribution inside a sphere
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const radius = Math.random() * 8 + 2

      cloud.push(
        new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        )
      )
    }

    // Grid: Precise 2D grid arrangement
    const gridSize = Math.ceil(Math.sqrt(PARTICLE_COUNT))
    const spacing = 0.8
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (i % gridSize) - gridSize / 2
      const y = Math.floor(i / gridSize) - gridSize / 2

      grid.push(
        new THREE.Vector3(
          x * spacing,
          y * spacing,
          0
        )
      )
    }

    // Pillar: Spiral/Cylindrical arrangement
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = (i / PARTICLE_COUNT) * Math.PI * 12 // Multiple spirals
      const radius = 3 + Math.sin(i * 0.1) * 0.5
      const height = (i / PARTICLE_COUNT) * 20 - 10

      pillar.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        )
      )
    }

    return { cloud, grid, pillar }
  }, [])

  // Store current positions and target positions
  const currentPositions = useRef<THREE.Vector3[]>(
    positions.cloud.map((p) => p.clone())
  )

  // Animation loop
  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.getElapsedTime()

    // Determine target positions based on current section
    let targetPositions: THREE.Vector3[]
    switch (currentSection) {
      case 'hero':
        targetPositions = positions.cloud
        break
      case 'work':
        targetPositions = positions.grid
        break
      case 'impact':
        targetPositions = positions.pillar
        break
      case 'contact':
        targetPositions = positions.pillar
        break
      default:
        targetPositions = positions.cloud
    }

    // Interpolate current positions toward target
    const lerpFactor = 0.03
    const dummy = new THREE.Object3D()

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Smooth interpolation
      currentPositions.current[i].lerp(targetPositions[i], lerpFactor)

      // Add breathing motion
      const breathingOffset = Math.sin(time + i * 0.05) * 0.15

      dummy.position.copy(currentPositions.current[i])
      dummy.position.y += breathingOffset

      // Slight rotation for visual interest
      dummy.rotation.x = time * 0.1 + i * 0.01
      dummy.rotation.y = time * 0.05 + i * 0.01

      // Random scale variation
      const scale = 0.08 + Math.sin(time + i * 0.1) * 0.02
      dummy.scale.setScalar(scale)

      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  // Generate colors for instances
  const colors = useMemo(() => {
    const colorArray = new Float32Array(PARTICLE_COUNT * 3)
    const studioColors = [
      new THREE.Color('#8A9A8A'), // sage
      new THREE.Color('#B58E7E'), // clay
      new THREE.Color('#8DA3B0'), // water
      new THREE.Color('#9A9A9A'), // concrete
    ]

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const color = studioColors[i % studioColors.length]
      color.toArray(colorArray, i * 3)
    }

    return colorArray
  }, [])

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        roughness={0.8}
        metalness={0.2}
        vertexColors
      />
      <instancedBufferAttribute
        attach="geometry-attributes-color"
        args={[colors, 3]}
      />
    </instancedMesh>
  )
}

export default function KineticBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 50 }}
        style={{ background: '#F4F4F0' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.6} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={0.2} />

        {/* Soft shadows for depth */}
        <SoftShadows size={25} samples={10} focus={0} />

        {/* Studio environment lighting */}
        <Environment preset="studio" />

        {/* Fog matching background color */}
        <fog attach="fog" args={['#F4F4F0', 15, 35]} />

        <Particles />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  )
}
