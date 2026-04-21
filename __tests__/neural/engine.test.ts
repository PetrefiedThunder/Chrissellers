import { 
  initializeNetwork, 
  forwardPass, 
  trainBatch, 
  evaluate,
  clipGradients 
} from '../../src/lib/neural/engine'
import { NetworkArchitecture, TrainingConfig, TrainingExample } from '../../src/lib/neural/types'

describe('Neural Network Engine', () => {
  const arch: NetworkArchitecture = {
    layers: [
      { id: 'input', neurons: 2, activation: 'linear', type: 'input' },
      { id: 'hidden', neurons: 4, activation: 'relu', type: 'hidden' },
      { id: 'output', neurons: 1, activation: 'sigmoid', type: 'output' }
    ]
  }

  const config: TrainingConfig = {
    learningRate: 0.1,
    batchSize: 1,
    epochs: 10,
    optimizer: 'sgd'
  }

  describe('initializeNetwork', () => {
    it('creates correct number of neurons', () => {
      const { neurons, connections } = initializeNetwork(arch)
      expect(neurons.length).toBe(7)
      expect(connections.length).toBe(12) // 2*4 + 4*1
    })

    it('initializes weights with Xavier/Glorot', () => {
      const { connections } = initializeNetwork(arch)
      const expectedLimit = Math.sqrt(6 / (2 + 4))
      
      connections.forEach(conn => {
        expect(Math.abs(conn.weight)).toBeLessThan(expectedLimit * 1.5)
      })
    })

    it('assigns correct layer indices', () => {
      const { neurons } = initializeNetwork(arch)
      
      expect(neurons.filter(n => n.layerIndex === 0).length).toBe(2)
      expect(neurons.filter(n => n.layerIndex === 1).length).toBe(4)
      expect(neurons.filter(n => n.layerIndex === 2).length).toBe(1)
    })
  })

  describe('forwardPass', () => {
    it('produces finite output values', () => {
      const { neurons, connections } = initializeNetwork(arch)
      const result = forwardPass([0.5, 0.5], neurons, connections, arch)
      
      expect(result.predictions.length).toBe(1)
      expect(isFinite(result.predictions[0])).toBe(true)
      expect(isNaN(result.predictions[0])).toBe(false)
    })

    it('uses correct activation functions', () => {
      const { neurons, connections } = initializeNetwork(arch)
      
      const linearNeuron = neurons.find(n => n.layerIndex === 0)
      expect(linearNeuron?.id).toBe('l0_n0')
      
      const reluNeuron = neurons.find(n => n.layerIndex === 1)
      expect(reluNeuron?.id).toBe('l1_n0')
    })

    it('handles zero input', () => {
      const { neurons, connections } = initializeNetwork(arch)
      const result = forwardPass([0, 0], neurons, connections, arch)
      
      expect(result.predictions[0]).toBeGreaterThanOrEqual(0)
      expect(result.predictions[0]).toBeLessThanOrEqual(1)
    })
  })

  describe('trainBatch', () => {
    it('updates weights and biases', () => {
      const { neurons, connections } = initializeNetwork(arch)
      const originalWeight = connections[0].weight
      const originalBias = neurons[1].bias

      const batch: TrainingExample[] = [{
        input: [1, 1],
        target: [1]
      }]

      const result = trainBatch(batch, neurons, connections, config, arch)

      expect(result.connections[0].weight).not.toBe(originalWeight)
      expect(result.neurons[1].bias).not.toBe(originalBias)
    })

    it('maintains position data on neurons', () => {
      const { neurons, connections } = initializeNetwork(arch)
      
      const batch: TrainingExample[] = [{
        input: [1, 1],
        target: [1]
      }]

      const result = trainBatch(batch, neurons, connections, config, arch)
      
      result.neurons.forEach((n, i) => {
        expect(n.position).toEqual(neurons[i].position)
      })
    })

    it('does not produce NaN or Infinity weights', () => {
      const { neurons, connections } = initializeNetwork(arch)
      
      const batch: TrainingExample[] = [{
        input: [0.5, 0.5],
        target: [0.5]
      }]

      const result = trainBatch(batch, neurons, connections, config, arch)

      result.connections.forEach(conn => {
        expect(isFinite(conn.weight)).toBe(true)
      })
      
      result.neurons.forEach(n => {
        expect(isFinite(n.bias)).toBe(true)
      })
    })
  })

  describe('evaluate', () => {
    it('returns valid loss and accuracy', () => {
      const { neurons, connections } = initializeNetwork(arch)
      
      const examples: TrainingExample[] = [
        { input: [0, 0], target: [0] },
        { input: [1, 1], target: [1] }
      ]

      const { loss, accuracy } = evaluate(examples, neurons, connections, config, arch)

      expect(isFinite(loss)).toBe(true)
      expect(accuracy).toBeGreaterThanOrEqual(0)
      expect(accuracy).toBeLessThanOrEqual(1)
    })
  })

  describe('clipGradients', () => {
    it('clamps gradients to max norm', () => {
      const largeGradients = [10, 20, 50, -30, 100]
      const clipped = clipGradients(largeGradients, 1.0)
      
      const norm = Math.sqrt(clipped.reduce((sum, g) => sum + g * g, 0))
      expect(norm).toBeLessThanOrEqual(1.0)
    })

    it('does not modify small gradients', () => {
      const smallGradients = [0.1, 0.2, -0.1, 0.05, -0.15]
      const clipped = clipGradients(smallGradients, 1.0)
      
      expect(clipped).toEqual(smallGradients)
    })

    it('handles zero gradients', () => {
      const zeroGradients = [0, 0, 0, 0]
      const clipped = clipGradients(zeroGradients, 1.0)
      
      expect(clipped).toEqual(zeroGradients)
    })
  })
})
