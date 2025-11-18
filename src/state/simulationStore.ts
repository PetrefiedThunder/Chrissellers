/**
 * Simulation State Store
 *
 * Central state management for the neural network simulation.
 * Manages network state, training progress, and visualization data.
 */

import { create } from 'zustand'
import {
  NetworkArchitecture,
  NetworkWeights,
  TrainingConfig,
  TrainingMetrics,
  NeuronVisual,
  ConnectionVisual,
  ActivationFunctionType,
  Vector,
} from '../lib/neural/types'
import { DatasetKey } from '../lib/neural/datasets'

// ============================================================================
// State Interface
// ============================================================================

export interface SimulationState {
  // Network architecture
  architecture: NetworkArchitecture
  weights: NetworkWeights | null

  // Training configuration
  config: TrainingConfig

  // Dataset
  currentDataset: DatasetKey

  // Training state
  isTraining: boolean
  isPaused: boolean
  currentEpoch: number
  trainingHistory: TrainingMetrics[]

  // Visualization
  neurons: NeuronVisual[]
  connections: ConnectionVisual[]
  currentActivations: Vector[]

  // UI state
  selectedNeuron: string | null
  selectedConnection: string | null
  cameraPreset: 'full' | 'stakeholders' | 'regulations' | 'outcomes'
  showLabels: boolean
  showConnections: boolean
  animationSpeed: number // 1 = real-time, 2 = 2x, etc.

  // Scenario controls
  supportLevel: number // 0-1
  enforcementLevel: number // 0-1
  enabledRegulations: {
    food_safety: boolean
    accessibility: boolean
    labor: boolean
    environmental: boolean
    equity: boolean
  }
}

export interface SimulationActions {
  // Architecture
  setArchitecture: (architecture: NetworkArchitecture) => void
  setWeights: (weights: NetworkWeights) => void

  // Training config
  setLearningRate: (rate: number) => void
  setBatchSize: (size: number) => void
  setEpochs: (epochs: number) => void
  setActivationFunction: (fn: ActivationFunctionType) => void

  // Dataset
  setDataset: (dataset: DatasetKey) => void

  // Training control
  startTraining: () => void
  pauseTraining: () => void
  stopTraining: () => void
  stepEpoch: () => void
  resetNetwork: () => void

  // Metrics
  addMetrics: (metrics: TrainingMetrics) => void
  clearHistory: () => void

  // Visualization
  updateNeurons: (neurons: NeuronVisual[]) => void
  updateConnections: (connections: ConnectionVisual[]) => void
  updateActivations: (activations: Vector[]) => void

  // UI
  selectNeuron: (id: string | null) => void
  selectConnection: (id: string | null) => void
  setCameraPreset: (preset: 'full' | 'stakeholders' | 'regulations' | 'outcomes') => void
  toggleLabels: () => void
  toggleConnections: () => void
  setAnimationSpeed: (speed: number) => void

  // Scenario
  setSupportLevel: (level: number) => void
  setEnforcementLevel: (level: number) => void
  toggleRegulation: (regulation: keyof SimulationState['enabledRegulations']) => void
}

export type SimulationStore = SimulationState & SimulationActions

// ============================================================================
// Initial State
// ============================================================================

const initialArchitecture: NetworkArchitecture = {
  inputSize: 8,
  hiddenLayers: [12, 8],
  outputSize: 4,
}

const initialConfig: TrainingConfig = {
  learningRate: 0.01,
  batchSize: 5,
  epochs: 100,
  activationFunction: 'relu',
  lossFunction: 'mse',
}

// ============================================================================
// Store
// ============================================================================

export const useSimulationStore = create<SimulationStore>((set) => ({
  // Initial state
  architecture: initialArchitecture,
  weights: null,
  config: initialConfig,
  currentDataset: 'baseline',
  isTraining: false,
  isPaused: false,
  currentEpoch: 0,
  trainingHistory: [],
  neurons: [],
  connections: [],
  currentActivations: [],
  selectedNeuron: null,
  selectedConnection: null,
  cameraPreset: 'full',
  showLabels: true,
  showConnections: true,
  animationSpeed: 1,
  supportLevel: 0.5,
  enforcementLevel: 0.5,
  enabledRegulations: {
    food_safety: true,
    accessibility: true,
    labor: true,
    environmental: true,
    equity: true,
  },

  // Architecture actions
  setArchitecture: (architecture) => set({ architecture }),
  setWeights: (weights) => set({ weights }),

  // Training config actions
  setLearningRate: (rate) =>
    set((state) => ({
      config: { ...state.config, learningRate: rate },
    })),

  setBatchSize: (size) =>
    set((state) => ({
      config: { ...state.config, batchSize: size },
    })),

  setEpochs: (epochs) =>
    set((state) => ({
      config: { ...state.config, epochs },
    })),

  setActivationFunction: (fn) =>
    set((state) => ({
      config: { ...state.config, activationFunction: fn },
    })),

  // Dataset actions
  setDataset: (dataset) => set({ currentDataset: dataset }),

  // Training control actions
  startTraining: () => set({ isTraining: true, isPaused: false }),

  pauseTraining: () => set({ isPaused: true }),

  stopTraining: () =>
    set({
      isTraining: false,
      isPaused: false,
      currentEpoch: 0,
    }),

  stepEpoch: () =>
    set((state) => ({
      currentEpoch: state.currentEpoch + 1,
    })),

  resetNetwork: () =>
    set({
      weights: null,
      currentEpoch: 0,
      trainingHistory: [],
      isTraining: false,
      isPaused: false,
    }),

  // Metrics actions
  addMetrics: (metrics) =>
    set((state) => ({
      trainingHistory: [...state.trainingHistory, metrics],
    })),

  clearHistory: () => set({ trainingHistory: [] }),

  // Visualization actions
  updateNeurons: (neurons) => set({ neurons }),

  updateConnections: (connections) => set({ connections }),

  updateActivations: (activations) => set({ currentActivations: activations }),

  // UI actions
  selectNeuron: (id) => set({ selectedNeuron: id }),

  selectConnection: (id) => set({ selectedConnection: id }),

  setCameraPreset: (preset) => set({ cameraPreset: preset }),

  toggleLabels: () => set((state) => ({ showLabels: !state.showLabels })),

  toggleConnections: () =>
    set((state) => ({ showConnections: !state.showConnections })),

  setAnimationSpeed: (speed) => set({ animationSpeed: speed }),

  // Scenario actions
  setSupportLevel: (level) => set({ supportLevel: level }),

  setEnforcementLevel: (level) => set({ enforcementLevel: level }),

  toggleRegulation: (regulation) =>
    set((state) => ({
      enabledRegulations: {
        ...state.enabledRegulations,
        [regulation]: !state.enabledRegulations[regulation],
      },
    })),
}))
