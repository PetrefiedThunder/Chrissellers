/**
 * Neural Network Engine
 *
 * Core training and inference engine for the regulatory compliance neural network.
 * Implements forward propagation, backpropagation, and gradient descent.
 */

import {
  NetworkArchitecture,
  NetworkWeights,
  LayerActivation,
  ForwardPassResult,
  TrainingExample,
  TrainingConfig,
  Vector,
  Matrix,
} from './types'
import {
  matrixVectorMultiply,
  vectorAdd,
  vectorSubtract,
  vectorScale,
  vectorMultiply,
  outerProduct,
  matrixSubtract,
  transposeMatrix,
  heInitialize,
  zerosVector,
  clampVector,
  sanitizeVector,
  sanitizeMatrix,
} from './math'
import { getActivationFunction, applyActivation, applyActivationDerivative } from './activationFunctions'

// ============================================================================
// Network Initialization
// ============================================================================

/**
 * Initialize network weights using He initialization (good for ReLU)
 */
export function initializeNetwork(architecture: NetworkArchitecture): NetworkWeights {
  const { inputSize, hiddenLayers, outputSize } = architecture
  const weights: Matrix[] = []
  const biases: Vector[] = []

  // Layer sizes including input and output
  const layerSizes = [inputSize, ...hiddenLayers, outputSize]

  // Initialize weights and biases for each layer transition
  for (let i = 0; i < layerSizes.length - 1; i++) {
    const inputDim = layerSizes[i]
    const outputDim = layerSizes[i + 1]

    // Use He initialization for better training with ReLU
    weights.push(heInitialize(inputDim, outputDim))
    biases.push(zerosVector(outputDim))
  }

  return { weights, biases }
}

// ============================================================================
// Forward Propagation
// ============================================================================

/**
 * Perform forward pass through the network
 */
export function forwardPass(
  input: Vector,
  weights: NetworkWeights,
  config: TrainingConfig
): ForwardPassResult {
  const activationFn = getActivationFunction(config.activationFunction)
  const activations: LayerActivation[] = []

  // Start with input as first activation
  let currentActivation = input

  // Process each layer
  for (let i = 0; i < weights.weights.length; i++) {
    // Compute weighted sum: z = Wx + b
    let raw = matrixVectorMultiply(weights.weights[i], currentActivation)
    raw = vectorAdd(raw, weights.biases[i])

    // Clamp to prevent overflow
    raw = clampVector(raw)

    // Apply activation function
    let activated: Vector

    // Use softmax for output layer if multi-class, otherwise use specified activation
    if (i === weights.weights.length - 1) {
      // Output layer - use sigmoid for interpretability (probability-like)
      const sigmoidFn = getActivationFunction('sigmoid')
      activated = applyActivation(raw, sigmoidFn)
    } else {
      // Hidden layers - use specified activation
      activated = applyActivation(raw, activationFn)
    }

    activations.push({ raw, activated })
    currentActivation = activated
  }

  return {
    activations,
    predictions: currentActivation
  }
}

// ============================================================================
// Loss Functions
// ============================================================================

/**
 * Mean Squared Error loss
 */
export function meanSquaredError(predictions: Vector, targets: Vector): number {
  if (predictions.length !== targets.length) {
    throw new Error('Predictions and targets must have same length')
  }

  const errors = vectorSubtract(predictions, targets)
  const squaredErrors = errors.map(e => e * e)
  const loss = squaredErrors.reduce((sum, e) => sum + e, 0) / predictions.length

  return loss
}

/**
 * MSE derivative for backprop
 */
export function meanSquaredErrorDerivative(predictions: Vector, targets: Vector): Vector {
  const errors = vectorSubtract(predictions, targets)
  return vectorScale(errors, 2 / predictions.length)
}

// ============================================================================
// Backpropagation
// ============================================================================

/**
 * Compute gradients using backpropagation
 */
