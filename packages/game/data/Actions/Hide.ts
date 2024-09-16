import { Action, ActionResult, CombatContext, Id, Unit } from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { HiddenParentId, HideId } from '../Ids'
import { UpdateFlagParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { EmptyArray } from '../Queries/EmptyArray'

export class Hide extends Action {
  duration = 2

  constructor(sourceId: Id, teamId: Id) {
    super(HideId, {
      sourceId,
      teamId,
      cost: new Identity({}),
      targets: new EmptyArray(),
      maxTargetCount: 0,
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
            addedModifiers: [
              new UpdateFlagParent({
                registryId: HiddenParentId,
                sourceId: source.id,
                parentId: source.id,
                flagKey: 'isHidden',
                value: true,
                duration: this.duration,
              }),
            ],
          },
        })
      ),
    ]
  }
}
