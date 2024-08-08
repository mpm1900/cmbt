import {
  CombatContext,
  Modifier,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { TriggerId } from '../Ids'

export const DamageNewUnitsOnUnitEnterId = TriggerId()

export class DamageNewUnitsOnUnitEnter extends Trigger {
  private damage: number

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
      metadata: {
        ...unit.metadata,
        activeTurns: 1,
      },
    }
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx) && unit.metadata.activeTurns == 0
  }
}
