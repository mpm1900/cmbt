import { MAX_ACTIVE_UNITS_COUNT } from '@/constants'
import { getTeamsWithSelectionRequired } from '@/utils'
import { GetUnits, SetIsActive } from '@repo/game/data'
import {
  applyModifiers,
  checkActionCost,
  getActionableUnits,
  getBestAiAction,
} from '@repo/game/utils'
import { nanoid } from 'nanoid/non-secure'
import { useEffect } from 'react'
import { useActions, useCleanup, useCombat, useCombatSettings } from '../state'
import { useCombatActions } from '../useCombatActions'
import { useCombatContext } from '../useCombatContext'

export function useAiActions() {
  const ctx = useCombatContext()
  const fns = useCombatActions()
  const queue = useActions((s) => s.queue)
  const cleanup = useCleanup((s) => s.queue)
  const user = useCombat((t) => t.user)
  const debug = useCombatSettings()

  useEffect(() => {
    if (debug.isDebugMode) return
    if (ctx.turn.status === 'main' && queue.length === 0) {
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
  }, [ctx.turn.status, queue.length])

  useEffect(() => {
    if (ctx.turn.status === 'cleanup' && cleanup.length === 0) {
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
  }, [ctx.turn.status, cleanup.length])
}
