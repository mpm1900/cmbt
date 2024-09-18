import { useEffect } from 'react'
import { useCombat } from '../state'
import { useResults } from '../state/useResults'
import { useCombatActions } from '../useCombatActions'
import { useCombatContext } from '../useCombatContext'

export function useEndController() {
  const results = useResults()
  const combat = useCombat()
  const fns = useCombatActions()
  const ctx = useCombatContext()

  const isEnd = combat.turn.status === 'end'

  useEffect(() => {
    if (isEnd) {
      if (results.queue.length === 0) {
        if (!combat.turn.hasRanOnTurnEndTriggers && combat.turn.count > 0) {
          ctx.modifiers = combat.decrementModifiers()
          combat.decrementActionCooldowns()
          fns.pushTriggers('on Turn End', ctx)
          combat.setTurn((t) => ({ hasRanOnTurnEndTriggers: true }))
        } else {
          combat.setStatus('next')
        }
      }
    }
  }, [isEnd, results.queue.length, combat.turn.hasRanOnTurnEndTriggers])
}
