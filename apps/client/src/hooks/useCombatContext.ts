import { CombatContext } from '@repo/game/types'
import { useActions, useCombat } from './state'

export function useCombatContext(): CombatContext {
  const queue = useActions()
  const combat = useCombat((s) => ({
    modifiers: s.modifiers,
    teams: s.teams,
    turn: s.turn,
    units: s.units,
    user: s.user,
    actionCooldowns: s.actionCooldowns,
  }))

  return {
    ...combat,
    queue: queue.queue,
  }
}
