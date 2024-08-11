import { ShopEncounter } from '@/components/encounter/encounters'
import { Encounter, Id, Team, Unit } from '@repo/game/types'
import { nanoid } from 'nanoid/non-secure'
import { create } from 'zustand'

type Point = { x: number; y: number }

export type GameWorldTile = {
  id: Id
  position: Point
  size: Point
  encounter: Encounter
}

export type GameWorld = {
  size: Point
  tiles: GameWorldTile[]
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
  updateTeam: (fn: (team: Team) => Partial<Team>) => void
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
  updateTeam: (fn) => {
    set((s) => ({
      team: s.team ? { ...s.team, ...fn(s.team) } : s.team,
    }))
  },
}))
