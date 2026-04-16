import { 
  NetworkArchitecture, 
  Neuron, 
  Connection, 
  TrainingConfig, 
  TrainingExample, 
  PredictionResult,
  ActivationFunction
} from './types'

function initializeWeight(fanIn: number, fanOut: number): number {
  const limit = Math.sqrt(6 / (fanIn + fanOut))
  return Math.random() * 2 * limit - limit
}

const activations = {
  sigmoid: (x: number) => {
    if (x < -700) return 0
    if (x > 700) return 1
    return 1 / (1 + Math.exp(-x))
  },
  sigmoidPrime: (z: number) => {
    const s = activations.sigmoid(z)
    return s * (1 - s)
  },
  relu: (x: number) => Math.max(0, x),
  reluPrime: (z: number) => z > 0 ? 1 : 0,
  leakyRelu: (x: number) => x > 0 ? x : 0.01 * x,
  leakyReluPrime: (z: number) => z > 0 ? 1 : 0.01,
  tanh: (x: number) => Math.tanh(x),
  tanhPrime: (z: number) => {
    const t = Math.tanh(z)
    return 1 - t * t
  },
  linear: (x: number) => x,
  linearPrime: (_z: number) => 1
}

function getActivationPrime(name: ActivationFunction): (z: number) => number {
  switch (name) {
    case 'relu': return activations.reluPrime
    case 'leakyRelu': return activations.leakyReluPrime
    case 'tanh': return activations.tanhPrime
    case 'sigmoid': return activations.sigmoidPrime
    case 'linear': return activations.linearPrime
    default: return activations.linearPrime
  }
}

function getActivation(name: ActivationFunction): (x: number) => number {
  switch (name) {
    case 'relu': return activations.relu
    case 'leakyRelu': return activations.leakyRelu
    case 'tanh': return activations.tanh
    case 'sigmoid': return activations.sigmoid
    case 'linear': return activations.linear
    default: return activations.linear
  }
}

export function clipGradients(gradients: number[], maxNorm: number = 1.0): number[] {
  const norm = Math.sqrt(gradients.reduce((sum, g) => sum + g * g, 0))
  if (norm > maxNorm && norm > 0) {
    return gradients.map(g => g * (maxNorm / norm))
  }
  return gradients
}

function isFiniteNumber(value: number): boolean {
  return typeof value === 'number' && isFinite(value) && !isNaN(value)
}

export function initializeNetwork(arch: NetworkArchitecture): { neurons: Neuron[], connections: Connection[] } {
  const neurons: Neuron[] = []
  const connections: Connection[] = []

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
        position: [0, 0, 0]
      })
    }
  })

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
  const zMap = new Map<string, number>()
  
  const inputLayer = arch.layers[0]
  for (let i = 0; i < inputLayer.neurons; i++) {
    const neuronId = `l0_n${i}`
    const val = input[i] || 0
    activationMap.set(neuronId, val)
    zMap.set(neuronId, val)
  }

  const connMap = new Map<string, Connection>()
  connections.forEach(c => connMap.set(`${c.sourceId}:${c.targetId}`, c))

  for (let l = 1; l < arch.layers.length; l++) {
    const layer = arch.layers[l]
    const prevLayer = arch.layers[l - 1]
    
    for (let i = 0; i < layer.neurons; i++) {
      const neuronId = `l${l}_n${i}`
      const neuron = neurons.find(n => n.id === neuronId)!
      
      let sum = neuron.bias
      
      for (let j = 0; j < prevLayer.neurons; j++) {
        const sourceId = `l${l-1}_n${j}`
        const conn = connMap.get(`${sourceId}:${neuronId}`)
        if (conn) {
          sum += (activationMap.get(sourceId) || 0) * conn.weight
        }
      }
      
      zMap.set(neuronId, sum)
      const actFn = getActivation(layer.activation as ActivationFunction)
      activationMap.set(neuronId, actFn(sum))
    }
  }

  const outputLayerIndex = arch.layers.length - 1
  const outputLayer = arch.layers[outputLayerIndex]
  const predictions: number[] = []
  
  for (let i = 0; i < outputLayer.neurons; i++) {
    predictions.push(activationMap.get(`l${outputLayerIndex}_n${i}`) || 0)
  }

  return { predictions, activations: activationMap, zValues: zMap }
}

