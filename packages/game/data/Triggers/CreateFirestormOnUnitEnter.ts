import {
  CombatContext,
  MutationFilterArgs,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { CreateFirestormOnUnitEnterId, FirestormOnTurnEndId } from '../Ids'
import { DamageAllOnTurnEnd } from './DamageAllOnTurnEnd'

export class CreateFirestormOnUnitEnter extends Trigger {
  damageDuration: number = 5
  damageFactor: number = 0.1

  get key() {
    return this.id
  }

  constructor(props: TriggerProps) {
    super(CreateFirestormOnUnitEnterId, {
      ...props,
      events: ['on Unit Enter'],
      maxInstances: 1,
      modifiers: (ctx) => [
        new DamageAllOnTurnEnd({
          sourceId: props.sourceId,
          registryId: FirestormOnTurnEndId,
          damage: {
            factor: this.damageFactor,
            attackType: 'magic',
            damageType: 'fire',
          },
          duration: this.damageDuration,
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
    const newUnits = args.units
    return (
      super.filter(unit, ctx, args) &&
      !!newUnits?.find((u) => u.id === this.sourceId) &&
      unit.id === this.sourceId
    )
  }
}
