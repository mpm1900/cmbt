import { Encounter, EncounterNode } from '@repo/game/types'
import { nanoid } from 'nanoid/non-secure'
import { create } from 'zustand'

export type EncounterState = {
  encounter: Encounter
}

export type EncounterStore = EncounterState & {
  getActiveNode: () => EncounterNode | undefined
  updateEncounter: (fn: (e: Encounter) => Partial<Encounter>) => void
}

export const useEncounter = create<EncounterStore>((set, get) => ({
  encounter: { id: nanoid(), nodes: [], activeNodeId: '' },
  getActiveNode: () => {
    const state = get()
    return state.encounter?.nodes.find(
      (n) => n.id === state.encounter?.activeNodeId
    )
  },
  updateEncounter: (fn) =>
    set((s) => {
      return {
        encounter: {
          ...s.encounter,
          ...fn(s.encounter),
        },
      }
    }),
}))
