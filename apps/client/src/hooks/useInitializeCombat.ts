import { TeamId } from '@repo/game/data'
import { InitializeCombatOptions, Team } from '@repo/game/types'
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
      enemyUnits,
      mutations = [],
      modifiers = [],
      onSuccess,
      onFailure,
    } = props
    const aiTeam: Team = { id: TeamId(), items: [], resources: { credits: 0 } }
    const units = [
      ...userUnits,
      ...enemyUnits.map((u) => ({ ...u, teamId: aiTeam.id })),
    ]
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
