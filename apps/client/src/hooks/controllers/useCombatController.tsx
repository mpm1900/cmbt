import {
  getResultsFromActionItem,
  getTeamsWithSelectionRequired,
} from '@/utils'
import { getTeamsWithLiveUnits, isUnitAliveCtx } from '@repo/game/utils'
import { useEffect } from 'react'
import { useActions, useCleanup, useCombat } from '../state'
import { useResults } from '../state/useResults'
import { useCombatContext } from '../useCombatContext'

export function useCombatController() {
  const combat = useCombat()
  const actions = useActions()
  const cleanup = useCleanup()
  const results = useResults()
  let ctx = useCombatContext()

  const status = ctx.turn.status
  const isCombat = status === 'combat'

  useEffect(() => {
    if (isCombat && results.queue.length === 0 && cleanup.queue.length === 0) {
      const liveTeams = getTeamsWithLiveUnits(ctx)
      if (liveTeams.length === ctx.teams.length) {
        const item = actions.first(ctx)
        const teams = getTeamsWithSelectionRequired(ctx)
        if (item && teams.length === 0) {
          const source = ctx.units.find((u) => u.id === item.action.sourceId)
          const shouldCommitAction = isUnitAliveCtx(source, ctx)

          if (shouldCommitAction) {
            const actionResults = getResultsFromActionItem(item, ctx)
            results.enqueue({ mutations: [item.action.cost] }, ...actionResults)
            combat.setActionCooldown(
              item.action.sourceId,
              item.action.id,
              item.action.cooldown
            )
          }
          combat.stageAction(item.action.sourceId, undefined)
          actions.remove((i) => i.id === item.id)
        } else {
          combat.setStatus('cleanup')
        }
      } else {
        actions.setQueue(() => [])
        combat.setStatus('done')
      }
    }
  }, [isCombat, actions.queue.length, results.queue.length])
}
