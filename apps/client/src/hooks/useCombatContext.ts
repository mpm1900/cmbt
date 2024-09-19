import { CombatContext } from '@repo/game/types'
import { validateModifiers } from '@repo/game/utils'
import { useCombat } from './state'

export function useCombatContext(): CombatContext {
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
    modifiers: validateModifiers(combat.modifiers, []),
  }
}
