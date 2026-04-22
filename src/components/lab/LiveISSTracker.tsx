'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

interface ISSData {
  latitude: number
  longitude: number
  altitude: number
  velocity: number
}

export function LiveISSTracker({ radius = 100 }: { radius?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [issData, setIssData] = useState<ISSData | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const fetchISS = async () => {
      try {
        const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544')
        const data = await res.json()
        setIssData(data)
        setIsConnected(true)
      } catch (error) {
        setIsConnected(false)
      }
    }

    fetchISS()
    const interval = setInterval(fetchISS, 5000)
    return () => clearInterval(interval)
  }, [])

  useFrame(() => {
    if (!meshRef.current || !issData) return

    const altScale = radius + (issData.altitude / 6371) * radius 
    
    const latRad = THREE.MathUtils.degToRad(issData.latitude)
    const lonRad = THREE.MathUtils.degToRad(issData.longitude)

    const targetX = altScale * Math.cos(latRad) * Math.cos(lonRad)
    const targetY = altScale * Math.sin(latRad)
    const targetZ = -altScale * Math.cos(latRad) * Math.sin(lonRad)

    meshRef.current.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05)
  })

  if (!issData) return null

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.8, 16, 16]} />
      <meshBasicMaterial color="#ff3366" />
      <pointLight color="#ff3366" intensity={2} distance={10} />
      
      <Html distanceFactor={150}>
        <div className="bg-black/80 backdrop-blur border border-red-500/30 text-red-400 font-mono text-[10px] p-1.5 rounded pointer-events-none whitespace-nowrap">
          <div className="flex items-center gap-1 mb-1">
            <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
            <span className="text-[8px] text-red-400/60">LIVE</span>
          </div>
          ISS_TELEMETRY<br/>
          ALT: {Math.round(issData.altitude)}km<br/>
          VEL: {Math.round(issData.velocity)} km/h
        </div>
      </Html>
    </mesh>
  )
}