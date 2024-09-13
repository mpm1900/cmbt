import {
  Action,
  ActionResolveOptions,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { modifyRenderContext } from '../../utils/modifyRenderContext'
import { GhostFlameId } from '../Ids'
import { UpdateValueParent } from '../Mutations'
import { GetUnits } from '../Queries'
import { Burn } from '../Statuses/Burn'

export class GhostFlame extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(GhostFlameId, {
      sourceId,
      teamId,
      cost: new UpdateValueParent({
        sourceId: sourceId,
        parentId: sourceId,
        valueKey: 'focus',
        static: -20,
      }),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
        isHidden: false,
      }),
      maxTargetCount: 1,
    })
  }

  threshold = (source: Unit): number | undefined => {
    return 90 + source.stats.accuracy
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
            addedModifiers: modifiedTargets.flatMap((target) =>
              Burn.modifiers(source, target)
            ),
          },
        })
      ),
    ]
  }
}
