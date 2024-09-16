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
  buildActionResult,
  calculateDamage,
  calculateDamages,
  getActionData,
  getDamageAiRating,
  getMutationsFromDamageResult,
} from '../../utils'
import { BodySlamId } from '../Ids'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class BodySlam extends Action {
  missDamage: Damage

  constructor(sourceId: Id, teamId: Id) {
    super(BodySlamId, {
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
        power: 100,
        attackType: 'physical',
        damageType: 'force',
      },
    ]
    this.missDamage = {
      power: 30,
      attackType: 'physical',
      damageType: 'force',
    }
  }

  threshold = (source: Unit): number | undefined => {
    return 85 + source.stats.accuracy
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
          onFailure: {
            mutations: (() => {
              const damage = calculateDamage(
                this.missDamage,
                data.source,
                source,
                data.accuracyRoll
              )
              return getMutationsFromDamageResult(source, source, damage)
            })(),
          },
        })
      ),
    ]
  }
}
