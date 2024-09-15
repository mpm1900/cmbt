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
  calculateDamage,
  getActionData,
  getDamageAi,
  getMutationsFromDamageResult,
  modifyRenderContext,
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
      priority: 1,
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
