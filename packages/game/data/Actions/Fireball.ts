import {
  Action,
  ActionResolveOptions,
  ActionResult,
  ActionAi,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import {
  applyModifiers,
  calculateDamage,
  getActionData,
  getDamageAi,
  parseSuccess,
} from '../../utils'
import { modifyRenderContext } from '../../utils/modifyRenderContext'
import { ActionId } from '../Ids'
import { DamageParent, Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export const FireballId = ActionId()
export class Fireball extends Action {
  damage: number

  constructor(sourceId: Id, teamId: Id, damage: number = 90) {
    super(FireballId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
      }),
      attackType: 'magic',
      maxTargetCount: 1,
    })
    this.damage = damage
  }

  expandTargets = (targets: Unit[], ctx: CombatContext): Unit[] => {
    const teamIds = targets.map((t) => t.teamId)
    return ctx.units.filter(
      (u) => u.flags.isActive && teamIds.includes(u.teamId)
    )
  }

  threshold = (source: Unit): number | undefined => {
    return 95 + source.stats.accuracy
  }
  critical = (source: Unit): number | undefined => undefined
  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return getDamageAi(this, targets, ctx)
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext,
    options: ActionResolveOptions
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
