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
  calculatePureDamage,
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
    const source = ctx.units.find((u) => u.id === this.sourceId)!
    const units = ctx.units.filter((u) => this.filter(u, ctx, args))
    return units.flatMap((unit) => {
      const modified = applyModifiers(unit, ctx, args).unit
      const result = calculatePureDamage(this.damage, modified)
      return getMutationsFromDamageResult(source, unit, result)
    })
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    const newUnits = args.units
    return (
      super.filter(unit, ctx, args) && !!newUnits?.find((u) => u.id === unit.id)
    )
  }
}
