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
      activeUnits.length < team.maxActiveUnits && inactiveAliveUnits.length > 0
    )
  })
}
