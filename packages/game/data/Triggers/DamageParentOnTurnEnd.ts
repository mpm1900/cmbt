import {
  CombatContext,
  DamageType,
  Modifier,
  MutationFilterArgs,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { getDamageNegation } from '../../utils'
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
        const baseDamage =
          values.damage + unit.stats.health * this.factor + this.static
        const damage = baseDamage * getDamageNegation(this.damageType, unit)

        return { damage: Math.round(damage) }
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
