import { Action, ActionResult, CombatContext, Id, Unit } from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import {
  SpeedStageDownParentId,
  SpeedStageUpParentId,
  TimeBendId,
} from '../Ids'
import { UpdateStatStageParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class TimeBend extends Action {
  offset = 1

  constructor(sourceId: Id, teamId: Id) {
    super(TimeBendId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new GetUnits({
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
                new UpdateStatStageParent({
                  registryId:
                    target.teamId === source.teamId
                      ? SpeedStageUpParentId
                      : SpeedStageDownParentId,
                  stat: 'speed',
                  sourceId: source.id,
                  parentId: target.id,
                  stages:
                    target.teamId === source.teamId
                      ? this.offset
                      : this.offset * -1,
                })
            ),
          },
        })
      ),
    ]
  }
}
