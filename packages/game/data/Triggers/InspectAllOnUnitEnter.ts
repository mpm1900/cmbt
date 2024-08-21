import { CombatContext, Trigger, TriggerProps, Unit } from '../../types'
import { TriggerId } from '../Ids'
import { SetIsInspectedAll } from '../Modifiers'

export const InspectAllOnUnitEnterId = TriggerId()

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
        new SetIsInspectedAll({
          sourceId: props.sourceId,
          parentId: props.parentId,
        }),
      ],
    })
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return unit
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx)
  }
}
