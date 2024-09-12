import { isUnitAliveCtx } from '@repo/game/utils'
import { useEffect } from 'react'
import { useCombat } from '../state'
import { useResults } from '../state/useResults'
import { useCombatContext } from '../useCombatContext'

export function useDoneController() {
  const combat = useCombat()
  const ctx = useCombatContext()
  const results = useResults()

  useEffect(() => {
    const aliveTeams = ctx.teams.filter((team) =>
      ctx.units.some((u) => u.teamId === team.id && isUnitAliveCtx(u, ctx))
    )
    if (aliveTeams.length !== ctx.teams.length) {
      combat.setStatus('done')
    }
  }, [results.queue.length])
}
