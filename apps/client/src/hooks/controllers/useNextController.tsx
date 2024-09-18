import { getTeamsWithSelectionRequired } from '@/utils'
import { IncrementActiveTurns, IncrementInactiveTurns } from '@repo/game/data'
import { useEffect } from 'react'
import { useCombat, useCombatSettings } from '../state'
import { useCombatContext } from '../useCombatContext'

export function useNextController() {
  const combat = useCombat()
  const ctx = useCombatContext()
  const settings = useCombatSettings()
  const isNext = combat.turn.status === 'next'

  useEffect(() => {
    if (isNext) {
      const teams = getTeamsWithSelectionRequired(ctx)
      if (teams.length === 0) {
        setTimeout(
          () => {
            combat.removeZeroModifiers()
            combat.next()
            combat.mutate(
              [new IncrementActiveTurns({}), new IncrementInactiveTurns({})],
              ctx
            )
            combat.setStatus('upkeep')
          },
          combat.turn.count > 0 ? settings.gameSpeed * 1.5 : 0
        )
      } else {
        combat.setStatus('cleanup')
      }
    }
  }, [isNext])
}
