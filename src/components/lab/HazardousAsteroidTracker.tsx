'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Html } from '@react-three/drei'

interface AsteroidData {
  id: string
  name: string
  velocity: number
  distance: number
  size: number
  isHazardous: boolean
  startPos: THREE.Vector3
  direction: THREE.Vector3
}

interface HazardousAsteroidTrackerProps {
  radius?: number
}

export default function HazardousAsteroidTracker({ radius = 100 }: HazardousAsteroidTrackerProps) {
  const [asteroids, setAsteroids] = useState<AsteroidData[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    const fetchAsteroids = async () => {
      try {
        const today = new Date().toISOString().split('T')[0]
        const res = await fetch(
          `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=DEMO_KEY`
        )
        const data = await res.json()
        
        const todaysObjects = data.near_earth_objects?.[today] || []
        
        const parsedAsteroids = todaysObjects
          .filter((ast: any) => ast.is_potentially_hazardous_asteroid)
          .slice(0, 5)
          .map((ast: any) => {
            const approach = ast.close_approach_data?.[0]
            if (!approach) return null
            
            const startPos = new THREE.Vector3(
              (Math.random() - 0.5) * 2,
              (Math.random() - 0.5) * 2,
              (Math.random() - 0.5) * 2
            ).normalize().multiplyScalar(radius * 1.5)

            const targetPos = new THREE.Vector3(
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20
            )
            
            const estSize = ast.estimated_diameter?.kilometers?.estimated_diameter_max || 0.5
            const relVel = parseFloat(approach.relative_velocity?.kilometers_per_second) || 5
            
            return {
              id: ast.id,
              name: ast.name.replace(/^\(|\)$/g, '').split(' ')[0],
              velocity: relVel,
              distance: parseFloat(approach.miss_distance?.lunar) || 0,
              size: estSize,
              isHazardous: true,
              startPos,
              direction: new THREE.Vector3().subVectors(targetPos, startPos).normalize()
            }
          })
          .filter(Boolean)

        setAsteroids(parsedAsteroids)
        setIsConnected(true)
      } catch (error) {
        setIsConnected(false)
      }
    }

    fetchAsteroids()
  }, [radius])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    
    groupRef.current.children.forEach((child, i) => {
      const ast = asteroids[i]
      if (!ast) return
      
      const speed = ast.velocity * 0.3 * delta
      child.position.addScaledVector(ast.direction, speed)

      if (child.position.length() > radius * 2) {
        child.position.copy(ast.startPos)
      }
    })
  })

  if (asteroids.length === 0) {
    return (
      <group>
        <Html center distanceFactor={150}>
          <div className="bg-black/80 backdrop-blur-md border border-red-500/30 text-red-400 font-mono text-[10px] p-2 rounded pointer-events-none">
            <div className="flex items-center gap-1 mb-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'}`} />
              <span className="text-[8px] text-red-400/60">NASA_NEO</span>
            </div>
            Scanning near-Earth objects...
          </div>
        </Html>
      </group>
    )
  }

  return (
    <group ref={groupRef}>
      {asteroids.map((ast) => (
        <mesh key={ast.id} position={ast.startPos}>
          <sphereGeometry args={[Math.max(0.5, ast.size * 3), 8, 8]} />
          <meshBasicMaterial color="#ff3300" />
          <pointLight color="#ff4400" intensity={3} distance={25} />
          
          <Html distanceFactor={100}>
            <div className="bg-red-950/80 backdrop-blur-md border border-red-500/50 text-red-400 font-mono text-[9px] p-1.5 rounded pointer-events-none whitespace-nowrap transform -translate-y-6">
              <div className="flex items-center gap-1 mb-0.5">
                <span className="w-1 h-1 rounded-full bg-red-400 animate-pulse" />
                <span className="font-bold text-white">⚠ {ast.name}</span>
              </div>
              <span className="text-[8px] text-red-400/70">VEL: {ast.velocity.toFixed(2)} km/s</span><br/>
              <span className="text-[8px] text-red-400/70">DIST: {ast.distance.toFixed(2)} LD</span>
            </div>
          </Html>
        </mesh>
      ))}
    </group>
  )
}