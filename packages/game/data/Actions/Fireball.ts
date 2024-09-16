import {
  Action,
  ActionAi,
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
  getDamageAiRating,
  getMutationsFromDamageResult,
} from '../../utils'
import { FireballId } from '../Ids'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class Fireball extends Action {
  splashDamage: Damage

  constructor(sourceId: Id, teamId: Id) {
    super(FireballId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
        isHidden: false,
      }),
      maxTargetCount: 1,
    })

    const power = 60
    this.damages = [
      {
        power,
        attackType: 'magic',
        damageType: 'fire',
      },
    ]
    this.splashDamage = {
      power: 30,
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
    return getDamageAiRating(this, targets, ctx)
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext
  ): ActionResult[] => {
    const data = getActionData(source, this, ctx)
    return [
      buildActionResult(this, data, source, targets, ctx, (modifiedTargets) => {
        return {
          onSuccess: {
            mutations: modifiedTargets.flatMap((target) => {
              const isTarget = !!targets.find((t) => t.id === target.id)
              const damage = calculateDamage(
                isTarget ? this.damages[0] : this.splashDamage,
                data.source,
                target,
                data.accuracyRoll
              )
              return getMutationsFromDamageResult(source, target, damage)
            }),
          },
        }
      }),
    ]
  }
}
