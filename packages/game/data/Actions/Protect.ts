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
import { ProtectId } from '../Ids'
import { ProtectedParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { EmptyArray } from '../Queries/EmptyArray'

export class Protect extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(ProtectId, {
      sourceId,
      teamId,
      cost: new Identity({}),
      targets: new EmptyArray(),
      maxTargetCount: 0,
      priority: 4,
    })
  }

  threshold = (source: Unit): number | undefined => undefined
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

    return buildActionResult(this, data, source, targets, ctx, () => ({
      forceFailure: source.metadata.lastUsedActionId === this.id,
      onSuccess: {
        addedModifiers: [
          new ProtectedParent({
            sourceId: source.id,
            parentId: source.id,
            duration: 1,
          }),
        ],
      },
    }))
  }
}
