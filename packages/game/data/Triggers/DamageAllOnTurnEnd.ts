import {
  AttackType,
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
import { DamageAllOnTurnEndId } from '../Ids'

export class DamageAllOnTurnEnd extends Trigger {
  factor: number
  static: number
  attackType?: AttackType
  damageType?: DamageType

  get key() {
    return this.registryId
  }

  constructor(
    props: TriggerProps<{
      factor?: number
      static?: number
      attackType?: AttackType
      damageType?: DamageType
    }>
  ) {
    super(DamageAllOnTurnEndId, {
      ...props,
      events: ['on Turn End'],
    })

    this.factor = props.factor ?? 0
    this.static = props.static ?? 0
    this.attackType = props.attackType
    this.damageType = props.damageType
  }

  mutations = (ctx: CombatContext, args: MutationFilterArgs) => {
    const source = ctx.units.find((u) => u.id === this.sourceId)!
    const units = ctx.units.filter((u) => this.filter(u, ctx, args))
    return units.flatMap((unit) => {
      const modified = applyModifiers(unit, ctx, args).unit
      const damage = {
        attackType: this.attackType,
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
    return super.filter(unit, ctx, args)
  }
}
