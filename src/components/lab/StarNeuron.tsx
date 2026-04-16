import { memo, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Color, MeshStandardMaterial } from 'three'
import { Neuron } from '@/src/lib/neural/types'
import { useSimulationStore } from '@/src/state/simulationStore'

interface StarNeuronProps {
  neuron: Neuron
}

export const StarNeuron = memo(function StarNeuron({ neuron }: StarNeuronProps) {
  const meshRef = useRef<Mesh>(null)
  const constellationMode = useSimulationStore(state => state.constellationMode)
  
  const baseColor = useMemo(() => {
    const colors = ['#60A5FA', '#A78BFA', '#F472B6', '#FBBF24']
    return new Color(colors[neuron.layerIndex % colors.length])
  }, [neuron.layerIndex])

  const geometryArgs: [number, number, number] = [0.4, 16, 16]

  useFrame((state) => {
    if (!meshRef.current) return
    
    const material = meshRef.current.material as MeshStandardMaterial | undefined
    
    if (constellationMode) {
      if (Math.abs(neuron.activation) < 0.1) {
        meshRef.current.visible = false
        return
      }
    }
    meshRef.current.visible = true

    const time = state.clock.getElapsedTime()
    const breathe = Math.sin(time * 2 + neuron.indexInLayer) * 0.1 + 1
    const scale = (0.5 + Math.abs(neuron.activation)) * breathe
    meshRef.current.scale.setScalar(scale)
    
    if (material) {
      material.emissiveIntensity = 1.5 + Math.sin(time * 3) * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={neuron.position}>
      <sphereGeometry args={geometryArgs} />
      <meshStandardMaterial 
        color={baseColor}
        emissive={baseColor}
        emissiveIntensity={2}
        toneMapped={false}
      />
    </mesh>
  )
}, (prev, next) => {
  return prev.neuron.id === next.neuron.id &&
         prev.neuron.activation === next.neuron.activation &&
         prev.neuron.bias === next.neuron.bias
})
