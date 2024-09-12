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
import { useCombatContext } from '../useCombatContext'

export function useAiActions() {
  const ctx = useCombatContext()
  const actions = useActions()
  const cleanup = useCleanup()
  const user = useCombat((t) => t.user)
  const debug = useCombatSettings()

  useEffect(() => {
    if (debug.isDebugMode) return
    if (ctx.turn.status === 'main' && actions.queue.length === 0) {
      const units = ctx.units.map((u) => applyModifiers(u, ctx).unit)
      const aiUnits = getActionableUnits(units).filter((u) => u.teamId !== user)
      const aiActions = aiUnits.map((unit) => {
        const aiActions = unit.actions
          .filter((a) => {
            const isDisabled = unit.registry.actions.includes(a.id)
            return checkActionCost(a, unit) && !isDisabled
          })
          .map((action) => {
            const ai = getBestAiAction(action, ctx)
            return ai
          })
          .sort((a, b) => b.weight - a.weight)

        const bestAiAction = aiActions[0]
        return bestAiAction
      })

      actions.enqueue(
        ...aiActions.map((aiAction) => ({
          id: nanoid(),
          action: aiAction.action,
          targetIds: aiAction.targetIds,
        }))
      )
    }
  }, [ctx.turn.status, actions.queue.length])

  useEffect(() => {
    if (ctx.turn.status === 'cleanup') {
      const teams = getTeamsWithSelectionRequired(ctx)
      if (teams.length > 0 && cleanup.queue.length === 0) {
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
            aiTeam.maxActiveUnits - aliveActiveUnits.length,
            aliveInactiveUnits.length
          )
          const item = getBestAiAction(new SetIsActive(aiTeam.id, count), ctx)
          cleanup.enqueue({
            id: nanoid(),
            action: item.action,
            targetIds: item.targetIds,
          })
        }
      }
    }
  }, [ctx.turn.status, cleanup.queue.length])
}
