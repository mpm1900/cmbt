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
  damageDuration: number = 5
  damageFactor: number = 0.1

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
          factor: this.damageFactor,
          damageType: 'force',
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
