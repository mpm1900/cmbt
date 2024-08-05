import { CombatContext, Modifier, ModifierProps, Unit } from '../../types'
import { ModifierId } from '../Id'

export const PowerDownAllId = ModifierId()
export class PowerDownAll extends Modifier {
  private coef: number

  get key(): string {
    return `${this.id}.${this.parentId ?? this.sourceId}@${this.coef}`
  }

  constructor(props: ModifierProps<{ coef: number }>) {
    super(PowerDownAllId, props)
    this.coef = props.coef
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        physical: stats.physical / this.coef,
      })),
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx)
  }
}
