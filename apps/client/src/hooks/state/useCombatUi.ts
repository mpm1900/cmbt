import { Unit } from '@repo/game/types'
import { create } from 'zustand'

export type CombatUiStore = {
  activeUnit: Unit | undefined
  setActiveUnit: (unit: Unit | undefined) => void
  hoverTargetUnit: Unit | undefined
  setHoverTargetUnit: (unit: Unit | undefined) => void
}

export const useCombatUi = create<CombatUiStore>((set) => ({
  activeUnit: undefined,
  setActiveUnit: (activeUnit) => set({ activeUnit }),
  hoverTargetUnit: undefined,
  setHoverTargetUnit: (hoverTargetUnit) => set({ hoverTargetUnit }),
}))
