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
import { HexId } from '../Ids'
import { HexedParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class Hex extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(HexId, {
      sourceId,
      teamId,
      cost: new Identity({}),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
      }),
      maxTargetCount: 1,
      priority: 2,
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
        forceFailure: source.metadata.activeTurns > 1,
        onSuccess: {
          addedModifiers: modifiedTargets.flatMap((target) => [
            new HexedParent({
              sourceId: source.id,
              parentId: target.id,
              maxInstances: 1,
              duration: 1,
            }),
          ]),
        },
      })
    )
  }
}
