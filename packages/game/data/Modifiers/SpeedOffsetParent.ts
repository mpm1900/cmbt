import { CombatContext, Modifier, ModifierProps, Unit } from '../../types'
import { ModifierId } from '../Id'

export const SpeedOffsetParentId = ModifierId()

export class SpeedOffsetParent extends Modifier {
  private offset: number

  constructor(props: ModifierProps<{ offset: number }>) {
    super(SpeedOffsetParentId, props)
    this.offset = props.offset
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        speed: stats.speed + this.offset,
      })),
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx) && unit.id === this.parentId
  }
}
