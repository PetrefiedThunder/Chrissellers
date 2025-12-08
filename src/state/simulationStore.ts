import { create } from 'zustand'
import { 
  NetworkArchitecture, 
  Neuron, 
  Connection, 
  TrainingConfig,
  TrainingMetrics
} from '../lib/neural/types'
import { initializeNetwork, trainBatch, evaluate } from '../lib/neural/engine'
import { layoutNeurons } from '../lib/neural/networkLayout'
import { getDataset, batchDataset, shuffleDataset } from '../lib/neural/datasets'

interface SimulationState {
  // Configuration
  architecture: NetworkArchitecture
  config: TrainingConfig
  
  // Network State
  neurons: Neuron[]
  connections: Connection[]
  
  // Training State
  isTraining: boolean
  currentEpoch: number
  metrics: TrainingMetrics[]
  
  // Visualization State
  constellationMode: boolean

  // Actions
  initialize: () => void
  startTraining: () => void
  pauseTraining: () => void
  reset: () => void
  step: () => void // Single training step (batch or epoch)
  toggleConstellationMode: () => void
}

const DEFAULT_ARCH: NetworkArchitecture = {
  layers: [
    { id: 'input', neurons: 3, activation: 'linear', type: 'input' },
    { id: 'hidden1', neurons: 6, activation: 'relu', type: 'hidden' },
    { id: 'hidden2', neurons: 6, activation: 'relu', type: 'hidden' },
    { id: 'output', neurons: 2, activation: 'sigmoid', type: 'output' }
  ]
}

const DEFAULT_CONFIG: TrainingConfig = {
  learningRate: 0.1,
  batchSize: 2,
  epochs: 100,
  optimizer: 'sgd'
}

export const useSimulationStore = create<SimulationState>((set, get) => ({
  architecture: DEFAULT_ARCH,
  config: DEFAULT_CONFIG,
  neurons: [],
  connections: [],
  isTraining: false,
  currentEpoch: 0,
  metrics: [],
  constellationMode: false,

  initialize: () => {
    const { architecture } = get()
    const { neurons, connections } = initializeNetwork(architecture)
    const positionedNeurons = layoutNeurons(neurons, architecture)
    
    set({ 
      neurons: positionedNeurons, 
      connections,
      currentEpoch: 0,
      metrics: [],
      isTraining: false
    })
  },

  startTraining: () => {
    set({ isTraining: true })
  },

  pauseTraining: () => {
    set({ isTraining: false })
  },

  reset: () => {
    get().initialize()
  },

  toggleConstellationMode: () => {
    set(state => ({ constellationMode: !state.constellationMode }))
  },

  step: () => {
    const { 
      isTraining, 
      neurons, 
      connections, 
      config, 
      architecture, 
      currentEpoch 
    } = get()

    if (!isTraining) return

    // Get Data
    const dataset = getDataset('compliance-v1')
    const shuffled = shuffleDataset(dataset)
    const batches = batchDataset(shuffled, config.batchSize)

    // Train one epoch (all batches)
    let currentNeurons = neurons
    let currentConnections = connections

    for (const batch of batches) {
      const result = trainBatch(batch, currentNeurons, currentConnections, config, architecture)
      currentNeurons = result.neurons
      currentConnections = result.connections
    }

    // Evaluate
    const { loss, accuracy } = evaluate(dataset.examples, currentNeurons, currentConnections, config, architecture)

    // Update State
    // Note: We re-run layout to keep positions but update internal values? 
    // Actually layout is static for now unless we want them to move. 
    // We just need to merge the new weights/biases into the existing positioned neurons.
    
    const updatedNeurons = currentNeurons.map((n, i) => ({
      ...n,
      position: neurons[i].position // Keep visual position
    }))

    set({
      neurons: updatedNeurons,
      connections: currentConnections,
      currentEpoch: currentEpoch + 1,
      metrics: [...get().metrics, { epoch: currentEpoch + 1, loss, accuracy }]
    })

    if (currentEpoch >= config.epochs) {
      set({ isTraining: false })
    }
  }
}))
