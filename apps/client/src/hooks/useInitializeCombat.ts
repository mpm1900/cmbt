import { InitializeCombatOptions } from '@repo/game/types'
import { getAllModifiersFromUnit } from '@repo/game/utils'
import { useNavigate } from '@tanstack/react-router'
import { useActions, useCleanup, useCombat } from './state'

export function useInitializeCombat() {
  const actions = useActions()
  const cleanup = useCleanup()
  const combat = useCombat()
  const navigate = useNavigate()

  return (props: Required<InitializeCombatOptions>) => {
    const {
      userTeam,
      userUnits,
      enemyTeam,
      enemyUnits,
      commit,
      reward,
      mutations = [],
      modifiers = [],
      onSuccess,
      onFailure,
    } = props

    const units = [...userUnits, ...enemyUnits]
    actions.setQueue(() => [])
    cleanup.setQueue(() => [])
    combat.initialize(
      {
        units: units.map((u) => ({
          ...u,
          modifiers: () => getAllModifiersFromUnit(u),
        })),
        user: userTeam,
        enemy: enemyTeam,
        commit,
        reward,
        modifiers,
        mutations,
        onFailure,
        onSuccess,
      },
      combat
    )

    navigate({
      to: '/combat',
    })
  }
}
