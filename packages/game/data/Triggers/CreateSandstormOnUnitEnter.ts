import {
  CombatContext,
  MutationFilterArgs,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { CreateSandstormOnUnitEnterId, SandstormOnTurnEndId } from '../Ids'
import { DamageAllOnTurnEnd } from './DamageAllOnTurnEnd'

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
        new DamageAllOnTurnEnd({
          registryId: SandstormOnTurnEndId,
          factor: 0.1,
          duration: 5,
          maxInstances: 1,
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
    return super.filter(unit, ctx, args) && unit.id === this.sourceId
  }
}
