import {
  CombatContext,
  Modifier,
  ModifierId,
  ModifierProps,
  Unit,
} from '../../types'

export const SpeedDownAllOtherId = ModifierId()
export class SpeedDownAllOther extends Modifier {
  private coef: number

  get key(): string {
    return `${this.id}.${this.parentId ?? this.sourceId}@${this.coef}`
  }

  constructor(props: ModifierProps<{ coef: number }>) {
    super(SpeedDownAllOtherId, props)
    this.coef = props.coef
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      stats: Modifier.setStats(unit, (stats) => ({
        speed: stats.speed / this.coef,
      })),
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx) && unit.id !== this.parentId
  }
}
