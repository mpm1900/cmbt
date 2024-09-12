import { getTeamsWithSelectionRequired } from '@/utils'
import { IncrementActiveTurns, IncrementInactiveTurns } from '@repo/game/data'
import { useEffect } from 'react'
import { useCombat } from '../state'
import { useResults } from '../state/useResults'
import { useCombatActions } from '../useCombatActions'
import { useCombatContext } from '../useCombatContext'

export function useEndController() {
  const results = useResults()
  const combat = useCombat()
  const fns = useCombatActions()
  let ctx = useCombatContext()
  const isEnd = combat.turn.status === 'end'

  function decrementModifierDurations() {
    combat.decrementDurations()
    return combat.removeZeroDurations()
  }

  useEffect(() => {
    if (isEnd) {
      if (results.queue.length === 0) {
        if (!combat.turn.hasRanOnTurnEndTriggers && combat.turn.count > 0) {
          fns.pushTriggers('on Turn End', ctx)
          combat.setTurn((t) => ({ hasRanOnTurnEndTriggers: true }))
        } else {
          const teams = getTeamsWithSelectionRequired(ctx)
          if (teams.length === 0) {
            if (combat.turn.count > 0) {
              decrementModifierDurations()
            }
            combat.next()
            combat.mutate(
              [new IncrementActiveTurns({}), new IncrementInactiveTurns({})],
              ctx
            )
            combat.setStatus('upkeep')
          } else {
            combat.setStatus('cleanup')
          }
        }
      }
    }
  }, [isEnd, results.queue.length, combat.turn.hasRanOnTurnEndTriggers])
}
