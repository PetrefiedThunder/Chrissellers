/**
 * Connection Component
 *
 * Renders a connection line between two neurons.
 */

import { useMemo } from 'react'
import { Line } from '@react-three/drei'
import { ConnectionVisual, NeuronVisual } from '../../lib/neural/types'
import { getConnectionColor, getConnectionOpacity } from '../../lib/viz/networkLayout'

interface ConnectionProps {
  connection: ConnectionVisual
  fromNeuron: NeuronVisual
  toNeuron: NeuronVisual
  isSelected: boolean
  showConnections: boolean
}

export default function Connection({
  connection,
  fromNeuron,
  toNeuron,
  isSelected,
  showConnections,
}: ConnectionProps) {
  // Create line points
  const points = useMemo(() => [
    fromNeuron.position,
    toNeuron.position,
  ], [fromNeuron.position, toNeuron.position])

  if (!showConnections) return null

  const color = getConnectionColor(connection.weight)
  const opacity = getConnectionOpacity(connection.strength, connection.active)

  return (
    <Line
      points={points}
      color={color}
      lineWidth={isSelected ? 3 : connection.active ? 2 : 1}
      transparent
      opacity={opacity}
    />
  )
}
