import {
  CombatContext,
  Damage,
  DamageType,
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
  factor: number
  static: number
  damageType?: DamageType

  constructor(
    props: TriggerProps<{
      factor?: number
      static?: number
      damageType?: DamageType
    }>
  ) {
    super(DamageNewUnitsOnUnitEnterId, {
      ...props,
      events: ['on Unit Enter'],
    })

    this.factor = props.factor ?? 0
    this.static = props.static ?? 0
  }

  mutations = (ctx: CombatContext, args: MutationFilterArgs) => {
    const source = ctx.units.find((u) => u.id === this.sourceId)!
    const units = ctx.units.filter((u) => this.filter(u, ctx, args))
    return units.flatMap((unit) => {
      const modified = applyModifiers(unit, ctx, args).unit
      const damage = {
        damageType: this.damageType,
        factor: this.factor,
        raw: this.static,
      } as Damage
      const result = calculatePureDamage(damage, modified)
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
