import { faker } from '@faker-js/faker'
import { TeamId } from '@repo/game/data'
import { Modifier, Mutation, Team, Unit } from '@repo/game/types'
import { makeUnit } from '@repo/game/utils'
import { useActions, useCleanup, useCombat } from './state'
import { useNavigate } from '@tanstack/react-router'

export function useInitializeCombat() {
  const actions = useActions()
  const cleanup = useCleanup()
  const combat = useCombat()
  const navigate = useNavigate()

  return (
    userTeam: Team,
    userUnits: Unit[],
    modifiers: Modifier[],
    mutations: Mutation[]
  ) => {
    const aiTeam: Team = { id: TeamId(), items: [] }
    const teams: Team[] = [userTeam, aiTeam]
    const units = [
      ...userUnits,
      makeUnit(aiTeam.id, faker.person.fullName(), false),
      makeUnit(aiTeam.id, faker.person.fullName(), false),
      makeUnit(aiTeam.id, faker.person.fullName(), false),
      makeUnit(aiTeam.id, faker.person.fullName(), false),
      makeUnit(aiTeam.id, faker.person.fullName(), false),
      makeUnit(aiTeam.id, faker.person.fullName(), false),
    ]
    actions.setQueue(() => [])
    cleanup.setQueue(() => [])
    combat.initialize({ teams, units, user: userTeam.id })

    navigate({
      to: '/combat',
    })
  }
}
