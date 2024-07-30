import {
  Action,
  ActionId,
  ActionRenderOptions,
  ActionResult,
  GameContext,
  Id,
  Unit,
} from '../../types'
import {
  applyModifiers,
  calculateDamage,
  getActionData,
  parseSuccess,
} from '../../utils'
import { DamageParent, Identity } from '../Modifiers'
import { modifyRenderContext } from '../../utils/modifyRenderContext'

export const FireballId = ActionId()
export class Fireball extends Action {
  maxTargetCount: number = 1
  damage: number

  constructor(sourceId: Id, teamId: Id, damage: number = 90) {
    super(FireballId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      attackType: 'magic',
    })
    this.damage = damage
  }

  expandTargets = (targets: Unit[], ctx: GameContext): Unit[] => {
    const teamIds = targets.map((t) => t.teamId)
    return ctx.units.filter(
      (u) => u.flags.isActive && teamIds.includes(u.teamId)
    )
  }

  targets = (unit: Unit, ctx: GameContext): boolean => {
    return super.targets(unit, ctx) && unit.teamId !== this.teamId
  }

  threshold = (source: Unit): number | undefined => {
    return 95 + source.stats.accuracy
  }
  critical = (source: Unit): number | undefined => undefined

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: GameContext,
    options: ActionRenderOptions
  ): ActionResult => {
    ctx = modifyRenderContext(options, ctx)
    const data = getActionData(source, this, ctx)
    return parseSuccess(this, data, source, targets, {
      onSuccess: {
        mutations: this.expandTargets(targets, ctx)
          .map((target) => [target, applyModifiers(target, ctx).unit])
          .map(([target, modifiedTarget]) => {
            const isTarget = targets.map((t) => t.id).includes(target.id)
            const damage = calculateDamage(
              {
                value: isTarget ? this.damage : this.damage * 0.3,
                damageType: 'fire',
                attackType: this.attackType,
              },
              data.source,
              modifiedTarget,
              { ...data.accuracyRoll }
            )
            return new DamageParent({
              sourceId: source.id,
              parentId: target.id,
              damage,
            })
          }),
      },
      onFailure: {},
    })
  }
}
