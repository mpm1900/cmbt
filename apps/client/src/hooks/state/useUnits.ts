import { Unit, Id, Modifier, GameContext } from '@repo/game/types'
import { create } from 'zustand'

type UnitsState = {
  units: Unit[]
}

type UnitsStore = UnitsState & {
  add(...units: Unit[]): Unit[]
  remove(...ids: Id[]): Unit[]
  update(modifiers: Modifier[], ctx: GameContext): Unit[]
}

export const useUnits = create<UnitsStore>((set, get) => ({
  units: [],
  add(...units) {
    set((state) => ({
      units: [...state.units, ...units],
    }))
    return get().units
  },
  remove(...rtids) {
    set(({ units }) => ({
      units: units.filter((unit) => !rtids.includes(unit.id)),
    }))
    return get().units
  },
  update(modifiers, ctx) {
    set(({ units }) => ({
      units: units.map((unit) => {
        return modifiers.reduce<Unit>((u, modifier) => {
          return modifier.filter(u, ctx) ? { ...u, ...modifier.fn(u) } : u
        }, unit)
      }),
    }))
    return get().units
  },
}))
