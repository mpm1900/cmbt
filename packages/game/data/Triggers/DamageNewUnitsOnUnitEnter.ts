import {
  CombatContext,
  Damage,
  MutationFilterArgs,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import {
  applyModifiers,
  calculateDamages,
  getMutationsFromDamageResult,
} from '../../utils'
import { DamageNewUnitsOnUnitEnterId } from '../Ids'

export class DamageNewUnitsOnUnitEnter extends Trigger {
  damage: Damage

  constructor(
    props: TriggerProps<{
      damage: Damage
    }>
  ) {
    super(DamageNewUnitsOnUnitEnterId, {
      ...props,
      events: ['on Unit Enter'],
    })

    this.damage = props.damage
  }

  mutations = (ctx: CombatContext, args: MutationFilterArgs) => {
    const units = ctx.units.filter((u) => this.filter(u, ctx, args))
    return units.flatMap((unit) => {
      const modified = applyModifiers(unit, ctx, args).unit
      const result = calculateDamages([this.damage], undefined, modified, {
        evasionSuccess: false,
      })
      return getMutationsFromDamageResult(undefined, unit, result)
    })
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return (
      super.filter(unit, ctx, args) && Trigger.OnNewEnter(this, unit, ctx, args)
    )
  }
}
