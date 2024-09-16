import random from 'random'
import { Action, ActionResult, CombatContext, Id, Unit } from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { HoldPersonId, StunnedParentId } from '../Ids'
import { UpdateFlagParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class HoldPerson extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(HoldPersonId, {
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

  threshold = (source: Unit): number | undefined => 85 + source.stats.accuracy

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext
  ): ActionResult[] => {
    const data = getActionData(source, this, ctx)
    const duration = random.int(2, 4)

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
                new UpdateFlagParent({
                  registryId: StunnedParentId,
                  sourceId: source.id,
                  parentId: target.id,
                  flagKey: 'isStunned',
                  value: true,
                  duration: duration,
                })
            ),
          },
        })
      ),
    ]
  }
}
