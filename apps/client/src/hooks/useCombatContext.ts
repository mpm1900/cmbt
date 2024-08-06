import { CombatContext } from '@repo/game/types'
import { useCombatLog } from './state/useCombatLog'
import { useCombat } from './state'

export function useCombatContext(): CombatContext {
  const { modifiers, teams, turn, units, user } = useCombat()
  const { log } = useCombatLog((s) => ({ log: s.push }))

  return { modifiers, teams, turn, units, user, log }
}
