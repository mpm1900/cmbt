import { CombatContext } from '../types'
import { isUnitAliveCtx } from './isUnitAlive'

export function getTeamsWithLiveUnits(ctx: CombatContext) {
  return ctx.teams.filter((team) =>
    ctx.units.some((u) => u.teamId === team.id && isUnitAliveCtx(u, ctx))
  )
}
