import {
  GameContext,
  Modifier,
  ModifierId,
  ModifierProps,
  Unit,
} from '../../types'

export const PowerUpParentId = ModifierId()
export class PowerUpParent extends Modifier {
  private coef: number

  get key(): string {
    return `${this.id}.${this.parentId ?? this.sourceId}@${this.coef}`
  }

  constructor(props: ModifierProps<{ coef: number }>) {
    super(PowerUpParentId, props)
    this.coef = props.coef
  }

  fn = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        physical: stats.physical * this.coef,
      })),
    }
  }

  filter = (unit: Unit, ctx: GameContext): boolean => {
    return super.filter(unit, ctx) && unit.id === this.parentId
  }
}
