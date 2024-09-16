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
import { DamageAllOnTurnEndId } from '../Ids'

export class DamageAllOnTurnEnd extends Trigger {
  damage: Damage

  get key() {
    return this.registryId
  }

  constructor(
    props: TriggerProps<{
      damage: Damage
    }>
  ) {
    super(DamageAllOnTurnEndId, {
      ...props,
      events: ['on Turn End'],
    })

    this.damage = props.damage
  }

  mutations = (ctx: CombatContext, args: MutationFilterArgs) => {
    const source = ctx.units.find((u) => u.id === this.sourceId)!
    const units = ctx.units.filter((u) => this.filter(u, ctx, args))
    return units.flatMap((parent) => {
      const target = applyModifiers(parent, ctx, args).unit
      const result = calculateDamages([this.damage], undefined, target, {
        evasionSuccess: false,
      })
      return getMutationsFromDamageResult(source, parent, result)
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
