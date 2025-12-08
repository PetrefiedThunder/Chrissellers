import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Vector3, Color, ShaderMaterial } from 'three'
import { Connection, Neuron } from '@/src/lib/neural/types'
import { getConnectionPoints } from '@/src/lib/neural/networkLayout'
import { useSimulationStore } from '@/src/state/simulationStore'
import './shaders/EnergyBeamMaterial' // Register shader

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
  
  // Orientation
  const quaternion = useMemo(() => {
    const tempObj = new Mesh()
    tempObj.position.copy(startVec)
    // Rotate 90 deg to align cylinder with lookAt? 
    // Cylinder default is Y-axis. lookAt aligns Z-axis.
    // We need to rotate the geometry or the mesh.
    // Actually, let's just use lookAt and rotate X by 90.
    tempObj.lookAt(endVec)
    tempObj.rotateX(Math.PI / 2)
    return tempObj.quaternion
  }, [startVec, endVec])

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return
    
    const weightStrength = Math.abs(connection.weight)
    
    // Constellation Mode Logic
    if (constellationMode) {
      // Hide weak connections
      if (weightStrength < 0.3) {
        meshRef.current.visible = false
        return
      }
    }
    meshRef.current.visible = true

    // Update Shader Uniforms
    materialRef.current.uniforms.time.value = state.clock.getElapsedTime()
    materialRef.current.uniforms.opacity.value = (0.1 + (weightStrength * 0.5)) * (constellationMode ? 0.5 : 1)
    materialRef.current.uniforms.speed.value = 1.0 + weightStrength * 2.0 // Faster flow for stronger weights
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
        blending={2} // AdditiveBlending
        depthWrite={false}
      />
    </mesh>
  )
}
