/**
 * Policy & Equity Metrics
 *
 * Computes metrics specific to regulatory compliance and social impact:
 * - Compliance burden (cost to operators)
 * - Social benefit (community outcomes)
 * - Equity score (fairness across populations)
 */

import { Vector, TrainingExample } from '../neural/types'

// ============================================================================
// Types
// ============================================================================

export interface PolicyMetrics {
  burden: number        // 0-1, cost/difficulty for operators
  benefit: number       // 0-1, positive community outcomes
  equity: number        // 0-1, fairness across populations
  efficiency: number    // benefit/burden ratio
}

export interface PopulationMetrics {
  vulnerable: number[]  // Outcomes for vulnerable populations
  general: number[]     // Outcomes for general population
  disparity: number     // Difference between groups
}

// ============================================================================
// Burden Calculation
// ============================================================================

/**
 * Calculate compliance burden based on input features
 *
 * Burden represents the cost, complexity, and difficulty of compliance.
 * Higher values = more burdensome
 */
export function calculateBurden(input: Vector): number {
  // Burden factors (simplified):
  // - Number of regulations (more = higher burden)
  // - Complexity requirements
  // - Resource requirements
  // - Time to compliance

  // For our toy model, we'll use a weighted average of input features
  // Features 0-3: stakeholder capacity (inverse affects burden)
  // Features 4-7: regulatory complexity (directly affects burden)

  const capacityFactors = input.slice(0, 4)
  const complexityFactors = input.slice(4, 8)

  // Low capacity = high burden
  const capacityBurden = capacityFactors.reduce((sum, val) => sum + (1 - val), 0) / 4

  // High complexity = high burden
  const complexityBurden = complexityFactors.reduce((sum, val) => sum + val, 0) / 4

  // Combined burden (0-1 scale)
  const burden = (capacityBurden + complexityBurden) / 2

  return Math.max(0, Math.min(1, burden))
}

// ============================================================================
// Benefit Calculation
// ============================================================================

/**
 * Calculate social benefit based on output predictions
 *
 * Benefit represents positive community outcomes:
 * - Safety
 * - Economic opportunity
 * - Inclusion
 * - Sustainability
 */
export function calculateBenefit(output: Vector): number {
  // Simple average of all outcome metrics
  // All outcomes contribute equally to overall benefit
  const benefit = output.reduce((sum, val) => sum + val, 0) / output.length

  return Math.max(0, Math.min(1, benefit))
}

// ============================================================================
// Equity Calculation
// ============================================================================

/**
 * Calculate equity score based on outcome disparities
 *
 * Equity measures fairness - lower disparity = higher equity
 */
export function calculateEquity(
  examples: TrainingExample[],
  predictions: Vector[]
): number {
  // Separate examples by vulnerable vs non-vulnerable populations
  const vulnerableOutcomes: number[][] = []
  const generalOutcomes: number[][] = []

  examples.forEach((example, i) => {
    const isVulnerable = example.metadata?.stakeholderType === 'vulnerable_worker'

    if (isVulnerable) {
      vulnerableOutcomes.push(predictions[i])
    } else {
      generalOutcomes.push(predictions[i])
    }
  })

  // If we don't have both groups, return neutral equity
  if (vulnerableOutcomes.length === 0 || generalOutcomes.length === 0) {
    return 0.5
  }

  // Calculate average outcomes for each group
  const vulnerableAvg = averageOutcomes(vulnerableOutcomes)
  const generalAvg = averageOutcomes(generalOutcomes)

  // Calculate disparity across all outcome dimensions
  const disparities = vulnerableAvg.map((val, i) => Math.abs(val - generalAvg[i]))
  const avgDisparity = disparities.reduce((sum, d) => sum + d, 0) / disparities.length

  // Convert disparity to equity score (lower disparity = higher equity)
  const equity = 1 - avgDisparity

  return Math.max(0, Math.min(1, equity))
}

