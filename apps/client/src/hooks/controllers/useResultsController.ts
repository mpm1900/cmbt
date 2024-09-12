import { logActionIntent } from '@/utils'
import { useEffect } from 'react'
import { useCombat, useCombatSettings } from '../state'
import { useResults } from '../state/useResults'
import { useCombatActions } from '../useCombatActions'
import { useCombatContext } from '../useCombatContext'

export function useResultsController() {
  const results = useResults()
  const combat = useCombat()
  const fns = useCombatActions()
  const settings = useCombatSettings()
  let ctx = useCombatContext()
  const { log, setTurn } = useCombat()

  const first = results.queue[0]
  const speed =
    settings.gameSpeed *
    (first && first.action && combat.turn.count > 0 ? 1 : 0)

  useEffect(() => {
    if (first) {
      console.log('first', first)
      if (first.action && first.shouldLog) {
        logActionIntent(first.action, first, log, ctx)
        setTurn((t) => ({
          results: t.results.concat(first),
        }))
      }
      setTimeout(() => {
        ctx = fns.commitResult(first, ctx)
        setTimeout(() => {
          ctx = fns.cleanupResult(ctx)
          if (first.action) {
          }
          results.dequeue()
        }, speed)
      }, speed)
    }
  }, [first, combat.turn.status])
}
