/**
 * Activation Functions
 *
 * Implements common neural network activation functions and their derivatives.
 * Used for non-linear transformations in the network.
 */

import { ActivationFunction, ActivationFunctionType } from './types'

// ============================================================================
// ReLU (Rectified Linear Unit)
// ============================================================================
// Most common for hidden layers. Fast, prevents vanishing gradient.
// f(x) = max(0, x)

const relu: ActivationFunction = {
  forward: (x: number): number => {
    return Math.max(0, x)
  },
  derivative: (x: number): number => {
    return x > 0 ? 1 : 0
  },
}

// ============================================================================
// Leaky ReLU
// ============================================================================
// Variant of ReLU that allows small negative values.
// Helps prevent "dying ReLU" problem.
// f(x) = x if x > 0, else 0.01x

const leakyRelu: ActivationFunction = {
  forward: (x: number): number => {
    return x > 0 ? x : 0.01 * x
  },
  derivative: (x: number): number => {
    return x > 0 ? 1 : 0.01
  },
}

// ============================================================================
// Sigmoid
// ============================================================================
// Squashes values to (0, 1). Good for probability outputs.
// f(x) = 1 / (1 + e^(-x))

const sigmoid: ActivationFunction = {
  forward: (x: number): number => {
    // Prevent overflow for large negative values
    if (x < -45) return 0
    if (x > 45) return 1
    return 1 / (1 + Math.exp(-x))
  },
  derivative: (x: number): number => {
    const s = sigmoid.forward(x)
    return s * (1 - s)
  },
}

// ============================================================================
// Tanh (Hyperbolic Tangent)
// ============================================================================
// Squashes values to (-1, 1). Zero-centered, better than sigmoid for hidden layers.
// f(x) = (e^x - e^(-x)) / (e^x + e^(-x))

const tanh: ActivationFunction = {
  forward: (x: number): number => {
    // Prevent overflow
    if (x < -20) return -1
    if (x > 20) return 1
    return Math.tanh(x)
  },
  derivative: (x: number): number => {
    const t = tanh.forward(x)
    return 1 - t * t
  },
}

// ============================================================================
// Activation Function Registry
// ============================================================================

export const activationFunctions: Record<ActivationFunctionType, ActivationFunction> = {
  relu,
  leaky_relu: leakyRelu,
  sigmoid,
  tanh,
}

export function getActivationFunction(type: ActivationFunctionType): ActivationFunction {
  return activationFunctions[type]
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Apply activation function to entire vector
 */
export function applyActivation(
  vector: number[],
  activationFn: ActivationFunction
): number[] {
  return vector.map(x => activationFn.forward(x))
}

/**
 * Apply activation derivative to entire vector
 */
export function applyActivationDerivative(
  vector: number[],
  activationFn: ActivationFunction
): number[] {
  return vector.map(x => activationFn.derivative(x))
}

/**
 * Softmax function for multi-class classification
 * Converts a vector of values into a probability distribution
 */
export function softmax(vector: number[]): number[] {
  // Subtract max for numerical stability
  const max = Math.max(...vector)
  const exps = vector.map(x => Math.exp(x - max))
  const sum = exps.reduce((a, b) => a + b, 0)

  // Prevent division by zero
  if (sum === 0) {
    return vector.map(() => 1 / vector.length)
  }

  return exps.map(exp => exp / sum)
}
