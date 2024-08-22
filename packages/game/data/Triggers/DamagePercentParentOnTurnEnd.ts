import {
  CombatContext,
  Modifier,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { DamagePercentParentOnTurnEndId } from '../Ids'

export class DamagePercentParentOnTurnEnd extends Trigger {
  factor: number

  constructor(props: TriggerProps<{ factor: number }>) {
    super(DamagePercentParentOnTurnEndId, {
      ...props,
      events: ['on Turn End'],
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
    return super.filter(unit, ctx) && unit.id === this.parentId
  }
}
