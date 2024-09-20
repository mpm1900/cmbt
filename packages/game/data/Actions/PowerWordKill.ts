import { Action, ActionResult, CombatContext, Id, Unit } from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { PowerWordKillId } from '../Ids'
import { DamageParent, Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class PowerWordKill extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(PowerWordKillId, {
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
        power: Infinity,
        attackType: 'magic',
        damageType: 'arcane',
      },
    ]
  }

  threshold = (source: Unit): number | undefined => {
    return 40 + source.stats.accuracy
  }
  criticalThreshold = (source: Unit): number | undefined => undefined
  criticalFactor = (source: Unit): number | undefined => undefined
  /*
  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return getDamageAiRating(this, targets, ctx)
  }
  */

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
            mutations: modifiedTargets.map((target) => {
              const damage = target.stats.health
              return new DamageParent({
                sourceId: source.id,
                parentId: target.id,
                static: damage,
              })
            }),
          },
        })
      ),
    ]
  }
}
