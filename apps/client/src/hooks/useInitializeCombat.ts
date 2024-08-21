import { InitializeCombatOptions } from '@repo/game/types'
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
      mutations = [],
      modifiers = [],
      onSuccess,
      onFailure,
    } = props

    const units = [...userUnits, ...enemyUnits]
    actions.setQueue(() => [])
    cleanup.setQueue(() => [])
    combat.initialize({
      units,
      user: userTeam,
      enemy: enemyTeam,
      onFailure,
      onSuccess,
    })

    navigate({
      to: '/combat',
    })
  }
}
