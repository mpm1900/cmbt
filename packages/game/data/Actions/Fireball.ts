import {
  Action,
  ActionResolveOptions,
  ActionResult,
  ActionAi,
  CombatContext,
  Id,
  Unit,
  AttackTypes,
  Damage,
} from '../../types'
import {
  calculateDamage,
  getActionData,
  getDamageAi,
  buildActionResult,
} from '../../utils'
import { modifyRenderContext } from '../../utils/modifyRenderContext'
import { ActionId } from '../Ids'
import { DamageParent, Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export const FireballId = ActionId()
export class Fireball extends Action {
  damage: Damage

  constructor(sourceId: Id, teamId: Id) {
    const attackType = 'magic'
    super(FireballId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
      }),
      attackType,
      maxTargetCount: 1,
    })

    this.damage = {
      value: 70,
      attackType: 'magic',
      damageType: 'fire',
    }
  }

  mapTargets = (targets: Unit[], ctx: CombatContext): Unit[] => {
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
    return buildActionResult(
      this,
      data,
      source,
      targets,
      ctx,
      (modifiedTargets) => ({
        onSuccess: {
          mutations: modifiedTargets.map((target) => {
            const isTarget = targets.map((t) => t.id).includes(target.id)
            const { damage } = calculateDamage(
              {
                ...this.damage,
                value: this.damage.value * (isTarget ? 1 : 0.3),
              },
              data.source,
              target,
              data.accuracyRoll
            )
            return new DamageParent({
              sourceId: source.id,
              parentId: target.id,
              damage,
            })
          }),
        },
      })
    )
  }
}
