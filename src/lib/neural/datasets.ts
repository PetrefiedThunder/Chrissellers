/**
 * Training Datasets
 *
 * Toy datasets representing different regulatory compliance scenarios.
 * Each dataset models how different stakeholders and regulations
 * map to community outcomes.
 */

import { Dataset, TrainingExample } from './types'

// ============================================================================
// Dataset: Baseline Compliance
// ============================================================================
// Models a typical regulatory environment with standard enforcement.

export const baselineDataset: Dataset = {
  description: 'Baseline regulatory compliance with standard enforcement',
  inputSize: 8,  // 8 stakeholder/context inputs
  outputSize: 4, // 4 outcome metrics
  examples: [
    // Small business, food safety compliant, accessible, fair wages
    {
      input: [1.0, 0.8, 0.9, 0.7, 0.6, 0.5, 0.4, 0.8], // Stakeholder features
      target: [0.9, 0.7, 0.6, 0.7], // High safety, good opportunity, moderate inclusion, good sustainability
      label: 'Compliant small business',
      metadata: { scenario: 'baseline', stakeholderType: 'small_business' }
    },
    // Vulnerable worker, low support
    {
      input: [0.3, 0.4, 0.5, 0.8, 0.7, 0.2, 0.3, 0.4],
      target: [0.6, 0.4, 0.3, 0.5], // Lower outcomes across the board
      label: 'Vulnerable worker, limited support',
      metadata: { scenario: 'baseline', stakeholderType: 'vulnerable_worker' }
    },
    // Community organization, high engagement
    {
      input: [0.7, 0.9, 0.8, 0.6, 0.9, 0.7, 0.8, 0.9],
      target: [0.8, 0.8, 0.9, 0.8], // High inclusion and opportunity
      label: 'Active community organization',
      metadata: { scenario: 'baseline', stakeholderType: 'community_org' }
    },
    // Regulator, enforcement focus
    {
      input: [0.9, 0.7, 0.6, 0.5, 0.8, 0.6, 0.5, 0.7],
      target: [0.9, 0.6, 0.5, 0.7], // High safety, lower opportunity
      label: 'Enforcement-focused regulator',
      metadata: { scenario: 'baseline', stakeholderType: 'regulator' }
    },
    // Small business, struggling with compliance
    {
      input: [0.6, 0.4, 0.5, 0.6, 0.3, 0.4, 0.5, 0.3],
      target: [0.5, 0.5, 0.4, 0.4], // Moderate outcomes, struggling
      label: 'Small business, compliance challenges',
      metadata: { scenario: 'baseline', stakeholderType: 'small_business' }
    },
  ]
}

// ============================================================================
// Dataset: Targeted Support
// ============================================================================
// Models increased technical assistance and support for vulnerable populations.

export const targetedSupportDataset: Dataset = {
  description: 'Enhanced support for vulnerable populations and small operators',
  inputSize: 8,
  outputSize: 4,
  examples: [
    // Small business with technical assistance
    {
      input: [1.0, 0.8, 0.9, 0.7, 0.6, 0.9, 0.8, 0.8], // High support
      target: [0.9, 0.9, 0.8, 0.9], // Improved outcomes across all metrics
      label: 'Small business with support',
      metadata: { scenario: 'targeted_support', stakeholderType: 'small_business' }
    },
    // Vulnerable worker with wraparound services
    {
      input: [0.3, 0.4, 0.5, 0.8, 0.7, 0.8, 0.9, 0.7],
      target: [0.8, 0.7, 0.8, 0.7], // Significantly improved outcomes
      label: 'Vulnerable worker with services',
      metadata: { scenario: 'targeted_support', stakeholderType: 'vulnerable_worker' }
    },
    // Community org as support hub
    {
      input: [0.7, 0.9, 0.8, 0.6, 0.9, 0.9, 0.9, 0.9],
      target: [0.9, 0.9, 0.9, 0.9], // Optimal outcomes
      label: 'Community hub model',
      metadata: { scenario: 'targeted_support', stakeholderType: 'community_org' }
    },
    // Regulator with support capacity
    {
      input: [0.9, 0.7, 0.6, 0.5, 0.8, 0.8, 0.7, 0.9],
      target: [0.9, 0.8, 0.7, 0.8], // Balanced outcomes
      label: 'Supportive regulator',
      metadata: { scenario: 'targeted_support', stakeholderType: 'regulator' }
    },
    // Resident with access to resources
    {
      input: [0.5, 0.6, 0.7, 0.8, 0.7, 0.8, 0.8, 0.7],
      target: [0.8, 0.7, 0.8, 0.8], // Good outcomes
      label: 'Resident with resource access',
      metadata: { scenario: 'targeted_support', stakeholderType: 'resident' }
    },
  ]
}

// ============================================================================
// Dataset: High Enforcement / Low Support
// ============================================================================
// Models punitive approach with limited assistance.

