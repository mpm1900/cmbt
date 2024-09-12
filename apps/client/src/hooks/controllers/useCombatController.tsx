import {
  getResultsFromActionItem,
  getTeamsWithSelectionRequired,
} from '@/utils'
import { isUnitAliveCtx } from '@repo/game/utils'
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
      const item = actions.first(ctx)
      const teams = getTeamsWithSelectionRequired(ctx)
      if (item && teams.length === 0) {
        const source = ctx.units.find((u) => u.id === item.action.sourceId)
        const shouldCommitAction = isUnitAliveCtx(source, ctx)

        if (shouldCommitAction) {
          const actionResults = getResultsFromActionItem(item, ctx)
          results.enqueue({ mutations: [item.action.cost] }, ...actionResults)
        }
        actions.dequeue(ctx)
      } else {
        combat.setStatus('cleanup')
      }
    }
  }, [isCombat, actions.queue.length, results.queue.length])
}
