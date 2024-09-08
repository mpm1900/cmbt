import {
  Action,
  ActionAi,
  ActionResolveOptions,
  ActionResult,
  CombatContext,
  Damage,
  Id,
  Unit,
} from '../../types'
import {
  applyModifiers,
  buildActionResult,
  calculateDamage,
  getActionData,
  getDamageAi,
  getMutationsFromDamageResult,
} from '../../utils'
import { modifyRenderContext } from '../../utils/modifyRenderContext'
import { FireballId } from '../Ids'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class Fireball extends Action {
  damage: Damage
  splashDamage: Damage

  constructor(sourceId: Id, teamId: Id) {
    super(FireballId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
      }),
      maxTargetCount: 1,
    })

    const power = 70
    this.damage = {
      power,
      attackType: 'magic',
      damageType: 'fire',
    }
    this.splashDamage = {
      power: Math.round(power / 3),
      attackType: 'magic',
      damageType: 'fire',
    }
  }

  mapTargets = (targets: Unit[], ctx: CombatContext): Unit[] => {
    const teamIds = targets.map((t) => t.teamId)
    return ctx.units
      .map((u) => applyModifiers(u, ctx).unit)
      .filter((u) => u.flags.isActive && teamIds.includes(u.teamId))
  }

  threshold = (source: Unit): number | undefined => {
    return 95 + source.stats.accuracy
  }
  criticalThreshold = (source: Unit): number | undefined => undefined
  criticalFactor = (source: Unit): number | undefined => undefined
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
      (modifiedTargets) => {
        return {
          onSuccess: {
            mutations: modifiedTargets.flatMap((target) => {
              const isTarget = !!targets.find((t) => t.id === target.id)
              const damage = calculateDamage(
                isTarget ? this.damage : this.splashDamage,
                data.source,
                target,
                data.accuracyRoll
              )
              return getMutationsFromDamageResult(source, target, damage)
            }),
          },
        }
      }
    )
  }
}
