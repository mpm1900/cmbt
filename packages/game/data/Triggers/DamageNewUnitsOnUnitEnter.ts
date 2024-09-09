import {
  CombatContext,
  Damage,
  DamageType,
  Modifier,
  MutationFilterArgs,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { calculateBaseDamage, getDamageTypedDamage } from '../../utils'
import { DamageNewUnitsOnUnitEnterId } from '../Ids'

export class DamageNewUnitsOnUnitEnter extends Trigger {
  factor: number
  static: number
  damageType?: DamageType

  constructor(
    props: TriggerProps<{
      factor?: number
      static?: number
      damageType?: DamageType
    }>
  ) {
    super(DamageNewUnitsOnUnitEnterId, {
      ...props,
      events: ['on Unit Enter'],
    })

    this.factor = props.factor ?? 0
    this.static = props.static ?? 0
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Modifier.setValues(unit, (values) => {
        const d = {
          damageType: this.damageType,
          factor: this.factor,
        } as Damage
        const baseDamage = calculateBaseDamage(d, undefined, unit) + this.static
        const damage = getDamageTypedDamage(
          this.damageType,
          baseDamage,
          undefined,
          unit
        )

        return { damage: values.damage + Math.round(damage) }
      }),
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
