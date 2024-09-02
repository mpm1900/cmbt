import {
  CombatContext,
  Modifier,
  MutationFilterArgs,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { DamageAllOnTurnEndId } from '../Ids'

export class DamageAllOnTurnEnd extends Trigger {
  factor: number
  static: number

  get key() {
    return this.registryId
  }

  constructor(props: TriggerProps<{ factor?: number; static?: number }>) {
    super(DamageAllOnTurnEndId, {
      ...props,
      events: ['on Turn End'],
    })

    this.factor = props.factor ?? 0
    this.static = props.static ?? 0
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Modifier.setValues(unit, (values) => ({
        damage: values.damage + unit.stats.health * this.factor + this.static,
      })),
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
