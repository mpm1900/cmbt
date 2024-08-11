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
    mutations: Mutation[],
    enemyUnitCount: number
  ) => {
    const aiTeam: Team = { id: TeamId(), items: [] }
    const enemyUnits = Array.from({ length: enemyUnitCount }).map(() =>
      makeUnit(aiTeam.id, faker.person.fullName(), false)
    )
    const units = [...userUnits, ...enemyUnits]
    actions.setQueue(() => [])
    cleanup.setQueue(() => [])
    combat.initialize({ units, user: userTeam, enemy: aiTeam })

    navigate({
      to: '/combat',
    })
  }
}
