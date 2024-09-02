import {
  CombatContext,
  MutationFilterArgs,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { InspectAllOnUnitEnterId } from '../Ids'
import { InspectedAll } from '../Modifiers'

export class InspectAllOnUnitEnter extends Trigger {
  get key() {
    return this.id
  }

  constructor(props: TriggerProps) {
    super(InspectAllOnUnitEnterId, {
      ...props,
      events: ['on Unit Enter'],
      maxInstances: 1,
      modifiers: (ctx) => [
        new InspectedAll({
          sourceId: props.sourceId,
          parentId: props.parentId,
        }),
      ],
    })
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return unit
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return super.filter(unit, ctx, args)
  }
}
