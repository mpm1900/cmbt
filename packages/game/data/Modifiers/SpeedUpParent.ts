import { CombatContext, Modifier, ModifierProps, Unit } from '../../types'
import { ModifierId } from '../Ids'

export const SpeedUpParentId = ModifierId()

export class SpeedUpParent extends Modifier {
  coef: number
  offset: number

  constructor(props: ModifierProps<{ coef?: number; offset?: number }>) {
    super(SpeedUpParentId, props)
    this.coef = props.coef !== undefined ? props.coef : 1
    this.offset = props.offset ?? 0
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        speed: stats.speed * this.coef + this.offset,
      })),
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx) && unit.id === this.parentId
  }
}
