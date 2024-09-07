import { Encounter, EncounterNode, Id } from '@repo/game/types'
import { ReactNode } from '@tanstack/react-router'
import { nanoid } from 'nanoid/non-secure'
import { create } from 'zustand'

export type EncounterLog = { id: Id; node: ReactNode }
export type EncounterState = {
  encounter: Encounter
  logs: EncounterLog[]
}

export type EncounterStore = EncounterState & {
  log: (item: React.ReactNode) => void
  clearLog: () => void
  getActiveNode: () => EncounterNode | undefined
  updateEncounter: (fn: (e: Encounter) => Partial<Encounter>) => Encounter
}

export const useEncounter = create<EncounterStore>((set, get) => ({
  encounter: {
    id: '',
    nodes: [],
    activeNodeId: '',
    visitedNodeIds: [],
    values: {},
    setup: () => {},
  },
  logs: [],
  visitedNodeIds: [],
  log: (item) => {
    set((s) => ({
      logs: [...s.logs, { id: nanoid(), node: item }],
    }))
  },
  clearLog: () =>
    set((s) => ({
      logs: [],
    })),
  getActiveNode: () => {
    const state = get()
    return state.encounter?.nodes.find(
      (n) => n.id === state.encounter?.activeNodeId
    )
  },
  updateEncounter: (fn) => {
    set((s) => {
      return {
        encounter: {
          ...s.encounter,
          ...fn(s.encounter),
        },
      }
    })
    return get().encounter
  },
}))