export function backpropagate(
  input: Vector,
  target: Vector,
  forwardResult: ForwardPassResult,
  weights: NetworkWeights,
  config: TrainingConfig
): { weightGradients: Matrix[], biasGradients: Vector[] } {
  const activationFn = getActivationFunction(config.activationFunction)
  const { activations } = forwardResult

  const weightGradients: Matrix[] = []
  const biasGradients: Vector[] = []

  // Compute output layer error
  const outputActivation = activations[activations.length - 1]
  let delta = meanSquaredErrorDerivative(outputActivation.activated, target)

  // For output layer, multiply by sigmoid derivative
  const sigmoidFn = getActivationFunction('sigmoid')
  const outputDerivative = applyActivationDerivative(outputActivation.raw, sigmoidFn)
  delta = vectorMultiply(delta, outputDerivative)

  // Backpropagate through layers (from output to input)
  for (let i = weights.weights.length - 1; i >= 0; i--) {
    // Get activation from previous layer (or input)
    const prevActivation = i > 0 ? activations[i - 1].activated : input

    // Compute weight gradient: δ * a^T
    const weightGrad = outerProduct(delta, prevActivation)
    weightGradients.unshift(sanitizeMatrix(weightGrad))

    // Bias gradient is just delta
    biasGradients.unshift(sanitizeVector(delta))

    // Propagate error to previous layer
    if (i > 0) {
      // δ_prev = W^T * δ ⊙ f'(z)
      const weightsTransposed = transposeMatrix(weights.weights[i])
      const prevDelta = matrixVectorMultiply(weightsTransposed, delta)

      const prevDerivative = applyActivationDerivative(activations[i - 1].raw, activationFn)
      delta = vectorMultiply(prevDelta, prevDerivative)
      delta = sanitizeVector(delta)
    }
  }

  return { weightGradients, biasGradients }
}

// ============================================================================
// Weight Update
// ============================================================================

/**
 * Update weights using gradient descent
 */
export function updateWeights(
  weights: NetworkWeights,
  gradients: { weightGradients: Matrix[], biasGradients: Vector[] },
  learningRate: number
): NetworkWeights {
  const newWeights: Matrix[] = []
  const newBiases: Vector[] = []

  for (let i = 0; i < weights.weights.length; i++) {
    // W_new = W_old - α * ∇W
    const weightUpdate = gradients.weightGradients[i].map(row =>
      row.map(w => w * learningRate)
    )
    const updatedWeight = matrixSubtract(weights.weights[i], weightUpdate)
    newWeights.push(sanitizeMatrix(updatedWeight))

    // b_new = b_old - α * ∇b
    const biasUpdate = vectorScale(gradients.biasGradients[i], learningRate)
    const updatedBias = vectorSubtract(weights.biases[i], biasUpdate)
    newBiases.push(sanitizeVector(updatedBias))
  }

  return { weights: newWeights, biases: newBiases }
}

// ============================================================================
// Training Utilities
// ============================================================================

/**
 * Train on a single batch
 */
export function trainBatch(
  batch: TrainingExample[],
  weights: NetworkWeights,
  config: TrainingConfig
): NetworkWeights {
  // Accumulate gradients over batch
  let accumulatedWeightGrads: Matrix[] | null = null
  let accumulatedBiasGrads: Vector[] | null = null

  for (const example of batch) {
    const forwardResult = forwardPass(example.input, weights, config)
    const gradients = backpropagate(example.input, example.target, forwardResult, weights, config)

    if (!accumulatedWeightGrads) {
      accumulatedWeightGrads = gradients.weightGradients
      accumulatedBiasGrads = gradients.biasGradients
    } else {
      // Add gradients
      for (let i = 0; i < gradients.weightGradients.length; i++) {
        for (let j = 0; j < gradients.weightGradients[i].length; j++) {
          for (let k = 0; k < gradients.weightGradients[i][j].length; k++) {
            accumulatedWeightGrads[i][j][k] += gradients.weightGradients[i][j][k]
          }
        }
        for (let j = 0; j < gradients.biasGradients[i].length; j++) {
          accumulatedBiasGrads![i][j] += gradients.biasGradients[i][j]
        }
      }
    }
  }

  // Average gradients over batch
  const batchSize = batch.length
  const avgWeightGrads = accumulatedWeightGrads!.map(layer =>
    layer.map(row => row.map(w => w / batchSize))
  )
  const avgBiasGrads = accumulatedBiasGrads!.map(bias =>
    bias.map(b => b / batchSize)
  )

  // Update weights
  return updateWeights(weights, {
    weightGradients: avgWeightGrads,
    biasGradients: avgBiasGrads
  }, config.learningRate)
}

/**
 * Evaluate network on dataset
 */
export function evaluate(
  examples: TrainingExample[],
  weights: NetworkWeights,
  config: TrainingConfig
): { loss: number, accuracy: number } {
  let totalLoss = 0
  let correctPredictions = 0

  for (const example of examples) {
    const result = forwardPass(example.input, weights, config)
    const loss = meanSquaredError(result.predictions, example.target)
    totalLoss += loss

    // Simple accuracy: all outputs within 0.2 of target
    const isCorrect = result.predictions.every((pred, i) =>
      Math.abs(pred - example.target[i]) < 0.2
    )
    if (isCorrect) correctPredictions++
  }

  return {
    loss: totalLoss / examples.length,
    accuracy: correctPredictions / examples.length
  }
}

/**
 * Predict single input
 */
export function predict(
  input: Vector,
  weights: NetworkWeights,
  config: TrainingConfig
): Vector {
  const result = forwardPass(input, weights, config)
  return result.predictions
}
