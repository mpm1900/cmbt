import { MAX_ACTIVE_UNITS_COUNT } from '@/constants'
import { GameContext, Id } from '@repo/game/types'
import { isUnitAliveCtx } from '@repo/game/utils'

export function getTeamsWithSelectionRequired(ctx: GameContext) {
  const getUnits = (teamId: Id, isActive: boolean) =>
    ctx.units.filter(
      (u) => u.teamId === teamId && u.flags.isActive === isActive
    )
  return ctx.teams.filter(
    (team) =>
      getUnits(team.id, true).length < MAX_ACTIVE_UNITS_COUNT &&
      getUnits(team.id, false).some((u) => isUnitAliveCtx(u.id, ctx))
  )
}
