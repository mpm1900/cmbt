import { TestEncounter } from '@repo/game/data'
import { Encounter, EncounterNode } from '@repo/game/types'
import { create } from 'zustand'

export type EncounterState = {
  encounter: Encounter
}

export type EncounterStore = EncounterState & {
  getActiveNode: () => EncounterNode | undefined
}

export const useEncounter = create<EncounterStore>((set, get) => ({
  encounter: TestEncounter,
  getActiveNode: () => {
    const state = get()
    return state.encounter.nodes.find(
      (n) => n.id === state.encounter.activeNodeId
    )
  },
}))
