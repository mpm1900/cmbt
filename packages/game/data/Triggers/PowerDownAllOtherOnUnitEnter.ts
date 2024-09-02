import {
  CombatContext,
  MutationFilterArgs,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { AttackDownAllOtherOnUnitEnterId } from '../Ids'
import { AttackDownParent } from '../Modifiers'

export class PowerDownAllOtherOnUnitEnter extends Trigger {
  private factor: number

  constructor(props: TriggerProps<{ factor: number }>) {
    super(AttackDownAllOtherOnUnitEnterId, {
      ...props,
      events: ['on Unit Enter'],
      maxInstances: 1,
      modifiers: (ctx) =>
        ctx.units
          .filter((u) => super.filter(u, ctx, {}) && u.id !== props.sourceId)
          .map(
            (u) =>
              new AttackDownParent({
                sourceId: props.sourceId,
                parentId: u.id,
                factor: this.factor,
              })
          ),
    })
    this.factor = props.factor
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return super.filter(unit, ctx, args) && unit.id === this.sourceId
  }
}
