import {
  CombatContext,
  Modifier,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { DamageAllOnTurnEndId } from '../Ids'

export class DamageAllOnTurnEnd extends Trigger {
  damage: number

  get key() {
    return this.rid
  }

  constructor(props: TriggerProps<{ damage: number }>) {
    super(DamageAllOnTurnEndId, {
      ...props,
      events: ['on Turn End'],
      maxInstances: 1,
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
