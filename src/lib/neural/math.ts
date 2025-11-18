/**
 * Matrix & Vector Mathematics
 *
 * Core mathematical operations for neural network computations.
 * All functions include safety checks to prevent NaN/Infinity.
 */

import { Matrix, Vector } from './types'

// ============================================================================
// Vector Operations
// ============================================================================

/**
 * Add two vectors element-wise
 */
export function vectorAdd(a: Vector, b: Vector): Vector {
  if (a.length !== b.length) {
    throw new Error(`Vector dimensions don't match: ${a.length} vs ${b.length}`)
  }
  return a.map((val, i) => val + b[i])
}

/**
 * Subtract two vectors element-wise
 */
export function vectorSubtract(a: Vector, b: Vector): Vector {
  if (a.length !== b.length) {
    throw new Error(`Vector dimensions don't match: ${a.length} vs ${b.length}`)
  }
  return a.map((val, i) => val - b[i])
}

/**
 * Multiply vector by scalar
 */
export function vectorScale(v: Vector, scalar: number): Vector {
  return v.map(val => val * scalar)
}

/**
 * Compute dot product of two vectors
 */
export function vectorDot(a: Vector, b: Vector): number {
  if (a.length !== b.length) {
    throw new Error(`Vector dimensions don't match: ${a.length} vs ${b.length}`)
  }
  return a.reduce((sum, val, i) => sum + val * b[i], 0)
}

/**
 * Element-wise multiplication (Hadamard product)
 */
export function vectorMultiply(a: Vector, b: Vector): Vector {
  if (a.length !== b.length) {
    throw new Error(`Vector dimensions don't match: ${a.length} vs ${b.length}`)
  }
  return a.map((val, i) => val * b[i])
}

/**
 * Compute L2 norm (Euclidean length) of a vector
 */
export function vectorNorm(v: Vector): number {
  return Math.sqrt(v.reduce((sum, val) => sum + val * val, 0))
}

/**
 * Normalize vector to unit length
 */
export function vectorNormalize(v: Vector): Vector {
  const norm = vectorNorm(v)
  if (norm === 0) return v.map(() => 0)
  return vectorScale(v, 1 / norm)
}

// ============================================================================
// Matrix Operations
// ============================================================================

/**
 * Multiply matrix by vector: Mv
 */
export function matrixVectorMultiply(m: Matrix, v: Vector): Vector {
  if (m.length === 0 || m[0].length !== v.length) {
    throw new Error(`Matrix-vector dimensions incompatible: [${m.length}x${m[0]?.length}] * [${v.length}]`)
  }

  return m.map(row => vectorDot(row, v))
}

/**
 * Multiply two matrices: AB
 */
export function matrixMultiply(a: Matrix, b: Matrix): Matrix {
  if (a.length === 0 || b.length === 0) {
    throw new Error('Cannot multiply empty matrices')
  }
  if (a[0].length !== b.length) {
    throw new Error(`Matrix dimensions incompatible: [${a.length}x${a[0].length}] * [${b.length}x${b[0].length}]`)
  }

  const result: Matrix = []
  const bTransposed = transposeMatrix(b)

  for (let i = 0; i < a.length; i++) {
    result[i] = []
    for (let j = 0; j < b[0].length; j++) {
      result[i][j] = vectorDot(a[i], bTransposed[j])
    }
  }

  return result
}

/**
 * Transpose a matrix
 */
export function transposeMatrix(m: Matrix): Matrix {
  if (m.length === 0) return []

  const rows = m.length
  const cols = m[0].length
  const result: Matrix = Array(cols).fill(0).map(() => Array(rows).fill(0))

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[j][i] = m[i][j]
    }
  }

  return result
}

/**
 * Outer product of two vectors: uv^T
 */
export function outerProduct(u: Vector, v: Vector): Matrix {
  return u.map(ui => v.map(vj => ui * vj))
}

/**
 * Add two matrices element-wise
 */
export function matrixAdd(a: Matrix, b: Matrix): Matrix {
  if (a.length !== b.length || a[0].length !== b[0].length) {
    throw new Error('Matrix dimensions must match for addition')
  }

  return a.map((row, i) => row.map((val, j) => val + b[i][j]))
}

/**
 * Subtract two matrices element-wise
 */
export function matrixSubtract(a: Matrix, b: Matrix): Matrix {
  if (a.length !== b.length || a[0].length !== b[0].length) {
    throw new Error('Matrix dimensions must match for subtraction')
  }

  return a.map((row, i) => row.map((val, j) => val - b[i][j]))
}

/**
 * Multiply matrix by scalar
 */
export function matrixScale(m: Matrix, scalar: number): Matrix {
  return m.map(row => row.map(val => val * scalar))
}

// ============================================================================
// Initialization Functions
// ============================================================================

/**
 * Create a zero vector
 */
export function zerosVector(size: number): Vector {
  return Array(size).fill(0)
}

/**
 * Create a zero matrix
 */
export function zerosMatrix(rows: number, cols: number): Matrix {
  return Array(rows).fill(0).map(() => Array(cols).fill(0))
}

/**
 * Create a random vector (uniform distribution [-1, 1])
 */
export function randomVector(size: number): Vector {
  return Array(size).fill(0).map(() => Math.random() * 2 - 1)
}

/**
 * Xavier/Glorot initialization for weights
 * Helps prevent vanishing/exploding gradients
 */
export function xavierInitialize(inputSize: number, outputSize: number): Matrix {
  const scale = Math.sqrt(2 / (inputSize + outputSize))
  const rows = outputSize
  const cols = inputSize

  return Array(rows).fill(0).map(() =>
    Array(cols).fill(0).map(() => (Math.random() * 2 - 1) * scale)
  )
}

/**
 * He initialization for weights (better for ReLU)
 */
export function heInitialize(inputSize: number, outputSize: number): Matrix {
  const scale = Math.sqrt(2 / inputSize)
  const rows = outputSize
  const cols = inputSize

  return Array(rows).fill(0).map(() =>
    Array(cols).fill(0).map(() => (Math.random() * 2 - 1) * scale)
  )
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Clamp values to prevent NaN/Infinity
 */
export function clamp(value: number, min: number = -1e10, max: number = 1e10): number {
  if (!isFinite(value)) return 0
  return Math.max(min, Math.min(max, value))
}

/**
 * Clamp all values in a vector
 */
export function clampVector(v: Vector, min?: number, max?: number): Vector {
  return v.map(val => clamp(val, min, max))
}

/**
 * Clamp all values in a matrix
 */
export function clampMatrix(m: Matrix, min?: number, max?: number): Matrix {
  return m.map(row => clampVector(row, min, max))
}

/**
 * Check if any value in vector is NaN or Infinity
 */
export function hasInvalidValues(v: Vector): boolean {
  return v.some(val => !isFinite(val))
}

/**
 * Replace NaN/Infinity with 0
 */
export function sanitizeVector(v: Vector): Vector {
  return v.map(val => isFinite(val) ? val : 0)
}

/**
 * Replace NaN/Infinity with 0 in matrix
 */
export function sanitizeMatrix(m: Matrix): Matrix {
  return m.map(row => sanitizeVector(row))
}
