import { GameContext, Id, Query, Unit } from '../../types'
import { applyModifiers } from '../../utils'

export type GetUnitProps = {
  unitId: Id
  modified?: boolean
}

export class GetUnit extends Query<Unit | undefined> {
  unitId: Id
  modified: boolean

  constructor(props: GetUnitProps) {
    super()
    this.unitId = props.unitId
    this.modified = props.modified || false
  }

  resolve(ctx: GameContext) {
    const unit = ctx.units.find((u) => u.id === this.unitId)
    if (unit && this.modified) {
      return applyModifiers(unit, ctx).unit
    }
    return unit
  }
}
