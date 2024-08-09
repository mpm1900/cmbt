import {
  Action,
  ActionResolveOptions,
  ActionResult,
  ActionAi,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import { getActionData, buildActionResult } from '../../utils'
import { modifyRenderContext } from '../../utils/modifyRenderContext'
import { ActionId } from '../Ids'
import { SetIsProtectedParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { EmptyArray } from '../Queries/EmptyArray'

export const ProtectId = ActionId()
export class Protect extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(ProtectId, {
      sourceId,
      teamId,
      cost: new Identity({}),
      targets: new EmptyArray(),
      maxTargetCount: 0,
      priority: 1,
    })
  }

  threshold = (source: Unit): number | undefined => undefined
  critical = (source: Unit): number | undefined => undefined
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
    console.log(source.metadata.lastUsedActionId === this.id)

    return buildActionResult(this, data, source, targets, ctx, () => ({
      forceFailure: source.metadata.lastUsedActionId === this.id,
      onSuccess: {
        addedModifiers: [
          new SetIsProtectedParent({
            sourceId: source.id,
            parentId: source.id,
            duration: 2,
          }),
        ],
      },
    }))
  }
}
