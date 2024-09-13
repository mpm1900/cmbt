import { logActionIntent } from '@/utils'
import { isUnitAlive } from '@repo/game/utils'
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
      const shouldCommitResult =
        !first.action ||
        !first.expandedTargets ||
        first.expandedTargets.length === 0 ||
        first.expandedTargets?.some((t) =>
          isUnitAlive(ctx.units.find((u) => u.id === t.id))
        )

      if (first.action && first.shouldLog && shouldCommitResult) {
        logActionIntent(first.action, first, log, ctx)
        setTurn((t) => ({
          results: t.results.concat(first),
        }))
      }
      if (shouldCommitResult) {
        setTimeout(() => {
          ctx = fns.commitResult(first, ctx)
          setTimeout(() => {
            ctx = fns.cleanupResult(ctx)
            results.dequeue()
          }, speed * 1.5)
        }, speed)
      } else {
        results.dequeue()
      }
    }
  }, [first, combat.turn.status])
}
