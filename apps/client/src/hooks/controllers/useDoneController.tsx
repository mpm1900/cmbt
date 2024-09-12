import { isUnitAliveCtx } from '@repo/game/utils'
import { useEffect } from 'react'
import { useActions, useCombat } from '../state'
import { useResults } from '../state/useResults'
import { useCombatContext } from '../useCombatContext'

export function useDoneController() {
  const actions = useActions()
  const combat = useCombat()
  const ctx = useCombatContext()
  const results = useResults()

  useEffect(() => {
    if (results.queue.length === 0) {
      const aliveTeams = ctx.teams.filter((team) =>
        ctx.units.some((u) => u.teamId === team.id && isUnitAliveCtx(u, ctx))
      )
      if (aliveTeams.length !== ctx.teams.length) {
        actions.setQueue(() => [])
        combat.setStatus('done')
      }
    }
  }, [results.queue.length])
}
