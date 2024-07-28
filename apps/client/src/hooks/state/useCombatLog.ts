import { ReactNode } from 'react'
import { create } from 'zustand'

export type CombatLogState = {
  logs: ReactNode[]
}

export type CombatLogStore = CombatLogState & {
  push: (node: ReactNode) => void
}

export const useCombatLog = create<CombatLogStore>((set) => ({
  logs: [],
  push: (node) => set((s) => ({ logs: [...s.logs, node] })),
}))
