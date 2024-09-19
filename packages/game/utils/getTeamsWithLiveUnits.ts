import { CombatContext, Team } from '../types'
import { isUnitAliveCtx } from './isUnitAlive'

export function getTeamsWithLiveUnits(teams: Team[], ctx: CombatContext) {
  return teams.filter((team) =>
    ctx.units.some((u) => u.teamId === team.id && isUnitAliveCtx(u, ctx))
  )
}