/**
 * Helper: Calculate average outcomes across examples
 */
function averageOutcomes(outcomes: number[][]): number[] {
  if (outcomes.length === 0) return []

  const summed = outcomes.reduce((sum, outcome) => {
    return sum.map((val, i) => val + outcome[i])
  }, Array(outcomes[0].length).fill(0))

  return summed.map(val => val / outcomes.length)
}

// ============================================================================
// Efficiency Calculation
// ============================================================================

/**
 * Calculate efficiency as benefit/burden ratio
 *
 * Higher efficiency = more benefit per unit of burden
 */
export function calculateEfficiency(benefit: number, burden: number): number {
  // Prevent division by zero
  if (burden === 0) return benefit > 0 ? 10 : 1

  return benefit / burden
}

// ============================================================================
// Combined Policy Metrics
// ============================================================================

/**
 * Calculate all policy metrics for a set of examples and predictions
 */
export function calculatePolicyMetrics(
  examples: TrainingExample[],
  predictions: Vector[]
): PolicyMetrics {
  if (examples.length !== predictions.length) {
    throw new Error('Examples and predictions must have same length')
  }

  // Calculate average burden across examples
  const burdens = examples.map(ex => calculateBurden(ex.input))
  const avgBurden = burdens.reduce((sum, b) => sum + b, 0) / burdens.length

  // Calculate average benefit across predictions
  const benefits = predictions.map(pred => calculateBenefit(pred))
  const avgBenefit = benefits.reduce((sum, b) => sum + b, 0) / benefits.length

  // Calculate equity
  const equity = calculateEquity(examples, predictions)

  // Calculate efficiency
  const efficiency = calculateEfficiency(avgBenefit, avgBurden)

  return {
    burden: avgBurden,
    benefit: avgBenefit,
    equity,
    efficiency
  }
}

// ============================================================================
// Scenario Analysis
// ============================================================================

/**
 * Compare metrics across different scenarios
 */
export interface ScenarioComparison {
  baseline: PolicyMetrics
  alternative: PolicyMetrics
  improvements: {
    burden: number     // Negative = burden reduced
    benefit: number    // Positive = benefit increased
    equity: number     // Positive = equity improved
    efficiency: number // Positive = efficiency improved
  }
}

export function compareScenarios(
  baseline: PolicyMetrics,
  alternative: PolicyMetrics
): ScenarioComparison {
  return {
    baseline,
    alternative,
    improvements: {
      burden: alternative.burden - baseline.burden,
      benefit: alternative.benefit - baseline.benefit,
      equity: alternative.equity - baseline.equity,
      efficiency: alternative.efficiency - baseline.efficiency
    }
  }
}

// ============================================================================
// Fairness-Aware Loss
// ============================================================================

/**
 * Loss function that balances accuracy with equity
 *
 * L_total = L_accuracy + λ * L_fairness
 */
export function fairnessAwareLoss(
  accuracyLoss: number,
  equityScore: number,
  lambda: number = 0.3
): number {
  // Lower equity = higher fairness loss
  const fairnessLoss = 1 - equityScore

  return accuracyLoss + lambda * fairnessLoss
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Format metrics for display
 */
export function formatMetrics(metrics: PolicyMetrics): string {
  return `
Burden:     ${(metrics.burden * 100).toFixed(1)}%
Benefit:    ${(metrics.benefit * 100).toFixed(1)}%
Equity:     ${(metrics.equity * 100).toFixed(1)}%
Efficiency: ${metrics.efficiency.toFixed(2)}x
  `.trim()
}

/**
 * Get metric color for visualization
 */
export function getMetricColor(value: number, inverted: boolean = false): string {
  // For most metrics, higher = better (green)
  // For burden, higher = worse (red), so use inverted
  const normalized = inverted ? 1 - value : value

  if (normalized > 0.7) return '#22c55e' // green
  if (normalized > 0.4) return '#f59e0b' // orange
  return '#ef4444' // red
}
