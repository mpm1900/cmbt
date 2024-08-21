import {
  CombatContext,
  Modifier,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { DamagePercentAllOnTurnEndId } from '../Ids'

export class DamagePercentAllOnTurnEnd extends Trigger {
  factor: number

  get key() {
    return this.rid
  }

  constructor(props: TriggerProps<{ factor: number }>) {
    super(DamagePercentAllOnTurnEndId, {
      ...props,
      events: ['on Turn End'],
      maxInstances: 1,
    })
    this.factor = props.factor
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Modifier.setValues(unit, (values) => ({
        damage: Math.round(values.damage + unit.stats.health * this.factor),
      })),
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx)
  }
}
