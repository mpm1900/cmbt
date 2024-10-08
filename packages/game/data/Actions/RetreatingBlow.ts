import {
  Action,
  ActionAi,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import {
  buildActionResult,
  calculateDamages,
  getActionData,
  getDamageAiRating,
  getMutationsFromDamageResult,
  isUnitAliveCtx,
} from '../../utils'
import { RetreatingBlowId } from '../Ids'
import { Identity, SetIsActiveParent } from '../Mutations'
import { GetUnits } from '../Queries'

export class RetreatingBlow extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(RetreatingBlowId, {
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

    this.damages = [
      {
        power: 70,
        attackType: 'physical',
        damageType: 'force',
      },
    ]
  }

  threshold = (source: Unit): number | undefined => {
    return 95 + source.stats.accuracy
  }
  criticalThreshold = (source: Unit): number | undefined => {
    return 5 + source.stats.criticalChance
  }
  criticalFactor = (source: Unit): number | undefined =>
    1.5 + source.stats.criticalDamage

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
        const inactiveLiveAllies = ctx.units.filter(
          (u) => !u.flags.isActive && isUnitAliveCtx(u, ctx)
        )
        return {
          forceFailure: inactiveLiveAllies.length === 0,
          onSuccess: {
            mutations: modifiedTargets.flatMap((target) => {
              const damage = calculateDamages(
                this.damages,
                data.source,
                target,
                data.accuracyRoll
              )
              return getMutationsFromDamageResult(source, target, damage)
            }),
          },
        }
      }),
      buildActionResult(this, data, source, targets, ctx, (modifiedTargets) => {
        const inactiveLiveAllies = ctx.units.filter(
          (u) => !u.flags.isActive && isUnitAliveCtx(u, ctx)
        )
        return {
          forceFailure:
            inactiveLiveAllies.length === 0 || modifiedTargets.length === 0,
          expandedTargets: [source],
          shouldLog: false,
          onSuccess: {
            mutations: [
              new SetIsActiveParent({
                sourceId: source.id,
                parentId: source.id,
                isActive: false,
              }),
            ],
            updateActionQueue: (queue) => {
              return queue.map((item) => {
                return {
                  ...item,
                  targetIds: item.targetIds.map((tid) =>
                    tid === source.id ? '' : tid
                  ),
                }
              })
            },
          },
        }
      }),
    ]
  }
}
