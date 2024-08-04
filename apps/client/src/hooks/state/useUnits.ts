import { Unit, Id, GameContext, Mutation } from '@repo/game/types'
import { create } from 'zustand'

type UnitsState = {
  units: Unit[]
}

type UnitsStore = UnitsState & {
  addUnits(...units: Unit[]): Unit[]
  mutate(mutations: Mutation[], ctx: GameContext): Unit[]
}

export const useUnits = create<UnitsStore>((set, get) => ({
  units: [],
  addUnits(...units) {
    set((state) => ({
      units: [...state.units, ...units],
    }))
    return get().units
  },
  mutate(mutations, ctx) {
    set(({ units }) => ({
      units: units.map((unit) => {
        return mutations.reduce<Unit>((u, mutation) => {
          return mutation.filter(u, ctx) ? { ...u, ...mutation.resolve(u) } : u
        }, unit)
      }),
    }))

    return get().units
  },
}))
