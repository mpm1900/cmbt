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
import { DamageParentOnTurnEndId } from '../Ids'

export class DamageParentOnTurnEnd extends Trigger {
  damage: Damage

  constructor(
    props: TriggerProps<{
      damage: Damage
    }>
  ) {
    super(DamageParentOnTurnEndId, {
      ...props,
      events: ['on Turn End'],
    })

    this.damage = props.damage
  }

  mutations = (ctx: CombatContext, args: MutationFilterArgs) => {
    const source = ctx.units.find((u) => u.id === this.sourceId)!
    const units = ctx.units.filter((u) => this.filter(u, ctx, args))
    return units.flatMap((unit) => {
      const modified = applyModifiers(unit, ctx, args).unit
      const result = calculateDamages([this.damage], undefined, modified, {
        evasionSuccess: false,
      })
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
