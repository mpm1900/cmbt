import { useEffect } from 'react'
import { useCombatContext } from '../useCombatContext'
import { useTurn } from '../state/useTurn'
import {
  applyModifiers,
  checkActionCost,
  getActionableUnits,
  getBestAiAction,
} from '@repo/game/utils'
import { useCombatActions } from '../useCombatActions'
import { nanoid } from 'nanoid/non-secure'
import { useActions, useCleanup, useCombat } from '../state'
import { GetUnits, SetIsActive } from '@repo/game/data'
import { getTeamsWithSelectionRequired } from '@/utils'
import { MAX_ACTIVE_UNITS_COUNT } from '@/constants'

export function useAiActions() {
  const ctx = useCombatContext()
  const fns = useCombatActions()
  const queue = useActions((s) => s.queue)
  const cleanup = useCleanup((s) => s.queue)
  const user = useCombat((t) => t.user)
  const status = useTurn((t) => t.turn.status)

  useEffect(() => {
    if (status === 'waiting-for-input' && queue.length === 0) {
      const units = ctx.units.map((u) => applyModifiers(u, ctx).unit)
      const aiUnits = getActionableUnits(units).filter((u) => u.teamId !== user)
      const aiActions = aiUnits.map((unit) => {
        const aiActions = unit.actions
          .filter((a) => checkActionCost(a, unit))
          .map((action) => {
            return getBestAiAction(action, ctx)
          })
          .sort((a, b) => b.weight - a.weight)

        const bestAiAction = aiActions[0]
        return bestAiAction
      })
      fns.pushAction(
        ...aiActions.map((aiAction) => ({
          id: nanoid(),
          action: aiAction.action,
          targetIds: aiAction.targetIds,
        }))
      )
    }
  }, [status, queue.length])

  useEffect(() => {
    if (status === 'cleanup' && cleanup.length === 0) {
      const aiTeam = getTeamsWithSelectionRequired(ctx).find(
        (t) => t.id !== ctx.user
      )
      if (aiTeam) {
        const aliveActiveUnits = new GetUnits({
          notTeamId: ctx.user,
          isActive: true,
          isAlive: true,
        }).resolve(ctx)
        const aliveInactiveUnits = new GetUnits({
          notTeamId: ctx.user,
          isActive: false,
          isAlive: true,
        }).resolve(ctx)

        const count = Math.min(
          MAX_ACTIVE_UNITS_COUNT - aliveActiveUnits.length,
          aliveInactiveUnits.length
        )
        const item = getBestAiAction(new SetIsActive('', aiTeam.id, count), ctx)
        fns.pushCleanupAction({
          id: nanoid(),
          action: item.action,
          targetIds: item.targetIds,
        })
      }
    }
  }, [status, cleanup.length])
}
