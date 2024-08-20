import { CombatContext, Modifier, ModifierProps, Unit } from '../../types'
import { ModifierId } from '../Ids'

export const SpeedDownAllOtherId = ModifierId()
export class SpeedDownAllOther extends Modifier {
  factor: number

  get key(): string {
    return `${this.id}.${this.parentId ?? this.sourceId}@${this.factor}`
  }

  constructor(props: ModifierProps<{ factor: number }>) {
    super(SpeedDownAllOtherId, props)
    this.factor = props.factor
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        speed: stats.speed / this.factor,
      })),
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx) && unit.id !== this.parentId
  }
}
