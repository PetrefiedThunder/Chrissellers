import { create } from 'zustand'
import type { Object3D } from 'three'

interface TargetingState {
  lockedObject: Object3D | null
  setLockedObject: (obj: Object3D | null) => void
}

export const useTargetingStore = create<TargetingState>((set) => ({
  lockedObject: null,
  setLockedObject: (obj) => set({ lockedObject: obj })
}))
