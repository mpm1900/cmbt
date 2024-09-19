import {
  CombatContext,
  MutationFilterArgs,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { InspectAllOnUnitEnterId, InspectedAllId } from '../Ids'
import { UpdateFlagAll } from '../Modifiers'

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
        new UpdateFlagAll({
          registryId: InspectedAllId,
          sourceId: props.sourceId,
          parentId: props.parentId,
          flag: 'isInspected',
          value: true,
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
    const newUnits = args.units
    return (
      super.filter(unit, ctx, args) &&
      !!newUnits?.find((u) => u.id === this.sourceId) &&
      unit.id === this.sourceId
    )
  }
}
