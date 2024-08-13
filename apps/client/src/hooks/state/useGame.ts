import { Encounter, Id, Item, Team, Unit } from '@repo/game/types'
import { create } from 'zustand'

type Point = { x: number; y: number }

export type GameWorldNode = {
  id: Id
  position: Point
  size: number
  encounter: Encounter
  edges: Id[]
  isInteractable: boolean
}

export type GameWorld = {
  activeNodeId: Id
  nodes: GameWorldNode[]
}

export type GameState = {
  team: Team | undefined
  units: Unit[]
  world: GameWorld | undefined
}

type InitializeProps = {
  team: Team
  units: Unit[]
  world: GameWorld
}

export type GameStore = GameState & {
  initialize: (props: InitializeProps) => void
  setActiveNodeId: (nodeId: Id) => void
  updateTeam: (fn: (team: Team) => Partial<Team>) => void
  addItem: (item: Item) => void
}

export const useGame = create<GameStore>((set) => ({
  world: undefined,
  team: undefined,
  units: [],
  initialize: (props) =>
    set({
      team: props.team,
      units: props.units,
      world: props.world,
    }),
  setActiveNodeId: (nodeId) => {
    set((s) => ({
      world: s.world
        ? {
            ...s.world,
            activeNodeId: nodeId,
          }
        : s.world,
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
          team: s.team
            ? {
                ...s.team,
                resources: {
                  ...s.team.resources,
                  credits: s.team.resources.credits - item.cost,
                },
                items: s.team.items.map((i) =>
                  i.id === item.id ? { ...i, count: i.count + item.count } : i
                ),
              }
            : s.team,
        }
      } else {
        return {
          team: s.team
            ? {
                ...s.team,
                resources: {
                  ...s.team.resources,
                  credits: s.team.resources.credits - item.cost,
                },
                items: [...s.team.items, item],
              }
            : s.team,
        }
      }
    })
  },
}))
