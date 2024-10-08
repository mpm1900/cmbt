import { getTeamsWithSelectionRequired } from '@/utils'
import { GetUnits, SetIsActive } from '@repo/game/data'
import { getActionableUnitsCtx, getBestAiAction } from '@repo/game/utils'
import { useEffect } from 'react'
import { useActions, useCleanup, useCombat, useCombatSettings } from '../state'
import { useCombatContext } from '../useCombatContext'

export function useAiActions() {
  const combat = useCombat()
  const ctx = useCombatContext()
  const actions = useActions()
  const cleanup = useCleanup()
  const debug = useCombatSettings()

  useEffect(() => {
    if (debug.isDebugMode) return
    if (combat.turn.status !== 'main') return

    const aiUnits = getActionableUnitsCtx(ctx).filter(
      (u) => u.teamId !== ctx.user && !combat.stagedActions[u.id]
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
  }, [combat.turn.status, actions.queue.length])

  useEffect(() => {
    if (combat.turn.status === 'cleanup') {
      const teams = getTeamsWithSelectionRequired(combat.teams, ctx)
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
  }, [combat.turn.status, cleanup.queue.length])
}
