import {
  ActionResult,
  CombatContext,
  Id,
  Item,
  Modifier,
  Mutation,
  Team,
  Turn,
  TurnStatus,
  Unit,
} from '@repo/game/types'
import { validateModifiers } from '@repo/game/utils'
import { ReactNode } from 'react'
import { create } from 'zustand'

export type InitializeProps = {
  teams: Team[]
  units: Unit[]
  user: string
}

export type CombatState = CombatContext & {
  logs: ReactNode[]
}
export type CombatStore = CombatState & {
  initialize: (props: InitializeProps) => CombatStore

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
  addItems: (teamId: Id, ...items: Item[]) => void
  decrementWhere: (teamId: Id, fn: (item: Item) => boolean) => void

  // turn
  next: () => void
  setStatus: (status: TurnStatus) => void
  setTurn: (fn: (turn: Turn) => Partial<Turn>) => void
  pushResult: (result: ActionResult | undefined) => void
}

export const useCombat = create<CombatStore>((set, get) => {
  return {
    initialize: (props) => {
      const modifiers = props.units
        .filter((u) => u.flags.isActive)
        .flatMap((u) => u.modifiers())
      set({
        units: props.units,
        teams: props.teams,
        user: props.user,
        modifiers: validateModifiers(modifiers, []),
        turn: {
          count: 0,
          status: 'init',
          results: [],
        },
      })
      return get()
    },
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
    teams: [],
    user: '',
    setTeams: (teams) => set({ teams }),
    setUser: (user) => set({ user }),
    getRandomTeamId: () => get().teams[Math.round(Math.random())]?.id,
    addItems: (teamId, ...items) =>
      set((s) => ({
        teams: s.teams.map((t) =>
          t.id === teamId ? { ...t, items: t.items.concat(...items) } : t
        ),
      })),
    decrementWhere: (teamId, fn) =>
      set((s) => ({
        teams: s.teams.map((t) =>
          t.id === teamId
            ? {
                ...t,
                items: t.items.map((i) => (fn(i) ? i.decrementCount() : i)),
              }
            : t
        ),
      })),

    turn: {
      count: 0,
      status: 'init',
      results: [],
    },
    next: () =>
      set((s) => ({
        turn: { ...s.turn, count: s.turn.count + 1, results: [] },
      })),
    setStatus: (status) => set((s) => ({ turn: { ...s.turn, status } })),
    setTurn: (fn) =>
      set((s) => ({
        turn: {
          ...s.turn,
          ...fn(s.turn),
        },
      })),
    pushResult: (result) =>
      set((s) => ({
        turn: {
          ...s.turn,
          results: [...s.turn.results, result],
        },
      })),

    logs: [],
    log: (node) => set((s) => ({ logs: s.logs.concat(node) })),
  }
})
