import {
  Action,
  ACTION_PRIORITIES,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { MemoryLeakId } from '../Ids'
import { DisabledParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class MemoryLeak extends Action {
  duration: number = 2

  constructor(sourceId: Id, teamId: Id) {
    super(MemoryLeakId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new GetUnits({ isActive: true, notTeamId: teamId }),
      priority: ACTION_PRIORITIES.SLOW,
      maxTargetCount: 1,
    })
  }

  threshold = (source: Unit): number | undefined => undefined
  criticalThreshold = (source: Unit): number | undefined => undefined
  criticalFactor = (source: Unit): number | undefined => undefined

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
            addedModifiers: modifiedTargets.map((target) => {
              return new DisabledParent({
                sourceId: source.id,
                parentId: target.id,
                actionId: target.metadata.lastUsedActionId,
                duration: this.duration,
              })
            }),
          },
        })
      ),
    ]
  }
}
