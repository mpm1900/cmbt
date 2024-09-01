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
  damage: number

  constructor(props: TriggerProps<{ damage: number }>) {
    super(DamageNewUnitsOnUnitEnterId, {
      ...props,
      events: ['on Unit Enter'],
    })
    this.damage = props.damage
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Modifier.setValues(unit, (values) => ({
        damage: values.damage + this.damage,
      })),
    }
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    const newUnits = args.units ?? []
    return (
      super.filter(unit, ctx, args) && !!newUnits.find((u) => u.id === unit.id)
    )
  }
}
