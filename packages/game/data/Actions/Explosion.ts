import { ActionResult, ActionAi, CombatContext, Id, Unit } from '../../types'
import { Action } from '../../types/Action'
import {
  applyModifiers,
  calculateDamage,
  applyMutation,
  getActionData,
  getDamageAi,
} from '../../utils'
import { ActionId } from '../Id'
import { DamageParent, Identity } from '../Mutations'
import { EmptyArray } from '../Queries'
import { ZERO_UNIT } from '../Units'

export const ExplosionId = ActionId()

export class Explosion extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(ExplosionId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new EmptyArray(),
      attackType: 'physical',
      maxTargetCount: 0,
    })
  }

  getDamage = (source: Unit, targets: Unit[], ctx: CombatContext): number[] => {
    const { mutations } = this.resolve(source, targets, ctx)
    if (!mutations) return []
    return mutations
      .filter((m) => m.parentId !== this.sourceId)
      .map((m) => applyMutation(ZERO_UNIT, m))
      .map((u) => u.values.damage)
  }

  threshold = (source: Unit): number | undefined => undefined
  critical = (source: Unit): number | undefined => undefined
  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return getDamageAi(this, targets, ctx)
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext
  ): ActionResult => {
    const data = getActionData(source, this, ctx)
    const remainingHealth = data.source.stats.health - data.source.values.damage
    return {
      action: this,
      source,
      targets,
      mutations: [
        data.setLastUsed,
        new DamageParent({
          sourceId: source.id,
          parentId: source.id,
          damage: remainingHealth,
        }),
        ...ctx.units
          .filter((u) => u.id !== this.sourceId)
          .map((target) => [target, applyModifiers(target, ctx).unit])
          .map(([target, modifiedTarget]) => {
            const damage = calculateDamage(
              {
                value: data.source.stats.physical * 4,
                attackType: this.attackType,
              },
              data.source,
              modifiedTarget,
              data.accuracyRoll
            )
            return new DamageParent({
              sourceId: source.id,
              parentId: target.id,
              damage,
            })
          }),
      ],
      addedModifiers: [],
    }
  }
}
