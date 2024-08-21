import {
  CombatContext,
  Modifier,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { DamageParentOnTurnEndId } from '../Ids'

export class DamageParentOnTurnEnd extends Trigger {
  damage: number

  constructor(props: TriggerProps<{ damage: number }>) {
    super(DamageParentOnTurnEndId, {
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
    return super.filter(unit, ctx) && unit.id === this.parentId
  }
}
