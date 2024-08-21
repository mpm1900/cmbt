import { CombatContext, Modifier, ModifierProps, Unit } from '../../types'
import { PhysicalAttackUpParentId } from '../Ids'

export class PhysicalAttackUpParent extends Modifier {
  factor: number
  offset: number

  get key(): string {
    return `${this.id}.${this.parentId ?? this.sourceId}@${this.factor}`
  }

  constructor(props: ModifierProps<{ factor?: number; offset?: number }>) {
    super(PhysicalAttackUpParentId, props)
    this.factor = props.factor !== undefined ? props.factor : 1
    this.offset = props.offset ?? 0
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        physical: stats.physical * this.factor + this.offset,
      })),
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx) && unit.id === this.parentId
  }
}
