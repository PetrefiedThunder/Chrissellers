/**
 * Network Layout & Visualization
 *
 * Generates 3D positions and visual properties for neurons and connections.
 */

import {
  NetworkArchitecture,
  NetworkWeights,
  NeuronVisual,
  ConnectionVisual,
  Vector,
  STAKEHOLDER_TYPES,
  REGULATION_DOMAINS,
  OUTCOME_METRICS,
} from '../neural/types'

// ============================================================================
// Constants
// ============================================================================

const LAYER_SPACING = 8 // Distance between layers
const NEURON_SPACING = 2 // Distance between neurons in a layer

// ============================================================================
// Neuron Layout
// ============================================================================

/**
 * Generate 3D positions for all neurons
 */
export function generateNeuronVisuals(architecture: NetworkArchitecture): NeuronVisual[] {
  const neurons: NeuronVisual[] = []
  const { inputSize, hiddenLayers, outputSize } = architecture

  // All layer sizes
  const layerSizes = [inputSize, ...hiddenLayers, outputSize]
  const numLayers = layerSizes.length

  let neuronId = 0

  // Position each layer
  layerSizes.forEach((size, layerIndex) => {
    const layerType =
      layerIndex === 0
        ? 'input'
        : layerIndex === numLayers - 1
        ? 'output'
        : 'hidden'

    // Center the layer around origin
    const yOffset = -(size - 1) * NEURON_SPACING / 2

    for (let i = 0; i < size; i++) {
      const x = layerIndex * LAYER_SPACING - ((numLayers - 1) * LAYER_SPACING) / 2
      const y = yOffset + i * NEURON_SPACING
      const z = 0

      // Assign labels based on layer type
      let label = ''
      let stakeholderType: string | undefined
      let regulationDomain: string | undefined
      let outcomeType: string | undefined

      if (layerType === 'input') {
        // Input layer: stakeholder types
        const stakeholderIndex = i % STAKEHOLDER_TYPES.length
        stakeholderType = STAKEHOLDER_TYPES[stakeholderIndex].id
        label = STAKEHOLDER_TYPES[stakeholderIndex].name
      } else if (layerType === 'hidden') {
        // Hidden layers: regulation domains
        const domainIndex = i % REGULATION_DOMAINS.length
        regulationDomain = REGULATION_DOMAINS[domainIndex].id
        label = REGULATION_DOMAINS[domainIndex].name
      } else {
        // Output layer: outcomes
        const outcomeIndex = i % OUTCOME_METRICS.length
        outcomeType = OUTCOME_METRICS[outcomeIndex].id
        label = OUTCOME_METRICS[outcomeIndex].name
      }

      neurons.push({
        id: `neuron-${neuronId}`,
        layer: layerIndex,
        index: i,
        position: [x, y, z],
        activation: 0,
        type: layerType,
        stakeholderType,
        regulationDomain,
        outcomeType,
        label,
      })

      neuronId++
    }
  })

  return neurons
}

// ============================================================================
// Connection Layout
// ============================================================================

/**
 * Generate connections between neurons
 */
export function generateConnectionVisuals(
  neurons: NeuronVisual[],
  weights: NetworkWeights,
  activations: Vector[]
): ConnectionVisual[] {
  const connections: ConnectionVisual[] = []

  // Get neurons by layer
  const layerNeurons: NeuronVisual[][] = []
  const maxLayer = Math.max(...neurons.map((n) => n.layer))

  for (let i = 0; i <= maxLayer; i++) {
    layerNeurons[i] = neurons.filter((n) => n.layer === i)
  }

  // Create connections between adjacent layers
  for (let layerIndex = 0; layerIndex < weights.weights.length; layerIndex++) {
    const fromLayer = layerNeurons[layerIndex]
    const toLayer = layerNeurons[layerIndex + 1]
    const weightMatrix = weights.weights[layerIndex]

    // For each connection in the weight matrix
    for (let toIdx = 0; toIdx < weightMatrix.length; toIdx++) {
      for (let fromIdx = 0; fromIdx < weightMatrix[toIdx].length; fromIdx++) {
        const weight = weightMatrix[toIdx][fromIdx]
        const fromNeuron = fromLayer[fromIdx]
        const toNeuron = toLayer[toIdx]

        // Calculate connection strength (normalized)
        const strength = Math.abs(weight)

        // Check if connection is active (both neurons have high activation)
        const fromActivation = activations[layerIndex]?.[fromIdx] || 0
        const toActivation = activations[layerIndex + 1]?.[toIdx] || 0
        const active = fromActivation > 0.5 && toActivation > 0.5

        connections.push({
          id: `conn-${fromNeuron.id}-${toNeuron.id}`,
          from: fromNeuron.id,
          to: toNeuron.id,
          weight,
          active,
          strength,
        })
      }
    }
  }

  return connections
}

// ============================================================================
// Color Utilities
// ============================================================================

/**
 * Get neuron color based on type
 */
export function getNeuronColor(neuron: NeuronVisual): string {
  if (neuron.type === 'input' && neuron.stakeholderType) {
    const stakeholder = STAKEHOLDER_TYPES.find((s) => s.id === neuron.stakeholderType)
    return stakeholder?.color || '#6366f1'
  }

  if (neuron.type === 'hidden' && neuron.regulationDomain) {
    const domain = REGULATION_DOMAINS.find((d) => d.id === neuron.regulationDomain)
    return domain?.color || '#8b5cf6'
  }

  if (neuron.type === 'output' && neuron.outcomeType) {
    const outcome = OUTCOME_METRICS.find((o) => o.id === neuron.outcomeType)
    return outcome?.color || '#22c55e'
  }

  return '#6366f1'
}

/**
 * Get connection color based on weight
 */
export function getConnectionColor(weight: number): string {
  if (weight > 0) {
    return '#22c55e' // Positive: green
  } else {
    return '#ef4444' // Negative: red
  }
}

/**
 * Get connection opacity based on strength
 */
export function getConnectionOpacity(strength: number, active: boolean): number {
  const baseOpacity = Math.min(strength * 0.5, 0.8)
  return active ? baseOpacity : baseOpacity * 0.3
}
