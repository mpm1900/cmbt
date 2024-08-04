import {
  GameContext,
  Modifier,
  ModifierId,
  ModifierProps,
  Unit,
} from '../../types'

export const PowerDownParentId = ModifierId()
export const BurnedPowerDownId = ModifierId()

export class PowerDownParent extends Modifier {
  private coef: number

  get key(): string {
    return `${this.id}.${this.parentId ?? this.sourceId}@${this.coef}`
  }

  constructor(props: ModifierProps<{ coef: number }>) {
    super(PowerDownParentId, props)
    this.coef = props.coef
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        physical: stats.physical / this.coef,
      })),
    }
  }

  filter = (unit: Unit, ctx: GameContext): boolean => {
    return super.filter(unit, ctx) && unit.id === this.parentId
  }
}
