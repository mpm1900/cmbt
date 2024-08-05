import {
  CombatContext,
  Id,
  Modifier,
  Mutation,
  Team,
  TeamId,
  Unit,
} from '@repo/game/types'
import { validateModifiers } from '@repo/game/utils'
import { create } from 'zustand'

export type CombatState = Omit<CombatContext, 'log'>
export type CombatStore = CombatState & {
  // units
  setUnits: (units: Unit[]) => Unit[]
  mutate(mutations: Mutation[], ctx: CombatContext): Unit[]

  // modifiers
  add(modifiers: Modifier[]): Modifier[]
  removeWhere(filter: (modifier: Modifier) => boolean): Modifier[]
  updateModifiers: (setter: (modifiers: Modifier[]) => Modifier[]) => Modifier[]
  removeZeroDurations(): Modifier[]
  decrementDurations(): Modifier[]

  // teams
  setTeams: (teams: Team[]) => void
  setUser: (id: Id) => void
  getRandomTeamId: () => string
}

export const useCombat = create<CombatStore>((set, get) => {
  return {
    units: [],
    setUnits(units) {
      set({
        units,
      })
      return units
    },
    mutate(mutations, ctx) {
      set(({ units }) => ({
        units: units.map((unit) =>
          mutations.reduce<Unit>(
            (u, mutation) =>
              mutation.filter(u, ctx) ? { ...u, ...mutation.resolve(u) } : u,
            unit
          )
        ),
      }))
      return get().units
    },
    modifiers: [],
    add(modifiers) {
      set((state) => ({
        modifiers: validateModifiers(modifiers, state.modifiers),
      }))
      return get().modifiers
    },
    removeWhere(clause) {
      set(({ modifiers }) => ({
        modifiers: modifiers.filter((m) => !clause(m)),
      }))
      return get().modifiers
    },
    updateModifiers(setter) {
      set(({ modifiers }) => ({
        modifiers: setter(modifiers),
      }))
      return get().modifiers
    },
    removeZeroDurations() {
      set(({ modifiers }) => ({
        modifiers: modifiers.filter((modifier) => modifier.duration !== 0),
      }))
      return get().modifiers
    },
    decrementDurations() {
      set(({ modifiers }) => ({
        modifiers: modifiers.map((modifier) => modifier.decrementDuration()),
      }))
      return get().modifiers
    },
    teams: [{ id: TeamId() }, { id: TeamId() }],
    user: '',
    setTeams: (teams) => set({ teams }),
    setUser: (user) => set({ user }),
    getRandomTeamId: () => get().teams[Math.round(Math.random())]?.id,
  }
})
