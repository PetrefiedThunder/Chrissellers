import { create } from 'zustand'
import { 
  NetworkArchitecture, 
  Neuron, 
  Connection, 
  TrainingConfig,
  TrainingMetrics,
  TrainingExample
} from '../lib/neural/types'
import { initializeNetwork, trainBatch, evaluate } from '../lib/neural/engine'
import { layoutNeurons } from '../lib/neural/networkLayout'
import { getDataset, batchDataset, shuffleDataset } from '../lib/neural/datasets'

interface SimulationState {
  architecture: NetworkArchitecture
  config: TrainingConfig
  
  neurons: Neuron[]
  connections: Connection[]
  
  isTraining: boolean
  currentEpoch: number
  metrics: TrainingMetrics[]
  
  constellationMode: boolean

  currentBatches: TrainingExample[][] | null
  currentBatchIndex: number

  initialize: () => void
  startTraining: () => void
  pauseTraining: () => void
  reset: () => void
  step: () => void
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
  currentBatches: null,
  currentBatchIndex: 0,

  initialize: () => {
    const { architecture } = get()
    const { neurons, connections } = initializeNetwork(architecture)
    const positionedNeurons = layoutNeurons(neurons, architecture)
    
    set({ 
      neurons: positionedNeurons, 
      connections,
      currentEpoch: 0,
      metrics: [],
      isTraining: false,
      currentBatches: null,
      currentBatchIndex: 0
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
      currentEpoch,
      currentBatches,
      currentBatchIndex
    } = get()

    if (!isTraining) return
    if (currentEpoch < 0 || currentEpoch >= config.epochs) {
      set({ isTraining: false })
      return
    }

    let batches = currentBatches
    let batchIdx = currentBatchIndex
    let epoch = currentEpoch

    if (!batches || batchIdx >= batches.length) {
      const dataset = getDataset('compliance-v1')
      const shuffled = shuffleDataset(dataset)
      batches = batchDataset(shuffled, config.batchSize)
      batchIdx = 0
      epoch = currentEpoch + 1
    }

    const batch = batches[batchIdx]

    const result = trainBatch(batch, neurons, connections, config, architecture)

    const updatedNeurons = result.neurons.map((n, i) => ({
      ...n,
      position: neurons[i].position,
      activation: n.activation
    }))

    if (batchIdx + 1 >= batches.length) {
      const dataset = getDataset('compliance-v1')
      const { loss, accuracy } = evaluate(
        dataset.examples, 
        result.neurons, 
        result.connections, 
        config, 
        architecture
      )
      
      const newEpoch = epoch
      const shouldContinue = newEpoch < config.epochs
      
      set({
        neurons: updatedNeurons,
        connections: result.connections,
        currentEpoch: shouldContinue ? newEpoch : config.epochs,
        metrics: [...get().metrics, { epoch: newEpoch, loss, accuracy }],
        currentBatches: null,
        currentBatchIndex: 0,
        isTraining: shouldContinue
      })
    } else {
      set({
        neurons: updatedNeurons,
        connections: result.connections,
        currentBatches: batches,
        currentBatchIndex: batchIdx + 1
      })
    }
  }
}))
