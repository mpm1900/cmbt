import { GAME_SPEED } from '@/constants'
import { create } from 'zustand'

export type CombatSettingsStore = {
  isDebugMode: boolean
  setIsDebugMode: (active: boolean) => void
  gameSpeed: number
  setGameSpeed: (gameSpeed: number) => void
}

export const useCombatSettings = create<CombatSettingsStore>((set) => ({
  isDebugMode: false,
  setIsDebugMode: (isDebugMode) => set({ isDebugMode }),
  gameSpeed: GAME_SPEED,
  setGameSpeed: (gameSpeed) => set({ gameSpeed }),
}))
