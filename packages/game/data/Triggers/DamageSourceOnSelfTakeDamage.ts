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
import { DamageSourceOnSelfTakeDamageId } from '../Ids'

export class DamageSourceOnSelfTakeDamage extends Trigger {
  damage: Damage

  constructor(
    props: TriggerProps<{
      damage: Damage
    }>
  ) {
    super(DamageSourceOnSelfTakeDamageId, {
      ...props,
      events: ['on Unit Take Damage'],
    })

    this.damage = props.damage
  }

  mutations = (ctx: CombatContext, args: MutationFilterArgs) => {
    const source = args.result?.source
    if (!source) return []
    const units = [source]
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
      super.filter(unit, ctx, args) &&
      unit.id === this.parentId &&
      !!args.units?.some((u) => u.id === unit.id) &&
      (args.damage ?? 0) > 0
    )
  }
}
