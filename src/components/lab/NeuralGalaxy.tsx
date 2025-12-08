import { useSimulationStore } from '@/src/state/simulationStore'
import { StarNeuron } from './StarNeuron'
import { ConstellationConnection } from './ConstellationConnection'
import { Center } from '@react-three/drei'

export function NeuralGalaxy() {
  const neurons = useSimulationStore(state => state.neurons)
  const connections = useSimulationStore(state => state.connections)

  return (
    <Center>
      <group>
        {neurons.map(neuron => (
          <StarNeuron key={neuron.id} neuron={neuron} />
        ))}
        
        {connections.map(connection => (
          <ConstellationConnection 
            key={connection.id} 
            connection={connection} 
            neurons={neurons}
          />
        ))}
      </group>
    </Center>
  )
}
