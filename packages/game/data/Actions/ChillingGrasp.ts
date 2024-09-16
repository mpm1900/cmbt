import { Action, ActionResult, CombatContext, Id, Unit } from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { ChillingGraspId } from '../Ids'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'
import { DrainLifeParentOnTurnEnd } from '../Triggers'

export class ChillingGrasp extends Action {
  duration: number = 5
  damageFactor: number = 0.125

  constructor(sourceId: Id, teamId: Id) {
    super(ChillingGraspId, {
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
            addedModifiers: modifiedTargets.map(
              (target) =>
                new DrainLifeParentOnTurnEnd({
                  sourceId: source.id,
                  parentId: target.id,
                  duration: this.duration,
                  damage: {
                    attackType: 'magic',
                    damageType: 'blight',
                    factor: this.damageFactor,
                  },
                })
            ),
          },
        })
      ),
    ]
  }
}
