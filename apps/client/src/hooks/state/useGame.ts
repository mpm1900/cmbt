import { Encounter, Id, Item, Team, Unit } from '@repo/game/types'
import { create } from 'zustand'

export type GameWorldNodeIconKey = 'combat' | 'shop' | 'start'

export type GameWorldNode = {
  id: Id
  size: number
  edges: Id[]
  icon: GameWorldNodeIconKey
  encounter: Encounter
  isInteractable: boolean
  repeats: boolean
}

export type GameWorld = {
  nodes: GameWorldNode[]
  activeNodeId: Id
  visitiedNodeIds: Id[]
}

export type GameState = {
  team: Team
  units: Unit[]
  world: GameWorld
}

type InitializeProps = {
  team: Team
  units: Unit[]
  world: GameWorld
}

export type GameStore = GameState & {
  initialize: (props: InitializeProps) => void
  setActiveNodeId: (node: GameWorldNode) => void
  updateTeam: (fn: (team: Team) => Partial<Team>) => void
  addItem: (item: Item) => void
}

export const useGame = create<GameStore>((set) => ({
  world: {
    activeNodeId: '',
    nodes: [],
    visitiedNodeIds: [],
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
        visitiedNodeIds: node.repeats
          ? s.world.visitiedNodeIds
          : Array.from(new Set([...s.world.visitiedNodeIds, node.id])),
      },
    }))
  },
  updateTeam: (fn) => {
    set((s) => ({
      team: s.team ? { ...s.team, ...fn(s.team) } : s.team,
    }))
  },
  addItem: (item) => {
    set((s) => {
      if (s.team?.items.find((i) => i.id === item.id)) {
        return {
          team: {
            ...s.team,
            resources: {
              ...s.team.resources,
              credits: s.team.resources.credits - item.cost,
            },
            items: s.team.items.map((i) =>
              i.id === item.id ? { ...i, count: i.count + item.count } : i
            ),
          },
        }
      } else {
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
      }
    })
  },
}))
