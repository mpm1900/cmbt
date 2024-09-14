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
import { DrainLifeParentOnTurnEndId } from '../Ids'

export class DrainLifeParentOnTurnEnd extends Trigger {
  damageFactor: number
  damageType: DamageType = 'blight'
  drainFactor: number

  constructor(
    props: TriggerProps<{
      damageFactor?: number
      damageType?: DamageType
      drainFactor?: number
    }>
  ) {
    super(DrainLifeParentOnTurnEndId, {
      ...props,
      events: ['on Turn End'],
    })

    this.damageFactor = props.damageFactor ?? 0
    this.damageType = props.damageType ?? this.damageType
    this.drainFactor = props.drainFactor ?? 0
  }

  mutations = (ctx: CombatContext) => {
    const source = ctx.units.find((u) => u.id === this.sourceId)!
    const parent = ctx.units.find((u) => u.id === this.parentId)!
    const mSource = applyModifiers(source, ctx).unit
    const mParent = applyModifiers(parent, ctx).unit
    const damage = {
      damageType: this.damageType,
      factor: this.damageFactor,
    } as Damage
    const result = calculatePureDamage(damage, mParent)
    return getMutationsFromDamageResult(source, parent, result)
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return super.filter(unit, ctx, args) && unit.id === this.parentId
  }
}
