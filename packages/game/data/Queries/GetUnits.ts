import { GameContext, Id, Query, Unit } from '../../types'
import { isUnitAliveCtx } from '../../utils'

export type GetUnitsProps = {
  teamId?: Id
  notTeamId?: Id
  isActive?: boolean
  isAlive?: boolean
}

export class GetUnits extends Query<Unit[]> {
  teamId?: Id
  notTeamId?: Id
  isActive?: boolean
  isAlive?: boolean

  constructor(props: GetUnitsProps) {
    super()
    this.teamId = props.teamId
    this.notTeamId = props.notTeamId
    this.isActive = props.isActive
    this.isAlive = props.isAlive
  }

  resolve(ctx: GameContext) {
    return ctx.units.filter((unit) => {
      let value = true
      if (this.teamId !== undefined) {
        value = value && unit.teamId === this.teamId
      }
      if (this.notTeamId !== undefined) {
        value = value && unit.teamId !== this.notTeamId
      }
      if (this.isActive !== undefined) {
        value = value && unit.flags.isActive === this.isActive
      }
      if (this.isAlive !== undefined) {
        value = value && this.isAlive === isUnitAliveCtx(unit.id, ctx)
      }

      return value
    })
  }
}
