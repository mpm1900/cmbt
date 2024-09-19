import { Action, ActionResult, CombatContext, Id, Unit } from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { HealingPrayerId, HealingPrayerTriggerId } from '../Ids'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'
import { HealParentOnTurnEnd } from '../Triggers'

export class HealingPrayer extends Action {
  offset = 1
  healingFactor = 0.5

  constructor(sourceId: Id, teamId: Id) {
    super(HealingPrayerId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new GetUnits({
        teamId: teamId,
        isActive: true,
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
                new HealParentOnTurnEnd({
                  registryId: HealingPrayerTriggerId,
                  sourceId: source.id,
                  parentId: target.id,
                  factor: this.healingFactor,
                  duration: 2,
                  delay: 2,
                  persistOnSwitch: true,
                })
            ),
          },
        })
      ),
    ]
  }
}
