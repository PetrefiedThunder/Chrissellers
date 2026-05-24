'use client'

import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useTargetingStore } from '@/src/state/targetingStore'

const targetPosition = new THREE.Vector3()
const targetLookAt = new THREE.Vector3()
const currentLookAt = new THREE.Vector3()
const hoverOffset = new THREE.Vector3()
const defaultPosition = new THREE.Vector3(0, 0, 30)
const defaultLookAt = new THREE.Vector3(0, 0, 0)

export default function TacticalCameraController() {
  const { camera } = useThree()
  const lockedObject = useTargetingStore((state) => state.lockedObject)

  useFrame((_, delta) => {
    const damping = 1.0 - Math.pow(0.001, delta)
    const positionAlpha = Math.min(1, damping * 2)
    const lookAlpha = Math.min(1, damping * 2.5)

    if (lockedObject) {
      lockedObject.getWorldPosition(targetLookAt)

      hoverOffset.copy(targetLookAt).normalize().multiplyScalar(20)
      targetPosition.copy(targetLookAt).add(hoverOffset)
    } else {
      targetPosition.copy(defaultPosition)
      targetLookAt.copy(defaultLookAt)
    }

    camera.position.lerp(targetPosition, positionAlpha)
    currentLookAt.lerp(targetLookAt, lookAlpha)
    camera.lookAt(currentLookAt)
  })

  return null
}
