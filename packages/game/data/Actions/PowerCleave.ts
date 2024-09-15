import {
  Action,
  ActionAi,
  ActionResolveOptions,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import {
  buildActionResult,
  calculateDamages,
  getActionData,
  getDamageAi,
  getMutationsFromDamageResult,
  modifyRenderContext,
} from '../../utils'
import { PowerCleaveId } from '../Ids'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class PowerCleave extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(PowerCleaveId, {
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
        power: 160,
        attackType: 'physical',
        damageType: 'force',
      },
    ]
  }

  threshold = (source: Unit): number | undefined => {
    return 100 + source.stats.accuracy
  }
  criticalThreshold = (source: Unit): number | undefined => {
    return 20 + source.stats.criticalChance
  }
  criticalFactor = (source: Unit): number | undefined =>
    1.5 + source.stats.criticalDamage

  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return getDamageAi(this, targets, ctx)
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext,
    options: ActionResolveOptions
  ): ActionResult[] => {
    ctx = modifyRenderContext(options, ctx)
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
