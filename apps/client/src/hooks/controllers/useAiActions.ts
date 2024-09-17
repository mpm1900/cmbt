import { getTeamsWithSelectionRequired } from '@/utils'
import { GetUnits, SetIsActive } from '@repo/game/data'
import {
  applyModifiers,
  getActionableUnits,
  getBestAiAction,
} from '@repo/game/utils'
import { useEffect } from 'react'
import { useActions, useCleanup, useCombatSettings } from '../state'
import { useCombatContext } from '../useCombatContext'

export function useAiActions() {
  const ctx = useCombatContext()
  const actions = useActions()
  const cleanup = useCleanup()
  const debug = useCombatSettings()

  useEffect(() => {
    if (debug.isDebugMode) return
    if (ctx.turn.status === 'main') {
      const units = ctx.units.map((u) => applyModifiers(u, ctx).unit)
      const aiUnits = getActionableUnits(units).filter(
        (u) => u.teamId !== ctx.user
      )
      const aiActions = actions.queue.filter((i) =>
        aiUnits.some((u) => u.id === i.action.sourceId)
      )
      if (aiActions.length === 0) {
        const aiActions = aiUnits.map((unit) => {
          const aiActions = unit.actions
            .filter((a) => a.filter(unit, ctx))
            .map((action) => getBestAiAction(action, ctx))
            .sort((a, b) => b.weight - a.weight)

          const bestAiAction = aiActions[0]
          return bestAiAction
        })

        actions.enqueue(...aiActions)
      }
    }
  }, [ctx.turn.status, actions.queue.length])

  useEffect(() => {
    if (ctx.turn.status === 'cleanup') {
      const teams = getTeamsWithSelectionRequired(ctx)
      const aiTeam = teams.find((t) => t.id !== ctx.user)
      if (aiTeam && cleanup.queue.length === 0) {
        const aliveActiveUnits = new GetUnits({
          teamId: aiTeam.id,
          isActive: true,
          isAlive: true,
        }).resolve(ctx)
        const aliveInactiveUnits = new GetUnits({
          teamId: aiTeam.id,
          isActive: false,
          isAlive: true,
        }).resolve(ctx)

        const count = Math.min(
          aiTeam.maxActiveUnits - aliveActiveUnits.length,
          aliveInactiveUnits.length
        )
        const item = getBestAiAction(new SetIsActive(aiTeam.id, count), ctx)
        cleanup.enqueue(item)
      }
    }
  }, [ctx.turn.status, cleanup.queue.length])
}
