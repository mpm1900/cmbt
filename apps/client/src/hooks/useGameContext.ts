import { GameContext } from '@repo/game/types'
import { useModifiers } from './state/useModifiers'
import { useUnits } from './state/useUnits'
import { useTeams } from './state/useTeams'
import { useCombatLog } from './state/useCombatLog'

export function useGameContext(): GameContext {
  const modifiers = useModifiers((m) => m.modifiers)
  const units = useUnits((u) => u.units)
  const { teams, user } = useTeams((u) => ({
    teams: u.teams,
    user: u.user,
  }))
  const log = useCombatLog((s) => s.push)

  return { modifiers, units, teams, user, log }
}
