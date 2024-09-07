import {
  CombatContext,
  Modifier,
  MutationFilterArgs,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { DamageNewUnitsOnUnitEnterId } from '../Ids'

export class DamageNewUnitsOnUnitEnter extends Trigger {
  factor: number
  static: number

  constructor(props: TriggerProps<{ factor?: number; static?: number }>) {
    super(DamageNewUnitsOnUnitEnterId, {
      ...props,
      events: ['on Unit Enter'],
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
    const newUnits = args.units
    return (
      super.filter(unit, ctx, args) && !!newUnits?.find((u) => u.id === unit.id)
    )
  }
}
