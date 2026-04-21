import { memo, useMemo } from 'react'
import { useSimulationStore } from '@/src/state/simulationStore'
import { StarNeuron } from './StarNeuron'
import { ConstellationConnection } from './ConstellationConnection'
import { Center } from '@react-three/drei'

export const NeuralGalaxy = memo(function NeuralGalaxy() {
  const neurons = useSimulationStore(state => state.neurons)
  const connections = useSimulationStore(state => state.connections)

  const neuronElements = useMemo(() => 
    neurons.map(neuron => <StarNeuron key={neuron.id} neuron={neuron} />),
    [neurons]
  )

  const connectionElements = useMemo(() =>
    connections.map(connection => (
      <ConstellationConnection 
        key={connection.id} 
        connection={connection} 
        neurons={neurons}
      />
    )),
    [connections, neurons]
  )

  return (
    <Center>
      <group>
        {neuronElements}
        {connectionElements}
      </group>
    </Center>
  )
})
