import {
  CombatContext,
  MutationFilterArgs,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { AttackDownAllOtherOnUnitEnterId, AttackDownParentId } from '../Ids'
import { UpdateStatParent } from '../Modifiers'

export class AttackDownAllOtherOnUnitEnter extends Trigger {
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
              new UpdateStatParent({
                stat: 'attack',
                registryId: AttackDownParentId,
                sourceId: props.sourceId,
                parentId: u.id,
                factor: this.factor * -1,
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
