/**
 * Neural Simulation Hook
 *
 * Main hook for controlling the neural network simulation.
 * Handles training loop, visualization updates, and state synchronization.
 */

import { useEffect, useRef, useCallback } from 'react'
import { useSimulationStore } from '../state/simulationStore'
import {
  initializeNetwork,
  trainBatch,
  evaluate,
  forwardPass,
} from '../lib/neural/engine'
import {
  getDataset,
  shuffleDataset,
  batchDataset,
} from '../lib/neural/datasets'
import { calculatePolicyMetrics } from '../lib/policy/metrics'
import { generateNeuronVisuals, generateConnectionVisuals } from '../lib/viz/networkLayout'
import { TrainingMetrics } from '../lib/neural/types'

// ============================================================================
// Hook
// ============================================================================

export function useNeuralSimulation() {
  const store = useSimulationStore()
  const trainingTimerRef = useRef<number | null>(null)

  // ============================================================================
  // Initialize network on architecture change
  // ============================================================================

  useEffect(() => {
    if (!store.weights) {
      const weights = initializeNetwork(store.architecture)
      store.setWeights(weights)

      // Initialize visualization
      const neurons = generateNeuronVisuals(store.architecture)
      store.updateNeurons(neurons)
    }
  }, [store.architecture])

  // ============================================================================
  // Update connections when weights or neurons change
  // ============================================================================

  useEffect(() => {
    if (store.weights && store.neurons.length > 0) {
      const connections = generateConnectionVisuals(
        store.neurons,
        store.weights,
        store.currentActivations
      )
      store.updateConnections(connections)
    }
  }, [store.weights, store.neurons, store.currentActivations])

  // ============================================================================
  // Training loop
  // ============================================================================

  const runTrainingEpoch = useCallback(() => {
    if (!store.weights || !store.isTraining || store.isPaused) {
      return
    }

    // Get current dataset
    const dataset = getDataset(store.currentDataset)
    const shuffled = shuffleDataset(dataset)
    const batches = batchDataset(shuffled, store.config.batchSize)

    // Train on all batches
    let currentWeights = store.weights
    for (const batch of batches) {
      currentWeights = trainBatch(batch, currentWeights, store.config)
    }

    // Update weights
    store.setWeights(currentWeights)

    // Evaluate on full dataset
    const { loss, accuracy } = evaluate(dataset.examples, currentWeights, store.config)

    // Get predictions for policy metrics
    const predictions = dataset.examples.map((ex) => {
      const result = forwardPass(ex.input, currentWeights, store.config)
      return result.predictions
    })

    // Calculate policy metrics
    const policyMetrics = calculatePolicyMetrics(dataset.examples, predictions)

    // Create training metrics
    const metrics: TrainingMetrics = {
      epoch: store.currentEpoch,
      loss,
      accuracy,
      equityScore: policyMetrics.equity,
      burden: policyMetrics.burden,
      benefit: policyMetrics.benefit,
      timestamp: Date.now(),
    }

    // Update store
    store.addMetrics(metrics)
    store.stepEpoch()

    // Update activations for visualization (use first example)
    if (dataset.examples.length > 0) {
      const firstExample = dataset.examples[0]
      const result = forwardPass(firstExample.input, currentWeights, store.config)
      store.updateActivations(result.activations.map((a) => a.activated))
    }

    // Stop if we've reached max epochs
    if (store.currentEpoch >= store.config.epochs) {
      store.stopTraining()
    }
  }, [store])

  // ============================================================================
  // Training timer
  // ============================================================================

  useEffect(() => {
    if (store.isTraining && !store.isPaused) {
      // Calculate delay based on animation speed
      const baseDelay = 100 // 100ms per epoch at 1x speed
      const delay = baseDelay / store.animationSpeed

      trainingTimerRef.current = window.setInterval(() => {
        runTrainingEpoch()
      }, delay)
    } else {
      if (trainingTimerRef.current) {
        clearInterval(trainingTimerRef.current)
        trainingTimerRef.current = null
      }
    }

    return () => {
      if (trainingTimerRef.current) {
        clearInterval(trainingTimerRef.current)
      }
    }
  }, [store.isTraining, store.isPaused, store.animationSpeed, runTrainingEpoch])

  // ============================================================================
  // Public API
  // ============================================================================

  return {
    // State
    architecture: store.architecture,
    config: store.config,
    isTraining: store.isTraining,
    isPaused: store.isPaused,
    currentEpoch: store.currentEpoch,
    trainingHistory: store.trainingHistory,
    neurons: store.neurons,
    connections: store.connections,
    currentDataset: store.currentDataset,

    // Training controls
    start: store.startTraining,
    pause: store.pauseTraining,
    stop: store.stopTraining,
    reset: store.resetNetwork,
    stepOnce: runTrainingEpoch,

    // Configuration
    setLearningRate: store.setLearningRate,
    setBatchSize: store.setBatchSize,
    setEpochs: store.setEpochs,
    setActivationFunction: store.setActivationFunction,
    setDataset: store.setDataset,
    setAnimationSpeed: store.setAnimationSpeed,

    // Architecture
    setArchitecture: store.setArchitecture,

    // Scenario controls
    supportLevel: store.supportLevel,
    enforcementLevel: store.enforcementLevel,
    enabledRegulations: store.enabledRegulations,
    setSupportLevel: store.setSupportLevel,
    setEnforcementLevel: store.setEnforcementLevel,
    toggleRegulation: store.toggleRegulation,

    // Visualization
    cameraPreset: store.cameraPreset,
    showLabels: store.showLabels,
    showConnections: store.showConnections,
    animationSpeed: store.animationSpeed,
    setCameraPreset: store.setCameraPreset,
    toggleLabels: store.toggleLabels,
    toggleConnections: store.toggleConnections,

    // Selection
    selectedNeuron: store.selectedNeuron,
    selectedConnection: store.selectedConnection,
    selectNeuron: store.selectNeuron,
    selectConnection: store.selectConnection,

    // Latest metrics
    latestMetrics: store.trainingHistory[store.trainingHistory.length - 1] || null,
  }
}
