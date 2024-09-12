import {
  Action,
  ActionResolveOptions,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import {
  buildActionResult,
  getActionData,
  modifyRenderContext,
} from '../../utils'
import { DisableId } from '../Ids'
import { DisabledParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class Disable extends Action {
  duration: number = 2

  constructor(sourceId: Id, teamId: Id) {
    super(DisableId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new GetUnits({ isActive: true, notTeamId: teamId }),
      priority: -1,
      maxTargetCount: 1,
    })
  }

  threshold = (source: Unit): number | undefined => undefined
  criticalThreshold = (source: Unit): number | undefined => undefined
  criticalFactor = (source: Unit): number | undefined => undefined

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
