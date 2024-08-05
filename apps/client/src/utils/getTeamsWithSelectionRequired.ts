import { MAX_ACTIVE_UNITS_COUNT } from '@/constants'
import { GetUnits } from '@repo/game/data'
import { CombatContext } from '@repo/game/types'

export function getTeamsWithSelectionRequired(ctx: CombatContext) {
  return ctx.teams.filter((team) => {
    const activeUnits = new GetUnits({
      teamId: team.id,
      isActive: true,
      isAlive: true,
    }).resolve(ctx)
    const inactiveAliveUnits = new GetUnits({
      teamId: team.id,
      isActive: false,
      isAlive: true,
    }).resolve(ctx)
    return (
      activeUnits.length < MAX_ACTIVE_UNITS_COUNT &&
      inactiveAliveUnits.length > 0
    )
  })
}
