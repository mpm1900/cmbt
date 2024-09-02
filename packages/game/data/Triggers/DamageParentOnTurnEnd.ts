import {
  CombatContext,
  Modifier,
  MutationFilterArgs,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { DamageParentOnTurnEndId } from '../Ids'

export class DamageParentOnTurnEnd extends Trigger {
  factor: number
  static: number

  constructor(props: TriggerProps<{ factor?: number; static?: number }>) {
    super(DamageParentOnTurnEndId, {
      ...props,
      events: ['on Turn End'],
    })

    this.factor = props.factor ?? 0
    this.static = props.static ?? 0
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Modifier.setValues(unit, (values) => ({
        damage: Math.round(
          values.damage + unit.stats.health * this.factor + this.static
        ),
      })),
    }
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return super.filter(unit, ctx, args) && unit.id === this.parentId
  }
}
