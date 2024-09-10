import { CombatContext, Id, Query, Unit } from '../../types'
import { isUnitAliveCtx } from '../../utils'

export type GetUnitsForCleanupActiveProps = {
  teamId?: Id
  notTeamId?: Id
  isActive?: boolean
  isAlive?: boolean
  isHidden?: boolean
}

export class GetUnitsForCleanupActive extends Query<Unit[]> {
  teamId?: Id
  notTeamId?: Id

  constructor(props: GetUnitsForCleanupActiveProps) {
    super()
    this.teamId = props.teamId
    this.notTeamId = props.notTeamId
  }

  resolve(ctx: CombatContext): Unit[] {
    const inactiveLiveAllies = ctx.units.filter((unit) => {
      let value = true
      if (this.teamId !== undefined) {
        value = value && unit.teamId === this.teamId
      }
      if (this.notTeamId !== undefined) {
        value = value && unit.teamId !== this.notTeamId
      }
      return value && !unit.flags.isActive && isUnitAliveCtx(unit, ctx)
    })

    const newInactiveAllies = inactiveLiveAllies.filter((unit) => {
      return unit.metadata.inactiveTurns === 0
    })

    return inactiveLiveAllies.filter((unit) => {
      const inactiveTurns = unit.metadata.inactiveTurns
      return (
        inactiveTurns > 0 ||
        newInactiveAllies.length === inactiveLiveAllies.length
      )
    })
  }
}
