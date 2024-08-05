import {
  CombatContext,
  Modifier,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { TriggerId } from '../Id'

export const DamageAllOnTurnEndId = TriggerId()
export const BurnDamageOnTurnEndId = TriggerId()

export class DamageAllOnTurnEnd extends Trigger {
  private damage: number

  constructor(props: TriggerProps<{ damage: number }>) {
    super(DamageAllOnTurnEndId, {
      ...props,
      events: ['on Turn End'],
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

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx)
  }
}
