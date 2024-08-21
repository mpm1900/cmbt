import { CombatContext, Modifier, ModifierProps, Unit } from '../../types'
import { SpeedUpParentId } from '../Ids'

export class SpeedUpParent extends Modifier {
  factor: number
  offset: number

  constructor(props: ModifierProps<{ factor?: number; offset?: number }>) {
    super(SpeedUpParentId, props)
    this.factor = props.factor !== undefined ? props.factor : 1
    this.offset = props.offset ?? 0
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        speed: stats.speed * this.factor + this.offset,
      })),
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx) && unit.id === this.parentId
  }
}
