import {
  CombatContext,
  Modifier,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { TriggerId } from '../Ids'

export const DamagePercentAllOnTurnEndId = TriggerId()

export class DamagePercentAllOnTurnEnd extends Trigger {
  coef: number

  get key() {
    return this.rid
  }

  constructor(props: TriggerProps<{ coef: number }>) {
    super(DamagePercentAllOnTurnEndId, {
      ...props,
      events: ['on Turn End'],
      maxInstances: 1,
    })
    this.coef = props.coef
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return {
      values: Modifier.setValues(unit, (values) => ({
        damage: values.damage + unit.stats.health * this.coef,
      })),
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx)
  }
}
