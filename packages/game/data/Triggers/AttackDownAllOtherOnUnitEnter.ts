import {
  CombatContext,
  MutationFilterArgs,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import {
  AttackDownAllOtherOnUnitEnterId,
  AttackStageDownParentId,
} from '../Ids'
import { UpdateStatStageParent } from '../Modifiers'

export class AttackDownAllOtherOnUnitEnter extends Trigger {
  private offset: number

  constructor(props: TriggerProps<{ offset: number }>) {
    super(AttackDownAllOtherOnUnitEnterId, {
      ...props,
      events: ['on Unit Enter'],
      maxInstances: 1,
      modifiers: (ctx) =>
        ctx.units
          .filter((u) => super.filter(u, ctx, {}) && u.id !== props.sourceId)
          .map(
            (u) =>
              new UpdateStatStageParent({
                stat: 'attack',
                registryId: AttackStageDownParentId,
                sourceId: props.sourceId,
                parentId: u.id,
                offset: props.offset,
              })
          ),
    })

    this.offset = props.offset
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return super.filter(unit, ctx, args) && unit.id === this.sourceId
  }
}
