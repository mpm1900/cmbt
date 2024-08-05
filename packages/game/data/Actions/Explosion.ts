import {
  Action,
  ActionId,
  ActionResult,
  GameContext,
  Id,
  Unit,
} from '../../types'
import {
  applyModifiers,
  calculateDamage,
  applyMutation,
  ZERO_UNIT,
  getActionData,
} from '../../utils'
import { DamageParent, Identity } from '../Mutations'
import { EmptyArray } from '../Queries/EmptyArray'

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

  getDamage = (source: Unit, targets: Unit[], ctx: GameContext): number[] => {
    const { mutations } = this.resolve(source, targets, ctx)
    if (!mutations) return []
    return mutations
      .filter((m) => m.parentId !== this.sourceId)
      .map((m) => applyMutation(ZERO_UNIT, m))
      .map((u) => u.values.damage)
  }

  threshold = (source: Unit): number | undefined => undefined
  critical = (source: Unit): number | undefined => undefined

  resolve = (source: Unit, targets: Unit[], ctx: GameContext): ActionResult => {
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
