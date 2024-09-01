import { Id, Npc } from '@repo/game/types'
import { create } from 'zustand'

export type NpcState = {
  npcs: Npc[]
}

export type NpcStore = NpcState & {
  addNpc: (npc: Npc) => void
  removeWhere: (fn: (npc: Npc) => boolean) => void
  updateNpcValue: (
    id: Id,
    key: string,
    fn: (v: number | undefined) => number
  ) => void
}

export const useNpcs = create<NpcStore>((set) => ({
  npcs: [],
  addNpc: (npc) => {
    set((s) => ({ npcs: [...s.npcs, npc] }))
  },
  removeWhere: (fn) => {
    set((s) => ({ npcs: s.npcs.filter((c) => !fn(c)) }))
  },
  updateNpcValue: (id, key, fn) => {
    set((s) => ({
      npcs: s.npcs.map((npc) =>
        npc.id === id
          ? {
              ...npc,
              values: {
                ...npc.values,
                [key]: fn(npc.values[key]),
              },
            }
          : npc
      ),
    }))
  },
}))
