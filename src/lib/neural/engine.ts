import { 
  NetworkArchitecture, 
  Neuron, 
  Connection, 
  TrainingConfig, 
  TrainingExample, 
  PredictionResult,
  ActivationFunction
} from './types'

// Helper: Random weight initialization (Xavier/Glorot)
function initializeWeight(fanIn: number, fanOut: number): number {
  const limit = Math.sqrt(6 / (fanIn + fanOut))
  return Math.random() * 2 * limit - limit
}

// Helper: Activation functions
const activations = {
  sigmoid: (x: number) => 1 / (1 + Math.exp(-Math.max(-500, Math.min(500, x)))),
  relu: (x: number) => Math.max(0, x),
  tanh: (x: number) => Math.tanh(x),
  linear: (x: number) => x
}

// Helper: Derivatives that accept POST-ACTIVATION values (output y, not input x)
// This is the correct form for backpropagation since we have y = f(x) stored
const activationDerivatives = {
  // For sigmoid: y = sigmoid(x), dy/dx = y * (1 - y)
  sigmoid: (y: number) => y * (1 - y),
  // For relu: dy/dx = 1 if y > 0, else 0 (approximation using output)
  relu: (y: number) => y > 0 ? 1 : 0,
  // For tanh: y = tanh(x), dy/dx = 1 - y^2
  tanh: (y: number) => 1 - y * y,
  // For linear: dy/dx = 1
  linear: (_y: number) => 1
}

// Helper: Get the derivative function for a given activation (accepts post-activation value)
function getActivationPrime(activation: string): (y: number) => number {
  return activationDerivatives[activation as keyof typeof activationDerivatives] || activationDerivatives.linear
}

export function initializeNetwork(arch: NetworkArchitecture): { neurons: Neuron[], connections: Connection[] } {
  const neurons: Neuron[] = []
  const connections: Connection[] = []

  // Create Neurons
  arch.layers.forEach((layer, layerIndex) => {
    for (let i = 0; i < layer.neurons; i++) {
      neurons.push({
        id: `l${layerIndex}_n${i}`,
        layerId: layer.id,
        layerIndex,
        indexInLayer: i,
        bias: Math.random() * 0.2 - 0.1,
        activation: 0,
        delta: 0,
        position: [0, 0, 0] // Will be set by layout engine
      })
    }
  })

  // Create Connections
  for (let l = 0; l < arch.layers.length - 1; l++) {
    const currentLayer = arch.layers[l]
    const nextLayer = arch.layers[l + 1]
    
    for (let i = 0; i < currentLayer.neurons; i++) {
      for (let j = 0; j < nextLayer.neurons; j++) {
        connections.push({
          id: `l${l}_n${i}-l${l+1}_n${j}`,
          sourceId: `l${l}_n${i}`,
          targetId: `l${l+1}_n${j}`,
          weight: initializeWeight(currentLayer.neurons, nextLayer.neurons),
          gradient: 0
        })
      }
    }
  }

  return { neurons, connections }
}

export function forwardPass(
  input: number[], 
  neurons: Neuron[], 
  connections: Connection[], 
  arch: NetworkArchitecture
): PredictionResult {
  const activationMap = new Map<string, number>()
  
  // Set Input Layer
  const inputLayer = arch.layers[0]
  for (let i = 0; i < inputLayer.neurons; i++) {
    const neuronId = `l0_n${i}`
    const val = input[i] || 0
    activationMap.set(neuronId, val)
  }

  // Propagate
  for (let l = 1; l < arch.layers.length; l++) {
    const layer = arch.layers[l]
    const prevLayer = arch.layers[l - 1]
    
    for (let i = 0; i < layer.neurons; i++) {
      const neuronId = `l${l}_n${i}`
      const neuron = neurons.find(n => n.id === neuronId)!
      
      let sum = neuron.bias
      
      for (let j = 0; j < prevLayer.neurons; j++) {
        const sourceId = `l${l-1}_n${j}`
        const conn = connections.find(c => c.sourceId === sourceId && c.targetId === neuronId)
        if (conn) {
          sum += (activationMap.get(sourceId) || 0) * conn.weight
        }
      }
      
      const actFn = activations[layer.activation as keyof typeof activations] || activations.linear
      activationMap.set(neuronId, actFn(sum))
    }
  }

  // Collect Output
  const outputLayerIndex = arch.layers.length - 1
  const outputLayer = arch.layers[outputLayerIndex]
  const predictions: number[] = []
  
  for (let i = 0; i < outputLayer.neurons; i++) {
    predictions.push(activationMap.get(`l${outputLayerIndex}_n${i}`) || 0)
  }

  return { predictions, activations: activationMap }
}

