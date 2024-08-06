import { create } from 'zustand'

export type DebugMode = {
  active: boolean
  set: (active: boolean) => void
}

export const useDebugMode = create<DebugMode>((set) => ({
  active: false,
  set: (active) => set({ active }),
}))
