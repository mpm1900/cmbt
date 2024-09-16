import {
  Action,
  ACTION_PRIORITIES,
  ActionAi,
  ActionResult,
  CombatContext,
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
import { SneakAttackId } from '../Ids'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class SneakAttack extends Action {
  hiddenPower = 100

  constructor(sourceId: Id, teamId: Id) {
    super(SneakAttackId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
        isHidden: false,
      }),
      maxTargetCount: 1,
      priority: ACTION_PRIORITIES.DEFAULT,
    })

    this.damages = [
      {
        power: 40,
        attackType: 'physical',
        damageType: 'force',
      },
    ]
  }

  threshold = (source: Unit): number | undefined => {
    return 100 + source.stats.accuracy
  }
  criticalThreshold = (source: Unit): number | undefined => {
    console.log(source.name, source.metadata.modified)
    return 20 + source.stats.criticalChance
  }
  criticalFactor = (source: Unit): number | undefined =>
    1.5 + source.stats.criticalDamage

  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return getDamageAiRating(this, targets, ctx)
  }

  getPriority(ctx: CombatContext): number {
    const source = ctx.units.find((u) => u.id === this.sourceId)!
    const modified = applyModifiers(source, ctx).unit
    if (modified.flags.isHidden) return ACTION_PRIORITIES.FAST
    return ACTION_PRIORITIES.DEFAULT
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext
  ): ActionResult[] => {
    const data = getActionData(source, this, ctx)

    return [
      buildActionResult(
        this,
        data,
        source,
        targets,
        ctx,
        (modifiedTargets) => ({
          onSuccess: {
            mutations: modifiedTargets.flatMap((target) => {
              const damage = calculateDamage(
                {
                  ...this.damages[0],
                  power: data.source.flags.isHidden
                    ? this.hiddenPower
                    : this.damages[0].power,
                },
                data.source,
                target,
                data.accuracyRoll
              )
              return getMutationsFromDamageResult(source, target, damage)
            }),
          },
        })
      ),
    ]
  }
}
