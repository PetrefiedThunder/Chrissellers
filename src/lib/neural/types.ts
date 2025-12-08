export type ActivationFunction = 'relu' | 'sigmoid' | 'tanh' | 'linear'

export interface LayerConfig {
  id: string
  neurons: number
  activation: ActivationFunction
  type: 'input' | 'hidden' | 'output'
}

export interface NetworkArchitecture {
  layers: LayerConfig[]
}

export interface TrainingConfig {
  learningRate: number
  batchSize: number
  epochs: number
  optimizer: 'sgd' | 'adam'
}

export interface Neuron {
  id: string
  layerId: string
  layerIndex: number
  indexInLayer: number
  bias: number
  activation: number // Current activation value
  delta: number // For backprop
  position: [number, number, number] // 3D position for visualization
}

export interface Connection {
  id: string
  sourceId: string
  targetId: string
  weight: number
  gradient: number // For backprop
}

export interface TrainingExample {
  input: number[]
  target: number[]
}

export interface Dataset {
  id: string
  name: string
  description: string
  examples: TrainingExample[]
}

export interface TrainingMetrics {
  epoch: number
  loss: number
  accuracy: number
}

export interface PredictionResult {
  predictions: number[]
  activations: Map<string, number> // Neuron ID -> Activation
}
