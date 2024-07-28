import { Id, Team, TeamId } from '@repo/game/types'
import { create } from 'zustand'

export type TeamsState = {
  teams: Team[]
  user: Id
}

export type TeamsStore = TeamsState & {
  setUser: (id: Id) => void
  getRandomTeamId: () => string
}

export const useTeams = create<TeamsStore>((set, get) => ({
  teams: [{ id: TeamId() }, { id: TeamId() }],
  user: '',
  setUser: (user) => set({ user }),
  getRandomTeamId: () => get().teams[Math.round(Math.random())].id,
}))
