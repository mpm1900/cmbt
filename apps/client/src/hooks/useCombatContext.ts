import { CombatContext } from '@repo/game/types'
import { useCombat } from './state'

export function useCombatContext(): CombatContext {
  return useCombat((s) => ({
    modifiers: s.modifiers,
    teams: s.teams,
    turn: s.turn,
    units: s.units,
    user: s.user,
    log: s.log,
  }))
}
