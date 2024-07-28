import { useEffect } from 'react'
import { useGameContext } from '../useGameContext'
import { useTurn } from '../state/useTurn'
import { useTeams } from '../state/useTeams'
import {
  applyModifiers,
  getActionableUnits,
  getBestAiAction,
} from '@repo/game/utils'
import { useGameActions } from '../useGameActions'
import { nanoid } from 'nanoid/non-secure'
import { useActions, useCleanup } from '../state'
import { SetIsActive } from '@repo/game/data'
import { getTeamsWithSelectionRequired } from '@/utils'

export function useAiActions() {
  const ctx = useGameContext()
  const fns = useGameActions()
  const queue = useActions((s) => s.queue)
  const cleanup = useCleanup((s) => s.queue)
  const user = useTeams((t) => t.user)
  const status = useTurn((t) => t.turn.status)

  useEffect(() => {
    if (status === 'waiting-for-input' && queue.length === 0) {
      const units = ctx.units.map((u) => applyModifiers(u, ctx).unit)
      const aiUnits = getActionableUnits(units).filter((u) => u.teamId !== user)
      aiUnits.forEach((unit) => {
        const aiActions = unit.actions
          .filter((a) => a.checkCost(unit))
          .map((action) => {
            return getBestAiAction(action, units, ctx)
          })
          .sort((a, b) => b.weight - a.weight)

        const bestAiAction = aiActions[0]
        console.log('pushing action', bestAiAction)
        fns.pushAction({
          id: nanoid(),
          action: bestAiAction.action,
          targetIds: bestAiAction.targetIds,
        })
      })
    }
  }, [status, queue.length])

  useEffect(() => {
    if (status === 'cleanup' && cleanup.length === 0) {
      const aiTeam = getTeamsWithSelectionRequired(ctx).find(
        (t) => t.id !== ctx.user
      )
      if (aiTeam) {
        const item = getBestAiAction(
          new SetIsActive('', aiTeam.id),
          ctx.units.map((u) => applyModifiers(u, ctx).unit),
          ctx
        )
        item.action.sourceId = item.targetIds[0]
        fns.pushCleanupAction({
          id: nanoid(),
          action: item.action,
          targetIds: item.targetIds,
        })
      }
    }
  }, [status, cleanup.length])
}