export function trainBatch(
  batch: TrainingExample[],
  neurons: Neuron[],
  connections: Connection[],
  config: TrainingConfig,
  arch: NetworkArchitecture
): { neurons: Neuron[], connections: Connection[] } {
  const newNeurons = [...neurons]
  const newConnections = [...connections]
  
  const weightGradients = new Map<string, number>()
  const biasGradients = new Map<string, number>()
  
  newConnections.forEach(c => weightGradients.set(c.id, 0))
  newNeurons.forEach(n => biasGradients.set(n.id, 0))

  const connMap = new Map<string, Connection>()
  newConnections.forEach(c => connMap.set(`${c.sourceId}:${c.targetId}`, c))

  batch.forEach(example => {
    const { activations: acts, zValues: zVals } = forwardPass(example.input, newNeurons, newConnections, arch)
    const zValues = zVals || new Map<string, number>()
    
    const outputLayerIndex = arch.layers.length - 1
    const outputLayer = arch.layers[outputLayerIndex]
    
    const deltas = new Map<string, number>()
    
    for (let i = 0; i < outputLayer.neurons; i++) {
      const id = `l${outputLayerIndex}_n${i}`
      const output = acts.get(id) || 0
      const z = zValues.get(id) || 0
      const target = example.target[i] || 0
      const error = output - target
      
      const actFnPrime = getActivationPrime(outputLayer.activation as ActivationFunction)
      const delta = error * actFnPrime(z)
      
      deltas.set(id, delta)
    }
    
    for (let l = outputLayerIndex - 1; l >= 0; l--) {
      const layer = arch.layers[l]
      const nextLayer = arch.layers[l + 1]
      
      for (let i = 0; i < layer.neurons; i++) {
        const id = `l${l}_n${i}`
        let errorSum = 0
        
        for (let j = 0; j < nextLayer.neurons; j++) {
          const nextId = `l${l+1}_n${j}`
          const conn = connMap.get(`${id}:${nextId}`)
          if (conn) {
            errorSum += (deltas.get(nextId) || 0) * conn.weight
          }
        }
        
        const z = zValues.get(id) || 0
        const actFnPrime = getActivationPrime(layer.activation as ActivationFunction)
        const delta = errorSum * actFnPrime(z)
        deltas.set(id, delta)
      }
    }

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

  const lr = config.learningRate
  const gradientList = Array.from(weightGradients.values())
  const clippedWeights = clipGradients(gradientList, 1.0)
  
  let clipIdx = 0
  const updatedConnections = newConnections.map(c => {
    const grad = clippedWeights[clipIdx++] || 0
    const newWeight = c.weight - (lr * grad / batch.length)
    return {
      ...c,
      weight: isFiniteNumber(newWeight) ? newWeight : c.weight * 0.9
    }
  })
  
  const biasGradientList = Array.from(biasGradients.values())
  const clippedBiases = clipGradients(biasGradientList, 1.0)
  
  clipIdx = 0
  const updatedNeurons = newNeurons.map(n => {
    const grad = clippedBiases[clipIdx++] || 0
    const newBias = n.bias - (lr * grad / batch.length)
    return {
      ...n,
      bias: isFiniteNumber(newBias) ? newBias : n.bias * 0.9
    }
  })

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
    
    const mse = ex.target.reduce((sum, t, i) => sum + Math.pow(t - (predictions[i] || 0), 2), 0) / ex.target.length
    totalLoss += mse
    
    const predClass = predictions.indexOf(Math.max(...predictions))
    const targetClass = ex.target.indexOf(Math.max(...ex.target))
    if (predClass === targetClass) correct++
  })
  
  return {
    loss: totalLoss / examples.length,
    accuracy: correct / examples.length
  }
}
