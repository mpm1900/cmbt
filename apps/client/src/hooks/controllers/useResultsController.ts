import { logActionIntent } from '@/utils'
import { getTeamsWithLiveUnits, isUnitAlive } from '@repo/game/utils'
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
      const aliveTeams = getTeamsWithLiveUnits(combat.teams, ctx)

      if (aliveTeams.length === combat.teams.length) {
        const shouldCommitResult =
          !first.action ||
          !first.expandedTargets?.length ||
          first.expandedTargets?.some((t) =>
            isUnitAlive(ctx.units.find((u) => u.id === t.id))
          )
        if (
          first.action &&
          first.shouldLog &&
          shouldCommitResult &&
          aliveTeams.length > 0
        ) {
          logActionIntent(first.action, first, log, ctx)
          setTurn((t) => ({
            results: t.results.concat(first),
          }))
        }

        if (shouldCommitResult) {
          setTimeout(() => {
            ctx = fns.commitResult(first, ctx)
            setTimeout(() => {
              fns.cleanupResult(first, ctx)
              setTimeout(() => {
                results.dequeue()
              }, speed)
            }, speed)
          }, speed)
        } else {
          results.dequeue()
        }
      } else {
        combat.setStatus('done')
      }
    }
  }, [first])
}
