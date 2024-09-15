import {
  CombatContext,
  MutationFilterArgs,
  StatKey,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import {
  AttackStageDownParentId,
  StatStageDownAllOtherOnUnitEnterId,
} from '../Ids'
import { UpdateStatStageParent } from '../Modifiers'

export class StatStageDownAllOtherOnUnitEnter extends Trigger {
  stages: number
  stat: StatKey

  constructor(props: TriggerProps<{ stages: number; stat: StatKey }>) {
    super(StatStageDownAllOtherOnUnitEnterId, {
      ...props,
      events: ['on Unit Enter'],
      maxInstances: 1,
      modifiers: (ctx) =>
        ctx.units
          .filter((u) => super.filter(u, ctx, {}) && u.id !== props.sourceId)
          .map(
            (u) =>
              new UpdateStatStageParent({
                registryId: AttackStageDownParentId,
                sourceId: props.sourceId,
                parentId: u.id,
                stat: props.stat,
                stages: props.stages,
              })
          ),
    })

    this.stages = props.stages
    this.stat = props.stat
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    const newUnits = args.units
    return (
      super.filter(unit, ctx, args) &&
      !!newUnits?.find((u) => u.id === this.sourceId) &&
      unit.id === this.sourceId
    )
  }
}
