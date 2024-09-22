import {
  getResultsFromActionItem,
  getTeamsWithSelectionRequired,
} from '@/utils'
import { getTeamsWithLiveUnits, isUnitAliveCtx } from '@repo/game/utils'
import { nanoid } from 'nanoid'
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

  const status = combat.turn.status
  const isCombat = status === 'combat'

  useEffect(() => {
    if (isCombat && results.queue.length === 0 && cleanup.queue.length === 0) {
      const liveTeams = getTeamsWithLiveUnits(combat.teams, ctx)
      if (liveTeams.length !== combat.teams.length) {
        actions.setQueue(() => [])
        combat.setStatus('done')
        return
      }

      const item = actions.first(ctx)
      const teams = getTeamsWithSelectionRequired(combat.teams, ctx)
      if (!item || teams.length !== 0) {
        combat.setStatus('cleanup')
        return
      }

      const source = ctx.units.find((u) => u.id === item.action.sourceId)
      const shouldCommitAction = isUnitAliveCtx(source, ctx)

      setTimeout(() => {
        if (shouldCommitAction) {
          const actionResults = getResultsFromActionItem(item, ctx)
          results.enqueue(
            { id: nanoid(), mutations: [item.action.cost] },
            ...actionResults
          )
          combat.setActionCooldown(
            item.action.sourceId,
            item.action.id,
            item.action.cooldown
          )
        }
        combat.stageAction(item.action.sourceId, undefined)
        actions.remove((i) => i.id === item.id)
      }, 500)
    }
  }, [isCombat, actions.queue.length, results.queue.length])
}
