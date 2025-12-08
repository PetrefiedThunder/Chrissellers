import { NetworkArchitecture, Neuron, Connection } from './types'

const LAYER_SPACING = 15 // Increased for "cosmic" scale
const NEURON_SPACING = 4

export function layoutNeurons(neurons: Neuron[], arch: NetworkArchitecture): Neuron[] {
  const updatedNeurons = [...neurons]
  
  // Calculate offsets to center the network
  const totalLayers = arch.layers.length
  const xOffset = -((totalLayers - 1) * LAYER_SPACING) / 2

  for (const neuron of updatedNeurons) {
    const layer = arch.layers[neuron.layerIndex]
    const neuronsInLayer = layer.neurons
    
    // X Position: Layer index
    const x = xOffset + neuron.layerIndex * LAYER_SPACING
    
    // Y Position: Centered in layer
    const yOffset = -((neuronsInLayer - 1) * NEURON_SPACING) / 2
    const y = yOffset + neuron.indexInLayer * NEURON_SPACING
    
    // Z Position: Random "depth" for the galaxy effect
    // Input/Output layers are flatter, hidden layers are more volumetric
    const isHidden = layer.type === 'hidden'
    const zSpread = isHidden ? 8 : 2
    const z = (Math.random() - 0.5) * zSpread

    // Add some organic noise to X and Y as well
    const noise = 0.5
    const organicX = x + (Math.random() - 0.5) * noise
    const organicY = y + (Math.random() - 0.5) * noise

    neuron.position = [organicX, organicY, z]
  }

  return updatedNeurons
}

export function getConnectionPoints(
  connection: Connection, 
  neurons: Neuron[]
): [number, number, number][] {
  const source = neurons.find(n => n.id === connection.sourceId)
  const target = neurons.find(n => n.id === connection.targetId)
  
  if (!source || !target) return [[0,0,0], [0,0,0]]
  
  return [source.position, target.position]
}