export const highEnforcementDataset: Dataset = {
  description: 'Punitive enforcement with minimal support infrastructure',
  inputSize: 8,
  outputSize: 4,
  examples: [
    // Small business under pressure
    {
      input: [1.0, 0.8, 0.9, 0.7, 0.6, 0.2, 0.3, 0.5],
      target: [0.7, 0.4, 0.3, 0.5], // Lower opportunity and inclusion
      label: 'Small business, high pressure',
      metadata: { scenario: 'high_enforcement', stakeholderType: 'small_business' }
    },
    // Vulnerable worker excluded
    {
      input: [0.3, 0.4, 0.5, 0.8, 0.7, 0.1, 0.2, 0.2],
      target: [0.5, 0.2, 0.1, 0.3], // Poor outcomes, exclusion
      label: 'Vulnerable worker excluded',
      metadata: { scenario: 'high_enforcement', stakeholderType: 'vulnerable_worker' }
    },
    // Regulator, enforcement only
    {
      input: [0.9, 0.7, 0.6, 0.5, 0.8, 0.2, 0.3, 0.4],
      target: [0.8, 0.4, 0.3, 0.5], // High safety, low opportunity
      label: 'Enforcement-only regulator',
      metadata: { scenario: 'high_enforcement', stakeholderType: 'regulator' }
    },
    // Community org struggling
    {
      input: [0.7, 0.9, 0.8, 0.6, 0.9, 0.3, 0.4, 0.5],
      target: [0.6, 0.5, 0.5, 0.5], // Reduced effectiveness
      label: 'Community org, limited resources',
      metadata: { scenario: 'high_enforcement', stakeholderType: 'community_org' }
    },
    // Resident facing barriers
    {
      input: [0.5, 0.6, 0.7, 0.8, 0.7, 0.2, 0.3, 0.4],
      target: [0.6, 0.4, 0.4, 0.5], // Moderate safety, low access
      label: 'Resident with barriers',
      metadata: { scenario: 'high_enforcement', stakeholderType: 'resident' }
    },
  ]
}

// ============================================================================
// Dataset: Coordinated Ecosystem
// ============================================================================
// Models ideal scenario with aligned support, enforcement, and community capacity.

export const coordinatedEcosystemDataset: Dataset = {
  description: 'Coordinated ecosystem with aligned incentives and support',
  inputSize: 8,
  outputSize: 4,
  examples: [
    // Small business in ecosystem
    {
      input: [1.0, 0.9, 0.9, 0.8, 0.8, 0.9, 0.9, 0.9],
      target: [0.95, 0.9, 0.9, 0.9], // Excellent outcomes
      label: 'Small business, full ecosystem',
      metadata: { scenario: 'coordinated', stakeholderType: 'small_business' }
    },
    // Vulnerable worker supported
    {
      input: [0.5, 0.6, 0.7, 0.9, 0.8, 0.9, 0.9, 0.8],
      target: [0.9, 0.8, 0.9, 0.8], // Strong outcomes
      label: 'Vulnerable worker, full support',
      metadata: { scenario: 'coordinated', stakeholderType: 'vulnerable_worker' }
    },
    // Community org as backbone
    {
      input: [0.8, 0.95, 0.9, 0.7, 0.9, 0.95, 0.9, 0.95],
      target: [0.95, 0.95, 0.95, 0.95], // Optimal outcomes
      label: 'Community backbone organization',
      metadata: { scenario: 'coordinated', stakeholderType: 'community_org' }
    },
    // Supportive regulator
    {
      input: [0.9, 0.8, 0.7, 0.6, 0.9, 0.9, 0.8, 0.9],
      target: [0.95, 0.85, 0.8, 0.9], // Balanced high outcomes
      label: 'Supportive regulation',
      metadata: { scenario: 'coordinated', stakeholderType: 'regulator' }
    },
    // Empowered resident
    {
      input: [0.6, 0.7, 0.8, 0.9, 0.8, 0.9, 0.9, 0.8],
      target: [0.9, 0.85, 0.9, 0.85], // High outcomes
      label: 'Empowered resident',
      metadata: { scenario: 'coordinated', stakeholderType: 'resident' }
    },
  ]
}

// ============================================================================
// Dataset Registry
// ============================================================================

export const datasets = {
  baseline: baselineDataset,
  targeted_support: targetedSupportDataset,
  high_enforcement: highEnforcementDataset,
  coordinated: coordinatedEcosystemDataset,
}

export type DatasetKey = keyof typeof datasets

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get dataset by key
 */
export function getDataset(key: DatasetKey): Dataset {
  return datasets[key]
}

/**
 * Shuffle dataset examples (for training)
 */
export function shuffleDataset(dataset: Dataset): Dataset {
  const shuffled = [...dataset.examples]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return {
    ...dataset,
    examples: shuffled
  }
}

/**
 * Split dataset into batches
 */
export function batchDataset(dataset: Dataset, batchSize: number): TrainingExample[][] {
  const batches: TrainingExample[][] = []
  const examples = dataset.examples

  for (let i = 0; i < examples.length; i += batchSize) {
    batches.push(examples.slice(i, i + batchSize))
  }

  return batches
}

/**
 * Combine multiple datasets
 */
export function combineDatasets(...datasets: Dataset[]): Dataset {
  if (datasets.length === 0) {
    throw new Error('Must provide at least one dataset')
  }

  const first = datasets[0]
  const allExamples = datasets.flatMap(d => d.examples)

  return {
    inputSize: first.inputSize,
    outputSize: first.outputSize,
    description: `Combined dataset (${datasets.length} sources)`,
    examples: allExamples
  }
}
