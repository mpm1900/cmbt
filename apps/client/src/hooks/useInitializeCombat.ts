import { faker } from '@faker-js/faker'
import { TeamId } from '@repo/game/data'
import { Modifier, Mutation, Team, Unit } from '@repo/game/types'
import { makeUnit } from '@repo/game/utils'
import { useNavigate } from '@tanstack/react-router'
import { useActions, useCleanup, useCombat } from './state'

export type InitializeFunctionProps = {
  userTeam: Team
  userUnits: Unit[]
  modifiers: Modifier[]
  mutations: Mutation[]
  enemyUnitCount: number
  onSuccess: () => void
  onFailure: () => void
}

export function useInitializeCombat() {
  const actions = useActions()
  const cleanup = useCleanup()
  const combat = useCombat()
  const navigate = useNavigate()

  return (props: InitializeFunctionProps) => {
    const {
      userTeam,
      userUnits,
      enemyUnitCount,
      mutations = [],
      modifiers = [],
      onSuccess,
      onFailure,
    } = props
    const aiTeam: Team = { id: TeamId(), items: [], resources: { credits: 0 } }
    const enemyUnits = Array.from({ length: enemyUnitCount }).map(() =>
      makeUnit(aiTeam.id, faker.person.fullName(), false)
    )
    const units = [...userUnits, ...enemyUnits]
    actions.setQueue(() => [])
    cleanup.setQueue(() => [])
    combat.initialize({
      units,
      user: userTeam,
      enemy: aiTeam,
      onFailure,
      onSuccess,
    })

    navigate({
      to: '/combat',
    })
  }
}
