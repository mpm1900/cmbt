import {
  ActionResult,
  ActionsQueueItem,
  CombatContext,
  CombatRewards,
  Id,
  Item,
  Modifier,
  Mutation,
  MutationFilterArgs,
  Team,
  Turn,
  TurnStatus,
  Unit,
} from '@repo/game/types'
import { getRandom, validateModifiers } from '@repo/game/utils'
import { nanoid } from 'nanoid/non-secure'
import { ReactNode } from 'react'
import { create } from 'zustand'

export type CombatLogger = (node: React.ReactNode, delay?: number) => void

export type InitializeProps = {
  units: Unit[]
  user: Team
  enemy: Team
  commit: boolean
  reward: CombatRewards
  mutations?: Mutation[]
  modifiers?: Modifier[]
  onSuccess: () => void
  onFailure: () => void
}

export type CombatLog = { id: Id; delay: number; node: ReactNode }
export type CombatState = Omit<CombatContext, 'queue'> & {
  teams: Team[]
  commit: boolean
  reward: CombatRewards
  logs: CombatLog[]
  stagedActions: Record<Id, ActionsQueueItem[] | undefined>
  turn: Turn
  log: CombatLogger
  updateLog: (id: Id, fn: (log: CombatLog) => Partial<CombatLog>) => void
}
export type CombatStore = CombatState & {
  initialize: (props: InitializeProps) => CombatStore

  // units
  setUnits: (units: Unit[]) => Unit[]
  mutate(
    mutations: Mutation[],
    ctx: CombatContext,
    args?: MutationFilterArgs
  ): Unit[]

  // modifiers
  add(modifiers: Modifier[]): Modifier[]
  removeWhere(filter: (modifier: Modifier) => boolean): Modifier[]
  updateModifiers: (setter: (modifiers: Modifier[]) => Modifier[]) => Modifier[]
  removeZeroModifiers(): Modifier[]
  decrementModifiers(): Modifier[]

  // teams
  setTeams: (teams: Team[]) => void
  setUser: (id: Id) => void
  getRandomTeamId: () => string
  addItems: (teamId: Id, ...items: Item[]) => void
  removeItemsWhwere: (teamId: Id, fn: (item: Item) => boolean) => void

  // turn
  next: () => void
  setStatus: (status: TurnStatus) => void
  setTurn: (fn: (turn: Turn) => Partial<Turn>) => Turn
  pushResult: (result: ActionResult | undefined) => void

  // encounter link back
  onSuccess: () => void
  onFailure: () => void

  stageAction: (unitId: Id, action: ActionsQueueItem | undefined) => void
  setActionCooldown: (unitId: Id, actionId: Id, cooldown: number) => void
  decrementActionCooldowns: () => void
}

export const useCombat = create<CombatStore>((set, get) => {
  return {
    initialize: (props) => {
      const {
        units,
        user,
        enemy,
        commit,
        reward,
        modifiers = [],
        mutations = [],
        onSuccess,
        onFailure,
      } = props

      const initialModifiers = [
        ...props.units
          .filter((u) => u.flags.isActive)
          .flatMap((u) => u.modifiers()),
        ...modifiers,
      ]

      set({
        units: units,
        teams: [user, enemy],
        user: user.id,
        commit,
        reward,
        modifiers: validateModifiers(initialModifiers, []),
        turn: {
          count: 0,
          status: 'cleanup',
          results: [],
          hasRanOnTurnEndTriggers: false,
        },
        logs: [],
        onSuccess,
        onFailure,
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
    mutate(mutations, ctx, args) {
      args = args ?? {}
      set(({ units }) => ({
        units: units.map((unit) =>
          mutations.reduce<Unit>(
            (u, mutation) =>
              mutation.filter(u, ctx, args)
                ? { ...u, ...mutation.resolve(u) }
                : u,
            unit
          )
        ),
      }))
      return get().units
    },
    modifiers: [],
    add(modifiers) {
      set((state) => ({
        modifiers: [...state.modifiers, ...modifiers],
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
    removeZeroModifiers() {
      set(({ modifiers }) => ({
        modifiers: modifiers.filter((modifier) => modifier.duration !== 0),
      }))
      return get().modifiers
    },
    decrementModifiers() {
      set(({ modifiers }) => ({
        modifiers: modifiers.map((modifier) => modifier.decrement()),
      }))
      return get().modifiers
    },
    teams: [],
    user: '',
    setTeams: (teams) => set({ teams }),
    setUser: (user) => set({ user }),
    getRandomTeamId: () => getRandom(get().teams)?.id,
    addItems: (teamId, ...items) =>
      set((s) => ({
        teams: s.teams.map((t) =>
          t.id === teamId ? { ...t, items: t.items.concat(...items) } : t
        ),
      })),
    removeItemsWhwere: (teamId, fn) => {
      set((s) => ({
        teams: s.teams.map((t) =>
          t.id === teamId
            ? {
                ...t,
                items: t.items.filter((i) => !fn(i)),
              }
            : t
        ),
      }))
    },

    turn: {
      count: 0,
      status: 'upkeep' as TurnStatus,
      results: [],
      hasRanOnTurnEndTriggers: false,
    },
    next: () =>
      set((s) => ({
        turn: {
          ...s.turn,
          count: s.turn.count + 1,
          results: [],
          hasRanOnTurnEndTriggers: false,
        },
      })),
    setStatus: (status) => set((s) => ({ turn: { ...s.turn, status } })),
    setTurn: (fn) => {
      set((s) => ({
        turn: {
          ...s.turn,
          ...fn(s.turn),
        },
      }))
      return get().turn
    },
    pushResult: (result) =>
      set((s) => ({
        turn: {
          ...s.turn,
          results: [...s.turn.results, result],
        },
      })),

    commit: false,
    reward: {
      items: [],
      resources: {
        credits: 0,
      },
      xp: 0,
    },

    logs: [],
    log: (node, delay = 0) =>
      set((s) => ({ logs: s.logs.concat({ id: nanoid(), delay, node }) })),
    updateLog: (id, fn) =>
      set((s) => ({
        logs: s.logs.map((l) => (l.id === id ? { ...l, ...fn(l) } : l)),
      })),

    onSuccess: () => {},
    onFailure: () => {},

    stagedActions: {},
    stageAction: (unitId, action) => {
      set((s) => ({
        stagedActions: {
          ...s.stagedActions,
          [unitId]: !action
            ? undefined
            : s.stagedActions[unitId]
              ? s.stagedActions[unitId].concat(action)
              : [action],
        },
      }))
    },

    actionCooldowns: {},
    setActionCooldown: (unitId, actionId, cooldown) => {
      set((s) => ({
        actionCooldowns: {
          ...s.actionCooldowns,
          [unitId]: {
            ...s.actionCooldowns[unitId],
            [actionId]: cooldown,
          },
        },
      }))
    },
    decrementActionCooldowns: () => {
      set((s) => ({
        actionCooldowns: Object.fromEntries(
          Object.entries(s.actionCooldowns).map(([unitId, cooldowns]) => [
            unitId,
            Object.fromEntries(
              Object.entries(cooldowns).map(([actionId, cooldown]) => [
                actionId,
                cooldown - 1,
              ])
            ),
          ])
        ),
      }))
    },
  }
})
