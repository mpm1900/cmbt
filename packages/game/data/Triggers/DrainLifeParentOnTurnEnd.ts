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
import { DrainLifeParentOnTurnEndId } from '../Ids'
import { HealParent } from '../Mutations'

export class DrainLifeParentOnTurnEnd extends Trigger {
  damage: Damage
  drainFactor = 1

  constructor(
    props: TriggerProps<{
      damage: Damage
    }>
  ) {
    super(DrainLifeParentOnTurnEndId, {
      ...props,
      events: ['on Turn End'],
    })

    this.damage = props.damage
  }

  mutations = (ctx: CombatContext, args: MutationFilterArgs) => {
    const source = ctx.units.find((u) => u.id === this.sourceId)!
    const units = ctx.units.filter((u) => this.filter(u, ctx, args))
    let totalDamage = 0
    return units
      .flatMap((unit) => {
        const modified = applyModifiers(unit, ctx, args).unit
        const result = calculateDamages([this.damage], undefined, modified, {
          evasionSuccess: false,
        })
        totalDamage += result.damage + result.magicArmor + result.physicalArmor
        return getMutationsFromDamageResult(source, unit, result)
      })
      .concat(
        new HealParent({
          sourceId: source.id,
          parentId: source.id,
          static: totalDamage,
        })
      )
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return super.filter(unit, ctx, args) && unit.id === this.parentId
  }
}
