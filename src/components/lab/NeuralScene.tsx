/**
 * Neural Scene Component
 *
 * Main Three.js scene containing the 3D neural network visualization.
 */

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useSimulationStore } from '../../state/simulationStore'
import Neuron from './Neuron'
import Connection from './Connection'
import Starfield from './Starfield'

export default function NeuralScene() {
  const {
    neurons,
    connections,
    showConnections,
    selectedNeuron,
    selectedConnection,
    selectNeuron,
    selectConnection,
  } = useSimulationStore()

  // Find neuron by ID
  const getNeuronById = (id: string) => neurons.find((n) => n.id === id)

  return (
    <div className="w-full h-full">
      <Canvas>
        {/* Camera */}
        <PerspectiveCamera makeDefault position={[0, 0, 25]} fov={60} />

        {/* Orbit controls */}
        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          minDistance={10}
          maxDistance={50}
          target={[0, 0, 0]}
        />

        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#6366f1" />

        {/* Starfield background */}
        <Starfield />

        {/* Connections (render first so they appear behind neurons) */}
        {connections.map((connection) => {
          const fromNeuron = getNeuronById(connection.from)
          const toNeuron = getNeuronById(connection.to)

          if (!fromNeuron || !toNeuron) return null

          return (
            <Connection
              key={connection.id}
              connection={connection}
              fromNeuron={fromNeuron}
              toNeuron={toNeuron}
              isSelected={selectedConnection === connection.id}
              showConnections={showConnections}
            />
          )
        })}

        {/* Neurons */}
        {neurons.map((neuron) => (
          <Neuron
            key={neuron.id}
            neuron={neuron}
            isSelected={selectedNeuron === neuron.id}
            onClick={() => {
              selectNeuron(neuron.id === selectedNeuron ? null : neuron.id)
              selectConnection(null)
            }}
          />
        ))}
      </Canvas>
    </div>
  )
}
