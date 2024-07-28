import { Unit } from '@repo/game/types'
import { create } from 'zustand'

export type ActiveUiUnitStore = {
  unit: Unit | undefined
  setUnit: (unit: Unit | undefined) => void
}

export const useActiveUiUnit = create<ActiveUiUnitStore>((set) => ({
  unit: undefined,
  setUnit: (unit) => set({ unit }),
}))
