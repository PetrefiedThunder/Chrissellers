/**
 * Neural Network Type Definitions
 *
 * Defines the structure for a regulatory compliance neural network
 * that models stakeholders, regulations, and community outcomes.
 */

// ============================================================================
// Core Types
// ============================================================================

export type Matrix = number[][]
export type Vector = number[]

export interface NetworkArchitecture {
  inputSize: number      // Number of input neurons (stakeholders)
  hiddenLayers: number[] // Array of hidden layer sizes (regulation domains)
  outputSize: number     // Number of output neurons (outcomes)
}

export interface NetworkWeights {
  weights: Matrix[]      // Weight matrices between layers
  biases: Vector[]       // Bias vectors for each layer
}

export interface LayerActivation {
  raw: Vector           // Pre-activation values (z)
  activated: Vector     // Post-activation values (a)
}

export interface ForwardPassResult {
  activations: LayerActivation[] // Activations for each layer
  predictions: Vector            // Final output predictions
}

// ============================================================================
// Training Types
// ============================================================================

export interface TrainingExample {
  input: Vector
  target: Vector
  label?: string          // Optional human-readable label
  metadata?: {
    stakeholderType?: string
    regulationDomain?: string
    scenario?: string
  }
}

export interface Dataset {
  examples: TrainingExample[]
  inputSize: number
  outputSize: number
  description: string
}

export interface TrainingConfig {
  learningRate: number
  batchSize: number
  epochs: number
  activationFunction: ActivationFunctionType
  lossFunction: LossFunctionType
}

export interface TrainingMetrics {
  epoch: number
  loss: number
  accuracy: number
  equityScore: number    // Fairness metric
  burden: number         // Compliance burden
  benefit: number        // Social benefit
  timestamp: number
}

export interface TrainingHistory {
  metrics: TrainingMetrics[]
  finalWeights: NetworkWeights
  bestEpoch: number
}

// ============================================================================
// Activation & Loss Functions
// ============================================================================

export type ActivationFunctionType = 'relu' | 'sigmoid' | 'tanh' | 'leaky_relu'
export type LossFunctionType = 'mse' | 'cross_entropy'

export interface ActivationFunction {
  forward: (x: number) => number
  derivative: (x: number) => number
}

// ============================================================================
// Network State Types
// ============================================================================

export interface NeuralNetwork {
  architecture: NetworkArchitecture
  weights: NetworkWeights
  config: TrainingConfig
  history: TrainingHistory
}

// ============================================================================
// Visualization Types (for 3D rendering)
// ============================================================================

export interface NeuronVisual {
  id: string
  layer: number
  index: number
  position: [number, number, number]
  activation: number
  type: 'input' | 'hidden' | 'output'
  stakeholderType?: string
  regulationDomain?: string
  outcomeType?: string
  label?: string
}

export interface ConnectionVisual {
  id: string
  from: string          // Neuron ID
  to: string            // Neuron ID
  weight: number
  active: boolean       // Is this connection active in current forward pass?
  strength: number      // Normalized weight for visual scaling
}

export interface NetworkVisualState {
  neurons: NeuronVisual[]
  connections: ConnectionVisual[]
  currentActivations: Vector[]
  isTraining: boolean
}

// ============================================================================
// Policy & Regulation Types
// ============================================================================

export interface RegulationDomain {
  id: string
  name: string
  color: string
  description: string
}

export interface StakeholderType {
  id: string
  name: string
  color: string
  isVulnerable: boolean
}

export interface OutcomeMetric {
  id: string
  name: string
  color: string
  unit: string
}

export const REGULATION_DOMAINS: RegulationDomain[] = [
  { id: 'food_safety', name: 'Food Safety', color: '#ef4444', description: 'Health codes, certifications' },
  { id: 'accessibility', name: 'Accessibility', color: '#3b82f6', description: 'ADA compliance, universal design' },
  { id: 'labor', name: 'Labor Standards', color: '#10b981', description: 'Wages, working conditions' },
  { id: 'environmental', name: 'Environmental', color: '#22c55e', description: 'Sustainability, waste management' },
  { id: 'equity', name: 'Equity & Inclusion', color: '#a855f7', description: 'Fair access, representation' },
]

export const STAKEHOLDER_TYPES: StakeholderType[] = [
  { id: 'small_business', name: 'Small Business', color: '#f59e0b', isVulnerable: false },
  { id: 'vulnerable_worker', name: 'Vulnerable Worker', color: '#ec4899', isVulnerable: true },
  { id: 'regulator', name: 'Regulator', color: '#6366f1', isVulnerable: false },
  { id: 'community_org', name: 'Community Org', color: '#8b5cf6', isVulnerable: false },
  { id: 'resident', name: 'Resident', color: '#14b8a6', isVulnerable: false },
]

export const OUTCOME_METRICS: OutcomeMetric[] = [
  { id: 'safety', name: 'Safety', color: '#ef4444', unit: 'score' },
  { id: 'opportunity', name: 'Economic Opportunity', color: '#f59e0b', unit: 'score' },
  { id: 'inclusion', name: 'Inclusion', color: '#a855f7', unit: 'score' },
  { id: 'sustainability', name: 'Sustainability', color: '#22c55e', unit: 'score' },
]