export function trainBatch(
  batch: TrainingExample[],
  neurons: Neuron[],
  connections: Connection[],
  config: TrainingConfig,
  arch: NetworkArchitecture
): { neurons: Neuron[], connections: Connection[] } {
  // Clone state to avoid mutation during calculation
  const newNeurons = [...neurons]
  const newConnections = [...connections]
  
  // Accumulate gradients
  const weightGradients = new Map<string, number>()
  const biasGradients = new Map<string, number>()
  
  // Initialize gradients
  newConnections.forEach(c => weightGradients.set(c.id, 0))
  newNeurons.forEach(n => biasGradients.set(n.id, 0))

  batch.forEach(example => {
    // 1. Forward Pass
    const { activations: acts } = forwardPass(example.input, newNeurons, newConnections, arch)
    
    // 2. Backward Pass (Simplified Backprop)
    // Calculate Output Deltas
    const outputLayerIndex = arch.layers.length - 1
    const outputLayer = arch.layers[outputLayerIndex]
    
    const deltas = new Map<string, number>()
    
    for (let i = 0; i < outputLayer.neurons; i++) {
      const id = `l${outputLayerIndex}_n${i}`
      const output = acts.get(id) || 0
      const target = example.target[i] || 0
      const error = output - target

      // Use the layer's actual activation function derivative
      const actFnPrime = getActivationPrime(outputLayer.activation)
      const delta = error * actFnPrime(output)

      deltas.set(id, delta)
    }
    
    // Backpropagate to Hidden Layers
    for (let l = outputLayerIndex - 1; l >= 0; l--) {
      const layer = arch.layers[l]
      const nextLayer = arch.layers[l + 1]
      
      for (let i = 0; i < layer.neurons; i++) {
        const id = `l${l}_n${i}`
        let errorSum = 0
        
        for (let j = 0; j < nextLayer.neurons; j++) {
          const nextId = `l${l+1}_n${j}`
          const conn = newConnections.find(c => c.sourceId === id && c.targetId === nextId)
          if (conn) {
            errorSum += (deltas.get(nextId) || 0) * conn.weight
          }
        }
        
        const output = acts.get(id) || 0
        // Use the layer's actual activation function derivative
        const actFnPrime = getActivationPrime(layer.activation)
        const delta = errorSum * actFnPrime(output)
        deltas.set(id, delta)
      }
    }
    
    // Accumulate Gradients
    newConnections.forEach(c => {
      const sourceAct = acts.get(c.sourceId) || 0
      const targetDelta = deltas.get(c.targetId) || 0
      const grad = weightGradients.get(c.id) || 0
      weightGradients.set(c.id, grad + sourceAct * targetDelta)
    })
    
    newNeurons.forEach(n => {
      const delta = deltas.get(n.id) || 0
      const grad = biasGradients.get(n.id) || 0
      biasGradients.set(n.id, grad + delta)
    })
  })

  // Apply Gradients (SGD)
  const lr = config.learningRate
  
  const updatedConnections = newConnections.map(c => ({
    ...c,
    weight: c.weight - lr * (weightGradients.get(c.id) || 0) / batch.length
  }))
  
  const updatedNeurons = newNeurons.map(n => ({
    ...n,
    bias: n.bias - lr * (biasGradients.get(n.id) || 0) / batch.length
  }))

  return { neurons: updatedNeurons, connections: updatedConnections }
}

export function evaluate(
  examples: TrainingExample[],
  neurons: Neuron[],
  connections: Connection[],
  config: TrainingConfig,
  arch: NetworkArchitecture
): { loss: number, accuracy: number } {
  let totalLoss = 0
  let correct = 0
  
  examples.forEach(ex => {
    const { predictions } = forwardPass(ex.input, neurons, connections, arch)
    
    // MSE Loss
    const mse = ex.target.reduce((sum, t, i) => sum + Math.pow(t - (predictions[i] || 0), 2), 0) / ex.target.length
    totalLoss += mse
    
    // Accuracy (assuming classification if target is 0/1, or regression threshold)
    // Simple max class check
    const predClass = predictions.indexOf(Math.max(...predictions))
    const targetClass = ex.target.indexOf(Math.max(...ex.target))
    if (predClass === targetClass) correct++
  })
  
  return {
    loss: totalLoss / examples.length,
    accuracy: correct / examples.length
  }
}
