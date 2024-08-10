import { Team, Unit } from '@repo/game/types'
import { create } from 'zustand'

export type GameState = {
  team: Team | undefined
  units: Unit[]
}

type InitializeProps = {
  team: Team
  units: Unit[]
}

export type GameStore = GameState & {
  initialize: (props: InitializeProps) => void
  updateTeam: (fn: (team: Team) => Partial<Team>) => void
}

export const useGame = create<GameStore>((set) => ({
  team: undefined,
  units: [],
  initialize: (props) =>
    set({
      team: props.team,
      units: props.units,
    }),
  updateTeam: (fn) => {
    set((s) => ({
      team: s.team ? { ...s.team, ...fn(s.team) } : s.team,
    }))
  },
}))
