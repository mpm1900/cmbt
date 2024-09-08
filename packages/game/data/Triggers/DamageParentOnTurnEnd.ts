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
import { calculateBaseDamage, getTypedDamage } from '../../utils'
import { DamageParentOnTurnEndId } from '../Ids'

export class DamageParentOnTurnEnd extends Trigger {
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
    super(DamageParentOnTurnEndId, {
      ...props,
      events: ['on Turn End'],
    })

    this.factor = props.factor ?? 0
    this.static = props.static ?? 0
    this.damageType = props.damageType
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Modifier.setValues(unit, (values) => {
        const d = {
          damageType: this.damageType,
          factor: this.factor,
        } as Damage
        const baseDamage = calculateBaseDamage(d, undefined, unit) + this.static
        const damage = getTypedDamage(
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
    return super.filter(unit, ctx, args) && unit.id === this.parentId
  }
}
