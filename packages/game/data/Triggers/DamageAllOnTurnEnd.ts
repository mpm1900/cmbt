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
import { DamageAllOnTurnEndId } from '../Ids'

export class DamageAllOnTurnEnd extends Trigger {
  factor: number
  static: number
  damageType?: DamageType

  get key() {
    return this.registryId
  }

  constructor(
    props: TriggerProps<{
      factor?: number
      static?: number
      damageType?: DamageType
    }>
  ) {
    super(DamageAllOnTurnEndId, {
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
    return super.filter(unit, ctx, args)
  }
}
