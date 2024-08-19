import { CombatContext, Trigger, TriggerProps, Unit } from '../../types'
import { TriggerId } from '../Ids'
import { DamagePercentAllOnTurnEnd } from './DamagePercentAllOnTurnEnd'

export const CreateSandstormOnUnitEnterId = TriggerId()
export const SandstormOnTurnEndId = TriggerId()

export class CreateSandstormOnUnitEnter extends Trigger {
  get key() {
    return this.id
  }

  constructor(props: TriggerProps) {
    super(CreateSandstormOnUnitEnterId, {
      ...props,
      events: ['on Unit Enter'],
      maxInstances: 1,
      modifiers: (ctx) => [
        new DamagePercentAllOnTurnEnd({
          rid: SandstormOnTurnEndId,
          coef: 0.1,
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
