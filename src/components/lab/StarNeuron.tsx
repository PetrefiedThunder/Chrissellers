import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Color } from 'three'
import { Neuron } from '@/src/lib/neural/types'
import { useSimulationStore } from '@/src/state/simulationStore'

interface StarNeuronProps {
  neuron: Neuron
}

export function StarNeuron({ neuron }: StarNeuronProps) {
  const meshRef = useRef<Mesh>(null)
  const constellationMode = useSimulationStore(state => state.constellationMode)
  
  // Color based on layer type
  const baseColor = useMemo(() => {
    const colors = [
      '#60A5FA', // Blue (Input)
      '#A78BFA', // Purple (Hidden 1)
      '#F472B6', // Pink (Hidden 2)
      '#FBBF24'  // Amber (Output)
    ]
    return new Color(colors[neuron.layerIndex % colors.length])
  }, [neuron.layerIndex])

  useFrame((state) => {
    if (!meshRef.current) return
    
    // Constellation Mode Logic
    if (constellationMode) {
      // Hide inactive neurons (simulated by bias for now, ideally activation)
      if (Math.abs(neuron.bias) < 0.1) {
        meshRef.current.visible = false
        return
      }
    }
    meshRef.current.visible = true

    const time = state.clock.getElapsedTime()
    const breathe = Math.sin(time * 2 + neuron.indexInLayer) * 0.1 + 1
    
    // Scale based on bias/importance + breathe
    const scale = (0.5 + Math.abs(neuron.bias)) * breathe
    meshRef.current.scale.setScalar(scale)
    
    // Emissive intensity pulse
    if (meshRef.current.material) {
      // @ts-ignore
      meshRef.current.material.emissiveIntensity = 1.5 + Math.sin(time * 3) * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={neuron.position}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial 
        color={baseColor}
        emissive={baseColor}
        emissiveIntensity={2}
        toneMapped={false}
      />
    </mesh>
  )
}
