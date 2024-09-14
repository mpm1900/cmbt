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
import { DamageParentOnTurnEndId } from '../Ids'

export class DamageParentOnTurnEnd extends Trigger {
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
    super(DamageParentOnTurnEndId, {
      ...props,
      events: ['on Turn End'],
    })

    this.factor = props.factor ?? 0
    this.static = props.static ?? 0
    this.damageType = props.damageType
  }

  mutations = (ctx: CombatContext, args: MutationFilterArgs) => {
    const source = ctx.units.find((u) => u.id === this.sourceId)!
    const units = ctx.units.filter((u) => this.filter(u, ctx, args))
    return units.flatMap((unit) => {
      const modified = applyModifiers(unit, ctx, args).unit
      const damage = {
        damageType: this.damageType,
        factor: this.factor,
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
    return super.filter(unit, ctx, args) && unit.id === this.parentId
  }
}
