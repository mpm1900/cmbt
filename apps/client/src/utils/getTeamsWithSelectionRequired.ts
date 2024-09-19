import { GetUnits } from '@repo/game/data'
import { CombatContext, Team } from '@repo/game/types'

export function getTeamsWithSelectionRequired(
  teams: Team[],
  ctx: CombatContext
) {
  return teams.filter((team) => {
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
