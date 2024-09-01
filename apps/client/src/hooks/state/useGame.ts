import { Id, Item, Team, Unit, World, WorldNode } from '@repo/game/types'
import { create } from 'zustand'

export type GameState = {
  team: Team
  units: Unit[]
  world: World
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
  buyItem: (item: Item) => void
}

export const useGame = create<GameStore>((set) => ({
  world: {
    activeNodeId: '',
    startingNodeId: '',
    nodes: [],
    visitedNodeIds: [],
  },
  team: {
    id: '',
    items: [],
    resources: {
      credits: 0,
    },
  },
  units: [],
  initialize: (props) =>
    set({
      team: props.team,
      units: props.units,
      world: props.world,
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
  buyItem: (item) => {
    set((s) => {
      return {
        team: {
          ...s.team,
          resources: {
            ...s.team.resources,
            credits: s.team.resources.credits - item.cost,
          },
          items: [...s.team.items, item],
        },
      }
    })
  },
}))
