import { CombatContext } from '@repo/game/types'
import { isUnitAliveCtx } from '@repo/game/utils'
import { getTeamsWithSelectionRequired } from './getTeamsWithSelectionRequired'

export function handleCleanup(
  ctx: CombatContext,
  handleNext: () => void,
  handleCleanup: () => void,
  handleDone: () => void
) {
  const aliveTeams = ctx.teams.filter((team) =>
    ctx.units.some((u) => u.teamId === team.id && isUnitAliveCtx(u, ctx))
  )

  if (aliveTeams.length !== 2) {
    handleDone()
  } else {
    const cleanupTeams = getTeamsWithSelectionRequired(ctx)
    if (cleanupTeams.length === 0) {
      handleNext()
    } else {
      handleCleanup()
    }
  }
}
