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
import { ProtectedParentId, ProtectId } from '../Ids'
import { UpdateFlagParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { EmptyArray } from '../Queries/EmptyArray'

export class Protect extends Action {
  duration: number = 1

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

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext,
    options: ActionResolveOptions
  ): ActionResult[] => {
    ctx = modifyRenderContext(options, ctx)
    const data = getActionData(source, this, ctx)

    return [
      buildActionResult(this, data, source, targets, ctx, () => ({
        forceFailure: source.metadata.lastUsedActionId === this.id,
        onSuccess: {
          addedModifiers: [
            new UpdateFlagParent({
              registryId: ProtectedParentId,
              sourceId: source.id,
              parentId: source.id,
              duration: this.duration,
              flagKey: 'isProtected',
              value: true,
            }),
          ],
        },
      })),
    ]
  }
}
