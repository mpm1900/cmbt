import {
  CombatContext,
  Id,
  Item,
  Mutation,
  MutationFilterArgs,
  Team,
  Unit,
  World,
  WorldNode,
} from '@repo/game/types'
import { create } from 'zustand'

export type GameState = {
  team: Team
  units: Unit[]
  world: World
  visitedNodeIds: Id[]
}

export type InitializeWorldProps = {
  team: Team
  units: Unit[]
  world: World
}

export type GameStore = GameState & {
  initialize: (props: InitializeWorldProps) => void
  setActiveNodeId: (node: WorldNode) => void
  updateWorldNode: (
    nodeId: Id,
    fn: (n: WorldNode) => Partial<WorldNode>
  ) => void
  updateTeam: (fn: (team: Team) => Partial<Team>) => void

  updateUnits: (fn: (unit: Unit) => Partial<Unit>) => void
  mutate(mutations: Mutation[], args?: MutationFilterArgs): void

  buyItem: (item: Item, cost: number) => void
  addVisitedNodes: (...ids: Id[]) => void
}

export const useGame = create<GameStore>((set) => ({
  world: {
    activeNodeId: '',
    startingNodeId: '',
    nodes: [],
    visitedNodeIds: [],
  },
  visitedNodeIds: [],
  team: {
    id: '',
    items: [],
    resources: {
      credits: 0,
    },
    maxActiveUnits: 2,
  },
  units: [],
  initialize: (props) =>
    set({
      team: props.team,
      units: props.units,
      world: props.world,
      visitedNodeIds: [],
    }),
  setActiveNodeId: (node) => {
    set((s) => ({
      world: {
        ...s.world,
        activeNodeId: node.id,
      },
    }))
  },
  updateWorldNode: (nodeId, fn) => {
    set((s) => ({
      world: {
        ...s.world,
        nodes: s.world.nodes.map((n) =>
          n.id === nodeId
            ? {
                ...n,
                ...fn(n),
              }
            : n
        ),
      },
    }))
  },
  updateTeam: (fn) => {
    set((s) => ({
      team: s.team ? { ...s.team, ...fn(s.team) } : s.team,
    }))
  },
  updateUnits: (fn) => {
    set((s) => ({
      units: s.units.map((u) => ({
        ...u,
        ...fn(u),
      })),
    }))
  },
  mutate(mutations, args) {
    args = args ?? {}
    set((s) => ({
      units: s.units.map((unit) =>
        mutations.reduce<Unit>((u, mutation) => {
          const ctx: CombatContext = {
            units: s.units,
            modifiers: [],
            user: s.team.id,
            actionCooldowns: {},
          }
          return mutation.filter(u, ctx, args)
            ? { ...u, ...mutation.resolve(u) }
            : u
        }, unit)
      ),
    }))
  },
  buyItem: (item, cost) => {
    set((s) => {
      return {
        team: {
          ...s.team,
          resources: {
            ...s.team.resources,
            credits: s.team.resources.credits - cost,
          },
          items: [...s.team.items, item],
        },
      }
    })
  },

  addVisitedNodes: (...ids) => {
    set((s) => ({
      visitedNodeIds: [...s.visitedNodeIds, ...ids],
    }))
  },
}))
