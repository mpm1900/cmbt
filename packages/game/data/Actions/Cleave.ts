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
} from '../../utils'
import { CleaveId } from '../Ids'
import { Identity } from '../Mutations'
import { EmptyArray, GetUnits } from '../Queries'

export class Cleave extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(CleaveId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new EmptyArray(),
      maxTargetCount: 0,
    })

    this.damages = [
      {
        power: 45,
        attackType: 'physical',
        damageType: 'force',
      },
    ]
  }

  threshold = (source: Unit): number | undefined => {
    return 85 + source.stats.accuracy
  }
  criticalThreshold = (source: Unit): number | undefined => {
    return 10 + source.stats.criticalChance
  }
  criticalFactor = (source: Unit): number | undefined =>
    1.5 + source.stats.criticalDamage

  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return getDamageAiRating(this, targets, ctx)
  }

  mapTargets = (targets: Unit[], ctx: CombatContext): Unit[] => {
    return new GetUnits({
      isActive: true,
      notTeamId: this.teamId,
    }).resolve(ctx)
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
              const damage = calculateDamages(
                this.damages,
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
