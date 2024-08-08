import { CombatContext, Trigger, TriggerProps, Unit } from '../../types'
import { TriggerId } from '../Ids'
import { DamageAllOnTurnEnd } from './DamageAllOnTurnEnd'

export const CreateSandstormOnUnitEnterId = TriggerId()

export class CreateSandstormOnUnitEnter extends Trigger {
  constructor(props: TriggerProps) {
    super(CreateSandstormOnUnitEnterId, {
      ...props,
      events: ['on Unit Enter'],
      modifiers: (ctx) => [
        new DamageAllOnTurnEnd({
          sourceId: props.sourceId,
          damage: 30,
          duration: 5,
          maxInstances: 1,
        }),
      ],
    })
  }

  resolve = (unit: Unit): Partial<Unit> => {
    return unit
  }

  filter = (unit: Unit, ctx: CombatContext): boolean => {
    return super.filter(unit, ctx) && unit.id === this.sourceId
  }
}
