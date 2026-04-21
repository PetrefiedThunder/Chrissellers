import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Vector3, Quaternion, ShaderMaterial, AdditiveBlending } from 'three'
import { Connection, Neuron } from '@/src/lib/neural/types'
import { getConnectionPoints } from '@/src/lib/neural/networkLayout'
import { useSimulationStore } from '@/src/state/simulationStore'
import './shaders/EnergyBeamMaterial'

interface ConstellationConnectionProps {
  connection: Connection
  neurons: Neuron[]
}

export function ConstellationConnection({ connection, neurons }: ConstellationConnectionProps) {
  const meshRef = useRef<Mesh>(null)
  const materialRef = useRef<ShaderMaterial>(null)
  const constellationMode = useSimulationStore(state => state.constellationMode)
  
  const [start, end] = useMemo(() => getConnectionPoints(connection, neurons), [connection, neurons])
  const startVec = useMemo(() => new Vector3(...start), [start])
  const endVec = useMemo(() => new Vector3(...end), [end])
  
  const length = useMemo(() => startVec.distanceTo(endVec), [startVec, endVec])
  const position = useMemo(() => startVec.clone().add(endVec).multiplyScalar(0.5), [startVec, endVec])
  
  const quaternion = useMemo(() => {
    const q = new Quaternion()
    const up = new Vector3(0, 1, 0)
    const direction = new Vector3().subVectors(endVec, startVec).normalize()
    if (direction.length() > 0.001) {
      q.setFromUnitVectors(up, direction)
    }
    return q
  }, [startVec, endVec])

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return
    
    const weightStrength = Math.abs(connection.weight)
    
    if (constellationMode) {
      if (weightStrength < 0.3) {
        meshRef.current.visible = false
        return
      }
    }
    meshRef.current.visible = true

    materialRef.current.uniforms.time.value = state.clock.getElapsedTime()
    materialRef.current.uniforms.opacity.value = (0.1 + (weightStrength * 0.5)) * (constellationMode ? 0.5 : 1)
    materialRef.current.uniforms.speed.value = 1.0 + weightStrength * 2.0
  })

  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      quaternion={quaternion}
    >
      <cylinderGeometry args={[0.03, 0.03, length, 8, 1, true]} />
      <energyBeamMaterial 
        ref={materialRef}
        transparent
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}
