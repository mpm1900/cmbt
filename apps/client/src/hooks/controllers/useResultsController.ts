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
      const aliveTeams = getTeamsWithLiveUnits(ctx)

      if (aliveTeams.length === ctx.teams.length) {
        const shouldCommitResult =
          (!first.action ||
            !first.expandedTargets?.length ||
            first.expandedTargets?.some((t) =>
              isUnitAlive(ctx.units.find((u) => u.id === t.id))
            )) &&
          aliveTeams.length === ctx.teams.length
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
            fns.commitResult(first, ctx)
            setTimeout(() => {
              fns.cleanupResult(first)
              results.dequeue()
            }, speed * 1.5)
          }, speed)
        } else {
          results.dequeue()
        }
      } else {
        combat.setStatus('done')
      }
    }
  }, [first, combat.turn.status])
}
