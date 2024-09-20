import { CombatContext, Id, Query, Unit } from '../../types'
import { applyModifiers, isUnitAlive, isUnitHidden } from '../../utils'

export type GetUnitsProps = {
  notId?: Id
  teamId?: Id
  notTeamId?: Id
  isActive?: boolean
  isAlive?: boolean
  isHidden?: boolean
}

export class GetUnits extends Query<Unit[]> {
  notId?: Id
  teamId?: Id
  notTeamId?: Id
  isActive?: boolean
  isAlive?: boolean
  isHidden?: boolean

  constructor(props: GetUnitsProps) {
    super()
    this.notId = props.notId
    this.teamId = props.teamId
    this.notTeamId = props.notTeamId
    this.isActive = props.isActive
    this.isAlive = props.isAlive
    this.isHidden = props.isHidden
  }

  resolve(ctx: CombatContext) {
    return ctx.units.filter((unit) => {
      let value = true
      if (this.notId !== undefined) {
        value = value && unit.id !== this.notId
      }
      if (this.teamId !== undefined) {
        value = value && unit.teamId === this.teamId
      }
      if (this.notTeamId !== undefined) {
        value = value && unit.teamId !== this.notTeamId
      }
      if (this.isActive !== undefined) {
        value = value && unit.flags.isActive === this.isActive
      }

      unit = applyModifiers(unit, ctx).unit
      if (this.isAlive !== undefined) {
        value = value && this.isAlive === isUnitAlive(unit)
      }
      if (this.isHidden !== undefined) {
        value = value && this.isHidden === isUnitHidden(unit)
      }

      return value
    })
  }
}
