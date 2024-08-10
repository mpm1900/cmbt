import { ShopEncounter } from '@/components/encounter/encounters'
import { Encounter, EncounterNode } from '@repo/game/types'
import { create } from 'zustand'

export type EncounterState = {
  encounter: Encounter
}

export type EncounterStore = EncounterState & {
  getActiveNode: () => EncounterNode | undefined
  updateEncounter: (fn: (e: Encounter) => Partial<Encounter>) => void
}

export const useEncounter = create<EncounterStore>((set, get) => ({
  encounter: ShopEncounter,
  getActiveNode: () => {
    const state = get()
    return state.encounter.nodes.find(
      (n) => n.id === state.encounter.activeNodeId
    )
  },
  updateEncounter: (fn) =>
    set((s) => ({
      encounter: {
        ...s.encounter,
        ...fn(s.encounter),
      },
    })),
}))
