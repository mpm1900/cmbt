import {
  Action,
  ActionAi,
  ActionResolveOptions,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { modifyRenderContext } from '../../utils/modifyRenderContext'
import { WillOWispId } from '../Ids'
import { UpdateValueParent } from '../Mutations'
import { GetUnits } from '../Queries'
import { Burn } from '../Statuses/Burn'

export class WillOWisp extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(WillOWispId, {
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
  criticalThreshold = (source: Unit): number | undefined => undefined
  criticalFactor = (source: Unit): number | undefined => undefined
  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return { action: this, weight: 0, targetIds: [] }
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext,
    options: ActionResolveOptions
  ): ActionResult => {
    ctx = modifyRenderContext(options, ctx)
    const data = getActionData(source, this, ctx)

    return buildActionResult(
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
    )
  }
}
